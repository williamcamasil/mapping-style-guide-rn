import React from 'react';

import {
  fireEvent, render,
} from '@testing-library/react-native';
import { dateToString } from 'mapping-context-rn';

import Calendar from '.';
import DefaultTheme from '../../theme/default';
import {
  DATE_FORMAT, DAY_SIZE, getCommonTheme, getDefaultValue, getDisabledDates,
} from './utils';

describe('Calendar', () => {
  it('renders calendar correctly without an initial value', () => {
    const fakeFunction = jest.fn();

    render(<Calendar onChange={fakeFunction} />);
  });

  it('Should click on button arrowRight and go to next month', () => {
    const fakeFunction = jest.fn();

    const initialDate = '2021-01-01';

    const { getByTestId, queryByTestId } = render(<Calendar value={initialDate} onChange={fakeFunction} />);

    const button = getByTestId('button-arrow-right');

    fireEvent.press(button);

    expect(queryByTestId('name-month-and-year')?.props.children).toBe('fevereiro 2021');
  });

  it('Should click on button arrowLeft and go to previous month', async () => {
    const fakeFunction = jest.fn();

    const initialDate = '2021-01-01';

    const { getByTestId, queryByTestId } = render(<Calendar value={initialDate} onChange={fakeFunction} />);

    const button = getByTestId('button-arrow-left');

    fireEvent.press(button);

    expect(queryByTestId('name-month-and-year')?.props.children).toBe('dezembro 2020');
  });

  it('Should select date and active style select', async () => {
    const fakeFunction = jest.fn();

    const result = render(<Calendar value="2021-01-01" onChange={fakeFunction} theme={DefaultTheme} />);

    const buttonDay = result.getByTestId('calendar.day_2021-01-01');

    expect(buttonDay.props?.style.backgroundColor).toEqual(DefaultTheme.colors.primaryMain);
    expect(buttonDay.props?.style.borderRadius).toEqual(16);
  });

  it('Should update value after select in calendar', () => {
    const fakeFunction = jest.fn();

    const result = render(<Calendar value="2021-01-01" onChange={fakeFunction} />);

    const buttonDay = result.getByTestId('calendar.day_2021-01-02');

    fireEvent.press(buttonDay);

    expect(fakeFunction).toHaveBeenCalledWith('2021-01-02');
  });

  it('Should not update value after select in calendar, the date is disabled', () => {
    const fakeFunction = jest.fn();

    const result = render(<Calendar value="2021-01-01" onChange={fakeFunction} disabledDates={['2021-01-02']} />);

    const buttonDay = result.getByTestId('calendar.day_2021-01-02');

    fireEvent.press(buttonDay);

    expect(fakeFunction).not.toHaveBeenCalled();
  });

  it('Should verify the color of name of days in header', () => {
    const fakeFunction = jest.fn();

    const result = render(<Calendar value="2021-01-01" onChange={fakeFunction} theme={DefaultTheme} />);

    const nameDays = result.getByTestId('calendar.header.dayNames');

    expect((nameDays.children[0] as any).props.style[0].color).toBe(DefaultTheme.colors.primaryMain);
  });

  it('Should match default calendar snapshot', async () => {
    const fakeFunction = jest.fn();

    const tree = render(<Calendar value="2021-01-01" onChange={fakeFunction} disabledDates={['2021-01-02']} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should disable the dates passed and weekends for selected date', async () => {
    const fakeFunction = jest.fn();

    const screen = render(
      <Calendar
        value="2023-12-01"
        onChange={fakeFunction}
        disabledDates={['2023-12-20']}
        disableWeekends
      />,
    );

    fireEvent.press(screen.getByTestId('calendar.day_2023-12-20'));
    fireEvent.press(screen.getByTestId('calendar.day_2023-12-02'));
    fireEvent.press(screen.getByTestId('calendar.day_2023-12-03'));
    fireEvent.press(screen.getByTestId('calendar.day_2023-12-09'));
    fireEvent.press(screen.getByTestId('calendar.day_2023-12-10'));
    fireEvent.press(screen.getByTestId('calendar.day_2023-12-16'));
    fireEvent.press(screen.getByTestId('calendar.day_2023-12-17'));
    fireEvent.press(screen.getByTestId('calendar.day_2023-12-23'));
    fireEvent.press(screen.getByTestId('calendar.day_2023-12-24'));
    fireEvent.press(screen.getByTestId('calendar.day_2023-12-30'));
    fireEvent.press(screen.getByTestId('calendar.day_2023-12-31'));

    expect(fakeFunction).not.toHaveBeenCalled();
  });
  it('Should disable weekends when next month is selected', async () => {
    const fakeFunction = jest.fn();

    const screen = render(
      <Calendar
        value="2023-12-01"
        onChange={fakeFunction}
        disableWeekends
      />,
    );

    const nextMonthButton = screen.getByTestId('button-arrow-right');
    fireEvent.press(nextMonthButton);

    fireEvent.press(screen.getByTestId('calendar.day_2024-01-06'));
    fireEvent.press(screen.getByTestId('calendar.day_2024-01-07'));
    fireEvent.press(screen.getByTestId('calendar.day_2024-01-13'));
    fireEvent.press(screen.getByTestId('calendar.day_2024-01-14'));
    fireEvent.press(screen.getByTestId('calendar.day_2024-01-20'));
    fireEvent.press(screen.getByTestId('calendar.day_2024-01-21'));
    fireEvent.press(screen.getByTestId('calendar.day_2024-01-27'));
    fireEvent.press(screen.getByTestId('calendar.day_2024-01-28'));

    expect(fakeFunction).not.toHaveBeenCalled();
  });
});

describe('Calendar utils', () => {
  it('should return currentDate when value is undefined and return the value itself otherwise', () => {
    const currentDate = getDefaultValue();

    expect(currentDate).toBe(dateToString(new Date(), DATE_FORMAT));

    const customDate = getDefaultValue('1989-05-17');

    expect(customDate).toBe(customDate);
  });
  it('Should return an empty object if there are no disabled dates', () => {
    expect(getDisabledDates()).toEqual({});
  });
  it('Should return all disabled dates as MarkedDates', () => {
    expect(getDisabledDates(['2021-01-01', '2021-01-03'])).toEqual({
      '2021-01-01': {
        disabled: true,
        disableTouchEvent: true,
      },
      '2021-01-03': {
        disabled: true,
        disableTouchEvent: true,
      },
    });
  });
  it('Should return the correct default theme', () => {
    expect(getCommonTheme(DefaultTheme)).toEqual({
      selectedDayBackgroundColor: DefaultTheme.colors.primaryMain,
      todayTextColor: DefaultTheme.colors.primaryMain,
      dayTextColor: DefaultTheme.colors.neutralGray600,
      textDayFontFamily: DefaultTheme.typography.weights.bold.fontFamily,
      textMonthFontFamily: DefaultTheme.typography.weights.bold.fontFamily,
      textDayHeaderFontFamily: DefaultTheme.typography.weights.bold.fontFamily,
      textDayFontWeight: DefaultTheme.typography.weights.bold.fontWeight,
      textMonthFontWeight: DefaultTheme.typography.weights.bold.fontWeight,
      textDayHeaderFontWeight: DefaultTheme.typography.weights.bold.fontWeight,
      textDayFontSize: DefaultTheme.typography.sizes.small,
      textMonthFontSize: DefaultTheme.typography.sizes.small,
      textDayHeaderFontSize: DefaultTheme.typography.sizes.small,
      'stylesheet.calendar.header': {
        dayHeader: {
          marginTop: DefaultTheme.spacings.sXS,
          marginBottom: DefaultTheme.spacings.sXS,
          textAlign: 'center',
          fontSize: DefaultTheme.typography.sizes.small,
          color: DefaultTheme.colors.primaryMain,
          fontFamily: DefaultTheme.typography.weights.bold.fontFamily,
          fontWeight: DefaultTheme.typography.weights.bold.fontWeight,
          flex: 1,
        },
        week: {
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
      },
      'stylesheet.day.basic': {
        base: {
          height: DAY_SIZE,
          width: DAY_SIZE,
          borderBottomLeftRadius: DefaultTheme.borders.radius.XL,
          borderBottomRightRadius: DefaultTheme.borders.radius.XL,
          borderTopLeftRadius: DefaultTheme.borders.radius.XL,
          borderTopRightRadius: DefaultTheme.borders.radius.XL,
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
    });
  });
});
