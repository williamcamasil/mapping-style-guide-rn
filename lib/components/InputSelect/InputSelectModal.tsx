import React, {
  useCallback, useRef, useState,
} from 'react';
import {
  ListRenderItemInfo,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { PaginationRequestArgsType, useDidMount, usePagination } from 'mapping-context-rn';

import { Icons } from '../../assets';
import { useDimensions, useViewStyles } from '../../hooks';
import { useTextStyles } from '../../hooks/useStyles/index';
import { useTheme } from '../../theme';
import Container from '../Container';
import DefaultList from '../DefaultList';
import Divider from '../Divider';
import { getTextStyle } from '../InputText/utils';
import Modal, { ModalPropsType } from '../Modal';
import NavigationBar from '../NavigationBar';
import Spacer from '../Spacer';
import Text from '../Text';
import OptionItem from './OptionItem';
import { InputSelectRequestType, InputSelectResponseType, InputSelectValueType } from './utils';

const LIMIT = 20;
const INPUT_HEIGHT = 64;

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: INPUT_HEIGHT,
  },
  textInput: {
    height: INPUT_HEIGHT,
    paddingTop: Platform.select({
      ios: 8,
    }),
  },
});

export type InputSelectModalPropsType<Item, Params> = ModalPropsType & {
  onChange?: (value: InputSelectValueType<Item> | null) => void;
  mapRecord: (data: Item) => InputSelectValueType<Item>;
  requestRecords: (props: InputSelectRequestType<Params>) => InputSelectResponseType<Item>;
  searchLabel?: string;
  renderItem?: (item: InputSelectValueType<Item>, index: number) => React.ReactElement;
  value?: InputSelectValueType<Item> | null;
  parameters?: Params;
  showSearch?: boolean;
  allowRefresh?: boolean;
  navigationBarTitle?: string;
};

type Timer = ReturnType<typeof setTimeout>;

type PaginationParamsType<Params = any> = Params & { search?: string };

function InputSelectModal<Item, Params>({
  mapRecord,
  onChange,
  visible,
  renderItem,
  requestRecords,
  searchLabel,
  parameters,
  onDismiss,
  showSearch,
  navigationBarTitle,
  allowRefresh,
  ...others
}: InputSelectModalPropsType<Item, Params>): React.ReactElement {
  const throttleTimeout = useRef<Timer>();
  const theme = useTheme();
  const [searchText, setSearchText] = useState('');
  const hasValue = Boolean(searchText);

  const { statusBar } = useDimensions();

  const safeAreaStyles = useViewStyles(() => [
    {
      paddingTop: Platform.OS === 'android' ? statusBar.height : undefined,
    },
  ], [statusBar.height]);

  const textInputStyles = useTextStyles(() => [
    getTextStyle(theme, true, hasValue, false),
    styles.textInput,
  ], [hasValue, theme]);

  const styleModal = useViewStyles(
    () => [styles.fill, { backgroundColor: theme.colors.neutralWhite }],
    [theme.colors.neutralWhite],
  );

  const containerStyles = useViewStyles(
    () => [{ paddingHorizontal: theme.spacings.sLarge }],
    [theme.spacings.sLarge],
  );

  const handleSearch = useCallback(
    async ({
      page,
      dataSource,
      parameters: requestParameters,
    }: PaginationRequestArgsType<Item, PaginationParamsType>) => {
      try {
        const { search, ...othersParams } = requestParameters;
        const { canLoadMore, result } = await requestRecords({
          search,
          pagination: { page, limit: LIMIT },
          parameters: othersParams,
        });

        return {
          dataSource: dataSource.concat(result),
          ok: true,
          canLoadMore,
        };
      } catch (err) {
        /* istanbul ignore if  */
        if (process.env.NODE_ENV !== 'test') {
          console.warn(err);
        }
        return {
          ok: false,
        };
      }
    },
    [requestRecords],
  );

  const {
    dataSource, doRefresh, loadingMore, refreshing, doLoadMore, clearDataSource,
  } = usePagination<Item, PaginationParamsType>({
    requestDataSource: handleSearch,
  });

  const handleClose = useCallback(() => {
    setSearchText('');
    clearDataSource();
    onDismiss?.();
  }, [clearDataSource, onDismiss]);

  const handleRefresh = useCallback(() => {
    doRefresh({
      ...parameters,
      search: searchText,
    });
  }, [doRefresh, parameters, searchText]);

  useDidMount(() => {
    handleRefresh();
  });

  const handleSelect = useCallback(
    (item: InputSelectValueType<Item>) => {
      handleClose();
      onChange?.(item);
    },
    [handleClose, onChange],
  );

  const handleSearchThrottle = useCallback(
    (search: string) => {
      clearTimeout(throttleTimeout.current);
      throttleTimeout.current = setTimeout(() => {
        doRefresh({
          ...parameters,
          search,
        });
      }, 500);
    },
    [doRefresh, parameters],
  );

  const handleSearchTextChange = useCallback(
    (search: string) => {
      setSearchText(search);
      handleSearchThrottle(search);
    },
    [handleSearchThrottle],
  );

  const renderOptionItem = useCallback(
    ({ item, index }: ListRenderItemInfo<Item>) => {
      const mappedItem = mapRecord(item);

      return (
        <OptionItem
          renderItem={renderItem}
          item={mappedItem}
          index={index}
          onSelect={handleSelect}
        />
      );
    },
    [handleSelect, mapRecord, renderItem],
  );

  const keyExtractor = useCallback((record: Item) => mapRecord(record).key, [mapRecord]);

  const emptyResult = useCallback(() => {
    const emptyListMessage = showSearch && searchText ? `Nenhum resultado encontrado para "${searchText}".` : 'Nenhum resultado encontrado.';
    return (
      <Container testID="empty-result" alignItems="center" justifyContent="center">
        <Text>{emptyListMessage}</Text>
      </Container>
    );
  }, [searchText, showSearch]);

  const renderHeader = () => {
    if (showSearch) {
      return (
        <SafeAreaView style={safeAreaStyles}>
          <View style={containerStyles}>
            <View style={styles.inputWrapper}>
              <Icons.Heavy.Search
                width={24}
                height={24}
                color={theme.colors.neutralGray600}
              />
              <Spacer size={theme.spacings.sXS} />
              <View style={styles.fill}>
                <TextInput
                  placeholder={searchLabel}
                  placeholderTextColor={theme.colors.neutralGray500}
                  value={searchText}
                  autoFocus
                  onChangeText={handleSearchTextChange}
                  style={textInputStyles}
                  testID="input-search"
                />
              </View>
              <Spacer size={theme.spacings.sXS} />
              <TouchableOpacity onPress={onDismiss}>
                <Text variant="caption">
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Divider color="neutralGray200" />
        </SafeAreaView>
      );
    }
    return (
      <View>
        <NavigationBar onBackPress={onDismiss} title={navigationBarTitle} closeIcon />
        <Spacer size={theme.spacings.sXL} />
      </View>
    );
  };

  return (
    <Modal testID="modal-combobox-input-select" visible={visible} style={styleModal} onDismiss={onDismiss} {...others}>
      {renderHeader()}
      <DefaultList<Item>
        data={dataSource}
        refreshing={refreshing}
        renderItem={renderOptionItem}
        keyExtractor={keyExtractor}
        loadingMore={loadingMore}
        onEndReached={doLoadMore}
        onRefresh={allowRefresh ? handleRefresh : undefined}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={emptyResult}
        style={containerStyles}
      />
    </Modal>
  );
}

InputSelectModal.defaultProps = {
  allowRefresh: true,
  showSearch: true,
};

export default InputSelectModal;
