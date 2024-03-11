import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Images } from '../../assets';
import { useViewStyles } from '../../hooks';
import { withTheme } from '../../theme';
import { AppThemeType } from '../../theme/default';

type DialogCloseButtonPropsType = {
  onPress?: () => void;
  visible?: boolean;
  theme: AppThemeType;
};

const BottomSheetCloseButton: React.FC<DialogCloseButtonPropsType> = ({ onPress, visible, theme }) => {

  const buttonStyles = useViewStyles(() => [
    {
      position: 'absolute',
      top: theme.spacings.sSmall,
      right: theme.spacings.sSmall,
    },
  ], [theme.spacings.sSmall]);

  if (!visible) return null;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles}>
      <Images.DialogClose width={36} height={36} />
    </TouchableOpacity>
  );
};

export default withTheme(BottomSheetCloseButton);
