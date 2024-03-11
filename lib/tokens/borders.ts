export type BordersType = {
  radius: {
    none: number;
    quark: number;
    small: number;
    medium: number;
    large: number;
    XL: number;
  };
  width: {
    none: number;
    hairlene: number;
    thin: number;
    thick: number;
    heavy: number;
  };
};

export type BorderRadiusesType = keyof BordersType['radius'];

export type BorderWidthsType = keyof BordersType['width'];

export const Borders: BordersType = {
  radius: {
    none: 0,
    quark: 4,
    small: 8,
    medium: 12,
    large: 20,
    XL: 24,
  },
  width: {
    none: 0,
    hairlene: 0.5,
    thin: 1,
    thick: 2,
    heavy: 4,
  },
};
