import * as React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

type SettingsPropsType = SvgProps;

const Settings: React.FC<SettingsPropsType> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M13.625 10.38c.892.89.892 2.341 0 3.24-.891.9-2.343.891-3.243 0-.9-.89-.891-2.341 0-3.24.892-.9 2.343-.891 3.243 0Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5.903 12c0 .275.027.541.054.807l-1.436 1.137a.831.831 0 0 0-.2 1.063l1.275 2.237a.796.796 0 0 0 1.003.348l1.283-.522a.824.824 0 0 1 .768.091c.199.138.406.257.614.367.244.129.425.349.461.623l.199 1.385a.827.827 0 0 0 .804.715h2.548a.82.82 0 0 0 .804-.706l.199-1.384a.82.82 0 0 1 .46-.624c.209-.11.416-.229.615-.366a.796.796 0 0 1 .768-.092l1.283.523c.37.155.804 0 1.003-.349l1.274-2.237a.842.842 0 0 0-.199-1.063l-1.436-1.137a6.04 6.04 0 0 0 .054-.806c0-.266-.027-.541-.054-.807l1.436-1.137a.83.83 0 0 0 .2-1.063l-1.275-2.237a.796.796 0 0 0-1.003-.348l-1.283.522a.821.821 0 0 1-.768-.092 8.366 8.366 0 0 0-.614-.366c-.244-.129-.425-.349-.461-.624l-.199-1.402a.827.827 0 0 0-.804-.706h-2.548a.827.827 0 0 0-.804.706l-.19 1.384a.82.82 0 0 1-.46.623 6.83 6.83 0 0 0-.615.367.821.821 0 0 1-.768.092l-1.283-.523a.805.805 0 0 0-1.003.349L4.322 8.994a.833.833 0 0 0 .208 1.063l1.436 1.137a5.944 5.944 0 0 0-.063.806Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Settings.defaultProps = {
  width: 24,
  height: 24,
};

export default Settings;
