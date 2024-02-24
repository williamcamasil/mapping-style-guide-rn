import React from 'react';
import { View } from 'react-native';

import { useTextStyles } from '../../hooks';
import { AppThemeType, withTheme } from '../../theme';
import Spacer from '../Spacer';
import Text from '../Text';

type DialogExtraTextPropsType = {
  children?: React.ReactNode;
  centered?: boolean;
  theme: AppThemeType;
};

const DialogExtraText: React.FC<DialogExtraTextPropsType> = ({ children, centered, theme }) => {
  const textStyles = useTextStyles(() => [
    {
      textAlign: centered ? 'center' : 'left',
    },
  ], [centered]);

  if (!children) return null;

  return (
    <View>
      <Spacer size={theme.spacings.sLarge} />
      <Text variant="body" color="neutralGray600" weight="bold" style={textStyles}>
        {children}
      </Text>
    </View>
  );
};

export default withTheme(DialogExtraText);
