import * as React from 'react';
import { StatusBar, Text } from 'react-native';

import { AppProvider } from 'mapping-context-rn';

function App() {
  return (
    <AppProvider>
      <StatusBar
        translucent={false}
      />
      <Text>
        Ola Mundo
      </Text>
    </AppProvider>
  );
}

export default App;
