import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Heart: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="m12 4.925-.684.585a.9.9 0 0 0 1.368 0L12 4.925Zm.684.585c.659-.77 1.769-1.61 3.474-1.61V2.1c-2.379 0-3.95 1.197-4.842 2.24l1.368 1.17Zm3.474-1.61c2.943 0 5.067 2.808 5.067 5.574h1.8c0-3.478-2.668-7.374-6.867-7.374v1.8Zm5.067 5.574c0 2.89-1.813 5.548-4.017 7.543a17.29 17.29 0 0 1-3.214 2.31c-.491.269-.93.469-1.29.599-.38.137-.61.174-.704.174v1.8c.405 0 .867-.12 1.315-.281.467-.169.99-.41 1.543-.713a19.086 19.086 0 0 0 3.559-2.555c2.359-2.136 4.608-5.241 4.608-8.877h-1.8ZM12 20.1c-.095 0-.325-.037-.703-.174-.361-.13-.8-.33-1.29-.599a17.291 17.291 0 0 1-3.215-2.31c-2.204-1.995-4.017-4.652-4.017-7.543h-1.8c0 3.636 2.25 6.741 4.608 8.877a19.086 19.086 0 0 0 3.56 2.555c.551.302 1.075.544 1.542.713.448.162.91.281 1.315.281v-1.8ZM2.775 9.474c0-2.766 2.124-5.574 5.067-5.574V2.1C3.643 2.1.975 5.996.975 9.474h1.8ZM7.842 3.9c1.705 0 2.815.84 3.474 1.61l1.368-1.17c-.891-1.043-2.463-2.24-4.842-2.24v1.8Z"
      fill={color}
    />
  </Svg>
);

Heart.defaultProps = {
  height: 24,
  width: 24,
};

export default Heart;