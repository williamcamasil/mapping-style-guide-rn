import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useViewStyles } from '../../hooks';
import { AppThemeType, withTheme } from '../../theme';
import { ColorPaletesType } from '../../tokens';
import Progress from './Progress';
import { getProgressStyles, MultipleProgressPropsType } from './utils';

type MultipleProgressBarPropsType = {
  theme: AppThemeType;
  backgroundColor?: ColorPaletesType;
  progress: MultipleProgressPropsType[];
};

const styled = StyleSheet.create({
  container: {
    flexDirection: 'row',
    overflow: 'hidden',
    height: 12,
    padding: 2,
  },
});

const MultipleProgressBar: React.FC<MultipleProgressBarPropsType> = ({
  theme,
  backgroundColor,
  progress,
}) => {
  const styledContainer = useViewStyles(
    () => [
      styled.container,
      {
        borderColor: backgroundColor ?? theme.colors.neutralGray100,
        backgroundColor: backgroundColor ?? theme.colors.neutralGray100,
      },
    ],
    [backgroundColor, theme],
  );

  const renderProgress = () => progress.map((item, index) => {
    const styleToProgress = getProgressStyles(theme, index, progress.length);

    return (
      <Progress
        progress={item.value}
        startColor={item.colorGradient[0]}
        endColor={item.colorGradient[1]}
        style={styleToProgress}
        // eslint-disable-next-line react/no-array-index-key
        key={index}
      />
    );
  });

  return (
    <View testID="container-multiple-progress" style={styledContainer}>
      {renderProgress()}
    </View>
  );
};

export default withTheme(MultipleProgressBar);
