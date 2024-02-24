import React, { useMemo } from 'react';
import { Text, ViewStyle } from 'react-native';

type SpacerPropsType = {
  size: ViewStyle['height'];
};

const Spacer: React.FC<SpacerPropsType> = ({ size }) => {
  const textStyle = useMemo(() => ({
    height: size,
    width: size,
  }), [size]);
  /*
  * A decisão de usar um Text em vez de um View é para que esse Spacer
  * possa ser usado dentro de outras Views e tbm de outros Text sem restrição.
  */
  return (
    <Text style={textStyle} />
  );
};

export default Spacer;
