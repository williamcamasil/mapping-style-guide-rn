import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

import { useViewStyles } from '../../hooks';
import { AppThemeType } from '../../theme';
import { ShimmerItemOptionsType } from './utils';

type ShimmerItemPropsType = {
  item: ShimmerItemOptionsType;
  theme: AppThemeType;
};

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const styles = StyleSheet.create({
  shimmer: {
    flexDirection: 'row',
  },
});

const ShimmerItem: React.FC<ShimmerItemPropsType> = ({ item, theme }) => {

  const shimmerColors = useMemo(
    () => [
      theme.colors.neutralGray300,
      theme.colors.neutralGray200,
      theme.colors.neutralGray300],
    [theme],
  );

  const shimmerStyle = useViewStyles(() => [
    styles.shimmer,
    { borderRadius: theme.borders.radius.medium },
    item,
  ], [theme, item]);

  return (
    <ShimmerPlaceHolder
      shimmerColors={shimmerColors}
      shimmerStyle={shimmerStyle}
    />
  );
};

export default ShimmerItem;
