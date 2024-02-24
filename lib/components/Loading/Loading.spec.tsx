import React from 'react';
import { StyleSheet, View as RNView, Animated as RNAnimated } from 'react-native';

import { render } from '@testing-library/react-native';

import Loading from '.';
import { DefaultTheme } from '../../theme';
import { getCircleBorderColor, getCircleBackgroundColor } from './utils';

describe('Loading', () => {

  it('renders correctly', () => {
    render(<Loading circleSize={8} color="neutralWhite" />);
  });

  it('Have a property size in a circle', () => {
    const testRenderer = render(<Loading circleSize={8} color="neutralWhite" />);

    const nativeInstance = testRenderer.UNSAFE_getAllByType(RNView);
    const nativeStyle = StyleSheet.flatten(nativeInstance[1].props.style);

    expect(nativeStyle).toHaveProperty('width', 8);
    expect(nativeStyle).toHaveProperty('height', 8);
  });

  it('Have a property color', () => {
    const testRenderer = render(<Loading circleSize={8} color="neutralWhite" />);

    const nativeInstance = testRenderer.UNSAFE_getAllByType(RNAnimated.View);
    const nativeStyle = StyleSheet.flatten(nativeInstance[0].props.style);

    expect(nativeStyle).toHaveProperty('backgroundColor', '#FFFFFF');
  });

  it('Unmount component', () => {
    const { unmount } = render(<Loading circleSize={8} color="neutralWhite" />);
    unmount();
  });
});

describe('Utils', () => {
  it('getCircleBackgroundColor', () => {
    const colorString = getCircleBackgroundColor(DefaultTheme, 'primaryMain');
    expect(colorString).toEqual(DefaultTheme.colors.primaryMain);
  });

  it('getCircleBorderColor', () => {
    const colorString = getCircleBorderColor(DefaultTheme, 'primaryMain');
    expect(colorString).toEqual('hsla(19.19999999999999, 84.2%, 49.6%, 0.6)');
  });
});

describe('Loading snapshot', () => {
  it('default', () => {
    const tree = render(<Loading circleSize={8} color="neutralWhite" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
