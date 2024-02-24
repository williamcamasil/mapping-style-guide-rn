import * as React from 'react';
import { StatusBar } from 'react-native';

import { AppProvider } from 'mapping-context-rn';

import {
  Container,
  DefaultTheme,
  Spacer,
  Text,
  ThemeProvider,
} from '../lib';
import ModalProvider from '../lib/components/Modal/ModalProvider';

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <ModalProvider>
          <StatusBar
            translucent={false}
            backgroundColor={DefaultTheme.colors.secondaryMain}
          />
          <Container padding={DefaultTheme.spacings.lLarge}>
            <Spacer size={DefaultTheme.spacings.lGiant} />
            <Text weight="bold">Mapping Style Guide</Text>
          </Container>

        </ModalProvider>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
