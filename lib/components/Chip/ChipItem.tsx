import React, { useCallback, useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { $DeepPartial, $Without } from '@callstack/react-theme-provider';
import { SvgProps } from 'react-native-svg';

import { useTextStyles } from '../../hooks/useStyles/index';
import { AppThemeType, withTheme } from '../../theme';
import { getTextColor } from '../Button/utils';
import Text from '../Text';
import { getButtonStyles } from './utils';

type ChipItemType<Item> = {
  key: string | number;
  label: string;
  item: Item;
  Icon?: React.ComponentType<SvgProps>;
};

type ChipItemPropsType<Item> = {
  testID?: string;
  item: ChipItemType<Item>;
  onPress: (items: ChipItemType<Item>) => void;
  selected: boolean;
  theme: AppThemeType;
};

function ChipItem<Item>({
  testID,
  item,
  onPress,
  selected,
  theme,
}: ChipItemPropsType<Item>) {
  const buttonStyles = useTextStyles(() => [
    {
      paddingHorizontal: theme.spacings.sZero,
      borderWidth: theme.borders.width.thin,
      borderRadius: theme.borders.radius.medium,
    },
    getButtonStyles(selected, theme),
  ], [theme, selected]);

  const contentWrapperStyles = useTextStyles(() => [
    {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacings.sXXS,
      gap: theme.spacings.sNano,
    },
  ], [theme]);

  const onSelectItem = useCallback(() => {
    onPress(item);
  }, [onPress, item]);

  const buttonVariant = useMemo(() => (selected ? 'containedSecondary' : 'outlinedSecondary'), [selected]);

  const textColor = getTextColor(buttonVariant, false);

  const renderIcon = () => {
    if (item.Icon) {
      return (
        <item.Icon
          width={16}
          height={16}
          color={theme.colors[textColor]}
        />
      );
    }
    return null;
  };

  return (
    <TouchableOpacity
      testID={testID}
      style={buttonStyles}
      onPress={onSelectItem}
    >
      <View style={contentWrapperStyles}>
        {renderIcon()}
        <Text
          variant="small"
          weight="bold"
          lineHeight="small"
          color={textColor}
        >
          {item.label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

type WrapperPropsType<Item> = $Without<ChipItemPropsType<Item>, 'theme'> & { theme?: $DeepPartial<AppThemeType> };

/*
 * Devido ao componente trabalhar com "generics" e tbm necessitar de um funções de
 * alta ordem (wrapModal, withTheme, wrapField, etc),
 * é necessário forçar a tipagem de saída devido a uma limitação do TypeScript.
 * https://stackoverflow.com/q/58469229/2826279
 */
export default withTheme(ChipItem) as (<Item = any>(
  props: WrapperPropsType<Item>
) => React.ReactElement);
