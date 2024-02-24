import React from 'react';

import {
  fireEvent, render, waitFor,
} from '@testing-library/react-native';

import Accordion, { AccordionPropsType } from '.';
import { DefaultTheme } from '../../theme';

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

const renderAccordion = async (props: Omit<AccordionPropsType, 'theme'>) => {
  const handleCollapseEnd = jest.fn();

  const result = render(
    <Accordion
      {...props}
      onCollapseEnd={() => {
        handleCollapseEnd();
        props.onCollapseEnd?.();
      }}
    />,
  );

  const accordionContent = result.getByTestId('accordion-content');
  const accordionTouchable = result.getByTestId('accordion-touchable');

  fireEvent(accordionTouchable, 'layout', fakeHeaderLayoutEvent);
  fireEvent(accordionContent, 'layout', fakeContentLayoutEvent);

  await waitFor(() => {
    expect(handleCollapseEnd).toBeCalled();
  }, { timeout: 2000 });

  return result;
};

describe('Accordion snapshots', () => {
  it('Should match default snapshot', async () => {
    const result = await renderAccordion({
      title: 'My title',
      description: 'My description',
    });
    expect(result.toJSON()).toMatchSnapshot();
  });

  it('Should match snapshot when expanded', async () => {
    const result = await renderAccordion({
      title: 'My title',
      description: 'My description',
      expanded: true,
    });

    expect(result.toJSON()).toMatchSnapshot();
  });
});

describe('Accordion events', () => {
  it('Should have the correct height initially', async () => {
    const result = await renderAccordion({
      testID: 'accordion',
      title: 'My title',
      description: 'My extensive description to change the height of the accordion and test the animation.',
    });

    const accordion = result.getByTestId('accordion').props.style;

    await waitFor(() => {
      expect(accordion.height).toBe(
        fakeHeaderLayoutEvent.nativeEvent.layout.height + DefaultTheme.spacings.lSmall,
      );
    });
  });

  it('Should have the correct height after expanded', async () => {
    const result = await renderAccordion({
      testID: 'accordion',
      title: 'My title',
      description: 'My extensive description to change the height of the accordion and test the animation.',
      expanded: true,
    });

    const accordion = result.getByTestId('accordion').props.style;

    await waitFor(() => {
      expect(accordion.height).toBe(
        fakeContentLayoutEvent.nativeEvent.layout.height,
      );
    });
  });

  it('Should call onCollapseEnd after animation is over', async () => {
    const onPressMock = jest.fn();
    const onCollapseEndMock = jest.fn();

    const result = await renderAccordion({
      testID: 'accordion-component',
      onPress: onPressMock,
      title: 'Title Mock',
      description: 'My extensive description to change the height of the accordion and test the animation.',
      onCollapseEnd: onCollapseEndMock,
    });

    const accordionTouchable = result.getByTestId('accordion-touchable');
    fireEvent.press(accordionTouchable);

    expect(onPressMock).toBeCalled();

    await waitFor(() => {
      expect(onCollapseEndMock).toBeCalled();
    });
  });

  it('Should have its description with numberOfLines equals to 1 when collapsed', async () => {
    const onPressMock = jest.fn();
    const onCollapseEndMock = jest.fn();

    const result = await renderAccordion({
      testID: 'accordion-component',
      onPress: onPressMock,
      title: 'Title Mock',
      description: 'My extensive description to change the height of the accordion and test the animation.',
      onCollapseEnd: onCollapseEndMock,
      expanded: false,
    });

    const accordionDescription = result.getByTestId('accordion-description');

    expect(accordionDescription.props).toHaveProperty('numberOfLines', 1);
  });

  it('Should have its description with numberOfLines as undefined when expanded', async () => {
    const onPressMock = jest.fn();
    const onCollapseEndMock = jest.fn();

    const result = await renderAccordion({
      testID: 'accordion-component',
      onPress: onPressMock,
      title: 'Title Mock',
      description: 'My extensive description to change the height of the accordion and test the animation.',
      onCollapseEnd: onCollapseEndMock,
      expanded: true,
    });

    const accordionDescription = result.getByTestId('accordion-description');

    expect(accordionDescription.props).not.toHaveProperty('numberOfLines');
  });
});
