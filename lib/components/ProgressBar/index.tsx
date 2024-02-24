import React from 'react';
import {
  StyleProp, StyleSheet, View, ViewStyle,
} from 'react-native';

import { useViewStyles } from '../../hooks';
import { withTheme } from '../../theme';
import { AppThemeType } from '../../theme/default';
import { ColorPaletesType } from '../../tokens';
import Progress from './Progress';
import { getSizeStyle, ProgressSizeType } from './utils';

export type ProgressBarType = {
  theme: AppThemeType;
  progress: number;
  size?: ProgressSizeType;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: ColorPaletesType;
  startColor?: ColorPaletesType;
  endColor?: ColorPaletesType;
};

const styled = StyleSheet.create({
  container: {
    justifyContent: 'center',
    overflow: 'hidden',
  },
});

const ProgressBar: React.FC<ProgressBarType> = ({
  theme, progress, size, style, backgroundColor, startColor, endColor,
}) => {
  const styledContainer = useViewStyles(
    () => [
      styled.container,
      {
        borderColor: backgroundColor ?? theme.colors.neutralGray100,
        backgroundColor: backgroundColor ?? theme.colors.neutralGray100,
      },
      getSizeStyle(size),
      style,
    ],
    [backgroundColor, theme, style, size],
  );

  return (
    <View style={styledContainer} testID="progress-bar-container">
      <Progress progress={progress} startColor={startColor} endColor={endColor} />
    </View>
  );
};

ProgressBar.defaultProps = {
  size: 'medium',
};

export default withTheme(ProgressBar);
