import React, { PropsWithChildren, FunctionComponent } from 'react';
import {
  Platform, KeyboardAvoidingView, StyleSheet, View, StyleProp, ViewStyle,
} from 'react-native';

import { useViewStyles } from '../../hooks';

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
});

type KeyboardAvoidingWrapPropsType = PropsWithChildren & {
  testID?: string;
  style?: StyleProp<ViewStyle>;
};

const KeyboardAvoidingWrap: FunctionComponent<KeyboardAvoidingWrapPropsType> = ({
  testID, style, ...others
}) => {
  const keyboardViewStyle = useViewStyles(() => [
    styles.keyboardView,
    style,
  ], [style]);
  if (Platform.OS === 'ios') {
    return (
      <KeyboardAvoidingView
        testID={testID}
        behavior="padding"
        style={keyboardViewStyle}
        {...others}
      />
    );
  }
  return (
    <View style={keyboardViewStyle} {...others} />
  );
};

export default KeyboardAvoidingWrap;
