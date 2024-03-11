import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Documents: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M7.418 7.47h7.335m-7.335 3.21h4.583M8.25 20.25h-3a1.5 1.5 0 0 1-1.5-1.5V5.25a1.5 1.5 0 0 1 1.5-1.5h13.5a1.5 1.5 0 0 1 1.5 1.5V7.5m-6.877 12.292v-.375c0-1.057.862-1.92 1.92-1.92h3.037c1.058 0 1.92.863 1.92 1.92v.375a.455.455 0 0 1-.457.458h-5.955a.461.461 0 0 1-.465-.458Zm-4.583-3.15a1.373 1.373 0 1 1 .002-2.746 1.373 1.373 0 0 1-.002 2.746Zm9.87-3.562a1.83 1.83 0 1 1-3.66 0 1.83 1.83 0 0 1 3.66 0Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Documents.defaultProps = {
  height: 24,
  width: 24,
};

export default Documents;
