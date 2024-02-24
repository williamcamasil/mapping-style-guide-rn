import { ViewStyle } from 'react-native';

export type ProgressSizeType = 'medium' | 'small';

export const getSizeStyle = (size?: ProgressSizeType): ViewStyle => {
  switch (size) {
    case 'small':
      return {
        height: 4,
        borderWidth: 1,
        borderRadius: 2,
      };
    case 'medium':
    default:
      return {
        height: 12,
        borderWidth: 2,
        borderRadius: 6,
      };
  }
};
