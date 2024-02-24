import React from 'react';
import {
  StyleSheet, View,
} from 'react-native';

import AnimatedLottieView from 'lottie-react-native';
import { useDidMount } from 'mapping-context-rn';

import { Lotties } from '../../assets';
import { useViewStyles } from '../../hooks';
import { AppThemeType, withTheme } from '../../theme';
import Container from '../Container';
import Modal, { ModalPropsType } from '../Modal';
import Spacer from '../Spacer';
import Text from '../Text';

type ResultModalPropsType = ModalPropsType & {
  text: string;
  theme: AppThemeType;
  timeToCloseInMilliseconds?: number;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
});

const ResultModal: React.FC<ResultModalPropsType> = ({
  text, theme, timeToCloseInMilliseconds, onDismiss, ...others
}) => {
  const viewLottieStyles = useViewStyles(() => [
    {
      width: theme.spacings.lGiant,
      height: theme.spacings.lGiant,
    },
  ], [theme]);

  useDidMount(() => {
    const interval = setTimeout(() => {
      onDismiss?.();
    }, timeToCloseInMilliseconds);
    return () => clearTimeout(interval);
  });

  return (
    <Modal
      onDismiss={onDismiss}
      testID="result-modal"
      {...others}
    >
      <Container padding={theme.spacings.sLarge} style={styles.container}>
        <View style={viewLottieStyles}>
          <AnimatedLottieView
            source={Lotties.Check}
            autoPlay
          />
        </View>
        <Spacer size={theme.spacings.sXXS} />
        <Text
          variant="headingMedium"
          color="neutralGray700"
          weight="bold"
          lineHeight="medium"
          style={styles.text}
        >
          {text}
        </Text>
      </Container>
    </Modal>
  );
};

ResultModal.defaultProps = {
  timeToCloseInMilliseconds: 2000,
};

export default withTheme(ResultModal);
