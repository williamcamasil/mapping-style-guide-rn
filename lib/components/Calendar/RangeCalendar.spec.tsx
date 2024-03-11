import React from 'react';

import {
  fireEvent, render,
} from '@testing-library/react-native';
import { addMonths } from 'date-fns';
import { dateToString } from 'mapping-context-rn';

import RangeCalendar, { RangeDateType } from './RangeCalendar';

describe('RangeCalendar', () => {
  it('Should match snapshot of calendar with initial value', () => {
    const fakeFunction = jest.fn();

    const calendar = render(<RangeCalendar onChange={fakeFunction} value={{ start: '2021-06-20', end: '2021-06-25' }} />);

    expect(calendar.toJSON()).toMatchSnapshot();
  });

  it('Should click on button arrowRight and go to next month', () => {
    const fakeFunction = jest.fn();

    const initialValue: RangeDateType = { start: '2023-06-20', end: '2023-06-25' };

    const { getByTestId, queryByTestId } = render(<RangeCalendar value={initialValue} onChange={fakeFunction} />);

    const button = getByTestId('button-arrow-right');

    fireEvent.press(button);

    expect(queryByTestId('name-month-and-year')?.props.children).toBe('julho 2023');
  });

  it('Should click on button arrowRight and go to next month when there is no initialValue', () => {
    const fakeFunction = jest.fn();

    const nextMonth = dateToString(addMonths(new Date(), 1), 'MMMM yyyy');
    const { getByTestId, queryByTestId } = render(<RangeCalendar onChange={fakeFunction} />);

    const button = getByTestId('button-arrow-right');

    fireEvent.press(button);

    expect(queryByTestId('name-month-and-year')?.props.children).toBe(nextMonth);
  });

  it('Should click on button arrowLeft and go to previous month', async () => {
    const fakeFunction = jest.fn();

    const initialValue: RangeDateType = { start: '2023-01-01', end: '2023-01-25' };

    const { getByTestId, queryByTestId } = render(<RangeCalendar value={initialValue} onChange={fakeFunction} />);

    const button = getByTestId('button-arrow-left');

    fireEvent.press(button);

    expect(queryByTestId('name-month-and-year')?.props.children).toBe('dezembro 2022');
  });

  it('Should load current month if no initial value is passed', () => {
    const fakeFunction = jest.fn();

    const result = render(<RangeCalendar onChange={fakeFunction} />);

    const currentDate = dateToString(new Date(), 'MMMM yyyy');

    expect(result.queryByTestId('name-month-and-year')?.props.children).toBe(currentDate);
  });

  it('Should update value after select in calendar', () => {
    const fakeFunction = jest.fn();

    const result = render(<RangeCalendar onChange={fakeFunction} />);

    const currentYear = dateToString(new Date(), 'yyyy');
    const currentMonth = dateToString(new Date(), 'MM');
    const startDay = `${currentYear}-${currentMonth}-02`;
    const endDay = `${currentYear}-${currentMonth}-04`;

    const startDayButton = result.getByTestId(`range-calendar.day_${startDay}`);

    fireEvent.press(startDayButton);

    expect(fakeFunction).toHaveBeenCalledWith({ start: startDay });

    const endDayButton = result.getByTestId(`range-calendar.day_${endDay}`);

    fireEvent.press(endDayButton);

    expect(fakeFunction).toHaveBeenCalledWith({ start: startDay, end: endDay });
  });

  it('Should switch dates if endDate is before start date', () => {
    const fakeFunction = jest.fn();

    const result = render(<RangeCalendar onChange={fakeFunction} />);

    const currentYear = dateToString(new Date(), 'yyyy');
    const currentMonth = dateToString(new Date(), 'MM');
    const firstDay = `${currentYear}-${currentMonth}-03`;
    const secondDay = `${currentYear}-${currentMonth}-01`;

    const startDayButton = result.getByTestId(`range-calendar.day_${firstDay}`);

    fireEvent.press(startDayButton);

    expect(fakeFunction).toHaveBeenCalledWith({ start: firstDay });

    const endDayButton = result.getByTestId(`range-calendar.day_${secondDay}`);

    fireEvent.press(endDayButton);

    expect(fakeFunction).toHaveBeenCalledWith({ start: secondDay, end: firstDay });
  });

  it('Should reset dates and set start date if start and end date are already selected', () => {
    const fakeFunction = jest.fn();

    const initialValue: RangeDateType = { start: '2023-06-20' };

    const result = render(<RangeCalendar value={initialValue} onChange={fakeFunction} />);

    const endDayButton = result.getByTestId('range-calendar.day_2023-06-23');

    fireEvent.press(endDayButton);

    expect(fakeFunction).toHaveBeenCalledWith({ start: '2023-06-20', end: '2023-06-23' });

    const startDayButton = result.getByTestId('range-calendar.day_2023-06-25');

    fireEvent.press(startDayButton);

    expect(fakeFunction).toHaveBeenCalledWith({ start: '2023-06-25' });
  });

  it('Should clear dates', () => {
    const fakeFunction = jest.fn();

    const initialValue: RangeDateType = { start: '2023-06-20', end: '2023-06-25' };

    const result = render(<RangeCalendar value={initialValue} onChange={fakeFunction} />);

    const clearButton = result.getByText('Limpar');

    fireEvent.press(clearButton);

    expect(fakeFunction).toHaveBeenCalledWith(undefined);
  });

  it('Should disable clear button if no date is selected', () => {
    const fakeFunction = jest.fn();

    const result = render(<RangeCalendar onChange={fakeFunction} />);

    const clearButton = result.getByText('Limpar');

    expect(clearButton).toBeDisabled();
  });

  it('Should not disable clear button if one date is selected', () => {
    const fakeFunction = jest.fn();

    const currentYear = dateToString(new Date(), 'yyyy');
    const currentMonth = dateToString(new Date(), 'MM');
    const day = `${currentYear}-${currentMonth}-01`;

    const result = render(<RangeCalendar onChange={fakeFunction} />);

    const dayButton = result.getByTestId(`range-calendar.day_${day}`);

    fireEvent.press(dayButton);

    const clearButton = result.getByText('Limpar');

    expect(clearButton).not.toBeDisabled();
  });

  it('Should call onApply when clicking on apply button', () => {
    const onChange = jest.fn();
    const onApply = jest.fn();

    const initialValue: RangeDateType = { start: '2023-06-20', end: '2023-06-25' };

    const result = render(<RangeCalendar value={initialValue} onChange={onChange} onApply={onApply} />);

    const applyButton = result.getByText('Aplicar');

    fireEvent.press(applyButton);

    expect(onApply).toHaveBeenCalled();
  });

  it('Should disable apply button if dates are not selected', () => {
    const onChange = jest.fn();
    const onApply = jest.fn();

    const initialValue: RangeDateType = { start: '2023-06-20' };

    const result = render(<RangeCalendar value={initialValue} onChange={onChange} onApply={onApply} />);

    const applyButton = result.getByText('Aplicar');

    expect(applyButton).toBeDisabled();
  });
});
