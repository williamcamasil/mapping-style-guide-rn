import React, { useCallback, useMemo } from 'react';

import { $DeepPartial, $Without } from '@callstack/react-theme-provider';

import { useTextStyles } from '../../hooks/useStyles/index';
import { AppThemeType, withTheme } from '../../theme';
import Button from '../Button';
import { getTextColor } from '../Button/utils';
import Text from '../Text';

type SelectableItemType<Item> = {
  key: string | number;
  label: string;
  item: Item;
};

type SelectableItemPropsType<Item> = {
  testID?: string;
  item: SelectableItemType<Item>;
  onPress: (items: SelectableItemType<Item>) => void;
  selected: boolean;
  theme: AppThemeType;
};

function SelectableItem<Item>({
  testID,
  item,
  onPress,
  selected,
  theme,
}: SelectableItemPropsType<Item>) {
  const buttonStyles = useTextStyles(() => [
    {
      paddingHorizontal: theme.spacings.sXS,
    },
  ], [theme]);

  const labelStyles = useTextStyles(() => [
    {
      fontSize: theme.typography.sizes.XXS,
    },
  ], [theme]);

  const onSelectItem = useCallback(() => {
    onPress(item);
  }, [onPress, item]);

  const buttonVariant = useMemo(() => (selected ? 'containedSecondary' : 'outlinedSecondary'), [selected]);

  const textColor = getTextColor(buttonVariant, false);

  return (
    <Button
      testID={testID}
      style={buttonStyles}
      block={false}
      onPress={onSelectItem}
      variant={buttonVariant}
      size="medium"
    >
      <Text
        variant="small"
        weight="bold"
        lineHeight="medium"
        style={labelStyles}
        color={textColor}
      >
        {item.label}
      </Text>
    </Button>
  );
}

type WrapperPropsType<Item> = $Without<SelectableItemPropsType<Item>, 'theme'> & { theme?: $DeepPartial<AppThemeType> };

/*
 * Devido ao componente trabalhar com "generics" e tbm necessitar de um funções de
 * alta ordem (wrapModal, withTheme, wrapField, etc),
 * é necessário forçar a tipagem de saída devido a uma limitação do TypeScript.
 * https://stackoverflow.com/q/58469229/2826279
 */
export default withTheme(SelectableItem) as (<Item = any>(
  props: WrapperPropsType<Item>
) => React.ReactElement);
