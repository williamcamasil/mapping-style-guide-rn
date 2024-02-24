
import React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

type QuestionPropsType = SvgProps;

const Help: React.FC<QuestionPropsType> = ({
  color,
  ...others
}) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M12.8 16a.8.8 0 0 0-1.6 0h1.6Zm-1.6.01a.8.8 0 0 0 1.6 0h-1.6Zm0-2.76a.8.8 0 0 0 1.6 0h-1.6Zm1.811-1.85.446.664h.001l-.447-.664ZM9.2 9.833a.8.8 0 0 0 1.6 0H9.2ZM12 20.2A8.2 8.2 0 0 1 3.8 12H2.2a9.8 9.8 0 0 0 9.8 9.8v-1.6ZM3.8 12A8.2 8.2 0 0 1 12 3.8V2.2A9.8 9.8 0 0 0 2.2 12h1.6ZM12 3.8a8.2 8.2 0 0 1 8.2 8.2h1.6A9.8 9.8 0 0 0 12 2.2v1.6Zm8.2 8.2a8.2 8.2 0 0 1-8.2 8.2v1.6a9.8 9.8 0 0 0 9.8-9.8h-1.6Zm-9 4v.01h1.6V16h-1.6Zm1.6-2.75V13h-1.6v.25h1.6Zm0-.25a.79.79 0 0 1 .158-.502c.107-.145.27-.28.5-.434l-.893-1.328c-.558.375-1.365 1.026-1.365 2.264h1.6Zm.658-.937c.545-.367 1.342-1.01 1.342-2.23h-1.6c0 .217-.062.36-.152.482-.103.14-.26.27-.484.422l.894 1.326Zm1.342-2.23a2.8 2.8 0 0 0-2.8-2.8v1.6a1.2 1.2 0 0 1 1.2 1.2h1.6Zm-2.8-2.8a2.8 2.8 0 0 0-2.8 2.8h1.6a1.2 1.2 0 0 1 1.2-1.2v-1.6Z"
      fill={color}
    />
  </Svg>
);

Help.defaultProps = {
  width: 24,
  height: 24,
};

export default Help;
