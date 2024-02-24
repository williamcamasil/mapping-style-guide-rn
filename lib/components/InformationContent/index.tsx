import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { AppThemeType, withTheme } from '../../theme';
import Button from '../Button';
import Container from '../Container';
import Link from '../Link';
import Spacer from '../Spacer';
import Text from '../Text';

export type InformationContentPropsType = {
  title: string;
  description?: string;
  primaryButtonName?: string;
  header?: React.ReactNode;
  secondaryButtonName?: string;
  onPressPrimary?: () => void;
  onPressSecondary?: () => void;
  linkActionName?: string;
  onPressLinkAction?: () => void;
  theme: AppThemeType;
  children?: React.ReactNode;
};

const styles = StyleSheet.create({
  text: { textAlign: 'center' },
  container: { flexGrow: 1 },
});

const InformationContent: React.FC<InformationContentPropsType> = ({
  header,
  title,
  description,
  primaryButtonName,
  onPressPrimary,
  secondaryButtonName,
  onPressSecondary,
  linkActionName,
  onPressLinkAction,
  theme,
  children,
}) => {

  const renderDescription = () => {
    if (!children) return description ? <Text testID="information-content-description" style={styles.text} variant="body">{description}</Text> : null;
    return children;
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      alwaysBounceVertical={false}
      contentContainerStyle={styles.container}
    >
      <Container padding={theme.spacings.sLarge}>
        <Container justifyContent="center" alignItems="center">
          {header}
          <Spacer size={theme.spacings.sLarge} />
          <Text testID="information-content-title" style={styles.text} variant="headingSmall" color="neutralGray700">{title}</Text>
          <Spacer size={theme.spacings.sXXS} />
          {renderDescription()}
          <Spacer size={theme.spacings.sLarge} />
          {linkActionName ? <Link testID="information-content-link-action" onPress={onPressLinkAction}>{linkActionName}</Link> : null}
        </Container>
        {primaryButtonName ? <Button testID="information-content-primary-button" variant="containedPrimary" size="large" onPress={onPressPrimary}>{primaryButtonName}</Button> : null}
        {secondaryButtonName ? <Button testID="information-content-secondary-button" variant="text" size="large" onPress={onPressSecondary}>{secondaryButtonName}</Button> : null}
      </Container>
    </ScrollView>
  );
};

export default withTheme(InformationContent);
