import React, { useCallback, useRef } from 'react';
import {
  Animated, StyleProp, TouchableOpacity, ViewStyle,
} from 'react-native';

import Color from 'color';
import { useDidMountAndUpdate } from 'mapping-context-rn';

import { useViewStyles } from '../../hooks';
import { AppThemeType, withTheme } from '../../theme';
import { wrapField } from '../Form';
import { getBackgroundColorEllipse, getDisabledTouchabledStyle } from './utils';

export type SwitchPropsType = {
  theme: AppThemeType;
  testID?: string;
  onChecked?: (checked: boolean) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  checked?: boolean;
};

const CHECKED_TRANSLATE = 20;
const UNCHECKED_TRANSLATE = 0;

const SPRING_CONFIG: Partial<Animated.SpringAnimationConfig> = {
  speed: 20,
  bounciness: 10,
};

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const Switch = ({
  testID,
  style,
  onChecked,
  onFocus,
  onBlur,
  disabled,
  checked,
  theme,
}: SwitchPropsType) => {
  const getNewValue = () => (checked ? CHECKED_TRANSLATE : UNCHECKED_TRANSLATE);

  const animationPosition = useRef(new Animated.Value(getNewValue()));
  const animationColor = useRef(new Animated.Value(getNewValue()));

  useDidMountAndUpdate(() => {
    const animation = Animated.parallel([
      Animated.spring(animationPosition.current, {
        ...SPRING_CONFIG,
        toValue: getNewValue(),
        useNativeDriver: true,
      }),
      Animated.spring(animationColor.current, {
        ...SPRING_CONFIG,
        toValue: getNewValue(),
        useNativeDriver: false,
      }),
    ], {
      stopTogether: true,
    });

    animation.start();

    return () => {
      animation.stop();
    };
  }, [checked]);

  const switchTouchable = useViewStyles(() => {
    const width = 48;
    return [
      {
        width,
        height: 28,
        borderRadius: width / 2,
        padding: 2,
        backgroundColor: animationColor.current.interpolate({
          inputRange: [UNCHECKED_TRANSLATE, CHECKED_TRANSLATE],
          outputRange: [
            Color(theme.colors.neutralGray300).rgb().string(),
            Color(theme.colors.primaryMain).rgb().string(),
          ],
        }),
      },
      getDisabledTouchabledStyle(theme, disabled),
      style,
    ];
  }, [disabled, style, theme]);

  const styleEllipse = useViewStyles(
    () => {
      const size = 24;
      return [
        {
          width: size,
          height: size,
          backgroundColor: getBackgroundColorEllipse(theme, disabled),
          borderRadius: size / 2,
          transform: [{
            translateX: animationPosition.current,
          }],
        },
      ];
    },
    [disabled, theme],
  );

  const handlePress = useCallback(() => {
    onFocus?.();
    onChecked?.(!checked);
    onBlur?.();
  }, [checked, onBlur, onChecked, onFocus]);

  return (
    <AnimatedTouchableOpacity
      testID={testID}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={theme.opacities.intense}
      style={switchTouchable}
    >
      <Animated.View testID="switch-ellipse-view" style={styleEllipse} />
    </AnimatedTouchableOpacity>
  );
};

Switch.Field = withTheme(wrapField<SwitchPropsType, boolean | undefined>((props, fieldProps) => {
  const {
    value, onChange, onBlur,
    onFocus,
  } = fieldProps;

  return (
    <Switch
      {...props}
      checked={value || false}
      onChecked={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
}));

export default withTheme(Switch);
