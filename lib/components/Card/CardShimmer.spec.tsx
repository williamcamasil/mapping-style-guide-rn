import React from 'react';
import { StyleSheet } from 'react-native';

import { render, fireEvent, within } from '@testing-library/react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

import { DefaultTheme } from '../../theme';
import Container from '../Container';
import CardShimmer from './CardShimmer';

describe('CardShimmer', () => {

  it('Should load shimmer with active', () => {
    const result = render(<CardShimmer size="big" />);

    const shimmer = result.getByTestId('shimmer-id');
    const shimmerPlaceHolder = within(shimmer).UNSAFE_getByType(ShimmerPlaceholder);
    const shimmerStyled = StyleSheet.flatten(shimmerPlaceHolder.props.shimmerStyle);

    expect(shimmerStyled).toHaveProperty('minHeight', 128);
  });

  it('Should load shimmer with active with container and size equals to small', () => {
    const result = render(
      <Container padding={DefaultTheme.spacings.sLarge}>
        <CardShimmer size="small" />
      </Container>,
    );

    const shimmer = result.getByTestId('shimmer-id');
    const shimmerPlaceHolder = within(shimmer).UNSAFE_getByType(ShimmerPlaceholder);
    const shimmerStyled = StyleSheet.flatten(shimmerPlaceHolder.props.shimmerStyle);

    expect(shimmerStyled).toHaveProperty('width', 135);
    expect(shimmerStyled).toHaveProperty('height', 120);
  });

  it('Should load shimmer with active container and size equals to big', () => {
    const result = render(<CardShimmer size="big" />);

    const shimmer = result.getByTestId('shimmer-id');
    const shimmerPlaceHolder = within(shimmer).UNSAFE_getByType(ShimmerPlaceholder);
    const shimmerStyled = StyleSheet.flatten(shimmerPlaceHolder.props.shimmerStyle);

    expect(shimmerStyled).toHaveProperty('minHeight', 128);
  });

  it('Should loading active and verify colors to component', () => {
    const result = render(<CardShimmer size="big" />);

    const colors = [
      DefaultTheme.colors.neutralGray300,
      DefaultTheme.colors.neutralGray200,
      DefaultTheme.colors.neutralGray300,
    ];

    const shimmer = result.getByTestId('shimmer-id');
    const shimmerPlaceHolder = within(shimmer).UNSAFE_getByType(ShimmerPlaceholder);

    expect(shimmerPlaceHolder.props.shimmerColors).toEqual(colors);
  });

  it('Should load shimmer and call onLayout event to load width', () => {
    const result = render(<CardShimmer size="big" />);

    const shimmer = result.getByTestId('shimmer-id');

    fireEvent(shimmer, 'layout', {
      nativeEvent: { layout: { width: 300 } },
    });

    const shimmerPlaceHolder = within(shimmer).UNSAFE_getByType(ShimmerPlaceholder);

    expect(shimmerPlaceHolder.props).toHaveProperty('width', 300);
  });
});

describe('snapshot', () => {
  it('Should loading active with container and size equals to small', () => {
    const result = render(
      <Container padding={DefaultTheme.spacings.sLarge}>
        <CardShimmer size="small" />
      </Container>,
    );

    expect(result.toJSON()).toMatchSnapshot();
  });

  it('Should loading active with container and size equals to big', () => {
    const result = render(<CardShimmer size="big" />);

    expect(result.toJSON()).toMatchSnapshot();
  });
});
