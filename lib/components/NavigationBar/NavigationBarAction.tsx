import React, { ComponentType } from 'react';
import {
  StyleSheet, TouchableOpacity, TouchableOpacityProps,
} from 'react-native';

import { SvgProps } from 'react-native-svg';

import { withTheme } from '../../theme';
import { AppThemeType } from '../../theme/default';
import { ColorPaletesType } from '../../tokens';
import Spacer from '../Spacer';
import Text from '../Text';
import { NavigationBarVariantType } from './utils';

type NavigationBarActionPropTypes<IconProps extends SvgProps = SvgProps> = TouchableOpacityProps & {
  Icon: ComponentType<IconProps>;
  color?: ColorPaletesType;
  theme: AppThemeType;
  text?: string;
  variant?: NavigationBarVariantType;
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
  },
});

const NavigationBarAction: React.FC<NavigationBarActionPropTypes> = ({
  Icon,
  theme,
  color,
  text,
  variant,
  ...others
}) => {
  const getDefaultActionColor = () => {
    if (variant === 'light-content') {
      return 'neutralWhite';
    }
    if (text) {
      return 'neutralGray600';
    }
    return 'neutralGray700';

  };

  const actionColor = color ?? getDefaultActionColor();

  const renderTextRight = () => {
    if (!text) return null;

    return (
      <>
        <Spacer size={theme.spacings.sXXS} />
        <Text
          testID="text-right"
          variant="body"
          color={actionColor}
        >
          {text}
        </Text>
      </>
    );
  };

  return (
    <TouchableOpacity activeOpacity={theme.opacities.intense} style={styles.button} {...others}>
      <Icon width={24} height={24} color={theme.colors[actionColor]} />
      {renderTextRight()}
    </TouchableOpacity>
  );
};

NavigationBarAction.defaultProps = {
  variant: 'dark-content',
};

export default withTheme(NavigationBarAction);
