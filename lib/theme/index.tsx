import React, { ReactNode } from 'react';

import { ThemingType, createTheming } from '@callstack/react-theme-provider';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import DefaultTheme, { AppThemeType } from './default';

export { default as DefaultTheme } from './default';
export type { AppThemeType } from './default';

type ThemeProviderPropsType = {
  theme?: AppThemeType;
  children?: ReactNode;
};

type CustomThemingType<Theme> = ThemingType<Theme> & {
  // Corrige tipagem do ThemeProvider adicionando children
  // https://github.com/callstack/react-theme-provider/issues/144
  ThemeProvider: React.ComponentType<ThemeProviderPropsType>;
};

const {
  ThemeProvider: ReactThemeProvider,
  withTheme,
  useTheme,
} = createTheming<AppThemeType>(DefaultTheme) as CustomThemingType<AppThemeType>;

export {
  withTheme,
  useTheme,
};

export const ThemeProvider: React.ComponentType<ThemeProviderPropsType> = ({ theme, children }) => (
  <ReactThemeProvider theme={theme}>
    <SafeAreaProvider>
      {children}
    </SafeAreaProvider>
  </ReactThemeProvider>
);

