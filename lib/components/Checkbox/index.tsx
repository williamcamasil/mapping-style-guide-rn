import React, { useCallback } from 'react';
import {
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { Images } from '../../assets';
import { useViewStyles } from '../../hooks/useStyles';
import { withTheme } from '../../theme';
import { AppThemeType } from '../../theme/default';
import { getFieldErrorState, wrapField } from '../Form';
import Spacer from '../Spacer';
import Text, { TextPropTypes } from '../Text';
import {
  CheckboxVariantType,
  getBoxStyle,
  getTextColor,
} from './utils';

export type CheckBoxPropsType = {
  theme: AppThemeType;
  children: TextPropTypes['children'];
  testID?: string;
  onChecked?: (checked: boolean) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  style?: StyleProp<ViewStyle>;
  error?: boolean;
  disabled?: boolean;
  checked?: boolean;
  variant?: CheckboxVariantType;
};

const Checkbox = ({
  testID,
  children,
  style,
  onChecked,
  onFocus,
  onBlur,
  error,
  disabled,
  checked,
  variant,
  theme,
}: CheckBoxPropsType): React.ReactElement => {

  const textColor = getTextColor(error, variant, disabled);

  const buttonStyles = useViewStyles(() => [
    {
      alignItems: 'center',
      flexDirection: 'row',
      flexShrink: 1,
    },
  ], []);

  const containerStyles = useViewStyles(() => [
    {
      flexDirection: 'row',
    },
    style,
  ], [style]);

  const boxStyles = getBoxStyle(theme, error, disabled, checked, variant);

  const handlePress = useCallback(() => {
    onFocus?.();
    onChecked?.(!checked);
    onBlur?.();
  }, [checked, onBlur, onChecked, onFocus]);

  return (
    <View style={containerStyles}>
      <TouchableOpacity
        testID={testID}
        onPress={handlePress}
        disabled={disabled}
        activeOpacity={theme.opacities.intense}
        style={buttonStyles}
      >
        <Images.CheckboxImg {...boxStyles} />
        <Spacer size={theme.spacings.sXXS} />
        <Text
          color={textColor}
          variant="body"
        >
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

Checkbox.defaultProps = {
  variant: 'default' as CheckboxVariantType,
};

Checkbox.Field = withTheme(wrapField<CheckBoxPropsType, boolean | undefined>((props, fieldProps) => {
  const {
    invalid, touched, value, onChange, onBlur,
    onFocus,
  } = fieldProps;

  const { showError } = getFieldErrorState(
    invalid,
    touched,
  );

  return (
    <Checkbox
      {...props}
      checked={value || false}
      onChecked={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      error={showError}
    />
  );
}));

export default withTheme(Checkbox);
