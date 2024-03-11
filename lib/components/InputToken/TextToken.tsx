import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import { useTextStyles } from '../../hooks';
import { AppThemeType, withTheme } from '../../theme';
import Text from '../Text';
import {
  getInputBorderColor,
  INPUT_TOKEN_HEIGHT,
  isCurrentEmptyInputFocused,
} from './utils';

type TextTokenPropsType = {
  theme: AppThemeType;
  index: number;
  value: string;
  focused: boolean;
  maxLength: number;
  error?: boolean;
};

const styles = StyleSheet.create({
  containerText: {
    textAlign: 'center',
  },
});

const TextToken: React.FC<TextTokenPropsType> = ({
  theme, index, value, focused, error, maxLength,
}) => {

  const char = value[index];
  const enteredNumbers = value.length;

  const INPUT_TOKEN_WIDTH = maxLength > 4 ? 44 : 48;

  const textVisibleStyles = useTextStyles(() => [
    {
      borderWidth: theme.borders.width.thin,
      borderColor: getInputBorderColor(index, enteredNumbers, focused, theme, error, char),
      width: INPUT_TOKEN_WIDTH,
      height: INPUT_TOKEN_HEIGHT,
      borderRadius: theme.borders.radius.medium,
      alignItems: 'center',
      paddingTop: theme.spacings.sXS,
    },
  ], [theme, index, enteredNumbers, focused, error, char, INPUT_TOKEN_WIDTH]);

  const getInputIndexContent = useCallback(() => {
    if (char) return char;
    if (isCurrentEmptyInputFocused(focused, enteredNumbers, index)) return '|';
    return '';
  }, [char, enteredNumbers, focused, index]);

  return (
    <View
      testID={`text-token-touchable-${index}`}
      pointerEvents="none"
      style={textVisibleStyles}
    >
      <Text
        variant="subtitle"
        weight="semiBold"
        style={styles.containerText}
      >
        {getInputIndexContent()}
      </Text>
    </View>
  );
};

export default withTheme(TextToken);
