import * as React from 'react';

import Svg, {
  ClipPath, Defs, G, Path, SvgProps,
} from 'react-native-svg';

type MoneyPropsType = SvgProps;

const Money: React.FC<MoneyPropsType> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <G clipPath="url(#a)">
      <Path
        d="M12.001 9V8m0 7v1m-1.735-1.714c.256.44.726.713 1.236.717h1.095a1.404 1.404 0 0 0 .341-2.766l-1.874-.471a1.404 1.404 0 0 1 .34-2.767H12.5a1.44 1.44 0 0 1 1.235.714M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18Z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

Money.defaultProps = {
  width: 24,
  height: 24,
};

export default Money;
