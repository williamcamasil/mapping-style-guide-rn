export type SpacingValueType = number;

export type SpacingsType = {
  sZero: SpacingValueType;
  sQuark: SpacingValueType;
  sNano: SpacingValueType;
  sXXS: SpacingValueType;
  sXS: SpacingValueType;
  sSmall: SpacingValueType;
  sMedium: SpacingValueType;
  sLarge: SpacingValueType;
  sXL: SpacingValueType;
  sXXL: SpacingValueType;
  lXS: SpacingValueType;
  lSmall: SpacingValueType;
  lMedium: SpacingValueType;
  lLarge: SpacingValueType;
  lXL: SpacingValueType;
  lHuge: SpacingValueType;
  lGiant: SpacingValueType;
};

export type SpacingSizesType = keyof SpacingsType;

export const Spacings: SpacingsType = {
  sZero: 0,
  sQuark: 4,
  sNano: 8,
  sXXS: 12,
  sXS: 16,
  sSmall: 20,
  sMedium: 24,
  sLarge: 28,
  sXL: 32,
  sXXL: 40,
  lXS: 48,
  lSmall: 56,
  lMedium: 64,
  lLarge: 80,
  lXL: 120,
  lHuge: 160,
  lGiant: 200,
};
