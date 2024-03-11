import React from 'react';
import { StyleSheet, View } from 'react-native';

import { SvgProps } from 'react-native-svg';

import { useViewStyles } from '../../hooks';
import { AppThemeType, withTheme } from '../../theme';
import Spacer from '../Spacer';
import Text from '../Text';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  fill: {
    flex: 1,
  },
});

export type TitlePagePropsType = {
  theme: AppThemeType;
  title: string;
  description?: string;
  Logo?: React.FunctionComponent<SvgProps>;
};

const TitlePage = ({
  theme,
  title,
  description,
  Logo,
}: TitlePagePropsType) => {
  const containerStyles = useViewStyles(() => [
    styles.row,
    {
      columnGap: theme.spacings.sNano,
    },
  ], [theme.spacings.sNano]);

  const renderDescription = () => {
    if (!description) {
      return null;
    }
    return (
      <>
        <Spacer size={theme.spacings.sXXS} />
        <Text>{description}</Text>
      </>
    );
  };

  const renderLogo = () => {
    if (!Logo) return null;
    return (
      <View>
        <Logo />
      </View>
    );
  };

  return (
    <View style={containerStyles}>
      <View style={styles.fill}>
        <Text variant="headingSmall" color="neutralGray700">
          {title}
        </Text>
        {renderDescription()}
      </View>
      {renderLogo()}
    </View>
  );
};

export default withTheme(TitlePage);
