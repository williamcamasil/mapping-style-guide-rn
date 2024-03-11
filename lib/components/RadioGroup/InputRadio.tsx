import React, { useCallback } from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import { $DeepPartial, $Without } from '@callstack/react-theme-provider';

import { Images } from '../../assets';
import { useViewStyles } from '../../hooks/useStyles';
import { withTheme } from '../../theme';
import { AppThemeType } from '../../theme/default';
import Spacer from '../Spacer';
import Text from '../Text';
import {
  getMarkerStyle, getContainerStyle, getTextColor, RadioGroupVariantType, getTextWeight,
} from './utils';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

type InputRadioType<Item> = {
  key: string | number;
  label: string;
  item: Item;
};

type InputRadioPropsType<Item> = {
  theme: AppThemeType;
  item: InputRadioType<Item>;
  selected: boolean;
  label: string;
  testID?: string;
  onChange?: (item: any) => void;
  style?: StyleProp<ViewStyle>;
  error?: boolean;
  disabled?: boolean;
  variant?: RadioGroupVariantType;
};

function InputRadio<Item>({
  testID,
  label,
  style,
  onChange,
  error,
  disabled,
  selected,
  theme,
  item,
  variant,
}: InputRadioPropsType<Item>) {
  const textColor = getTextColor(selected, variant, error, disabled);

  const buttonStyles = useViewStyles(() => [
    styles.button,
    getContainerStyle(theme, variant, error, disabled),
    style,
  ], [disabled, error, theme, variant, style]);

  const markerStyles = getMarkerStyle(theme, variant, error, disabled, selected);

  const handlePress = useCallback(() => {
    onChange?.(item);
  }, [onChange, item]);

  return (
    <TouchableOpacity
      testID={testID}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={theme.opacities.intense}
      style={buttonStyles}
    >
      <Images.RadioImg {...markerStyles} />
      <Spacer size={theme.spacings.sXXS} />
      <Text
        color={textColor}
        variant="body"
        weight={getTextWeight(selected, disabled, error)}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

type WrapperPropsType<Item> = $Without<InputRadioPropsType<Item>, 'theme'> & { theme?: $DeepPartial<AppThemeType> };

/*
 * Devido ao componente trabalhar com "generics" e necessitar de funções de
 * alta ordem (wrapModal, withTheme, wrapField, etc),
 * é necessário forçar a tipagem de saída devido a uma limitação do TypeScript.
 * https://stackoverflow.com/q/58469229/2826279
 */
export default withTheme(InputRadio) as (<Item = any>(
  props: WrapperPropsType<Item>
) => React.ReactElement);
