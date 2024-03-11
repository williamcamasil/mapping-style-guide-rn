import React from 'react';
import { View } from 'react-native';

import { useViewStyles } from '../../hooks';
import { withTheme } from '../../theme';
import { AppThemeType } from '../../theme/default';

type DialogHeaderPropsType = {
  children?: React.ReactNode;
  theme: AppThemeType;
};

const DialogHeader: React.FC<DialogHeaderPropsType> = ({ children, theme }) => {
  const headerStyles = useViewStyles(() => [
    {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme.spacings.sXS,
    },
  ], [theme.spacings.sXS]);

  if (!children) return null;

  return (
    <View style={headerStyles}>
      {children}
    </View>
  );
};

export default withTheme(DialogHeader);
