import { DependencyList, useMemo } from 'react';
import {
  Animated,
  ImageStyle, StyleProp, StyleSheet, TextStyle, ViewStyle,
} from 'react-native';

type ArgType<T> = () => T | Animated.AnimatedProps<T> | Array<T | Animated.AnimatedProps<T>>;

export const useStyles = <T = any>(
  arg: ArgType<T>,
  deps: DependencyList,
  // eslint-disable-next-line react-hooks/exhaustive-deps
) => useMemo(() => StyleSheet.flatten(arg()), deps) as T;

// eslint-disable-next-line react-hooks/exhaustive-deps
export const useViewStyles = (arg: ArgType<StyleProp<ViewStyle>>, deps: DependencyList) => useStyles(arg, deps);

// eslint-disable-next-line react-hooks/exhaustive-deps
export const useTextStyles = (arg: ArgType<StyleProp<TextStyle>>, deps: DependencyList) => useStyles(arg, deps);

// eslint-disable-next-line react-hooks/exhaustive-deps
export const useImageStyles = (arg: ArgType<StyleProp<ImageStyle>>, deps: DependencyList) => useStyles(arg, deps);
