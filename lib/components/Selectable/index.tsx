import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import { $DeepPartial, $Without } from '@callstack/react-theme-provider';

import { useViewStyles } from '../../hooks';
import { withTheme, AppThemeType } from '../../theme';
import SelectableItem from './SelectableItem';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export type SelectableItemType<Item> = {
  key: string | number;
  label: string;
  item: Item;
};

export type SelectablePropsType<Item> = {
  onChange: (items: SelectableItemType<Item>[]) => void;
  value: SelectableItemType<Item>[];
  options: SelectableItemType<Item>[];
  theme: AppThemeType;
};

function Selectable<Item>({
  onChange,
  value,
  options,
  theme,
}: SelectablePropsType<Item>) {
  const selectableItemStyles = useViewStyles(() => [
    {
      marginRight: theme.spacings.sXXS,
      marginBottom: theme.spacings.sXXS,
    },
  ], [theme.spacings.sXXS]);

  const getItemIndex = useCallback(
    (array: SelectableItemType<Item>[], itemToFind: SelectableItemType<Item>) => array
      .findIndex(item => item.key === itemToFind.key),
    [],
  );

  const isItemSelected = useCallback(
    (array: SelectableItemType<Item>[], itemToFind: SelectableItemType<Item>) => getItemIndex(array, itemToFind) >= 0,
    [getItemIndex],
  );

  const removeItem = useCallback((array: SelectableItemType<Item>[], itemToRemove: SelectableItemType<Item>) => {
    const newArray = [...array];
    const start = getItemIndex(newArray, itemToRemove);
    const removeCount = 1;
    newArray.splice(start, removeCount);
    return newArray;
  }, [getItemIndex]);

  const onSelectItem = useCallback((item: SelectableItemType<Item>) => {
    if (isItemSelected(value, item)) {
      onChange(removeItem(value, item));
      return;
    }
    const newList = [...value];
    newList.push(item);
    onChange(newList);
  }, [isItemSelected, onChange, removeItem, value]);

  const renderItem = useCallback((item: SelectableItemType<Item>, index: number) => (
    <View
      style={selectableItemStyles}
      key={item.key}
    >
      <SelectableItem
        testID={`selectable-button-item-${index}`}
        item={item}
        onPress={onSelectItem}
        selected={isItemSelected(value, item)}
      />
    </View>
  ), [selectableItemStyles, onSelectItem, isItemSelected, value]);

  return (
    <View
      testID="selectable-button-group"
      style={styles.container}
    >
      {options.map(renderItem)}
    </View>
  );
}

type WrapperPropsType<Item> = $Without<SelectablePropsType<Item>, 'theme'> & { theme?: $DeepPartial<AppThemeType> };

/*
 * Devido ao componente trabalhar com "generics" e necessitar de funções de
 * alta ordem (wrapModal, withTheme, wrapField, etc),
 * é necessário forçar a tipagem de saída devido a uma limitação do TypeScript.
 * https://stackoverflow.com/q/58469229/2826279
 */
export default withTheme(Selectable) as (<Item = any>(
  props: WrapperPropsType<Item>
) => React.ReactElement);
