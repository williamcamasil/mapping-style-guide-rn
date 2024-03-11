import React from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ScrollView,
} from 'react-native';

import { Edge, SafeAreaView } from 'react-native-safe-area-context';

import { useViewStyles } from '../../hooks';
import { withTheme } from '../../theme';
import { AppThemeType } from '../../theme/default';
import DialogActions from '../Dialog/DialogActions';
import DialogBase, { DialogBasePropsType } from '../Dialog/DialogBase';
import DialogExtraText from '../Dialog/DialogExtraText';
import DialogHeader from '../Dialog/DialogHeader';
import DialogMessage from '../Dialog/DialogMessage';
import DialogTitle from '../Dialog/DialogTitle';
import BottomSheetCloseButton from './BottomSheetCloseButton';

export type BottomSheetPropsType = DialogBasePropsType & {
  theme: AppThemeType;
  modalStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  dismissible?: boolean;
};

const topSafeAreaViewEdges: Edge[] = ['top'];
const contentSafeAreaViewEdges: Edge[] = ['bottom'];

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    flexShrink: 1,
    width: '100%',
  },
});

const BottomSheet = ({
  theme,
  children,
  style,
  containerStyle,
  onDismiss,
  dismissible,
  ...others
}: BottomSheetPropsType): React.ReactElement => {
  const bottomSheetStyles = useViewStyles(() => [
    styles.bottomSheet,
    {
      borderTopLeftRadius: theme.borders.radius.XL,
      borderTopRightRadius: theme.borders.radius.XL,
      backgroundColor: theme.colors.neutralWhite,
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
      onDismiss={onDismiss}
      dismissible={dismissible}
    >
      <View pointerEvents="box-none" style={containerStyles}>
        <SafeAreaView edges={topSafeAreaViewEdges}>
          {/*
          Impede que o bottom sheet entre atrás da status bar em conteúdos que geram rolagem,
          mas permite que entre atrás do botão "home" do iOS.
          */}
        </SafeAreaView>
        <View pointerEvents="box-none" style={bottomSheetStyles}>
          <SafeAreaView edges={contentSafeAreaViewEdges}>
            <View>
              <ScrollView
                contentContainerStyle={scrollViewContentStyles}
                bounces={false}
              >
                {children}
              </ScrollView>
              <BottomSheetCloseButton onPress={onDismiss} visible={dismissible} />
            </View>
          </SafeAreaView>
        </View>
      </View>
    </DialogBase>
  );
};

BottomSheet.Title = DialogTitle;
BottomSheet.Header = DialogHeader;
BottomSheet.Message = DialogMessage;
BottomSheet.ExtraText = DialogExtraText;
BottomSheet.Actions = DialogActions;

BottomSheet.defaultProps = {
  dismissible: true,
};

export default withTheme(BottomSheet);
