import React from 'react';

import { useTextStyles } from '../../hooks';
import { withTheme } from '../../theme';
import { AppThemeType } from '../../theme/default';
import { calcLineHeight } from '../../utils/typography';
import Text from '../Text';
import { getTextLabelColor } from './utils';

type InputTextLabelPropsType = {
  children?: string;
  hide?: boolean;
  focused?: boolean;
  error?: boolean;
  textArea?: boolean;
  theme: AppThemeType;
};

const InputTextLabel: React.FC<InputTextLabelPropsType> = ({
  children, hide, focused, error, textArea, theme,
}) => {
  const labelStyles = useTextStyles(() => [
    {
      position: 'absolute',
      left: !textArea ? theme.spacings.sSmall : theme.spacings.sZero,
      top: theme.spacings.sXXS,
      lineHeight: calcLineHeight(theme.typography.sizes.XXS, theme.typography.lineHeights.small),
      color: theme.colors[getTextLabelColor(focused, error, textArea)],
    },
  ], [
    theme.spacings,
    theme.typography.sizes.XXS,
    theme.typography.lineHeights.small,
    theme.colors,
    focused,
    error,
    textArea,
  ]);

  if (hide) return null;

  return (
    <Text variant="caption" color="neutralGray500" style={labelStyles}>
      {children}
    </Text>
  );
};

InputTextLabel.defaultProps = {
  hide: false,
};

export default withTheme(InputTextLabel);
