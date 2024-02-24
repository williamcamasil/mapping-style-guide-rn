import React, {
  useMemo,
  useState,
  useCallback,
  MutableRefObject,
  createRef,
} from 'react';
import {
  RefreshControl,
  FlatList,
  StyleSheet,
  View,
  FlatListProps,
  StyleProp,
  ViewStyle,
  SectionListProps,
  SectionList,
  Platform,
  DefaultSectionT,
} from 'react-native';

import { $DeepPartial, $Without } from '@callstack/react-theme-provider';
import { useDidMountAndUpdate } from 'mapping-context-rn';

import { useViewStyles } from '../../hooks';
import { withTheme } from '../../theme';
import { AppThemeType } from '../../theme/default';
import Loading from '../Loading';
import LoadingContainer from '../LoadingContainer';
import Text from '../Text';

const { OS } = Platform;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  contentContainerStyleEmpty: {
    flex: 1,
  },
  footerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  endListMessage: {
    textAlign: 'center',
  },
});

type DefaultListPropsType<Item = any, Section = DefaultSectionT> = Omit<FlatListProps<Item> & SectionListProps<Item, Section>, 'data' | 'sections' | 'type'> & {
  theme: AppThemeType;
  data?: FlatListProps<Item>['data'];
  sections?: SectionListProps<Item, Section>['sections'];
  containerStyle?: StyleProp<ViewStyle>;
  endListMessage?: string;
  loadingMore?: boolean;
  onRefresh?: () => void;
  variant?: 'flat' | 'section';
  innerRef?: MutableRefObject<DefaultListRefType<Item, Section>>;
};

export type DefaultListRefType<Item, Section> = FlatList<Item> & SectionList<Item, Section>;

function DefaultList<Item = any, Section = DefaultSectionT>({
  variant,
  onRefresh,
  refreshing,
  data,
  sections,
  containerStyle,
  contentContainerStyle,
  endListMessage,
  ListEmptyComponent,
  ListFooterComponent,
  loadingMore,
  inverted,
  theme,
  innerRef,
  ...others
}: DefaultListPropsType<Item, Section>): React.ReactElement {

  const [pullToRefresh, setPullToRefresh] = useState(false);

  const ref = useMemo(() => innerRef ?? createRef<DefaultListRefType<Item, Section>>(), [innerRef]);

  const isFlatList = variant === 'flat';
  const isSectionList = variant === 'section';

  /* istanbul ignore next */
  useDidMountAndUpdate(() => {
    if (refreshing && isFlatList) {
      if (OS === 'ios' && !inverted) {
        // força exibição do RefreshControl no iOS
        // https://github.com/facebook/react-native/issues/25898#issuecomment-554107989
        ref.current?.scrollToOffset({ offset: -60, animated: false });
      } else {
        ref.current?.scrollToOffset({ offset: 0 });
      }
    }
  }, [refreshing]);

  const dataArray = useMemo(() => (isSectionList ? sections : data), [isSectionList, sections, data]);

  const hasDataArray = Boolean(dataArray?.length);

  const handleRefresh = useCallback(() => {
    setPullToRefresh(true);
    /* istanbul ignore else  */
    if (onRefresh) {
      onRefresh();
    }
  }, [onRefresh]);

  const refreshControlColors = useMemo(() => [theme.colors.primaryMain], [theme.colors.primaryMain]);

  const contentContainerStyles = useViewStyles(
    () => [
      !hasDataArray ? styles.contentContainerStyleEmpty : null,
      contentContainerStyle,
    ],
    [contentContainerStyle, hasDataArray],
  );

  const listFooter = useMemo(() => {
    if (refreshing) return null;

    if (loadingMore) {
      return (
        <View style={styles.footerContainer}>
          <Loading color="secondaryMain" />
        </View>
      );
    }

    if (ListFooterComponent) return ListFooterComponent;

    if (hasDataArray && endListMessage) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.endListMessage} color="feedbackError300">
            {endListMessage}
          </Text>
        </View>
      );
    }

    return null;
  }, [loadingMore, ListFooterComponent, endListMessage, hasDataArray, refreshing]);

  const renderList = () => {
    const emptyContent = refreshing ? null : ListEmptyComponent;

    const refreshComponent = onRefresh ? (
      <RefreshControl
        testID="default-list-refresh-control"
        onRefresh={handleRefresh}
        refreshing={Boolean(refreshing && (hasDataArray || pullToRefresh))}
        colors={refreshControlColors}
        tintColor={theme.colors.primaryMain}
      />
    ) : undefined;

    if (isSectionList && sections) {
      return (
        <SectionList<Item, Section>
          testID="internal-list"
          scrollToOverflowEnabled
          {...others}
          sections={sections}
          refreshControl={refreshComponent}
          contentContainerStyle={contentContainerStyles}
          ListEmptyComponent={emptyContent}
          ListFooterComponent={listFooter}
          stickySectionHeadersEnabled={false}
          inverted={inverted}
          ref={ref}
        />
      );
    }

    return (
      <FlatList<Item>
        testID="internal-list"
        scrollToOverflowEnabled
        {...others}
        data={data}
        refreshControl={refreshComponent}
        contentContainerStyle={contentContainerStyles}
        ListEmptyComponent={emptyContent}
        ListFooterComponent={listFooter}
        inverted={inverted}
        ref={ref}
      />
    );
  };

  const renderLoadingContainer = () => {
    if (!hasDataArray && refreshing) {
      return (
        <LoadingContainer />
      );
    }
    return null;
  };

  const containerStyles = useViewStyles(() => [
    styles.container,
    containerStyle,
  ], [containerStyle]);

  return (
    <View style={containerStyles}>
      {renderList()}
      {renderLoadingContainer()}
    </View>
  );
}

DefaultList.defaultProps = {
  type: 'flat',
};

/*
 * Devido ao componente trabalhar com "generics" e tbm necessitar de um funções de
 * alta ordem (wrapModal, withTheme, wrapField, etc),
 * é necessário forçar a tipagem de saída devido a uma limitação do TypeScript.
 * https://stackoverflow.com/q/58469229/2826279
 */
// @ts-ignore
export default withTheme(DefaultList) as <Item = any, Section = DefaultSectionT>(
  props: $Without<DefaultListPropsType<Item, Section>, 'theme'> & { theme?: $DeepPartial<AppThemeType> },
) => React.ReactElement;
