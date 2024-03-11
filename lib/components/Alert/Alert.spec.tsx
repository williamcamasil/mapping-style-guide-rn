import React from 'react';

import { render } from '@testing-library/react-native';

import Alert from '.';
import { Icons } from '../../assets';
import { DefaultTheme } from '../../theme';
import Text from '../Text';
import { getAlertStyle, getDefaultIcon, getVariantColorStyle } from './utils';

describe('Alert snapshot', () => {
  it('Alert default', () => {
    const tree = render(
      <Alert description="Alert mock description" />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Alert with no description', () => {
    const result = render(
      <Alert />,
    ).toJSON();

    expect(result).toMatchSnapshot();
  });

  it('Alert variant error', () => {
    const result = render(
      <Alert testID="alert" description="Alert mock description" variant="error" />,
    );

    const alert = result.getByTestId('alert');
    const alertDescription = result.getByTestId('alert-description');
    const alertIcon = result.getByTestId('alert-icon');

    expect(alert.props?.style.backgroundColor).toEqual(DefaultTheme.colors.feedbackError100);
    expect(alertDescription.props?.style.color).toEqual(DefaultTheme.colors.feedbackError500);
    expect(alertIcon).toBeDefined();
    expect(result.toJSON()).toMatchSnapshot();
  });

  it('Alert variant warning', () => {
    const result = render(
      <Alert testID="alert" description="Alert mock description" variant="warning" />,
    );

    const alert = result.getByTestId('alert');
    const alertDescription = result.getByTestId('alert-description');
    const alertIcon = result.getByTestId('alert-icon');

    expect(alert.props?.style.backgroundColor).toEqual(DefaultTheme.colors.feedbackAlert100);
    expect(alertDescription.props?.style.color).toEqual(DefaultTheme.colors.feedbackAlert500);
    expect(alertIcon).toBeDefined();
    expect(result.toJSON()).toMatchSnapshot();
  });

  it('Alert info success with default icon', () => {
    const result = render(
      <Alert testID="alert" description="Alert mock description" variant="info" />,
    );

    const alert = result.getByTestId('alert');
    const alertDescription = result.getByTestId('alert-description');
    const alertIcon = result.getByTestId('alert-icon');

    expect(alert.props?.style.backgroundColor).toEqual(DefaultTheme.colors.neutralGray100);
    expect(alertDescription.props?.style.color).toEqual(DefaultTheme.colors.neutralGray600);
    expect(alertIcon).toBeDefined();
    expect(result.toJSON()).toMatchSnapshot();
  });

  it('Alert variant success with default icon', () => {
    const result = render(
      <Alert testID="alert" description="Alert mock description" variant="success" />,
    );

    const alert = result.getByTestId('alert');
    const alertDescription = result.getByTestId('alert-description');
    const alertIcon = result.getByTestId('alert-icon');

    expect(alert.props?.style.backgroundColor).toEqual(DefaultTheme.colors.feedbackSuccess100);
    expect(alertDescription.props?.style.color).toEqual(DefaultTheme.colors.feedbackSuccess500);
    expect(alertIcon).toBeDefined();
    expect(result.toJSON()).toMatchSnapshot();
  });

  it('Alert with icon hidded', () => {
    const result = render(
      <Alert description="Alert mock description" hideIcon />,
    ).toJSON();

    expect(result).toMatchSnapshot();
  });

  it('Alert icon was not show', () => {
    const result = render(
      <Alert description="Alert" hideIcon />,
    );

    expect(() => {
      result.getByTestId('alert-icon');
    }).toThrowError();
  });

  it('Alert with custom icon', () => {
    const result = render(
      <Alert description="Alert mock description" Icon={Icons.Default.EyeOn} />,
    );

    const customIcon = result.getByTestId('alert-custom-icon');

    expect(customIcon).toBeDefined();
    expect(result.toJSON()).toMatchSnapshot();
  });

  it('Alert with description content', () => {
    const result = render(
      <Alert>
        <Text>Mock text description content</Text>
      </Alert>,
    ).toJSON();

    expect(result).toMatchSnapshot();
  });

  it('Alert with custom icon color', () => {
    const result = render(
      <Alert description="Alert mock description" Icon={Icons.Default.EyeOn} iconColor={DefaultTheme.colors.neutralBlack} />,
    );

    const customIcon = result.getByTestId('alert-custom-icon');

    expect(customIcon).toBeDefined();
    expect(result.toJSON()).toMatchSnapshot();
  });
});

describe('utils', () => {
  it('getVariantColorStyle warning', () => {
    const iconColor = getVariantColorStyle('warning');

    expect(iconColor).toEqual('feedbackAlert500');
  });

  it('getVariantColorStyle error', () => {
    const iconColor = getVariantColorStyle('error');

    expect(iconColor).toEqual('feedbackError500');
  });

  it('getVariantColorStyle info', () => {
    const iconColor = getVariantColorStyle('info');

    expect(iconColor).toEqual('neutralGray600');
  });

  it('getVariantColorStyle success', () => {
    const iconColor = getVariantColorStyle('success');

    expect(iconColor).toEqual('feedbackSuccess500');
  });

  it('getDefaultIcon warning', () => {
    const DefaultIcon = getDefaultIcon('warning');

    expect(DefaultIcon).toEqual(Icons.Default.Warning);
  });

  it('getDefaultIcon error', () => {
    const DefaultIcon = getDefaultIcon('error');

    expect(DefaultIcon).toEqual(Icons.Default.Warning);
  });

  it('getDefaultIcon info', () => {
    const DefaultIcon = getDefaultIcon('info');

    expect(DefaultIcon).toEqual(Icons.Default.Information);
  });

  it('getDefaultIcon success', () => {
    const DefaultIcon = getDefaultIcon('success');

    expect(DefaultIcon).toEqual(Icons.Default.Success);
  });

  it('getAlertStyle warning', () => {
    const alertStyle = getAlertStyle(DefaultTheme, 'warning');

    expect(alertStyle.backgroundColor).toEqual(DefaultTheme.colors.feedbackAlert100);
  });

  it('getAlertStyle error', () => {
    const alertStyle = getAlertStyle(DefaultTheme, 'error');

    expect(alertStyle.backgroundColor).toEqual(DefaultTheme.colors.feedbackError100);
  });

  it('getAlertStyle info', () => {
    const alertStyle = getAlertStyle(DefaultTheme, 'info');

    expect(alertStyle.backgroundColor).toEqual(DefaultTheme.colors.neutralGray100);
  });

  it('getAlertStyle success', () => {
    const alertStyle = getAlertStyle(DefaultTheme, 'success');

    expect(alertStyle.backgroundColor).toEqual(DefaultTheme.colors.feedbackSuccess100);
  });
});
