
import React, {
  useState, useMemo, useCallback, useRef, useEffect, PropsWithChildren,
} from 'react';
import {
  StyleSheet, Animated, BackHandler, Easing,
  SafeAreaView, View, StyleProp, ViewStyle,
  Platform,
} from 'react-native';

import { useDimensions, useViewStyles } from '../../hooks';

export type ModalPropsType = PropsWithChildren & {
  testID?: string;
  visible: boolean;
  isFocused: boolean;
  modalKey?: string;
  onDismiss?: () => any;
  dismissible?: boolean;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  overlayStyle?: StyleProp<ViewStyle>;
  onDismissEnd?: () => any;
  withSafeAreaIOS?: boolean;
  skipStatusBarAndroid?: boolean;
  animationDuration?: number;
  analyticsModalName?: string;
};

const styles = StyleSheet.create({
  portal: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  safeArea: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
  modal: {
    flex: 1,
  },
});

const Modal = ({
  visible,
  onDismiss,
  dismissible = true,
  children,
  style,
  overlayStyle,
  onDismissEnd,
  withSafeAreaIOS = true,
  skipStatusBarAndroid = false,
  animationDuration = 250,
  isFocused,
  testID = undefined,
  analyticsModalName,
  modalKey,
}: ModalPropsType) => {
  const $visible = useRef(false);
  const [rendered, setRendered] = useState(visible);

  const { window, statusBar } = useDimensions();
  const windowHeight = Math.max(window.width, window.height);

  const overlayOpacity = useRef(new Animated.Value(0));

  const modalTranslateY = useMemo(
    () => new Animated.Value(windowHeight),
    [windowHeight],
  );

  const showModal = useCallback(() => {
    setRendered(true);
    Animated.parallel([
      Animated.timing(modalTranslateY, {
        toValue: 0,
        duration: animationDuration,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity.current, {
        toValue: 1,
        duration: animationDuration,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [animationDuration, modalTranslateY]);

  const hideModal = useCallback(() => {
    Animated.parallel([
      Animated.timing(modalTranslateY, {
        toValue: windowHeight,
        duration: animationDuration,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity.current, {
        toValue: 0,
        duration: animationDuration,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setRendered(false);
      onDismissEnd?.();
    });
  }, [modalTranslateY, windowHeight, animationDuration, overlayOpacity, onDismissEnd]);

  useEffect(() => {
    if ($visible.current === visible) return;

    $visible.current = visible;

    if (visible) {
      showModal();
    } else {
      hideModal();
    }
  }, [hideModal, showModal, visible]);

  useEffect(() => {
    if (visible) {
      const handleBack = () => {
        if (dismissible) {
          onDismiss?.();
        }
        return true;
      };

      const listener = BackHandler.addEventListener('hardwareBackPress', handleBack);

      return () => {
        listener.remove();
      };
    }
    return undefined;
  }, [visible, dismissible, onDismiss]);

  const overlayStyles = useViewStyles(() => [
    styles.overlay,
    overlayStyle,
    {
      opacity: overlayOpacity.current,
    },
  ], [overlayOpacity, overlayStyle]);

  const modalStyles = useViewStyles(() => [
    styles.modal,
    style,
    {
      marginTop: Platform.OS === 'android' && skipStatusBarAndroid ? statusBar.height : undefined,
      transform: [{
        translateY: modalTranslateY,
      }],
    },
  ], [modalTranslateY, skipStatusBarAndroid, statusBar.height, style]);

  if (!rendered) return null;

  const WrapperView = withSafeAreaIOS ? SafeAreaView : View;

  return (
    <View testID={testID} style={styles.portal} pointerEvents="box-none">
      <WrapperView testID="modal-safeArea" pointerEvents="box-none" style={styles.safeArea}>
        <Animated.View
          testID="modal-overlay"
          accessibilityViewIsModal
          accessibilityLiveRegion="polite"
          style={overlayStyles}
          onAccessibilityEscape={onDismiss}
        >
          <Animated.View
            testID="modal-content"
            style={modalStyles}
          >
            {children}
          </Animated.View>
        </Animated.View>
      </WrapperView>
    </View>
  );
};

export default Modal;
