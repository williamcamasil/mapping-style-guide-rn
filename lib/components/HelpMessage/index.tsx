import React, { PropsWithChildren } from 'react';
import { TextStyle } from 'react-native';

import { useTextStyles } from '../../hooks';
import { withTheme } from '../../theme';
import { AppThemeType } from '../../theme/default';
import Text from '../Text';
import { getTextColor } from './utils';

type InputTextHelpPropsType = PropsWithChildren & {
  theme: AppThemeType;
  error?: boolean;
  disabled?: boolean;
  marginLeft?: TextStyle['marginLeft'];
};

const HelpMessage: React.FC<InputTextHelpPropsType> = ({
  theme,
  children,
  error,
  disabled,
  marginLeft,
}) => {

  const helpStyles = useTextStyles(() => [
    {
      marginTop: theme.spacings.sXXS,
      marginLeft,
    },
  ], [marginLeft, theme.spacings.sXXS]);

  if (!children) return null;

  return (
    <Text
      color={getTextColor(error, disabled)}
      style={helpStyles}
      variant="bodySmall"
      lineHeight="small"
    >
      {children}
    </Text>
  );
};

export default withTheme(HelpMessage);
