import React, { ComponentType, useCallback, useState } from 'react';

import { SvgProps } from 'react-native-svg';

import { Icons } from '../../assets';
import { useViewStyles } from '../../hooks/useStyles';
import { withTheme } from '../../theme';
import { CardPropsType } from '../Card';
import CardIcon from '../CardIcon';
import Text from '../Text';
import { getButtonColor, getIconColor } from './utils';

export type PressableCardButtonPropsType<IconProps extends SvgProps = SvgProps> = CardPropsType & {
  title: string;
  pressedTitle: string;
  Icon?: ComponentType<IconProps>;
  PressedIcon?: ComponentType<IconProps>;
  onPress: () => void;
  testID?: string;
};

const PressableCardButton: React.FC<PressableCardButtonPropsType> = ({
  title,
  pressedTitle,
  Icon,
  PressedIcon,
  onPress,
  testID,
  theme,
  ...others
}) => {
  const [pressed, setPressed] = useState<boolean>(false);

  const buttonStyle = useViewStyles(() => [
    {
      backgroundColor: pressed ? theme.colors.feedbackSuccess100 : theme.colors.primary100,
    },
  ], [pressed, theme.colors.feedbackSuccess100, theme.colors.primary100]);

  const buttonColor = getButtonColor(pressed);
  const iconColor = getIconColor(theme, pressed);

  const handlePress = useCallback(() => {
    onPress();
    setPressed(true);
  }, [onPress]);

  return (
    <CardIcon
      {...others}
      onPress={handlePress}
      testID={testID}
      size="small"
      Icon={pressed ? PressedIcon : Icon}
      iconColor={iconColor}
      showShadow={false}
      style={buttonStyle}
      borderColor="transparent"
    >
      <Text variant="small" color={buttonColor}>
        {pressed ? pressedTitle : title}
      </Text>
    </CardIcon>
  );
};

PressableCardButton.defaultProps = {
  PressedIcon: Icons.Default.Success,
};

export default withTheme(PressableCardButton);
