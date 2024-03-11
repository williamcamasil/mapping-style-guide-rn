import React from 'react';
import { StyleSheet } from 'react-native';

import { render, within } from '@testing-library/react-native';
import { LinearGradient } from 'expo-linear-gradient';

import MultipleProgressBar from '.';
import { DefaultTheme } from '../../theme';
import Progress from './Progress';
import { MultipleProgressPropsType } from './utils';

const multipleProgress: MultipleProgressPropsType[] = [
  {
    value: 1000,
    colorGradient: ['secondary600', 'secondaryMain'],
  },
  {
    value: 500,
    colorGradient: ['primary700', 'primaryMain'],
  },
  {
    value: 500,
    colorGradient: ['feedbackSuccess500', 'feedbackSuccess400'],
  },
  {
    value: 500,
    colorGradient: ['secondary600', 'secondaryMain'],
  },
];

describe('ProgressBar snapshots', () => {
  it('single progress', () => {
    const tree = render(<MultipleProgressBar progress={multipleProgress.slice(0, 1)} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('two progress', () => {
    const tree = render(<MultipleProgressBar progress={multipleProgress.slice(0, 2)} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('multiple progress', () => {
    const tree = render(<MultipleProgressBar progress={multipleProgress} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe('ProgressBar tests', () => {
  it('Should render single progress', () => {
    const progressList = [multipleProgress[0]];

    const component = render(<MultipleProgressBar progress={progressList} />);

    const container = within(component.getByTestId('container-multiple-progress'));

    const progressComponent = container.UNSAFE_getAllByType(Progress);

    expect(progressComponent.length).toEqual(1);
  });

  it('Should render single progress and verify colors', () => {
    const progressList = [multipleProgress[0]];

    const component = render(<MultipleProgressBar progress={progressList} />);

    const container = within(component.getByTestId('container-multiple-progress'));

    const progressComponent = container.UNSAFE_getByType(Progress);

    expect(progressComponent.props).toHaveProperty('progress', progressList[0].value);
    expect(progressComponent.props).toHaveProperty('startColor', progressList[0].colorGradient[0]);
    expect(progressComponent.props).toHaveProperty('endColor', progressList[0].colorGradient[1]);
  });

  it('Should render single progress and verify colors default when is undefined in object', () => {
    const progressList = [multipleProgress[multipleProgress.length - 1]];

    const component = render(<MultipleProgressBar progress={progressList} />);

    const container = within(component.getByTestId('container-multiple-progress'));

    const progressComponent = container.UNSAFE_getByType(Progress);
    const linearGradientComponent = container.UNSAFE_getByType(LinearGradient);

    expect(progressComponent.props).toHaveProperty('progress', progressList[0].value);
    expect(progressComponent.props).toHaveProperty('startColor', progressList[0].colorGradient[0]);
    expect(progressComponent.props).toHaveProperty('endColor', progressList[0].colorGradient[1]);

    const colors = [DefaultTheme.colors.secondary600, DefaultTheme.colors.secondaryMain];

    expect(linearGradientComponent.props).toHaveProperty('colors', colors);
  });

  it('Should render two progress with style marginRight separator', () => {
    const progressList = [multipleProgress[0], multipleProgress[1]];

    const component = render(<MultipleProgressBar progress={progressList} />);

    const container = within(component.getByTestId('container-multiple-progress'));

    const progressComponent = container.UNSAFE_getAllByType(Progress);

    const firstProgressStyled = StyleSheet.flatten(progressComponent[0].props.style);
    const lastProgressStyled = StyleSheet.flatten(progressComponent[0].props.style);

    expect(progressComponent.length).toEqual(2);
    expect(firstProgressStyled).toHaveProperty('marginRight', 3);
    expect(lastProgressStyled).toHaveProperty('marginRight', 3);
  });

  it('Should render two progress and verify colors', () => {
    const progressList = [multipleProgress[0], multipleProgress[1]];

    const component = render(<MultipleProgressBar progress={progressList} />);

    const container = within(component.getByTestId('container-multiple-progress'));

    const progressComponent = container.UNSAFE_getAllByType(Progress);

    progressComponent.forEach((progress, index) => {
      expect(progress.props).toHaveProperty('startColor', progressList[index].colorGradient[0]);
      expect(progress.props).toHaveProperty('endColor', progressList[index].colorGradient[1]);
    });
  });
});
