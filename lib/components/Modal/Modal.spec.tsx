import React from 'react';
import { View, Text } from 'react-native';

import {
  render, act, waitFor,
} from '@testing-library/react-native';
import { delay } from 'mapping-context-rn';

import Modal from '.';
import { ModalReturnType } from './ModalProvider';
import { renderModal } from './test-utils';

describe('Modal snapshot', () => {
  it('should render before animation', () => {
    const tree = render(
      <Modal
        isFocused
        modalKey="abc"
        visible
        onDismiss={() => null}
        onDismissEnd={() => null}
        animationDuration={1000}
      >
        <View>
          <Text>Modal</Text>
        </View>
      </Modal>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render after animation', () => {
    const tree = render(
      <Modal
        isFocused
        modalKey="abc"
        visible
        onDismiss={() => null}
        onDismissEnd={() => null}
        animationDuration={0}
      >
        <View>
          <Text>Modal</Text>
        </View>
      </Modal>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render invisible', () => {
    const tree = render(
      <Modal
        isFocused={false}
        modalKey="abc"
        visible={false}
        animationDuration={0}
      >
        <View>
          <Text>Modal</Text>
        </View>
      </Modal>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render without iOS safe area', () => {
    const tree = render(
      <Modal
        isFocused
        modalKey="abc"
        visible
        withSafeAreaIOS={false}
        animationDuration={0}
      >
        <View>
          <Text>Modal</Text>
        </View>
      </Modal>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render with Android StatusBar skip', () => {
    const tree = render(
      <Modal
        isFocused
        modalKey="abc"
        visible
        skipStatusBarAndroid
        animationDuration={0}
      >
        <View>
          <Text>Modal</Text>
        </View>
      </Modal>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

});

describe('Modal events', () => {
  // it('should render with analyticsModalName', async () => {
  //   let spyScreenView: any;
  //   const screen = render(
  //     <AppProvider>
  //       <Modal
  //         isFocused
  //         visible
  //         analyticsModalName="sa_modal_example"
  //         animationDuration={0}
  //       >
  //         <View>
  //           <Text>Modal</Text>
  //         </View>
  //       </Modal>
  //     </AppProvider>,
  //   );

  //   await waitFor(() => screen.UNSAFE_getByType(Modal));

  //   await waitFor(() => expect(spyScreenView).toBeCalledWith('sa_modal_example'));

  //   const tree = screen.toJSON();

  //   expect(tree).toMatchSnapshot();
  // });
  it('should call onDismissEnd after dismiss', () => {
    const handleDismiss = jest.fn();

    const result = render(
      <Modal
        isFocused
        modalKey="abc"
        visible
        onDismissEnd={handleDismiss}
        animationDuration={0}
      />,
    );

    act(() => {
      result.update(
        <Modal
          isFocused
          modalKey="abc"
          visible={false}
          onDismissEnd={handleDismiss}
          animationDuration={0}
        />,
      );
    });

    expect(handleDismiss).toBeCalled();
  });

  it('should dismiss the modal with useDismissAllModals', async () => {
    const handleDismiss = jest.fn();

    const { showModal, dismissAllModals } = await renderModal({
      onDismiss: handleDismiss,
    });

    act(() => {
      showModal();
    });
    act(() => {
      dismissAllModals();
    });

    expect(handleDismiss).toBeCalled();
  });

  it('should ignore second show with throttle', async () => {
    const handleDismiss = jest.fn();

    const { showModal, result } = await renderModal({
      onDismiss: handleDismiss,
    });

    act(() => {
      showModal();
    });
    act(() => {
      showModal();
    });

    const children = result.getAllByTestId('modal-children-text');

    expect(children.length).toBe(1);
  });

  it('should show with throttle disabled', async () => {
    const handleDismiss = jest.fn();

    const { showModal, result } = await renderModal({
      onDismiss: handleDismiss,
    }, 0);

    act(() => {
      showModal();
    });
    act(() => {
      showModal();
    });

    const children = result.getAllByTestId('modal-children-text');

    expect(children.length).toBe(2);
  });

  it('should show with small throttle', async () => {
    const handleDismiss = jest.fn();

    const { showModal, result } = await renderModal({
      onDismiss: handleDismiss,
    }, 1);

    act(() => {
      showModal();
    });

    await delay(1);

    act(() => {
      showModal();
    });

    const children = result.getAllByTestId('modal-children-text');

    expect(children.length).toBe(2);
  });

  it('should track correct modal in render queue', async () => {
    const { showModal } = await renderModal({}, 0);

    act(() => {
      showModal({
        analyticsModalName: 'sa_first_modal',
      });
    });

    let secondModalReturn: ModalReturnType;
    act(() => {
      secondModalReturn = showModal({
        analyticsModalName: 'sa_second_modal',
      });
    });

    act(() => {
      secondModalReturn.dismiss();
    });
  });

  it('should not call dismiss more that once', async () => {
    const handleDismiss = jest.fn();

    const { showModal, result } = await renderModal({
      onDismiss: handleDismiss,
      animationDuration: 100,
    });

    let showResult: ModalReturnType;
    act(() => {
      showResult = showModal();
    });

    result.getByTestId('modal-children-text');

    act(() => {
      showResult.dismiss();
    });
    act(() => {
      showResult.dismiss();
    });

    await waitFor(() => {
      expect(result.queryByTestId('modal-children-text')).toBeNull();
    });

    expect(handleDismiss).toBeCalledTimes(1);

    act(() => {
      showResult.dismiss();
    });

    expect(handleDismiss).toBeCalledTimes(1);
  });

  it('should not call dismissAll more that once fot the same modal', async () => {
    const handleDismiss = jest.fn();

    const { showModal, result, dismissAllModals } = await renderModal({
      onDismiss: handleDismiss,
      animationDuration: 100,
    });

    act(() => {
      showModal();
    });

    result.getByTestId('modal-children-text');

    act(() => {
      dismissAllModals();
    });
    act(() => {
      dismissAllModals();
    });

    await waitFor(() => {
      expect(result.queryByTestId('modal-children-text')).toBeNull();
    });

    expect(handleDismiss).toBeCalledTimes(1);

    act(() => {
      dismissAllModals();
    });

    expect(handleDismiss).toBeCalledTimes(1);
  });
});
