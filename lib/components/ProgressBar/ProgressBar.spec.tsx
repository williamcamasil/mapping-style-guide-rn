import React from 'react';
import { StyleSheet } from 'react-native';

import { render, within } from '@testing-library/react-native';
import renderer from 'react-test-renderer';

import ProgressBar from '.';
import { DefaultTheme } from '../../theme';
import Progress from './Progress';

describe('ProgressBar events', () => {
  it('Should verify render the component', () => {
    const result = renderer.create(<ProgressBar progress={0} theme={DefaultTheme} size="medium" />);

    expect(result).toBeDefined();
  });

  it('Should input values to with value 0% in Progress', () => {
    const result = render(<ProgressBar progress={0} size="medium" />);

    const progressBarContainer = result.getByTestId('progress-bar-container');
    const progressBar = within(progressBarContainer).UNSAFE_getByType(Progress);

    expect(progressBar.props).toHaveProperty('progress', 0);
  });

  it('Should input values to with value 50% in Progress', () => {
    const result = render(<ProgressBar progress={50} size="medium" />);

    const progressBarContainer = result.getByTestId('progress-bar-container');
    const progressBar = within(progressBarContainer).UNSAFE_getByType(Progress);

    expect(progressBar.props).toHaveProperty('progress', 50);
  });

  it('Should input values to with value 100% in Progress', () => {
    const result = render(<ProgressBar progress={100} size="medium" />);

    const progressBarContainer = result.getByTestId('progress-bar-container');
    const progressBar = within(progressBarContainer).UNSAFE_getByType(Progress);

    expect(progressBar.props).toHaveProperty('progress', 100);
  });

  it('Should have correct width', () => {
    const result = render(<ProgressBar progress={50} size="medium" />);

    const linearGradient = result.getByTestId('progress-linear-gradient');

    const linearGradientStyles = StyleSheet.flatten(linearGradient.props.style);

    expect(linearGradientStyles.width).toBe('50%');
  });

  it('Should ignore negative numbers', () => {
    const result = render(<ProgressBar progress={-10} size="medium" />);

    const linearGradient = result.getByTestId('progress-linear-gradient');

    const linearGradientStyles = StyleSheet.flatten(linearGradient.props.style);

    expect(linearGradientStyles.width).toBe(0);
  });

  it('Should ignore excessive numbers', () => {
    const result = render(<ProgressBar progress={110} size="medium" />);

    const linearGradient = result.getByTestId('progress-linear-gradient');

    const linearGradientStyles = StyleSheet.flatten(linearGradient.props.style);

    expect(linearGradientStyles.width).toBe(0);
  });

  it('Should change type for medium and verify props', () => {
    const result = render(<ProgressBar progress={10} size="medium" />);

    const progress = result.getByTestId('progress-bar-container');

    const progressStyles = StyleSheet.flatten(progress.props.style);

    expect(progressStyles).toHaveProperty('height', 12);
    expect(progressStyles).toHaveProperty('borderWidth', 2);
    expect(progressStyles).toHaveProperty('borderRadius', 6);
  });

  it('Should change type for small and verify props', () => {
    const result = render(<ProgressBar progress={10} size="small" />);

    const progress = result.getByTestId('progress-bar-container');

    const progressStyles = StyleSheet.flatten(progress.props.style);

    expect(progressStyles).toHaveProperty('height', 4);
    expect(progressStyles).toHaveProperty('borderWidth', 1);
    expect(progressStyles).toHaveProperty('borderRadius', 2);
  });
});

describe('ProgressBar snapshots', () => {
  it('default', () => {
    const tree = renderer.create(<ProgressBar progress={0} size="medium" />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('50% in progress', () => {
    const tree = renderer.create(<ProgressBar progress={50} size="medium" />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('100% in progress', () => {
    const tree = renderer.create(<ProgressBar progress={100} size="medium" />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
