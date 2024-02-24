import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { render, fireEvent } from '@testing-library/react-native';

import Ratio, { RatioSizeType } from '.';
import ImageExample from './image-example.png';

const fakeLayoutEvent = {
  nativeEvent: {
    layout: {
      width: 320,
      height: 1080,
    },
  },
};

const fakeImageLoadEvent = {
  nativeEvent: {
    source: {
      width: 320,
      height: 1080,
    },
  },
};

describe('Ratio snapshot', () => {
  it('by width', () => {
    const result = render(
      <Ratio
        testID="ratio-instance"
        originalWidth={1201}
        originalHeight={601}
        ratioSource="width"
      >
        {size => (
          <Image
            testID="internal-image"
            source={ImageExample}
            style={size}
          />
        )}
      </Ratio>,
    );

    fireEvent(result.getByTestId('ratio-instance'), 'layout', fakeLayoutEvent);

    expect(result.toJSON()).toMatchSnapshot();
  });

  it('by height', () => {
    const result = render(
      <Ratio
        testID="ratio-instance"
        originalWidth={1201}
        originalHeight={601}
        ratioSource="height"
      >
        {(size: RatioSizeType) => (
          <Image
            testID="internal-image"
            source={ImageExample}
            style={size}
          />
        )}
      </Ratio>,
    );

    fireEvent(result.getByTestId('ratio-instance'), 'layout', fakeLayoutEvent);

    expect(result.toJSON()).toMatchSnapshot();
  });

  it('children element', () => {
    const result = render(
      <Ratio
        testID="ratio-instance"
        originalWidth={1201}
        originalHeight={601}
      >
        <View
          testID="internal-view"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </Ratio>,
    );

    fireEvent(result.getByTestId('ratio-instance'), 'layout', fakeLayoutEvent);

    expect(result.toJSON()).toMatchSnapshot();
  });
});

describe('Ratio styles', () => {
  it('should calculate size by width', () => {
    const result = render(
      <Ratio
        testID="ratio-instance"
        originalWidth={1201}
        originalHeight={601}
        ratioSource="width"
      >
        {(size: RatioSizeType) => (
          <Image
            testID="internal-image"
            source={ImageExample}
            style={size}
          />
        )}
      </Ratio>,
    );

    fireEvent(result.getByTestId('ratio-instance'), 'layout', fakeLayoutEvent);

    const imageInstance = result.getByTestId('internal-image');
    const imageStyles = StyleSheet.flatten(imageInstance.props.style);

    expect(imageStyles).toHaveProperty('width', 320);
    expect(imageStyles).toHaveProperty('height', 160.1332223147377);
  });

  it('should calculate size by height', () => {
    const result = render(
      <Ratio
        testID="ratio-instance"
        originalWidth={1201}
        originalHeight={601}
        ratioSource="height"
      >
        {(size: RatioSizeType) => (
          <Image
            testID="internal-image"
            source={ImageExample}
            style={size}
          />
        )}
      </Ratio>,
    );

    fireEvent(result.getByTestId('ratio-instance'), 'layout', fakeLayoutEvent);

    const imageInstance = result.getByTestId('internal-image');
    const imageStyles = StyleSheet.flatten(imageInstance.props.style);

    expect(imageStyles).toHaveProperty('width', 2158.2029950083192);
    expect(imageStyles).toHaveProperty('height', 1080);
  });

  it('should pass inner styles', () => {
    const result = render(
      <Ratio
        testID="ratio-instance"
        originalWidth={1201}
        originalHeight={601}
        innerStyle={{
          borderRadius: 24,
          overflow: 'hidden',
        }}
      >
        {size => (
          <Image
            testID="internal-image"
            source={ImageExample}
            style={size}
          />
        )}
      </Ratio>,
    );

    fireEvent(result.getByTestId('ratio-instance'), 'layout', fakeLayoutEvent);

    const imageInstance = result.getByTestId('internal-image');
    const imageStyles = StyleSheet.flatten(imageInstance.props.style);

    expect(imageStyles).toHaveProperty('borderRadius', 24);
    expect(imageStyles).toHaveProperty('overflow', 'hidden');
  });

  it('should load size from remote image inner styles', () => {
    const result = render(
      <Ratio
        innerStyle={{
          borderRadius: 24,
          overflow: 'hidden',
        }}
      >
        {(innerStyle, onImageLoadCallback) => (
          <Image
            testID="internal-image"
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png',
            }}
            onLoad={onImageLoadCallback}
            style={innerStyle}
          />
        )}
      </Ratio>,
    );

    fireEvent(result.getByTestId('internal-image'), 'load', fakeImageLoadEvent);

    const imageInstance = result.getByTestId('internal-image');
    const imageStyles = StyleSheet.flatten(imageInstance.props.style);

    expect(imageStyles).toHaveProperty('borderRadius', 24);
    expect(imageStyles).toHaveProperty('overflow', 'hidden');
  });
});
