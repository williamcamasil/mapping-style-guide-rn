import React, { useCallback } from 'react';
import { ScrollView, View } from 'react-native';

import { $DeepPartial, $Without } from '@callstack/react-theme-provider';
import { SvgProps } from 'react-native-svg';

import { useViewStyles } from '../../hooks';
import { withTheme, AppThemeType } from '../../theme';
import ChipItem from './ChipItem';

export type ChipItemType<Item> = {
  key: string | number;
  label: string;
  item: Item;
  Icon?: React.ComponentType<SvgProps>;
};

export type ChipPropsType<Item> = MultipleChipPropsType<Item>
| SingleChipPropsType<Item>
| OptionalSingleChipPropsType<Item>;

type CommonChipPropsType<Item> = {
  options: ChipItemType<Item>[];
  theme: AppThemeType;
  inline?: boolean;
};

type MultipleChipPropsType<Item> = CommonChipPropsType<Item> & {
  onChange: (items: ChipItemType<Item>[]) => void;
  value: ChipItemType<Item>[];
  optional?: false;
  multiple?: true;
};

type SingleChipPropsType<Item> = CommonChipPropsType<Item> & {
  onChange: (item: ChipItemType<Item>) => void;
  value: ChipItemType<Item>;
  optional?: false;
  multiple?: false;
};

type OptionalSingleChipPropsType<Item> = CommonChipPropsType<Item> & {
  onChange: (item: ChipItemType<Item> | null) => void;
  value: ChipItemType<Item> | null;
  optional?: true;
  multiple?: false;
};

function Chip<Item>({
  onChange,
  value,
  options,
  inline,
  optional,
  multiple,
  theme,
}: ChipPropsType<Item>) {
  const selectableItemStyles = useViewStyles(() => [
    {
      marginRight: theme.spacings.sNano,
      marginBottom: theme.spacings.sNano,
    },
  ], [theme.spacings.sNano]);

  const wrapperStyles = useViewStyles(() => [
    {
      flexDirection: 'row',
      flexWrap: inline ? 'nowrap' : 'wrap',
    },
  ], [inline]);

  const getItemIndex = useCallback(
    (array: ChipItemType<Item>[], itemToFind: ChipItemType<Item>) => array
      .findIndex(item => item.key === itemToFind.key),
    [],
  );

  const isItemSelectedInMultiple = useCallback(
    (array: ChipItemType<Item>[], itemToFind: ChipItemType<Item>) => getItemIndex(array, itemToFind) >= 0,
    [getItemIndex],
  );

  const isItemSelected = useCallback(
    (selected: ChipItemType<Item>[] | ChipItemType<Item> | null, itemToFind: ChipItemType<Item>) => {
      if (!selected || !itemToFind) return false;
      if (multiple) {
        return getItemIndex(selected as ChipItemType<Item>[], itemToFind) >= 0;
      }
      const currentSelected = selected as ChipItemType<Item>;
      return currentSelected.key === itemToFind.key;
    },
    [getItemIndex, multiple],
  );

  const removeItem = useCallback((array: ChipItemType<Item>[], itemToRemove: ChipItemType<Item>) => {
    const newArray = [...array];
    const start = getItemIndex(newArray, itemToRemove);
    const removeCount = 1;
    newArray.splice(start, removeCount);
    return newArray;
  }, [getItemIndex]);

  const onSelectMultipleItem = useCallback((item: ChipItemType<Item>) => {
    const currentValue = value as ChipItemType<Item>[];
    const handleChange = onChange as (items: ChipItemType<Item>[]) => void;
    if (isItemSelectedInMultiple(currentValue, item)) {
      handleChange(removeItem(currentValue, item));
      return;
    }
    const newList = [...currentValue];
    newList.push(item);
    handleChange(newList);
  }, [isItemSelectedInMultiple, onChange, removeItem, value]);

  const onSelectSingleItem = useCallback((item: ChipItemType<Item>) => {
    const currentValue = value as ChipItemType<Item>;
    const handleChange = onChange as (items: ChipItemType<Item> | null) => void;
    if (isItemSelected(currentValue, item) && optional) {
      handleChange(null);
      return;
    }
    handleChange(item);
  }, [isItemSelected, onChange, optional, value]);

  const onSelectItem = useCallback((item: ChipItemType<Item>) => {
    if (multiple) {
      onSelectMultipleItem(item);
      return;
    }
    onSelectSingleItem(item);
  }, [multiple, onSelectMultipleItem, onSelectSingleItem]);

  const renderItem = useCallback((item: ChipItemType<Item>, index: number) => (
    <View
      style={selectableItemStyles}
      key={item.key}
    >
      <ChipItem
        testID={`chip-button-item-${index}`}
        item={item}
        onPress={onSelectItem}
        selected={isItemSelected(value, item)}
      />
    </View>
  ), [selectableItemStyles, onSelectItem, isItemSelected, value]);

  const WrapperView = inline ? ScrollView : View;

  return (
    <WrapperView
      testID="chip-button-group"
      horizontal
      style={wrapperStyles}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={wrapperStyles}
    >
      {options.map(renderItem)}
    </WrapperView>
  );
}

type WrapperPropsType<Item> = $Without<ChipPropsType<Item>, 'theme'> & { theme?: $DeepPartial<AppThemeType> };

/*
 * Devido ao componente trabalhar com "generics" e necessitar de funções de
 * alta ordem (wrapModal, withTheme, wrapField, etc),
 * é necessário forçar a tipagem de saída devido a uma limitação do TypeScript.
 * https://stackoverflow.com/q/58469229/2826279
 */
export default withTheme(Chip) as (<Item = any>(
  props: WrapperPropsType<Item>
) => React.ReactElement);
