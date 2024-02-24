import React from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import { useViewStyles } from '../../hooks';
import { withTheme } from '../../theme';
import { AppThemeType } from '../../theme/default';
import DialogActions from './DialogActions';
import DialogBase, { DialogBasePropsType } from './DialogBase';
import DialogExtraText from './DialogExtraText';
import DialogHeader from './DialogHeader';
import DialogMessage from './DialogMessage';
import DialogTitle from './DialogTitle';

export type DialogPropsType = DialogBasePropsType & {
  theme: AppThemeType;
  containerStyle?: StyleProp<ViewStyle>;
  dismissible?: boolean;
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialog: {
    maxWidth: 340,
    width: '100%',
  },
});

const Dialog = ({
  theme,
  children,
  style,
  containerStyle,
  ...others
}: DialogPropsType): React.ReactElement => {

  const dialogStyles = useViewStyles(() => [
    styles.dialog,
    {
      borderRadius: theme.borders.radius.XL,
      backgroundColor: theme.colors.neutralWhite,
      margin: theme.spacings.sNano,
    },
    style,
  ], [style, theme]);

  const scrollViewContentStyles = useViewStyles(() => [
    {
      padding: theme.spacings.sLarge,
    },
  ], [theme.spacings.sLarge]);

  const containerStyles = useViewStyles(() => [
    styles.container,
    containerStyle,
  ], [containerStyle]);

  return (
    <DialogBase
      {...others}
    >
      <SafeAreaView pointerEvents="box-none" style={containerStyles}>
        <View pointerEvents="box-none" style={dialogStyles}>
          <ScrollView
            contentContainerStyle={scrollViewContentStyles}
            bounces={false}
          >
            {children}
          </ScrollView>
        </View>
      </SafeAreaView>
    </DialogBase>
  );
};

Dialog.Title = DialogTitle;
Dialog.Header = DialogHeader;
Dialog.Message = DialogMessage;
Dialog.ExtraText = DialogExtraText;
Dialog.Actions = DialogActions;

Dialog.defaultProps = {
  dismissible: true,
};

export default withTheme(Dialog);
