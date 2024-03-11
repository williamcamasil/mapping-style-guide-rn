import React, {
  ReactNode,
  useCallback,
  useState,
  useImperativeHandle,
  useRef,
  useEffect,
  RefObject,
} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  LayoutChangeEvent,
  LayoutRectangle,
  ViewToken,
  StyleProp,
  ViewStyle,
  ListRenderItemInfo,
} from 'react-native';

import { Images } from '../../assets';
import { useViewStyles } from '../../hooks';
import { AppThemeType, DefaultTheme, withTheme } from '../../theme';
import Ratio from '../Ratio';
import Spacer from '../Spacer';

export type CarouselRefType = {
  goToNext: () => void;
  goToPrevious: () => void;
  goToIndex: (index: number) => void;
  flatListRef: RefObject<FlatList>;
};

export type CarouselPropsType = {
  data: ReactNode[];
  innerRef?: React.MutableRefObject<CarouselRefType | null>;
  onItemChange?: (index: number) => void;
  theme: AppThemeType;
  style?: StyleProp<ViewStyle>;
  pointersContainerStyle?: StyleProp<ViewStyle>;
  autoPlayIntervalMilliseconds?: number;
  autoPlay?: boolean;
  originalWidth: number;
  originalHeight: number;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerPointer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const viewabilityConfig = {
  waitForInteraction: false,
  itemVisiblePercentThreshold: 50,
};

const Carousel: React.FC<CarouselPropsType> = ({
  data, theme, onItemChange, innerRef, style,
  pointersContainerStyle,
  autoPlayIntervalMilliseconds: intervalToTimeoutMilliseconds,
  autoPlay: useTimer,
  originalWidth, originalHeight,
}) => {
  const flatListRef = useRef<FlatList>(null);

  const [itemSelected, setItemSelected] = useState(0);
  const [listLayout, setListLayout] = useState<LayoutRectangle | undefined>();

  const getIndexToScroll = useCallback((index: number): number => {
    if (index === -1) {
      return data.length - 1;
    }

    if (index === data.length) {
      return 0;
    }

    return index;
  }, [data.length]);

  const scrollToIndex = useCallback((index: number) => {

    const indexToScroll = getIndexToScroll(index);

    flatListRef.current?.scrollToIndex({
      index: indexToScroll,
      animated: true,
    });
  }, [getIndexToScroll]);

  useImperativeHandle(
    innerRef,
    () => ({
      goToNext: () => {
        scrollToIndex(itemSelected + 1);
      },
      goToPrevious: () => {
        scrollToIndex(itemSelected - 1);
      },
      goToIndex: scrollToIndex,
      flatListRef,
    }),
    [scrollToIndex, itemSelected],
  );

  useEffect(() => {
    if (!useTimer) return undefined;

    const timeoutInstance = setTimeout(() => {
      scrollToIndex(itemSelected + 1);
    }, intervalToTimeoutMilliseconds);

    return () => clearTimeout(timeoutInstance);
  }, [intervalToTimeoutMilliseconds, itemSelected, scrollToIndex, useTimer]);

  const itemContainerStyles = useViewStyles(
    () => [
      {
        width: listLayout?.width,
        height: listLayout?.height,
        overflow: 'hidden',
      },
    ],
    [listLayout],
  );

  const containerStyles = useViewStyles(() => [
    styles.container,
    style,
  ], [style]);

  const containerPointerStyles = useViewStyles(() => [
    styles.containerPointer,
    pointersContainerStyle,
  ], [pointersContainerStyle]);

  const pointerStyles = useViewStyles(() => [
    {
      marginHorizontal: theme.spacings.sNano,
    },
  ], [theme.spacings.sNano]);

  const renderItem = useCallback((item: ListRenderItemInfo<ReactNode>) => <View testID="item-container-carousel" style={itemContainerStyles}>{item.item}</View>, [itemContainerStyles]);

  const onViewableItemsChanged = useCallback(
    (info: { viewableItems: Array<ViewToken>; changed: Array<ViewToken> }) => {

      const { viewableItems } = info;
      const currentIndex = viewableItems?.[0]?.index;

      if (typeof currentIndex !== 'number') return;

      setItemSelected(currentIndex);
      onItemChange?.(currentIndex);
    },
    [onItemChange],
  );

  const handleListLayout = useCallback((event: LayoutChangeEvent) => {
    setListLayout(event.nativeEvent.layout);
  }, []);

  const getItemLayout = useCallback(
    (item: unknown, index: number): { length: number; offset: number; index: number } => {

      const length = listLayout?.width ?? 0;
      return {
        index,
        offset: length * index,
        length,
      };
    },
    [listLayout],
  );

  const getColorPointer = (index: number) => {
    if (itemSelected === index) return theme.colors.primary200;

    return theme.colors.neutralGray300;
  };

  const getFillPointer = (index: number) => {
    if (itemSelected === index) { return theme.colors.primaryMain; }

    return undefined;
  };

  const renderPointerSelected = () => (
    <View testID="container-pointers" style={containerPointerStyles}>
      {data.map((item, index) => {
        const key = `pointer-${index}`;

        return (
          <Images.Pointer
            testID="item-pointer"
            key={key}
            color={getColorPointer(index)}
            fill={getFillPointer(index)}
            style={pointerStyles}
          />
        );
      })}
    </View>
  );

  return (
    <View style={containerStyles}>
      <Ratio
        originalWidth={originalWidth}
        originalHeight={originalHeight}
      >
        <FlatList
          testID="carousel-flat-list-id"
          ref={flatListRef}
          onLayout={handleListLayout}
          data={data}
          renderItem={renderItem}
          getItemLayout={getItemLayout}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
        />
      </Ratio>
      <Spacer size={DefaultTheme.spacings.sLarge} />
      {renderPointerSelected()}
    </View>
  );
};

Carousel.defaultProps = {
  autoPlay: true,
  autoPlayIntervalMilliseconds: 4000,
  originalWidth: 375,
  originalHeight: 384,
};

export default withTheme(Carousel);
