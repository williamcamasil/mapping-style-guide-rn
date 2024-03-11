import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';

import { useViewStyles } from '../../hooks';
import { withTheme } from '../../theme';
import { AppThemeType } from '../../theme/default';
import { ColorPaletesType } from '../../tokens';
import { getCircleBorderColor, getCircleBackgroundColor } from './utils';

export type LoadingPropsType = {
  theme: AppThemeType;
  circleSize?: number;
  color: ColorPaletesType;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outCircle: {
    borderStyle: 'solid',
    overflow: 'hidden',
    marginHorizontal: 4,
  },
  circle: {
    width: '100%',
    height: '100%',
  },
});

const Loading: React.FC<LoadingPropsType> = ({ circleSize, color, theme }) => {
  const circleAnimation = useRef(new Animated.Value(0));

  const styleOutCircle = useViewStyles(
    () => [
      styles.outCircle,
      {
        borderColor: getCircleBorderColor(theme, color),
        width: circleSize,
        height: circleSize,
        borderRadius: circleSize && circleSize / 2,
        borderWidth: theme.borders.width.hairlene,
      },
    ],
    [circleSize, color, theme],
  );

  const styleCircle = useViewStyles(
    () => [
      styles.circle,
      {
        backgroundColor: getCircleBackgroundColor(theme, color),
        borderRadius: circleSize && circleSize / 2,
      },
    ],
    [theme, color, circleSize],
  );

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(circleAnimation.current, {
        toValue: 50,
        duration: 1000,
        useNativeDriver: true,
      }),
    );
    animation.start();
    return () => {
      animation.stop();
    };
  }, []);

  const circleStyle1 = useViewStyles(() => [
    styleCircle,
    {
      opacity: circleAnimation.current.interpolate({
        inputRange: [0, 25, 50],
        outputRange: [1, 0.5, 0],
      }),
    }], [styleCircle]);

  const circleStyle2 = useViewStyles(() => [
    styleCircle,
    {
      opacity: circleAnimation.current.interpolate({
        inputRange: [0, 25, 50],
        outputRange: [0, 1, 0.5],
      }),
    }], [styleCircle]);

  const circleStyle3 = useViewStyles(() => [
    styleCircle,
    {
      opacity: circleAnimation.current.interpolate({
        inputRange: [0, 25, 50],
        outputRange: [0.5, 0, 1],
      }),
    }], [styleCircle]);

  return (
    <View style={styles.container}>
      <View style={styleOutCircle}>
        <Animated.View style={circleStyle1} />
      </View>
      <View style={styleOutCircle}>
        <Animated.View style={circleStyle2} />
      </View>
      <View style={styleOutCircle}>
        <Animated.View style={circleStyle3} />
      </View>
    </View>
  );
};

Loading.defaultProps = {
  circleSize: 8,
};

export default withTheme(Loading);
