import React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

type CreditCardPropsType = SvgProps;

const CreditCard: React.FC<CreditCardPropsType> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M2.75146 8.89312H21.2486M9.50291 13.0357H6.86194M18.1657 19.249H5.83432C4.13155 19.249 2.75146 17.8581 2.75146 16.1421V7.85693C2.75146 6.14087 4.13155 4.75 5.83432 4.75H18.1657C19.8685 4.75 21.2486 6.14087 21.2486 7.85693V16.1421C21.2486 17.8581 19.8685 19.249 18.1657 19.249Z"
      stroke={color}
      strokeWidth={1.8}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

CreditCard.defaultProps = {
  width: 24,
  height: 24,
};

export default CreditCard;
