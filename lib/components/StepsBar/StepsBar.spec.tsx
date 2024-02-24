import React from 'react';

import { render, within } from '@testing-library/react-native';

import StepsBar from '.';
import Progress from '../ProgressBar/Progress';

describe('StepsBar events', () => {
  it('Should verify render the component', () => {
    const result = render(<StepsBar step={1} totalSteps={5} size="medium" />);

    expect(result).toBeDefined();
  });

  it('Should verify if progressbar will render with correct value', () => {
    const step = 1;
    const totalSteps = 5;

    const result = render(<StepsBar step={step} totalSteps={totalSteps} size="medium" />);

    const progressBarContainer = result.getByTestId('progress-bar-container');
    const progressBar = within(progressBarContainer).UNSAFE_getByType(Progress);

    const onePercent = (100 / totalSteps) * step;

    expect(progressBar.props).toHaveProperty('progress', onePercent);
  });

  it('Should verify if value of step will to render', () => {
    const result = render(<StepsBar step={1} totalSteps={5} size="medium" />);

    const stepText = result.getByTestId('steps-bar-step-text');

    expect(stepText.props.children).toBe(1);
  });

  it('Should verify if value of totalSteps will to render', () => {
    const result = render(<StepsBar step={1} totalSteps={5} size="medium" />);

    const stepText = result.getByTestId('steps-bar-total-text');

    expect(stepText.props.children).toBe(5);
  });

  it('Should not throw error if totalSteps is zero', () => {
    const step = 0;
    const totalSteps = 0;

    const result = render(<StepsBar step={step} totalSteps={totalSteps} size="medium" />);

    const stepText = result.getByTestId('steps-bar-total-text');

    expect(stepText.props.children).toBe(0);
  });
});

describe('Snapshot to StepsBar', () => {
  it('Snapshot initial', () => {
    const result = render(<StepsBar step={1} totalSteps={5} size="medium" />).toJSON();

    expect(result).toMatchSnapshot();
  });

  it('Snapshot fifty percent of progress', () => {
    const result = render(<StepsBar step={2.5} totalSteps={5} size="medium" />).toJSON();

    expect(result).toMatchSnapshot();
  });

  it('Snapshot hundred percent of progress', () => {
    const result = render(<StepsBar step={5} totalSteps={5} size="medium" />).toJSON();

    expect(result).toMatchSnapshot();
  });
});
