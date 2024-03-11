import React, {
  useCallback,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  ColorValue,
  StyleProp,
  TouchableOpacity,
  LayoutChangeEvent,
  View,
  ViewStyle,
} from 'react-native';

import { useDidMountAndUpdate } from 'mapping-context-rn';

import { useTextStyles, useViewStyles } from '../../hooks/useStyles';
import { withTheme } from '../../theme';
import { AppThemeType } from '../../theme/default';
import Text from '../Text';
import CollapseArrow from './CollapseArrow';

export type CollapsePropsType = {
  theme: AppThemeType;
  title: string;
  children?: React.ReactNode;
  testID?: string;
  expanded?: boolean;
  description?: string;
  titleNumberOfLines?: number;
  style?: StyleProp<ViewStyle>;
  borderColor?: ColorValue;
  onPress?: () => void;
  onCollapseEnd?: () => void;
};

const Collapse: React.FC<CollapsePropsType> = ({
  children,
  theme,
  testID,
  expanded,
  title,
  description,
  titleNumberOfLines,
  style,
  borderColor,
  onPress,
  onCollapseEnd,
  ...others
}) => {
  const [collapseExpanded, setCollapseExpanded] = useState(Boolean(expanded));
  const animationHeight = useRef(new Animated.Value(0));
  const animationOpacity = useRef(new Animated.Value(0));
  const [headerHeight, setHeaderHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  useDidMountAndUpdate(() => {
    setCollapseExpanded(Boolean(expanded));
  }, [expanded]);

  const handleContentLayout = useCallback((event: LayoutChangeEvent) => {
    setContentHeight(event.nativeEvent.layout.height);
  }, []);

  const handleHeaderLayout = useCallback((event: LayoutChangeEvent) => {
    const height = event.nativeEvent.layout.height + theme.spacings.sMedium;
    setHeaderHeight(height);
    animationHeight.current.setValue(height);
  }, [theme.spacings.sMedium]);

  useDidMountAndUpdate(() => {
    const newHeight = collapseExpanded ? contentHeight : headerHeight;

    if (!newHeight) return undefined;

    const newOpacity = collapseExpanded ? 1 : 0;

    const animation = Animated.parallel([
      Animated.spring(animationHeight.current, {
        toValue: newHeight,
        useNativeDriver: false,
      }),
      Animated.spring(animationOpacity.current, {
        toValue: newOpacity,
        useNativeDriver: true,
      }),
    ]);

    animation.start(() => {
      onCollapseEnd?.();
    });

    return () => {
      animation.stop();
    };
  }, [collapseExpanded, contentHeight, headerHeight]);

  const handleCollapse = useCallback(() => {
    onPress?.();
    setCollapseExpanded(current => !current);
  }, [onPress]);

  const contentStyles = useViewStyles(() => [
    {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
    },
  ], []);

  const containerStyles = useViewStyles(() => [
    {
      overflow: 'hidden',
      height: contentHeight ? animationHeight.current : undefined,
      borderRadius: theme.borders.radius.medium,
      borderWidth: theme.borders.width.thin,
      borderColor: borderColor || theme.colors.neutralGray200,
    },
    style,
  ], [
    borderColor,
    contentHeight,
    style,
    theme.borders.radius.medium,
    theme.borders.width.thin,
    theme.colors.neutralGray200,
  ]);

  const headerTouchableStyles = useViewStyles(() => [
    {
      padding: theme.spacings.sMedium,
      paddingBottom: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  ], [theme.spacings.sMedium]);

  const descriptionContainerStyles = useViewStyles(() => [
    {
      paddingHorizontal: theme.spacings.sMedium,
      marginTop: theme.spacings.sNano,
      opacity: animationOpacity.current,
    },
  ], [theme.spacings.sMedium, theme.spacings.sNano]);

  const titleStyles = useTextStyles(() => [
    {
      marginRight: theme.spacings.sQuark,
    },
  ], [theme.spacings.sQuark]);

  const childrenContainerStyles = useViewStyles(() => [
    {
      opacity: animationOpacity.current,
      padding: theme.spacings.sMedium,
      paddingTop: 0,
    },
  ], [theme.spacings.sMedium]);

  const renderDescription = () => {
    if (!description) {
      return null;
    }
    return <Text testID="collapse-description" variant="body" color="neutralGray600">{description}</Text>;
  };

  return (
    <Animated.View testID={testID} style={containerStyles}>
      <View testID="collapse-content" style={contentStyles} onLayout={handleContentLayout}>
        <TouchableOpacity
          {...others}
          testID="collapse-touchable"
          activeOpacity={theme.opacities.intense}
          onLayout={handleHeaderLayout}
          onPress={handleCollapse}
          style={headerTouchableStyles}
        >
          <Text
            testID="collapse-title"
            weight="bold"
            style={titleStyles}
            variant="body"
            color={collapseExpanded ? 'neutralGray700' : 'neutralGray600'}
            numberOfLines={titleNumberOfLines}
          >
            {title}
          </Text>
          <CollapseArrow expanded={collapseExpanded} />
        </TouchableOpacity>
        <Animated.View style={descriptionContainerStyles} testID="collapse-description-container">
          {renderDescription()}
        </Animated.View>
        <Animated.View testID="collapse-children-container" style={childrenContainerStyles}>
          {children}
        </Animated.View>
      </View>
    </Animated.View>
  );
};

Collapse.defaultProps = {
  titleNumberOfLines: 1,
};

export default withTheme(Collapse);
