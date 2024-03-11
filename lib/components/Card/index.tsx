import React from 'react';
import {
  ColorValue,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';

import { useViewStyles } from '../../hooks/useStyles';
import { withTheme } from '../../theme';
import { AppThemeType } from '../../theme/default';
import CardArrow from './CardArrow';
import CardShimmer from './CardShimmer';
import {
  CardVariantType,
  CardSizeType,
  getCardVariantStyle,
  getCardSizeStyle,
  getCardCustomBorderStyle,
  getCardShadowStyle,
} from './utils';

export type CardPropsType = TouchableOpacityProps & {
  theme: AppThemeType;
  size?: CardSizeType;
  variant?: CardVariantType;
  style?: StyleProp<ViewStyle>;
  borderColor?: ColorValue;
  onPress?: () => void;
  disabled?: boolean;
  showArrow?: boolean;
  arrowColor?: ColorValue;
  showShadow?: boolean;
  loading?: boolean;
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
  },
  content: {
    flex: 1,
  },
});

const Card: React.FC<CardPropsType> = ({
  children,
  theme,
  size,
  variant,
  style,
  borderColor,
  onPress,
  disabled,
  showArrow,
  arrowColor,
  showShadow,
  loading,
  ...others
}) => {
  const cardStyles = useViewStyles(() => [
    styles.card,
    {
      borderRadius: theme.borders.radius.medium,
      backgroundColor: theme.colors.neutralWhite,
    },
    getCardVariantStyle(theme, variant),
    getCardSizeStyle(theme, size),
    getCardShadowStyle(theme, showShadow),
    getCardCustomBorderStyle(theme, borderColor),
    style,
  ], [theme, showShadow, variant, size, borderColor, style]);

  if (loading) {
    return <CardShimmer size={size} />;
  }

  return (
    <TouchableOpacity
      testID="card-touchable"
      {...others}
      activeOpacity={theme.opacities.intense}
      disabled={disabled}
      onPress={onPress}
      style={cardStyles}
    >
      <View style={styles.content}>
        {children}
      </View>

      <CardArrow
        visible={showArrow}
        cardSize={size}
        color={arrowColor}
        variant={variant}
      />
    </TouchableOpacity>
  );
};

Card.defaultProps = {
  showShadow: true,
};

export default withTheme(Card);
