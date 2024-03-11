import React, {
  useState, ReactElement, useCallback, useMemo, useRef, Fragment, ComponentType, useContext, useEffect,
} from 'react';

import { ModalPropsType } from '.';

type ShowModalCallbackPropsType<P extends ModalPropsType > = Omit<P, 'visible' | 'isFocused' | 'modalKey' | 'theme'>;

export type ModalReturnType = {
  dismiss: () => void;
};

type ModalContextType = {
  showModal: (
    ModalComponent: ComponentType<ModalPropsType>,
    props?: ShowModalCallbackPropsType<ModalPropsType>
  ) => ModalReturnType;
  dismissAllModals: () => void;
};

const ModalContext = React.createContext<ModalContextType>({} as any);

type RenderedElementType = {
  modalKey: string;
  element: ReactElement<ModalPropsType>;
  notifyDismiss: () => void;
  notifyDismissEnd: () => void;
};

type ModalProviderPropsType = {
  children: React.ReactNode;
  /**
   * Tempo (em milissegundos) de tolerância entre a abertura de duas modais do mesmo tipo.
   *
   * Usado para evitar que o usuário abra várias vezes a mesma modal ao clicar
   * rapidamente no mesmo botão.
   *
   * Em ambiente de teste, você pode querer desativar esse comportamento, pois
   * em casos de testes os disparos de modais acontecem várias vezes repetidamente.
   *
   * Para desativar, basta passar zero.
   */
  throttleTimeout?: number;
};

const ModalProvider: React.FC<ModalProviderPropsType> = ({
  children, throttleTimeout = 500,
}) => {
  const lastModalShowRef = useRef(0);
  const lastElementTypeRef = useRef<ReactElement['type']>();
  const [renderedElements, setRenderedElements] = useState<RenderedElementType[]>([]);

  const lastRenderedElementsRef = useRef<RenderedElementType[]>([]);

  /**
   * Dispara os eventos de dismiss e dismissEnd de acordo com as mudanças
   * de estado das modais.
   */
  useEffect(() => {
    lastRenderedElementsRef.current.forEach(lastElement => {
      const element = renderedElements.find(el => el.modalKey === lastElement.modalKey);

      if (!element) {
        lastElement.notifyDismissEnd();
        return;
      }

      if (!element.element.props.visible && lastElement.element.props.visible) {
        lastElement.notifyDismiss();
      }
    });

    lastRenderedElementsRef.current = renderedElements;
  }, [renderedElements]);

  const currentRenderedElement = renderedElements[renderedElements.length - 1];

  const dismissAllModals = useCallback(() => {
    setRenderedElements(elements => (
      elements.map(element => {
        if (element.element.props.visible) {
          return {
            ...element,
            element: React.cloneElement(element.element, { visible: false }),
          };
        }

        return element;
      })
    ));
  }, []);

  const unmountModal = useCallback((modalKey: string) => {
    setRenderedElements(elements => {
      const elementIndex = elements.findIndex(element => element.modalKey === modalKey);

      const copyElements = [...elements];

      copyElements.splice(elementIndex, 1);

      return copyElements;
    });
  }, []);

  const dismissModal = useCallback((modalKey: string) => {
    setRenderedElements(elements => elements.map(element => {
      if (element.modalKey === modalKey && element.element.props.visible) {
        return {
          ...element,
          element: React.cloneElement(element.element, { visible: false }),
        };
      }

      return element;
    }));
  }, []);

  const shouldThrottle = useCallback((element: ReactElement) => {
    try {
      if (!throttleTimeout) return false;

      if (element.type !== lastElementTypeRef.current) return false;

      const timeSinceLastShow = Date.now() - lastModalShowRef.current;

      if (timeSinceLastShow > throttleTimeout) return false;

      return true;
    } finally {
      lastElementTypeRef.current = element.type;
      lastModalShowRef.current = Date.now();
    }
  }, [throttleTimeout]);

  const showModal = useCallback(<Props extends ModalPropsType>(
    ModalComponent: ComponentType<Props>,
    props?: ShowModalCallbackPropsType<Props>,
  ) => {
    const modalKey = `modal-element-${lastModalShowRef.current}${Date.now()}`;

    const result = {
      dismiss: () => dismissModal(modalKey),
    };

    setRenderedElements(elements => {
      // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
      const handleDismissModal = () => dismissModal(modalKey);

      // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
      const handleDismissEndModal = () => unmountModal(modalKey);

      const element = (
        <ModalComponent
          {...props as any}
          visible
          onDismiss={handleDismissModal}
          onDismissEnd={handleDismissEndModal}
        />
      );

      if (shouldThrottle(element)) {
        return elements;
      }

      const renderedElement: RenderedElementType = {
        modalKey,
        element,
        notifyDismiss: () => {
          props?.onDismiss?.();
        },
        notifyDismissEnd: () => {
          props?.onDismissEnd?.();
        },
      };

      return [...elements, renderedElement];
    });

    return result;
  }, [dismissModal, shouldThrottle, unmountModal]);

  const providerValue = useMemo(() => ({
    showModal,
    dismissAllModals,
  }), [
    showModal,
    dismissAllModals,
  ]);

  const renderModalElement = (item: RenderedElementType) => {
    const clonedElement = React.cloneElement(item.element, {
      isFocused: currentRenderedElement?.modalKey === item.modalKey,
      modalKey: item.modalKey,
    });

    return (
      <Fragment key={item.modalKey}>
        {clonedElement}
      </Fragment>
    );
  };

  return (
    <ModalContext.Provider value={providerValue}>
      {children}
      {renderedElements.map(renderModalElement)}
    </ModalContext.Provider>
  );
};

export type ShowModalType = <Props extends ModalPropsType>(
  ModalComponent: ComponentType<Props>,
  props?: ShowModalCallbackPropsType<Props>
) => ModalReturnType;

export function useModal() {
  const { showModal } = useContext(ModalContext);
  return showModal as ShowModalType;
}

export function useDismissAllModals() {
  const { dismissAllModals } = useContext(ModalContext);
  return dismissAllModals;
}

export default ModalProvider;
