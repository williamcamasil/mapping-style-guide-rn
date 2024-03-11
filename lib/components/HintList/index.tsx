import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Images } from '../../assets';
import { useViewStyles } from '../../hooks';
import { AppThemeType, withTheme } from '../../theme';
import { ColorPaletesType, SpacingSizesType } from '../../tokens';
import Spacer from '../Spacer';
import Text from '../Text';

export type HintListPropsType = {
  bulletPointColor: ColorPaletesType;
  bulletPointAlignCenter?: boolean;
  hintList: string[] | React.ReactNode[];
  theme: AppThemeType;
  isBold?: boolean;
  spacing?: SpacingSizesType;
};

const styles = StyleSheet.create({
  hintContainerStyle: {
    flexDirection: 'row',
  },
});

const HintList: React.FC<HintListPropsType> = ({
  bulletPointColor,
  bulletPointAlignCenter = true,
  hintList,
  theme,
  isBold = true,
  spacing = 'sXS',
}) => {

  const hintContainerStyles = useViewStyles(() => [
    styles.hintContainerStyle,
    {
      alignItems: bulletPointAlignCenter ? 'center' : 'flex-start',
    },
  ], [bulletPointAlignCenter]);

  const bulletPointStyles = useViewStyles(() => [
    {
      marginTop: bulletPointAlignCenter ? 0 : theme.spacings.sNano,
    },
  ], [bulletPointAlignCenter, theme.spacings.sNano]);

  const renderHint = (hint: string | React.ReactNode, index: number) => (
    <View key={`hint-${index}`}>
      <View style={hintContainerStyles}>
        <Images.BulletPoint color={bulletPointColor} style={bulletPointStyles} />
        <Spacer size={theme.spacings[spacing]} />
        <Text weight={isBold ? 'bold' : 'regular'}>{hint}</Text>
      </View>
      <Spacer size={theme.spacings.sSmall} />
    </View>
  );
  return (
    <View>
      {hintList.map(renderHint)}
    </View>
  );
};

export default withTheme(HintList);
