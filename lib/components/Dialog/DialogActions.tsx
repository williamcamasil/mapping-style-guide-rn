import React from 'react';
import { View } from 'react-native';

import { useViewStyles } from '../../hooks';
import { withTheme } from '../../theme';
import { AppThemeType } from '../../theme/default';
import Button, { ButtonPropsType } from '../Button';

type DialogTitlePropsType = {
  children?: React.ReactNode;
  theme: AppThemeType;
};

const throwErrorInDevMode = () => {
  if (__DEV__) {
    throw new Error('Dialog.Actions should be a Button element');
  }
};

const DialogActions: React.FC<DialogTitlePropsType> = ({ children, theme }) => {
  const footerStyles = useViewStyles(() => [
    {
      marginTop: theme.spacings.sXXL,
    },
  ], [theme.spacings.sXXL]);

  const mapChildren = (child: React.ReactNode, index: number) => {
    if (!React.isValidElement(child)) {
      return null;
    }

    if (child.type !== Button) {
      throwErrorInDevMode();

      return React.cloneElement(child, {
        key: index,
      });
    }

    const firstAction = index === 0;

    return React.cloneElement(child as React.ReactElement<ButtonPropsType>, {
      key: index,
      style: {
        marginTop: firstAction ? 0 : theme.spacings.sXS,
      },
      variant: firstAction ? 'containedPrimary' : 'text',
      size: firstAction ? 'large' : 'medium',
    });
  };

  const renderedActions = Array.isArray(children)
    ? children.map(mapChildren)
    : React.Children.map(children, mapChildren);

  if (!renderedActions?.length) return null;

  return (
    <View style={footerStyles}>
      {renderedActions}
    </View>
  );
};

export default withTheme(DialogActions);
