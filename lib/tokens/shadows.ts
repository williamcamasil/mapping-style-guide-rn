import { ViewStyle } from 'react-native';

export type ShadowValueType = {
  shadowColor: ViewStyle['shadowColor'];
  shadowOffset: ViewStyle['shadowOffset'];
  shadowOpacity: ViewStyle['shadowOpacity'];
  shadowRadius: ViewStyle['shadowRadius'];
  elevation: ViewStyle['elevation'];
};

export type ShadowsType = {
  level1: ShadowValueType;
  level2: ShadowValueType;
  level3: ShadowValueType;
  level4: ShadowValueType;
};

export type ShadowLevelsType = keyof ShadowsType;

export const Shadows: ShadowsType = {
  level1: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,

    elevation: 1,
  },
  level2: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  level3: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  level4: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
};
