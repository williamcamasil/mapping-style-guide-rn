import React from 'react';

import { render } from '@testing-library/react-native';

import LoadingContainer from '.';
import { Colors } from '../../tokens/colors';
import Loading from '../Loading';

describe('LoadingContainer snapshot', () => {
  it('Should render the default appearance', () => {
    const tree = render(<LoadingContainer />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should not show the loading container', () => {
    const tree = render(<LoadingContainer visible={false} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render the secondary variant', () => {
    const tree = render(<LoadingContainer variant="secondary" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render the secondary variant with Text', () => {
    const tree = render(<LoadingContainer variant="secondary" loadingText="Sending" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render the white variant', () => {
    const tree = render(<LoadingContainer variant="white" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render the white variant with Text', () => {
    const tree = render(<LoadingContainer variant="white" loadingText="Sending" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render the loading container with text', () => {
    const tree = render(<LoadingContainer loadingText="Sending data" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render the loading container with secondaryMain as the background color', () => {
    const tree = render(<LoadingContainer backgroundColor={Colors.secondaryMain} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render the loading text with the secondaryMain as color', () => {
    const tree = render(<LoadingContainer loadingTextColor="secondaryMain" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render the loading container with custom gradient colors', () => {
    const customGradientBackgroundColors = [Colors.feedbackAlert200, Colors.feedbackError200];
    const tree = render(<LoadingContainer customGradientBackgroundColors={customGradientBackgroundColors} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render the loading container correctly when an unknown variant is obtained', () => {
    const variant: any = 'text';
    const tree = render(<LoadingContainer variant={variant} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('Should render the loading container correctly when an unknown variant is obtained (with text)', () => {
    const variant: any = 'text';
    const tree = render(<LoadingContainer variant={variant} loadingText="Sending" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render the loading container correctly with custom colors', () => {
    const tree = render(<LoadingContainer
      loadingTextColor="feedbackAlert500"
      loadingBackgroundColor="feedbackSuccess500"
    />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render the loading container correctly with custom colors (with text)', () => {
    const tree = render(<LoadingContainer
      loadingText="Sending"
      loadingTextColor="feedbackAlert500"
      loadingBackgroundColor="feedbackSuccess500"
    />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe('LoadingContainer events', () => {
  it('Should render the loading component with the feedbackSuccess100 color', () => {
    const result = render(<LoadingContainer loadingColor="feedbackSuccess100" />);

    const loading = result.UNSAFE_getByType(Loading);

    expect(loading.props.color).toBe('feedbackSuccess100');
  });

  it('Should render the loading circle with a size of 55', () => {
    const result = render(<LoadingContainer loadingCircleSize={55} />);

    const loading = result.UNSAFE_getByType(Loading);

    expect(loading.props.circleSize).toBe(55);
  });
});
