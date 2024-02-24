import React from 'react';

import { render, fireEvent } from '@testing-library/react-native';

import WebView from '.';
import Container from '../Container';
import Loading from '../Loading';

describe('WebView snapshots', () => {
  it('default', () => {
    const result = render(<WebView source={{ uri: 'https://www.google.com.br/' }} />).toJSON();

    expect(result).toMatchSnapshot();
  });

  it('renderLoading', () => {
    const result = render(
      <WebView
        source={{ uri: 'https://www.google.com.br/' }}
        renderLoading={() => (
          <Container>
            <Loading color="neutralGray500" />
          </Container>
        )}
      />,
    ).toJSON();

    expect(result).toMatchSnapshot();
  });
});

describe('WebView events', () => {
  it('onPageChange', async () => {
    const handlePageChange = jest.fn();

    const result = render(
      <WebView
        testID="webview"
        source={{ uri: 'https://www.google.com.br/' }}
        onPageChange={handlePageChange}
      />,
    );

    fireEvent(result.getByTestId('webview'), 'onLoadProgress', {
      nativeEvent: {
        progress: 0.5,
        url: 'https://www.google.com.br/',
        title: 'google',
      },
    });

    fireEvent(result.getByTestId('webview'), 'onLoadProgress', {
      nativeEvent: {
        progress: 1,
        url: 'https://www.google.com.br/',
        title: 'google',
      },
    });

    fireEvent(result.getByTestId('webview'), 'onLoadProgress', {
      nativeEvent: {
        progress: 1,
        url: 'https://www.google.com.br/',
        title: 'google',
      },
    });

    expect(handlePageChange).toHaveBeenNthCalledWith(
      1,
      {
        url: 'https://www.google.com.br/',
        title: 'google',
      },
    );
  });

});
