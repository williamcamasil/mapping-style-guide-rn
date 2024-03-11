import * as React from 'react';
import { StatusBar, StyleSheet } from 'react-native';

import { AppProvider } from 'mapping-context-rn';

import {
  Container,
  DefaultTheme,
  Text,
  ThemeProvider,
} from '../lib';
import ModalProvider from '../lib/components/Modal/ModalProvider';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <ModalProvider>
          <StatusBar
            translucent={false}
            backgroundColor={DefaultTheme.colors.secondaryMain}
          />
          <Container style={styles.container}>
            <Text weight="bold">Mapping Style Guide</Text>
          </Container>

        </ModalProvider>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
