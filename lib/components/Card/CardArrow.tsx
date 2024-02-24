import React from 'react';
import { ColorValue, View } from 'react-native';

import { Icons } from '../../assets';
import { useViewStyles } from '../../hooks';
import { withTheme } from '../../theme';
import { AppThemeType } from '../../theme/default';
import { CardSizeType, CardVariantType, getArrowColor } from './utils';

type CardArrowPropsType = {
  theme: AppThemeType;
  visible?: boolean;
  cardSize?: CardSizeType;
  variant?: CardVariantType;
  color?: ColorValue;
};

const CardArrow: React.FC<CardArrowPropsType> = ({
  theme, visible, cardSize, color,
  variant,
}) => {
  const containerStyles = useViewStyles(() => [
    {
      position: 'absolute',
      top: 0,
      right: theme.spacings.sSmall,
      bottom: 0,
      justifyContent: 'center',
    },
  ], [theme.spacings.sSmall]);

  if (cardSize === 'small') return null;

  if (!visible) return null;

  return (
    <View style={containerStyles}>
      <Icons.Small.Right
        width={16}
        height={16}
        color={getArrowColor(theme, variant, color)}
      />
    </View>
  );
};

export default withTheme(CardArrow);
