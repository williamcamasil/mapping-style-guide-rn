import { Dimensions, StatusBar, useWindowDimensions } from 'react-native';

export const useDimensions = () => {
  const window = useWindowDimensions();

  return {
    window,
    screen: Dimensions.get('screen'),
    statusBar: {
      height: StatusBar.currentHeight ?? 0,
    },
  };
};
