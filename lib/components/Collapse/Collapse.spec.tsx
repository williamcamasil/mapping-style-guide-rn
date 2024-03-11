import React from 'react';

import {
  fireEvent, render, waitFor,
} from '@testing-library/react-native';

import Collapse, { CollapsePropsType } from '.';
import { DefaultTheme } from '../../theme';
import Text from '../Text';

const fakeHeaderLayoutEvent = {
  nativeEvent: {
    layout: {
      height: 50,
    },
  },
};

const fakeContentLayoutEvent = {
  nativeEvent: {
    layout: {
      height: 200,
    },
  },
};

const renderCollapse = async (props: Omit<CollapsePropsType, 'theme'>) => {
  const handleCollapseEnd = jest.fn();

  const result = render(
    <Collapse
      {...props}
      onCollapseEnd={() => {
        handleCollapseEnd();
        props.onCollapseEnd?.();
      }}
    />,
  );

  const collapseContent = result.getByTestId('collapse-content');
  const collapseTouchable = result.getByTestId('collapse-touchable');

  fireEvent(collapseTouchable, 'layout', fakeHeaderLayoutEvent);
  fireEvent(collapseContent, 'layout', fakeContentLayoutEvent);

  await waitFor(() => {
    expect(handleCollapseEnd).toBeCalled();
  }, { timeout: 2000 });

  return result;
};

describe('Collapse snapshots', () => {
  it('default', async () => {
    const result = await renderCollapse({
      title: 'My title',
    });
    expect(result.toJSON()).toMatchSnapshot();
  });

  it('description', async () => {
    const result = await renderCollapse({
      title: 'My title',
      description: 'My description',
    });
    expect(result.toJSON()).toMatchSnapshot();
  });

  it('children', async () => {
    const result = await renderCollapse({
      title: 'My title',
      description: 'My description',
      children: (
        <Text>My children</Text>
      ),
    });
    expect(result.toJSON()).toMatchSnapshot();
  });

  it('expanded', async () => {
    const result = await renderCollapse({
      title: 'My title',
      description: 'My description',
      children: (
        <Text>My children</Text>
      ),
      expanded: true,
    });

    expect(result.toJSON()).toMatchSnapshot();
  });
});

describe('Collapse events', () => {
  it('collapsed height', async () => {
    const result = await renderCollapse({
      testID: 'collapse',
      title: 'My title',
      description: 'My description',
      children: (
        <Text>My children</Text>
      ),
    });

    const collapse = result.getByTestId('collapse').props.style;

    await waitFor(() => {
      expect(collapse.height).toBe(
        fakeHeaderLayoutEvent.nativeEvent.layout.height + DefaultTheme.spacings.sMedium,
      );
    });
  });

  it('expanded height', async () => {
    const result = await renderCollapse({
      testID: 'collapse',
      title: 'My title',
      description: 'My description',
      children: (
        <Text>My children</Text>
      ),
      expanded: true,
    });

    const collapse = result.getByTestId('collapse').props.style;

    await waitFor(() => {
      expect(collapse.height).toBe(
        fakeContentLayoutEvent.nativeEvent.layout.height,
      );
    });
  });

  it('Collapse animation', async () => {
    const onPressMock = jest.fn();
    const onCollapseEndMock = jest.fn();

    const result = await renderCollapse({
      testID: 'collapse-component',
      onPress: onPressMock,
      title: 'Title Mock',
      description: 'Description Mock',
      onCollapseEnd: onCollapseEndMock,
      children: (
        <Text>Text content</Text>
      ),
    });

    const collapseTouchable = result.getByTestId('collapse-touchable');
    fireEvent.press(collapseTouchable);

    expect(onPressMock).toBeCalled();

    await waitFor(() => {
      expect(onCollapseEndMock).toBeCalled();
    });
  });

  it('Should verify if property numberOfLine is equals to 1', async () => {
    const onPressMock = jest.fn();
    const onCollapseEndMock = jest.fn();

    const result = await renderCollapse({
      testID: 'collapse-component',
      onPress: onPressMock,
      title: 'Title Mock',
      description: 'Description Mock',
      onCollapseEnd: onCollapseEndMock,
      children: (
        <Text>Text content</Text>
      ),
    });

    const collapseTitle = result.getByTestId('collapse-title');

    expect(collapseTitle.props).toHaveProperty('numberOfLines', 1);
  });

  it('Should verify if property numberOfLine is equals to 0', async () => {
    const onPressMock = jest.fn();
    const onCollapseEndMock = jest.fn();

    const result = await renderCollapse({
      testID: 'collapse-component',
      onPress: onPressMock,
      title: 'Title Mock',
      description: 'Description Mock',
      onCollapseEnd: onCollapseEndMock,
      titleNumberOfLines: 0,
      children: (
        <Text>Text content</Text>
      ),
    });

    const collapseTitle = result.getByTestId('collapse-title');

    expect(collapseTitle.props).toHaveProperty('numberOfLines', 0);
  });
});
