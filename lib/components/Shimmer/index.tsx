import React from 'react';
import {
  View,
} from 'react-native';

import { AppThemeType, withTheme } from '../../theme';
import ShimmerItem from './ShimmerItem';
import { isListShimmer, ShimmerItemOptionsType, ShimmerListOptionsType } from './utils';

export type {
  ShimmerItemOptionsType, ShimmerListOptionsType,
} from './utils';

type ShimmerPropsType = ShimmerListOptionsType & {
  theme: AppThemeType;
  visible?: boolean;
  testId?: string;
};

const Shimmer: React.FC<ShimmerPropsType> = ({
  theme, contentList, visible, testId, ...others
}) => {
  if (!visible) return null;

  const renderShimmerItem = (item: ShimmerListOptionsType | ShimmerItemOptionsType, index: number) => {
    if (isListShimmer(item)) {
      return (
        <Shimmer
          {...item}
          theme={theme}
          key={index}
          visible
        />
      );
    }

    return (
      <ShimmerItem item={item} key={index} theme={theme} />
    );
  };

  return (
    <View testID={testId} style={others}>
      {contentList.map(renderShimmerItem)}
    </View>
  );
};

export default withTheme(Shimmer);
