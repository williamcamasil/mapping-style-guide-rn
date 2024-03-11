import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { useAsync, useDidMount } from 'mapping-context-rn';

import BottomSheet, { BottomSheetPropsType } from '../BottomSheet';
import Loading from '../Loading';
import OptionItem from './OptionItem';
import { InputSelectRequestType, InputSelectResponseType, InputSelectValueType } from './utils';

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: 'center',
    height: 100,
  },
});

export type InputSelectBottomSheetPropsType<Item, Params> = BottomSheetPropsType & {
  mapRecord: (item: Item) => InputSelectValueType<Item>;
  requestRecords: (props: InputSelectRequestType<Params>) => InputSelectResponseType<Item>;
  onChange?: (item: InputSelectValueType<Item>) => void;
  visible: boolean;
  renderItem?: (item: InputSelectValueType<Item>, index: number) => React.ReactElement;
  onDismiss?: () => void;
  title?: string;
};

function InputSelectBottomSheet<Item, Params>({
  mapRecord,
  requestRecords,
  onChange,
  visible,
  renderItem,
  onDismiss,
  title,
  ...others
}: InputSelectBottomSheetPropsType<Item, Params>): React.ReactElement {
  const [records, setRecords] = useState<Item[]>([]);

  const handleClose = useCallback(() => {
    onDismiss?.();
  }, [onDismiss]);

  const handleSelect = useCallback(
    (item: InputSelectValueType<Item>) => {
      handleClose();
      onChange?.(item);
    },
    [handleClose, onChange],
  );

  const { call: loadItems, loading } = useAsync(async () => {
    const items = await requestRecords({
      pagination: {
        page: 1,
        limit: 0,
      },
    });
    setRecords(items.result);
  }, [requestRecords]);

  const renderItems = () => {
    if (loading) {
      return (
        <View testID="loading-container" style={styles.loadingContainer}>
          <Loading color="neutralGray400" />
        </View>
      );
    }
    return records.map((item: Item, index: number) => {
      const mappedItem = mapRecord(item);

      return (
        <OptionItem
          key={mappedItem.key}
          renderItem={renderItem}
          item={mappedItem}
          index={index}
          onSelect={handleSelect}
        />
      );
    });
  };

  useDidMount(() => {
    loadItems();
  });

  return (
    <BottomSheet testID="bottom-sheet-combobox-input-select" visible={visible} onDismiss={onDismiss} {...others}>
      <BottomSheet.Title>{title}</BottomSheet.Title>
      {renderItems()}
    </BottomSheet>
  );
}

export default InputSelectBottomSheet;
