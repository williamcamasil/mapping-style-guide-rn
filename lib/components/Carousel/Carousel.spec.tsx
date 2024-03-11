import React, { createRef, ReactNode } from 'react';
import { Image } from 'react-native';

import {
  render, fireEvent, waitFor, act,
} from '@testing-library/react-native';

import Carousel, { CarouselRefType } from '.';
import { DefaultTheme } from '../../theme';
import Container from '../Container';
import Banner1 from './Banner1';
import Banner2 from './Banner2';
import Banner3 from './Banner3';

const data: ReactNode[] = [
  <Container centered>
    <Image
      testID="image-banner1"
      source={Banner1}
      style={{
        width: '100%',
      }}
    />
  </Container>,
  <Container centered>
    <Image
      testID="image-banner2"
      source={Banner2}
      style={{
        width: '100%',
      }}
    />
  </Container>,
  <Container centered>
    <Image
      testID="image-banner3"
      source={Banner3}
      style={{
        width: '100%',
      }}
    />
  </Container>,
];

describe('Carousel', () => {
  it('Carousel snapshot', () => {
    const carouselRef = createRef<CarouselRefType>();

    const result = render(
      <Carousel
        innerRef={carouselRef}
        data={data}
        style={{ height: 475, flex: 0 }}
        pointersContainerStyle={{ marginLeft: 20, justifyContent: 'flex-start' }}
        autoPlay={false}
        originalWidth={375}
        originalHeight={384}
      />,
    ).toJSON();

    expect(result).toMatchSnapshot();
  });

  it('Should render the banners', () => {
    const result = render(
      <Carousel
        data={data}
        style={{ height: 475, flex: 0 }}
        pointersContainerStyle={{ marginLeft: 20, justifyContent: 'flex-start' }}
        autoPlay={false}
        originalWidth={375}
        originalHeight={384}
      />,
    );

    result.getByTestId('image-banner1');
    result.getByTestId('image-banner2');
    result.getByTestId('image-banner3');
  });

  it('Should render one pointer per element within data totaling 3 rendered pointers', () => {
    const result = render(
      <Carousel
        data={data}
        style={{ height: 475, flex: 0 }}
        pointersContainerStyle={{ marginLeft: 20, justifyContent: 'flex-start' }}
        autoPlay={false}
        originalWidth={375}
        originalHeight={384}
      />,
    );

    const pointers = result.getAllByTestId('item-pointer');

    expect(pointers.length).toBe(3);
  });

  it(`Should call function goToNext in ref to change banner and modify pointer checked position 
  for the next`, async () => {
    const carouselRef = createRef<CarouselRefType>();

    const result = render(
      <Carousel
        innerRef={carouselRef}
        data={data}
        style={{ height: 475, flex: 0 }}
        pointersContainerStyle={{ marginLeft: 20, justifyContent: 'flex-start' }}
        autoPlay={false}
        originalWidth={375}
        originalHeight={384}
      />,
    );

    await waitFor(() => {
      expect(carouselRef.current?.flatListRef.current).toBeDefined();
    });

    act(() => carouselRef.current?.goToNext());

    fireEvent(result.getByTestId('carousel-flat-list-id'), 'onViewableItemsChanged', {
      viewableItems: [{
        index: 1,
      }],
      changed: [],
    });

    const containerPointers = result.getByTestId('container-pointers');

    expect(containerPointers.props.children[0].props).toHaveProperty('color', DefaultTheme.colors.neutralGray300);
    expect(containerPointers.props.children[0].props).toHaveProperty('fill', undefined);

    expect(containerPointers.props.children[1].props).toHaveProperty('color', DefaultTheme.colors.primary200);
    expect(containerPointers.props.children[1].props).toHaveProperty('fill', DefaultTheme.colors.primaryMain);

  });

  it(`Should call the goToPrevious function in ref to change the banner and modify the position of the
pointer to previous`, async () => {
    const carouselRef = createRef<CarouselRefType>();

    const result = render(
      <Carousel
        innerRef={carouselRef}
        data={data}
        style={{ height: 475, flex: 0 }}
        pointersContainerStyle={{ marginLeft: 20, justifyContent: 'flex-start' }}
        autoPlay={false}
        originalWidth={375}
        originalHeight={384}
      />,
    );

    await waitFor(() => {
      expect(carouselRef.current?.flatListRef.current).toBeDefined();
    });

    act(() => carouselRef.current?.goToNext());
    act(() => carouselRef.current?.goToPrevious());

    const containerPointers = result.getByTestId('container-pointers');

    expect(containerPointers.props.children[1].props).toHaveProperty('color', DefaultTheme.colors.neutralGray300);
    expect(containerPointers.props.children[1].props).toHaveProperty('fill', undefined);

    expect(containerPointers.props.children[0].props).toHaveProperty('color', DefaultTheme.colors.primary200);
    expect(containerPointers.props.children[0].props).toHaveProperty('fill', DefaultTheme.colors.primaryMain);
  });

  it('Should call the goToNext function passing from the last element to the first', async () => {
    const carouselRef = createRef<CarouselRefType>();

    const result = render(
      <Carousel
        innerRef={carouselRef}
        data={data}
        style={{ height: 475, flex: 0 }}
        pointersContainerStyle={{ marginLeft: 20, justifyContent: 'flex-start' }}
        autoPlay={false}
        originalWidth={375}
        originalHeight={384}
      />,
    );

    fireEvent(result.getByTestId('carousel-flat-list-id'), 'onViewableItemsChanged', {
      viewableItems: [{
        index: 2,
      }],
      changed: [],
    });

    await waitFor(() => {
      expect(carouselRef.current?.flatListRef.current).toBeDefined();
    });

    act(() => carouselRef.current?.goToNext());

    fireEvent(result.getByTestId('carousel-flat-list-id'), 'onViewableItemsChanged', {
      viewableItems: [{
        index: 0,
      }],
      changed: [],
    });

    const containerPointers = result.getByTestId('container-pointers');

    expect(containerPointers.props.children[2].props).toHaveProperty('color', DefaultTheme.colors.neutralGray300);
    expect(containerPointers.props.children[2].props).toHaveProperty('fill', undefined);

    expect(containerPointers.props.children[0].props).toHaveProperty('color', DefaultTheme.colors.primary200);
    expect(containerPointers.props.children[0].props).toHaveProperty('fill', DefaultTheme.colors.primaryMain);
  });

  it('Should call the goToPrevios function on the first element to go to the last element', async () => {
    const carouselRef = createRef<CarouselRefType>();

    const result = render(
      <Carousel
        innerRef={carouselRef}
        data={data}
        style={{ height: 475, flex: 0 }}
        pointersContainerStyle={{ marginLeft: 20, justifyContent: 'flex-start' }}
        originalWidth={375}
        originalHeight={384}
      />,
    );

    act(() => carouselRef.current?.goToPrevious());

    fireEvent(result.getByTestId('carousel-flat-list-id'), 'onViewableItemsChanged', {
      viewableItems: [{
        index: 2,
      }],
      changed: [],
    });

    const containerPointers = result.getByTestId('container-pointers');

    expect(containerPointers.props.children[0].props).toHaveProperty('color', DefaultTheme.colors.neutralGray300);
    expect(containerPointers.props.children[0].props).toHaveProperty('fill', undefined);

    expect(containerPointers.props.children[2].props).toHaveProperty('color', DefaultTheme.colors.primary200);
    expect(containerPointers.props.children[2].props).toHaveProperty('fill', DefaultTheme.colors.primaryMain);
  });

  it('Should call event onViewableItemsChanged and call method onItemChange with index value 1', async () => {
    const carouselRef = createRef<CarouselRefType>();
    const onItemChange = jest.fn();

    const result = render(
      <Carousel
        innerRef={carouselRef}
        data={data}
        style={{ height: 475, flex: 0 }}
        pointersContainerStyle={{ marginLeft: 20, justifyContent: 'flex-start' }}
        onItemChange={onItemChange}
        originalWidth={375}
        originalHeight={384}
      />,
    );

    fireEvent(result.getByTestId('carousel-flat-list-id'), 'onViewableItemsChanged', {
      viewableItems: [{
        index: 1,
      }],
      changed: [],
    });

    await waitFor(() => expect(onItemChange).toHaveBeenCalledWith(1));
  });

  it('Should call onViewableItemsChanged event and pass viewableItems as undefined not calling onItemChange function', async () => {
    const carouselRef = createRef<CarouselRefType>();
    const onItemChange = jest.fn();

    const result = render(
      <Carousel
        innerRef={carouselRef}
        data={data}
        style={{ height: 475, flex: 0 }}
        pointersContainerStyle={{ marginLeft: 20, justifyContent: 'flex-start' }}
        onItemChange={onItemChange}
        originalWidth={375}
        originalHeight={384}
      />,
    );

    fireEvent(result.getByTestId('carousel-flat-list-id'), 'onViewableItemsChanged', {
      viewableItems: null,
      changed: [],
    });

    await waitFor(() => expect(onItemChange).not.toHaveBeenCalled());
  });

  it('Should call event onLayout to set values to listLayout', () => {
    const result = render(
      <Carousel
        data={data}
        style={{ height: 475, flex: 0 }}
        pointersContainerStyle={{ marginLeft: 20, justifyContent: 'flex-start' }}
        originalWidth={375}
        originalHeight={384}
      />,
    );

    fireEvent(result.getByTestId('carousel-flat-list-id'), 'layout', {
      nativeEvent: { layout: { width: 300, height: 450 } },
    });

    const itemContainer = result.getAllByTestId('item-container-carousel');

    expect(itemContainer[0].props.style).toHaveProperty('width', 300);
    expect(itemContainer[0].props.style).toHaveProperty('height', 450);
  });

  it('Should call the function scrollToIndex in the period set in intervalToTimeoutMilliseconds', async () => {
    const onItemChange = jest.fn();

    const carouselRef = createRef<CarouselRefType>();

    render(
      <Carousel
        innerRef={carouselRef}
        data={data}
        style={{ height: 475, flex: 0 }}
        pointersContainerStyle={{ marginLeft: 20, justifyContent: 'flex-start' }}
        onItemChange={onItemChange}
        autoPlayIntervalMilliseconds={10}
        originalWidth={375}
        originalHeight={384}
      />,
    );

    await waitFor(() => {
      expect(carouselRef.current?.flatListRef.current).toBeDefined();
    });

    const spyScrollToIndex = jest.spyOn(carouselRef.current!.flatListRef.current!, 'scrollToIndex');

    await waitFor(() => {
      expect(spyScrollToIndex).toHaveBeenCalledWith({ animated: true, index: 1 });
    });
  });

  it('Should not call the function scrollToIndex after set useTimer to false', async () => {
    const onItemChange = jest.fn();

    const carouselRef = createRef<CarouselRefType>();

    render(
      <Carousel
        innerRef={carouselRef}
        data={data}
        style={{ height: 475, flex: 0 }}
        pointersContainerStyle={{ marginLeft: 20, justifyContent: 'flex-start' }}
        onItemChange={onItemChange}
        autoPlay={false}
        originalWidth={375}
        originalHeight={384}
      />,
    );

    await waitFor(() => {
      expect(carouselRef.current?.flatListRef.current).toBeDefined();
    });

    const spyScrollToIndex = jest.spyOn(carouselRef.current!.flatListRef.current!, 'scrollToIndex');

    expect(spyScrollToIndex).not.toHaveBeenCalled();
  });

  it('Should call the function scrollToIndex after the default time of 4s', async () => {
    const onItemChange = jest.fn();

    const carouselRef = createRef<CarouselRefType>();

    render(
      <Carousel
        innerRef={carouselRef}
        data={data}
        style={{ height: 475, flex: 0 }}
        pointersContainerStyle={{ marginLeft: 20, justifyContent: 'flex-start' }}
        onItemChange={onItemChange}
        originalWidth={375}
        originalHeight={384}
      />,
    );

    await waitFor(() => {
      expect(carouselRef.current?.flatListRef.current).toBeDefined();
    });

    const spyScrollToIndex = jest.spyOn(carouselRef.current!.flatListRef.current!, 'scrollToIndex');

    await waitFor(() => {
      expect(spyScrollToIndex).toHaveBeenCalled();
    }, { timeout: 5000 });
  });
});
