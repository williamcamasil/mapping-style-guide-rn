import { ColorPaletesType } from '../../tokens';

export type NavigationBarVariantType =
  'dark-content' |
  'light-content';

export const getTextColor = (
  variant?: NavigationBarVariantType,
): ColorPaletesType => {
  switch (variant) {
    case 'light-content':
      return 'neutralWhite';
    case 'dark-content':
    default:
      return 'neutralGray700';
  }
};
