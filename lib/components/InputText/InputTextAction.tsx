import React, { ComponentType } from 'react';
import {
  ColorValue, StyleSheet, TouchableOpacity,
} from 'react-native';

import { SvgProps } from 'react-native-svg';

import { withTheme } from '../../theme';
import { AppThemeType } from '../../theme/default';
import { INPUT_TEXT_HEIGHT } from './utils';

export type InputTextActionPropType<IconProps extends SvgProps = SvgProps> = {
  theme: AppThemeType;
  onPress: () => void;
  Icon: ComponentType<IconProps>;
  color?: ColorValue;
  size: number;
  testID?: string;
  disabled?: boolean;
};

const styled = StyleSheet.create({
  icon: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    top: 0,
    height: INPUT_TEXT_HEIGHT,
    width: INPUT_TEXT_HEIGHT,
  },
});

const InputTextAction: React.FC<InputTextActionPropType> = ({
  theme,
  onPress: handlePress,
  Icon,
  size,
  color,
  testID,
  disabled,
}) => (
  <TouchableOpacity
    testID={testID}
    style={styled.icon}
    onPress={handlePress}
    activeOpacity={theme.opacities.intense}
    disabled={disabled}
  >
    <Icon width={size} height={size} color={color || theme.colors.neutralGray400} />
  </TouchableOpacity>
);

InputTextAction.defaultProps = {
  size: 24,
  testID: 'input-text-action',
};

export default withTheme(InputTextAction);
