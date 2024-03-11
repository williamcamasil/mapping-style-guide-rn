import React, { useCallback } from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar, StatusBarProps, StyleSheet, View,
} from 'react-native';

import { useNavigationHolder } from 'mapping-context-rn';

import { Icons } from '../../assets';
import { useDimensions, useTextStyles, useViewStyles } from '../../hooks';
import { withTheme } from '../../theme';
import { AppThemeType } from '../../theme/default';
import Divider from '../Divider';
import Spacer from '../Spacer';
import Text from '../Text';
import NavigationBarAction from './NavigationBarAction';
import { getTextColor, NavigationBarVariantType } from './utils';

const { OS } = Platform;

export type NavigationBarPropsType = {
  children?: React.ReactNode;
  onBackPress?: () => void;
  theme: AppThemeType;
  title?: string;
  rightContent?: React.ReactNode;
  closeIcon?: boolean;
  variant?: NavigationBarVariantType;
  statusBarTranslucent?: StatusBarProps['translucent'];
  statusBarBackgroundColor?: StatusBarProps['backgroundColor'];
  addDivider?: boolean;
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
  },
});

type NavigationBarType = React.FC<NavigationBarPropsType> & {
  Action: typeof NavigationBarAction;
};

const NavigationBar: NavigationBarType = ({
  onBackPress, theme, title, rightContent,
  children, closeIcon,
  variant = 'dark-content',
  statusBarTranslucent = true,
  statusBarBackgroundColor = 'transparent',
  addDivider = false,
}) => {
  const navigation = useNavigationHolder();
  const { statusBar } = useDimensions();

  const backButtonTouchableStyles = useTextStyles(() => [
    {
      marginLeft: theme.spacings.sLarge,
    },
  ], [theme]);

  const rightContentStyles = useTextStyles(() => [
    {
      marginRight: theme.spacings.sLarge,
    },
  ], [theme]);

  const childrenContainerStyles = useViewStyles(() => [
    {
      flex: 1,
      paddingHorizontal: theme.spacings.sLarge,
    },
  ], [theme]);

  const safeAreaStyles = useViewStyles(() => [
    {
      paddingTop: OS === 'android' ? statusBar.height : undefined,
    },
  ], [statusBar.height]);

  const handlePress = useCallback(() => {
    if (onBackPress) {
      onBackPress();
      return;
    }

    navigation.goBack();
  }, [navigation, onBackPress]);

  const renderContent = () => {
    if (children) {
      return (
        <View style={childrenContainerStyles}>
          {children}
        </View>
      );
    }

    return (
      <>
        <View style={styles.titleContainer} pointerEvents="none">
          <Text
            style={styles.title}
            variant="body"
            weight="bold"
            lineHeight="large"
            color={getTextColor(variant)}
            numberOfLines={2}
            testID="navigation-bar-title"
          >
            {title}
          </Text>
        </View>

        <View style={rightContentStyles}>
          {rightContent ? (
            rightContent
          ) : null}
        </View>
      </>
    );
  };

  const renderDivider = () => {
    if (!addDivider) return null;

    return (
      <>
        <Spacer size={theme.spacings.sXS} />
        <Divider color="neutralGray100" testID="divider-component" />
      </>
    );
  };

  return (
    <SafeAreaView style={safeAreaStyles}>
      <View style={styles.container}>
        <StatusBar
          barStyle={variant}
          translucent={statusBarTranslucent}
          backgroundColor={statusBarBackgroundColor}
        />
        <NavigationBarAction
          Icon={closeIcon ? Icons.Heavy.Close : Icons.Heavy.ArrowLeft}
          onPress={handlePress}
          style={backButtonTouchableStyles}
          testID="go-back-action"
          variant={variant}
        />
        {renderContent()}
      </View>
      {renderDivider()}
    </SafeAreaView>
  );
};

NavigationBar.Action = NavigationBarAction;

export default withTheme(NavigationBar);
