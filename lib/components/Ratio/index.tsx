import React, { useCallback, useState, useMemo } from 'react';
import {
  FlexStyle,
  ImageLoadEventData,
  ImageStyle,
  LayoutChangeEvent, NativeSyntheticEvent, StyleProp, StyleSheet, TextStyle, View, ViewProps, ViewStyle,
} from 'react-native';

import { useViewStyles } from '../../hooks';
import {
  calculateRatioBy, ChildrenRenderFuncType, isRenderFunc, RatioSizeType, RatioSourceType,
} from './utils';

export type { RatioSizeType } from './utils';

type RatioPropsType<InnerStyle> = Omit<ViewProps, 'children'> & {
  children: React.ReactNode | ChildrenRenderFuncType<InnerStyle>;
  originalWidth?: number;
  originalHeight?: number;
  ratioSource?: RatioSourceType;
  innerStyle?: StyleProp<InnerStyle>;
};

function Ratio<InnerStyle extends (FlexStyle | ViewStyle | TextStyle | ImageStyle) = RatioSizeType>({
  children,
  style,
  onLayout,
  originalWidth,
  originalHeight,
  ratioSource,
  innerStyle,
  ...others
}: RatioPropsType<InnerStyle>) {
  const [originalSize, setOriginalSize] = useState<RatioSizeType>({
    width: originalWidth ?? 0,
    height: originalHeight ?? 0,
  });
  const [containerSize, setContainerSize] = useState<RatioSizeType>();

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    onLayout?.(event);
    const { width, height } = event.nativeEvent.layout;
    setContainerSize({
      width, height,
    });
  }, [onLayout]);

  const onImageLoadCallback = useCallback((event: NativeSyntheticEvent<ImageLoadEventData>) => {
    const { height, width } = event.nativeEvent.source;
    setOriginalSize({
      height,
      width,
    });
  }, []);

  const ratioSize = useMemo(
    () => calculateRatioBy(ratioSource, originalSize, containerSize),
    [containerSize, originalSize, ratioSource],
  );

  const ratioStyles = useViewStyles(() => [
    ratioSize,
    style,
  ], [ratioSize, style]);

  const ratioStyle = useMemo(() => ({
    ...StyleSheet.flatten(innerStyle),
    ...ratioSize,
  }), [innerStyle, ratioSize]);

  const renderChildren = () => {
    if (isRenderFunc(children)) {
      return children(
        ratioStyle,
        onImageLoadCallback,
      );
    }

    return children;
  };

  return (
    <View onLayout={handleLayout}>
      <View {...others} style={ratioStyles}>
        {renderChildren()}
      </View>
    </View>
  );
}

Ratio.defaultProps = {
  ratioSource: 'width',
};

export default Ratio;
