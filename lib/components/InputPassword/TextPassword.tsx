import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import { useTextStyles } from '../../hooks';
import { AppThemeType, withTheme } from '../../theme';
import Text from '../Text';
import { getTextPasswordColor, isCurrentEmptyTextFocused } from './utils';

type TextPasswordPropType = {
  theme: AppThemeType;
  index: number;
  value: string;
  focused: boolean;
};

const styles = StyleSheet.create({
  containerText: {
    width: 15,
  },
});

const TextPassword: React.FC<TextPasswordPropType> = ({
  theme, index, value, focused,
}) => {

  const char = value[index];
  const enteredNumbers = value.length;

  const textVisibleStyles = useTextStyles(() => [
    {
      paddingLeft: theme.spacings.sQuark,
    },
    styles.containerText,
  ], [theme]);

  const getTextPasswordIndexContent = useCallback(() => {
    if (char) return char;
    if (isCurrentEmptyTextFocused(focused, enteredNumbers, index)) return '|';
    return '0';
  }, [char, enteredNumbers, focused, index]);

  return (
    <View
      testID={`text-password-touchable-${index}`}
      pointerEvents="none"
      style={textVisibleStyles}
    >
      <Text variant="subtitle" weight="semiBold" color={getTextPasswordColor(index, enteredNumbers, focused, char)}>
        {getTextPasswordIndexContent()}
      </Text>
    </View>
  );
};

export default withTheme(TextPassword);
