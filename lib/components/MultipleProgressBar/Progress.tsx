import React, { useMemo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { useStyles } from '../../hooks';
import { withTheme } from '../../theme';
import { AppThemeType } from '../../theme/default';
import { ColorPaletesType } from '../../tokens';

type ProgressPropsType = {
  progress: number;
  theme: AppThemeType;
  startColor: ColorPaletesType;
  endColor: ColorPaletesType;
  style?: StyleProp<ViewStyle>;
};

const startLinearGradient = { x: 0, y: 0 };
const endLinearGradient = { x: 1, y: 0 };

const Progress: React.FC<ProgressPropsType> = ({
  progress, theme, startColor, endColor, style,
}) => {
  const colorGradient = useMemo(
    () => [theme.colors[startColor], theme.colors[endColor]],
    [endColor, startColor, theme],
  );

  const styleBar = useStyles(
    () => [
      {
        flex: progress,
        height: theme.spacings.sNano,
        borderRadius: theme.spacings.sNano / 2,
      },
      style,
    ],
    [progress, style, theme.spacings.sNano],
  );

  return (
    <LinearGradient
      testID="progress-linear-gradient"
      colors={colorGradient}
      start={startLinearGradient}
      end={endLinearGradient}
      style={styleBar}
    />
  );
};

Progress.defaultProps = {
  progress: 0,
};

export default withTheme(Progress);
