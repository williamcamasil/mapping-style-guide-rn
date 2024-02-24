import React, { ComponentType, PropsWithChildren, FunctionComponent } from 'react';
import { ColorValue, StyleSheet, View } from 'react-native';

import { SvgProps } from 'react-native-svg';

import { useTextStyles, useViewStyles } from '../../hooks/useStyles';
import { withTheme } from '../../theme';
import Card, { CardPropsType } from '../Card';
import Text from '../Text';
import { getIconColor } from './utils';

export type CardIconPropsType<IconProps extends SvgProps = SvgProps> = CardPropsType & PropsWithChildren & {
  Icon?: ComponentType<IconProps>;
  iconColor?: ColorValue;
  iconSize?: number;
  topTitle?: React.ReactNode;
  bottomTitle?: string;
  description?: string;
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const CardIcon: FunctionComponent<CardIconPropsType> = ({
  children,
  Icon,
  iconColor,
  topTitle,
  bottomTitle,
  description,
  variant,
  theme,
  size,
  iconSize,
  ...others
}) => {
  const isSizeBig = size === 'big';

  const shouldRenderDescription = Boolean(isSizeBig && description);

  const isVariantHighlighted100 = variant === 'highlighted100';

  const bottomTitleColor = isVariantHighlighted100 ? 'neutralWhite' : 'neutralGray700';

  const descriptionColor = isVariantHighlighted100 ? 'neutralWhite' : 'neutralGray600';

  const iconStyles = useTextStyles(() => [
    {
      ...theme.typography.weights.bold,
      marginRight: theme.spacings.sXXS,
      fontSize: theme.typography.sizes.XXS,
    },
  ], [theme]);

  const titleStyles = useTextStyles(() => [
    {
      fontSize: size === 'small' ? theme.typography.sizes.XS : theme.typography.sizes.small,
    },
  ], [size, theme.typography.sizes.XS, theme.typography.sizes.small]);

  const descriptionStyles = useTextStyles(() => [
    {
      fontSize: theme.typography.sizes.XXS,
      paddingTop: theme.spacings.sNano,
    },
  ], [theme.typography.sizes.XXS, theme.spacings.sNano]);

  const cardTextsStyles = useViewStyles(() => {
    if (!isSizeBig) return null;

    return [
      {
        marginTop: shouldRenderDescription ? theme.spacings.sMedium : theme.spacings.lXS,
      },
    ];
  }, [isSizeBig, shouldRenderDescription, theme.spacings.sMedium, theme.spacings.lXS]);

  const renderDescription = () => {
    if (!shouldRenderDescription) {
      return null;
    }

    return (
      <Text
        testID="description"
        color={descriptionColor}
        lineHeight="medium"
        weight="regular"
        style={descriptionStyles}
      >
        {description}
      </Text>
    );
  };

  const renderTemplateContent = () => {
    if (children) return children;

    if (!bottomTitle && !shouldRenderDescription) return null;

    return (
      <View style={cardTextsStyles}>
        <Text
          testID="title"
          color={bottomTitleColor}
          lineHeight="medium"
          weight="bold"
          style={titleStyles}
        >
          {bottomTitle}
        </Text>
        {renderDescription()}
      </View>
    );
  };

  const renderIcon = () => {
    if (!Icon) return null;

    return (
      <Icon
        width={iconSize}
        height={iconSize}
        color={getIconColor(theme, iconColor, variant)}
        style={iconStyles}
      />
    );
  };

  const cardContentStyles = useViewStyles(() => [
    {
      flex: size === 'small' ? 1 : undefined,
      justifyContent: 'space-between',
    },
  ], [size]);

  return (
    <Card
      {...others}
      variant={variant}
      size={size}
    >
      <View testID="card-icon-view-content" style={cardContentStyles}>
        <View style={styles.header}>
          {renderIcon()}
          {isSizeBig ? topTitle : null}
        </View>

        {renderTemplateContent()}
      </View>
    </Card>
  );
};

CardIcon.defaultProps = {
  iconSize: 24,
};

export default withTheme(CardIcon);
