import { ViewStyle } from 'react-native';

type ShimmerBasePropsType = {
  margin?: number;
  marginVertical?: number;
  marginHorizontal?: number;
  marginStart?: number;
  marginEnd?: number;
  marginTop?: number;
  marginBottom?: number;
};

export type ShimmerListOptionsType = ShimmerBasePropsType & {
  contentList: Array<ShimmerListOptionsType | ShimmerItemOptionsType>;
  flexDirection?: ViewStyle['flexDirection'];
};

export type ShimmerItemOptionsType = ShimmerBasePropsType & {
  height: number;
  width: number;
};

export function isListShimmer(item: ShimmerListOptionsType | ShimmerItemOptionsType): item is ShimmerListOptionsType {
  return 'contentList' in item;
}
