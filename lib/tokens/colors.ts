export type ColorValueType = string;

export type ColorsType = {
  primaryMain: ColorValueType;
  primary700: ColorValueType;
  primary600: ColorValueType;
  primary500: ColorValueType;
  primary400: ColorValueType;
  primary300: ColorValueType;
  primary200: ColorValueType;
  primary100: ColorValueType;
  secondaryMain: ColorValueType;
  secondary700: ColorValueType;
  secondary600: ColorValueType;
  secondary500: ColorValueType;
  secondary400: ColorValueType;
  secondary300: ColorValueType;
  secondary200: ColorValueType;
  secondary100: ColorValueType;
  tertiaryMain: ColorValueType;
  tertiary700: ColorValueType;
  tertiary600: ColorValueType;
  tertiary500: ColorValueType;
  tertiary400: ColorValueType;
  tertiary300: ColorValueType;
  tertiary200: ColorValueType;
  tertiary100: ColorValueType;
  neutralBlack: ColorValueType;
  neutralWhite: ColorValueType;
  neutralGray800: ColorValueType;
  neutralGray700: ColorValueType;
  neutralGray600: ColorValueType;
  neutralGray500: ColorValueType;
  neutralGray400: ColorValueType;
  neutralGray300: ColorValueType;
  neutralGray200: ColorValueType;
  neutralGray100: ColorValueType;
  feedbackSuccess500: ColorValueType;
  feedbackSuccess400: ColorValueType;
  feedbackSuccess300: ColorValueType;
  feedbackSuccess200: ColorValueType;
  feedbackSuccess100: ColorValueType;
  feedbackError500: ColorValueType;
  feedbackError400: ColorValueType;
  feedbackError300: ColorValueType;
  feedbackError200: ColorValueType;
  feedbackError100: ColorValueType;
  feedbackAlert500: ColorValueType;
  feedbackAlert400: ColorValueType;
  feedbackAlert300: ColorValueType;
  feedbackAlert200: ColorValueType;
  feedbackAlert100: ColorValueType;
  brandPurpleMain: ColorValueType;
  brandYellowMain: ColorValueType;
  brandBlue400: ColorValueType;
  brandBlue300: ColorValueType;
  brandBlue200: ColorValueType;
  brandBlue100: ColorValueType;
  brandOrange200: ColorValueType;
  brandOrange100: ColorValueType;
};

export type ColorPaletesType = keyof ColorsType;

export const Colors: ColorsType = {
  // theme colors
  primaryMain: '#E95814',
  primary700: '#F08A5B',
  primary600: '#F29B72',
  primary500: '#F4AB89',
  primary400: '#F6BCA1',
  primary300: '#F8CDB9',
  primary200: '#FDEBE3',
  primary100: '#FEF6F3',

  secondaryMain: '#013188',
  secondary700: '#0F4199',
  secondary600: '#2453A9',
  secondary500: '#4C76C0',
  secondary400: '#6689C8',
  secondary300: '#85A0D2',
  secondary200: '#C6D3EA',
  secondary100: '#EDF1F8',

  tertiaryMain: '#071C34',
  tertiary700: '#152D4C',
  tertiary600: '#243B5C',
  tertiary500: '#374E6D',
  tertiary400: '#506581',
  tertiary300: '#6E7F98',
  tertiary200: '#BDC5D0',
  tertiary100: '#DCE0E6',

  // default colors
  neutralBlack: '#000000',
  neutralWhite: '#FFFFFF',
  neutralGray800: '#151618',
  neutralGray700: '#3E4149',
  neutralGray600: '#676D79',
  neutralGray500: '#A4A7AF',
  neutralGray400: '#C2C5C9',
  neutralGray300: '#E1E2E4',
  neutralGray200: '#F0F0F2',
  neutralGray100: '#F7F7F8',

  feedbackSuccess500: '#028E39',
  feedbackSuccess400: '#17C55C',
  feedbackSuccess300: '#7AE7A5',
  feedbackSuccess200: '#CDF6DD',
  feedbackSuccess100: '#F3FDF7',

  feedbackError500: '#D3362F',
  feedbackError400: '#E53930',
  feedbackError300: '#FF8E88',
  feedbackError200: '#FCE8E7',
  feedbackError100: '#FEF7F7',

  feedbackAlert500: '#EF8816',
  feedbackAlert400: '#FFC229',
  feedbackAlert300: '#FFDB70',
  feedbackAlert200: '#FFF1C7',
  feedbackAlert100: '#FFFBEF',

  brandPurpleMain: '#6F17E0',
  brandYellowMain: '#FFAC00',

  brandBlue400: '#002FA7',
  brandBlue300: '#0035DE',
  brandBlue200: '#1B72FF',
  brandBlue100: '#19BFFF',

  brandOrange200: '#E54A26',
  brandOrange100: '#F57821',
};

export type ColorsGradientsTypes = {
  gradientPrimary: [ColorValueType, ColorValueType];
  gradientSecondary: [ColorValueType, ColorValueType];
  gradientTertiary: [ColorValueType, ColorValueType];
  gradientWhite: [ColorValueType, ColorValueType];
  feedbackGradientSuccess: [ColorValueType, ColorValueType];
  feedbackGradientError: [ColorValueType, ColorValueType];
  feedbackGradientAlert: [ColorValueType, ColorValueType];
  brandGradientOrange: [ColorValueType, ColorValueType];
  brandGradientBlue300: [ColorValueType, ColorValueType];
  brandGradientBlue200: [ColorValueType, ColorValueType];
  brandGradientBlue100: [ColorValueType, ColorValueType];
};

export const ColorsGradients: ColorsGradientsTypes = {
  gradientPrimary: ['#E95814', '#F08A5B'],
  gradientSecondary: ['#013188', '#2453A9'],
  gradientTertiary: ['#071C34', '#243B5C'],
  gradientWhite: ['#FFFFFF', '#F0F0F2'],
  feedbackGradientSuccess: ['#17C55C', '#7AE7A5'],
  feedbackGradientError: ['#F73B32', '#FF8E88'],
  feedbackGradientAlert: ['#F2A217', '#FFDB70'],
  brandGradientOrange: ['#E54A26', '#F57821'],
  brandGradientBlue300: ['#002FA7', '#0035DE'],
  brandGradientBlue200: ['#0035DE', '#1B72FF'],
  brandGradientBlue100: ['#1B72FF', '#19BFFF'],
};
