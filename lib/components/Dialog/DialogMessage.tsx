import React from 'react';

import { useTextStyles } from '../../hooks';
import Text from '../Text';

type DialogMessagePropsType = {
  children?: React.ReactNode;
  centered?: boolean;
};

const DialogMessage: React.FC<DialogMessagePropsType> = ({ children, centered }) => {
  const textStyles = useTextStyles(() => [
    {
      textAlign: centered ? 'center' : 'left',
    },
  ], [centered]);

  if (!children) return null;

  return (
    <Text variant="body" color="neutralGray600" style={textStyles}>
      {children}
    </Text>
  );
};

export default DialogMessage;
