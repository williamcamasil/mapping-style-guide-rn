import { ImageLoadEventData, NativeSyntheticEvent } from 'react-native';

export type RatioSourceType = 'width' | 'height';

export type RatioSizeType = {
  width: number;
  height: number;
};

export type ChildrenRenderFuncType<InnerStyle> = (
  style: (InnerStyle extends (infer U)[] ? U : InnerStyle) & {
    width: number | string;
    height: number | string;
  },
  onImageLoad: (event: NativeSyntheticEvent<ImageLoadEventData>) => void | undefined,
) => JSX.Element;

const calculateByHeight = (originalSize: RatioSizeType, containerSize: RatioSizeType) => ({
  width: (containerSize.height * originalSize.width) / originalSize.height,
  height: containerSize.height,
});

const calculateByWidth = (originalSize: RatioSizeType, containerSize: RatioSizeType) => ({
  width: containerSize.width,
  height: (containerSize.width * originalSize.height) / originalSize.width,
});

export const calculateRatioBy = (
  ratioSource?: RatioSourceType,
  originalSize?: RatioSizeType,
  containerSize?: RatioSizeType,
) => {
  if (!containerSize || !originalSize?.width || !originalSize?.height) {
    return {
      height: '100%',
      width: '100%',
    };
  }

  if (ratioSource === 'height') {
    return calculateByHeight(originalSize, containerSize);
  }

  return calculateByWidth(originalSize, containerSize);
};

export function isRenderFunc<InnerStyle>(
  children: React.ReactNode | ChildrenRenderFuncType<InnerStyle>,
): children is ChildrenRenderFuncType<InnerStyle> {
  return typeof children === 'function';
}
