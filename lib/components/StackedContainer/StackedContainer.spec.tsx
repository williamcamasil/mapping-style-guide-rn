
import React from 'react';
import { Text, View } from 'react-native';

import { render } from '@testing-library/react-native';

import StackedContainer from '.';
import { ThemeProvider } from '../../theme';

describe('StackedContainer', () => {
  it('should render full stack', () => {
    const result = render(
      <ThemeProvider>
        <StackedContainer
          headerContent={(
            <View>
              <Text>
                StackedContainer
              </Text>
            </View>
          )}
          topContent={(
            <View>
              <Text>
                StackedContainer
              </Text>
            </View>
          )}
          middleContent={(
            <View>
              <Text>
                StackedContainer
              </Text>
            </View>
          )}
          bottomContent={(
            <View>
              <Text>
                StackedContainer
              </Text>
            </View>
          )}
        />
      </ThemeProvider>,
    );

    expect(result).toMatchSnapshot();
  });

  it('should render only header', () => {
    const result = render(
      <ThemeProvider>
        <StackedContainer
          headerContent={(
            <View>
              <Text>
                StackedContainer
              </Text>
            </View>
          )}
        />
      </ThemeProvider>,
    );

    expect(result).toMatchSnapshot();
  });

  it('should render only top', () => {
    const result = render(
      <ThemeProvider>
        <StackedContainer
          topContent={(
            <View>
              <Text>
                StackedContainer
              </Text>
            </View>
          )}
        />
      </ThemeProvider>,
    );

    expect(result).toMatchSnapshot();
  });

  it('should render only middle', () => {
    const result = render(
      <ThemeProvider>
        <StackedContainer
          middleContent={(
            <View>
              <Text>
                StackedContainer
              </Text>
            </View>
          )}
        />
      </ThemeProvider>,
    );

    expect(result).toMatchSnapshot();
  });

  it('should render only bottom', () => {
    const result = render(
      <ThemeProvider>
        <StackedContainer
          bottomContent={(
            <View>
              <Text>
                StackedContainer
              </Text>
            </View>
          )}
        />
      </ThemeProvider>,
    );

    expect(result).toMatchSnapshot();
  });

  it('should render only top and bottom', () => {
    const result = render(
      <ThemeProvider>
        <StackedContainer
          topContent={(
            <View>
              <Text>
                StackedContainer
              </Text>
            </View>
          )}
          bottomContent={(
            <View>
              <Text>
                StackedContainer
              </Text>
            </View>
          )}
        />
      </ThemeProvider>,
    );

    expect(result).toMatchSnapshot();
  });

  it('should render only header, top and bottom', () => {
    const result = render(
      <ThemeProvider>
        <StackedContainer
          headerContent={(
            <View>
              <Text>
                StackedContainer
              </Text>
            </View>
          )}
          topContent={(
            <View>
              <Text>
                StackedContainer
              </Text>
            </View>
          )}
          bottomContent={(
            <View>
              <Text>
                StackedContainer
              </Text>
            </View>
          )}
        />
      </ThemeProvider>,
    );

    expect(result).toMatchSnapshot();
  });
});
