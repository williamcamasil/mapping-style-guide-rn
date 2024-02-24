import React, {
  useCallback,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  StyleProp,
  LayoutChangeEvent,
  View,
  ViewStyle,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

import { useDidMountAndUpdate } from 'mapping-context-rn';

import { useTextStyles, useViewStyles } from '../../hooks/useStyles';
import { withTheme } from '../../theme';
import { AppThemeType } from '../../theme/default';
import CollapseArrow from '../Collapse/CollapseArrow';
import Divider from '../Divider';
import Spacer from '../Spacer';
import Text from '../Text';

export type AccordionPropsType = {
  theme: AppThemeType;
  title: string;
  description: string;
  testID?: string;
  expanded?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  onCollapseEnd?: () => void;
};

const styles = StyleSheet.create({
  divider: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
  },
});

const Accordion = ({
  theme,
  testID,
  expanded,
  title,
  description,
  style,
  onPress,
  onCollapseEnd,
  ...others
}: AccordionPropsType) => {
  const [isExpanded, setIsExpanded] = useState(Boolean(expanded));
  const animationHeight = useRef(new Animated.Value(0));
  const [headerHeight, setHeaderHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  useDidMountAndUpdate(() => {
    setIsExpanded(Boolean(expanded));
  }, [expanded]);

  const handleContentLayout = useCallback((event: LayoutChangeEvent) => {
    setContentHeight(event.nativeEvent.layout.height);
  }, []);

  const handleHeaderLayout = useCallback((event: LayoutChangeEvent) => {
    const height = event.nativeEvent.layout.height + theme.spacings.lSmall;
    setHeaderHeight(height);
    animationHeight.current.setValue(height);
  }, [theme.spacings.lSmall]);

  useDidMountAndUpdate(() => {
    const newHeight = isExpanded ? contentHeight : headerHeight;

    if (!newHeight) return undefined;

    const animation = Animated.parallel([
      Animated.spring(animationHeight.current, {
        toValue: newHeight,
        useNativeDriver: false,
      }),
    ]);

    animation.start(() => {
      onCollapseEnd?.();
    });

    return () => {
      animation.stop();
    };
  }, [isExpanded, contentHeight, headerHeight]);

  const handleCollapse = useCallback(() => {
    onPress?.();
    setIsExpanded(current => !current);
  }, [onPress]);

  const containerStyles = useViewStyles(() => [
    {
      overflow: 'hidden',
      height: contentHeight ? animationHeight.current : undefined,
    },
    style,
  ], [contentHeight, style]);

  const headerTouchableStyles = useViewStyles(() => [
    {
      paddingVertical: theme.spacings.sMedium,
      paddingHorizontal: theme.spacings.sXXS,
      paddingBottom: theme.spacings.sZero,
    },
  ], [theme]);

  const titleStyles = useTextStyles(() => [
    {
      marginRight: theme.spacings.sQuark,
    },
  ], [theme.spacings.sQuark]);

  const renderDescription = () => {
    const numberOfLines = isExpanded ? undefined : 1;
    return (
      <TouchableWithoutFeedback onPress={handleCollapse}>
        <View>
          <Spacer size={theme.spacings.sNano} />
          <Text testID="accordion-description" numberOfLines={numberOfLines}>{description}</Text>
          <Spacer size={theme.spacings.sLarge} />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <Animated.View testID={testID} style={containerStyles}>
      <View testID="accordion-content" style={styles.content} onLayout={handleContentLayout}>
        <TouchableWithoutFeedback
          {...others}
          testID="accordion-touchable"
          onLayout={handleHeaderLayout}
          onPress={handleCollapse}
          style={headerTouchableStyles}
        >
          <View>
            <View style={styles.headerWrapper}>
              <Text
                testID="accordion-title"
                weight="bold"
                style={titleStyles}
                variant="body"
                color="neutralGray700"
              >
                {title}
              </Text>
              <CollapseArrow expanded={isExpanded} />
            </View>
          </View>
        </TouchableWithoutFeedback>
        {renderDescription()}
      </View>
      <Divider style={styles.divider} />
    </Animated.View>
  );
};

export default withTheme(Accordion);
