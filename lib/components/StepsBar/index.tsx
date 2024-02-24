import React from 'react';
import { StyleSheet, View, Text as RNText } from 'react-native';

import { useTextStyles } from '../../hooks';
import { withTheme } from '../../theme';
import { AppThemeType } from '../../theme/default';
import ProgressBar, { ProgressBarType } from '../ProgressBar';
import Text from '../Text';

type StepsBarPropsType = {
  step: number;
  totalSteps: number;
  theme: AppThemeType;
  size?: ProgressBarType['size'];
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progress: {
    flex: 1,
  },
});

const StepsBar: React.FC<StepsBarPropsType> = ({
  step, totalSteps, theme, size,
}) => {
  const current = Math.max(step, 0);
  const total = Math.max(current, totalSteps);
  const progress = total > 0 ? (current / total) * 100 : 0;

  const stepContainerStyled = useTextStyles(
    () => [
      {
        marginLeft: theme.spacings.sSmall,
      },
    ],
    [theme],
  );

  return (
    <View style={style.container}>
      <View style={style.progress}>
        <ProgressBar progress={progress} size={size} />
      </View>
      <View style={stepContainerStyled}>
        <Text variant="caption" color="neutralGray600" lineHeight="small">
          Passo
          {' '}
          <RNText testID="steps-bar-step-text" style={theme.typography.weights.bold}>
            {step}
          </RNText>
          {' '}
          de
          {' '}
          <RNText testID="steps-bar-total-text" style={theme.typography.weights.bold}>
            {totalSteps}
          </RNText>
          {' '}
        </Text>
      </View>
    </View>
  );
};

StepsBar.defaultProps = {
  size: 'medium',
};

export default withTheme(StepsBar);
