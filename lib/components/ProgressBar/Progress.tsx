import React, { useMemo } from 'react';

import { LinearGradient } from 'expo-linear-gradient';

import { useStyles } from '../../hooks';
import { withTheme } from '../../theme';
import { AppThemeType } from '../../theme/default';
import { ColorPaletesType } from '../../tokens';

type ProgressPropsType = {
  progress: number;
  theme: AppThemeType;
  startColor?: ColorPaletesType;
  endColor?: ColorPaletesType;
};

const startLinearGradient = { x: 0, y: 0 };
const endLinearGradient = { x: 1, y: 0 };

const Progress: React.FC<ProgressPropsType> = ({
  progress, theme, startColor, endColor,
}) => {
  const colorGradient = useMemo(
    () => [theme.colors[startColor ?? 'primary600'], theme.colors[endColor ?? 'primaryMain']],
    [endColor, startColor, theme],
  );

  const styleBar = useStyles(
    () => [
      {
        width: progress >= 0 && progress <= 100 ? `${progress}%` : 0,
        height: '100%',
        borderRadius: 50,
      },
    ],
    [progress],
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
