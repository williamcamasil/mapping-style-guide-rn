import { AppRegistry, LogBox } from 'react-native';

import { name as appName } from './app.json';
import App from './src/App.tsx';

LogBox.ignoreLogs([
  /Require cycle: node_modules\/core-js\/internals\/microtask\.js/,
]);

AppRegistry.registerComponent(appName, () => App);
