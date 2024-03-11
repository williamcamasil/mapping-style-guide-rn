import * as React from 'react';

import Svg, {
  G, Path, SvgProps,
} from 'react-native-svg';

type TruckPropsType = SvgProps;

const Truck: React.FC<TruckPropsType> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <G clipPath="url(#a)">
      <Path
        d="M8.012 18.508h7.817m-10.808 0H3.024h.01c-.55 0-.999-.45-.999-1v-6.11c0-.26.05-.509.15-.748l1.358-3.385A2.007 2.007 0 0 1 5.4 6.007h3.644m-7.023 7.009h3.505c.28-.01.499-.23.499-.51V9.012H2.83m2.636 8.438c-.58.58-.58 1.528 0 2.117.589.579 1.537.579 2.127 0 .589-.59.589-1.538.01-2.127v-.02h.01a1.498 1.498 0 0 0-2.117-.01m10.952.04c-.579.579-.579 1.527 0 2.116.59.58 1.538.58 2.127 0a1.51 1.51 0 0 0 .01-2.126v-.02h.01a1.488 1.488 0 0 0-2.117 0m2.516 1.088h2.007c.56-.01.999-.449.999-1.008V5.009A.989.989 0 0 0 21.01 4H10.03h.01a.987.987 0 0 0-.999.989v8.986m-.03.04h12.98"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);

Truck.defaultProps = {
  width: 24,
  height: 24,
};

export default Truck;
