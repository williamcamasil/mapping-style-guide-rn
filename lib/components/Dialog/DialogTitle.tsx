import React from 'react';

import { useTextStyles } from '../../hooks';
import { withTheme } from '../../theme';
import { AppThemeType } from '../../theme/default';
import Text from '../Text';

type DialogTitlePropsType = {
  children?: React.ReactNode;
  centered?: boolean;
  theme: AppThemeType;
};

const DialogTitle: React.FC<DialogTitlePropsType> = ({ children, centered, theme }) => {
  const textStyles = useTextStyles(() => [
    {
      marginBottom: theme.spacings.sXXS,
      textAlign: centered ? 'center' : 'left',
    },
  ], [centered, theme.spacings.sXXS]);

  if (!children) return null;

  return (
    <Text variant="headingSmall" color="neutralGray700" style={textStyles}>
      {children}
    </Text>
  );
};

export default withTheme(DialogTitle);
