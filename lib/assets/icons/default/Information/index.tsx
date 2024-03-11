import React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

type InformationPropsType = SvgProps;

const Information: React.FC<InformationPropsType> = ({
  color,
  ...others
}) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.0001 20.0999C16.474 20.0999 20.1001 16.4738 20.1001 11.9999C20.1001 7.52591 16.474 3.89985 12.0001 3.89985C7.52616 3.89985 3.9001 7.52591 3.9001 11.9999C3.9001 16.4738 7.52615 20.0999 12.0001 20.0999ZM21.9001 11.9999C21.9001 17.4679 17.4682 21.8999 12.0001 21.8999C6.53204 21.8999 2.1001 17.4679 2.1001 11.9999C2.1001 6.53179 6.53204 2.09985 12.0001 2.09985C17.4682 2.09985 21.9001 6.5318 21.9001 11.9999ZM12.0001 17.3999C11.503 17.3999 11.1001 16.9969 11.1001 16.4999L11.1001 11.4999C11.1001 11.0028 11.503 10.5999 12.0001 10.5999C12.4972 10.5999 12.9001 11.0028 12.9001 11.4999L12.9001 16.4999C12.9001 16.9969 12.4972 17.3999 12.0001 17.3999ZM12 6.54976C11.3925 6.54976 10.9 7.04224 10.9 7.64975C10.9 8.25727 11.3925 8.74975 12 8.74975C12.6075 8.74976 13.1 8.25727 13.1 7.64975C13.1 7.04224 12.6075 6.54976 12 6.54976Z"
      fill={color}
    />
  </Svg>
);

Information.defaultProps = {
  width: 24,
  height: 24,
};

export default Information;
