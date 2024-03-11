import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Edit: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M20 11.111v7.111c0 .982-.796 1.778-1.778 1.778H5.778A1.777 1.777 0 0 1 4 18.222V5.778C4 4.796 4.796 4 5.778 4H12M9.333 14.667l2.8-.346a.892.892 0 0 0 .52-.253l6.783-6.784a1.924 1.924 0 0 0-2.721-2.72l-6.72 6.72a.89.89 0 0 0-.252.503l-.41 2.88Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Edit.defaultProps = {
  height: 24,
  width: 24,
};

export default Edit;
