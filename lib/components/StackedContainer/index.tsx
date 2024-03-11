import React, { PropsWithChildren, FunctionComponent } from 'react';
import {
  SafeAreaView, ScrollView, StyleProp, ViewStyle,
} from 'react-native';

import { useViewStyles } from '../../hooks';
import { AppThemeType, withTheme } from '../../theme';
import Container, { ContainerPropsType } from '../Container';
import KeyboardAvoidingWrap from '../KeyboardAvoidingWrap';
import Spacer from '../Spacer';

type StackedContainerPropsType = ContainerPropsType & PropsWithChildren & {
  theme: AppThemeType;
  containerStyle?: StyleProp<ViewStyle>;
  headerContent?: React.ReactNode;
  topContent?: React.ReactNode;
  middleContent?: React.ReactNode;
  bottomContent?: React.ReactNode;
  padding?: number;
};

const StackedContainer: FunctionComponent<StackedContainerPropsType> = ({
  theme,
  headerContent: headerChildren,
  topContent: topChildren,
  middleContent: middleChildren,
  bottomContent: bottomChildren,
  padding = theme.spacings.sLarge,
  ...others
}) => {

  const scrollViewContentStyle = useViewStyles(() => [
    {
      flexGrow: 1,
      paddingHorizontal: padding,
      justifyContent: 'space-between',
    },
  ], [padding]);

  const renderChildren = (children?: React.ReactNode) => {
    if (!children) return null;
    return (
      <SafeAreaView>
        {children}
        <Spacer size={padding} />
      </SafeAreaView>
    );
  };

  return (
    <Container {...others}>
      {headerChildren}
      <KeyboardAvoidingWrap>
        <ScrollView
          contentContainerStyle={scrollViewContentStyle}
          keyboardShouldPersistTaps="handled"
        >
          {renderChildren(topChildren)}
          {renderChildren(middleChildren)}
          {renderChildren(bottomChildren)}
        </ScrollView>
      </KeyboardAvoidingWrap>
    </Container>
  );
};

export default withTheme(StackedContainer);
