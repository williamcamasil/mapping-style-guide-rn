import React, { useCallback, useMemo, useState } from 'react';
import {
  LayoutChangeEvent, StyleSheet, View,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

import { useViewStyles } from '../../hooks';
import { withTheme } from '../../theme';
import { AppThemeType } from '../../theme/default';
import { CardSizeType, getCardSizeStyle } from './utils';

type CardShimmerPropsType = {
  size?: CardSizeType;
  theme: AppThemeType;
};

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const styles = StyleSheet.create({
  shimmer: {
    flexDirection: 'row',
    // remove o height padrão da lib shimmer
    height: undefined,
  },
});

const CardShimmer: React.FC<CardShimmerPropsType> = ({
  size, theme,
}) => {
  const [shimmerWidth, setShimmerWidth] = useState(0);

  const shimeColors = useMemo(
    () => [
      theme.colors.neutralGray300,
      theme.colors.neutralGray200,
      theme.colors.neutralGray300],
    [theme],
  );

  const shimmerStyle = useViewStyles(() => [
    styles.shimmer,
    { borderRadius: theme.borders.radius.medium },
    getCardSizeStyle(theme, size),
    { padding: theme.spacings.sZero },
  ], [size, theme]);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setShimmerWidth(width);
  }, []);

  return (
    <View testID="shimmer-id" onLayout={onLayout}>
      <ShimmerPlaceHolder
        width={shimmerWidth}
        shimmerStyle={shimmerStyle}
        shimmerColors={shimeColors}
      />
    </View>
  );
};

export default withTheme(CardShimmer);

