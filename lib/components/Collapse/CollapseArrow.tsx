import React from 'react';

import { Icons } from '../../assets';
import { withTheme } from '../../theme';
import { AppThemeType } from '../../theme/default';

type CollapseArrowPropsType = {
  theme: AppThemeType;
  expanded?: boolean;
};

const CollapseArrow: React.FC<CollapseArrowPropsType> = ({
  theme, expanded,
}) => {
  const Icon = expanded ? Icons.Small.Top : Icons.Small.Down;
  return (
    <Icon width={16} height={16} color={theme.colors.neutralGray400} />
  );
};

export default withTheme(CollapseArrow);
