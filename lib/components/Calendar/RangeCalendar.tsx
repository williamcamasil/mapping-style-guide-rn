import React, {
  ComponentType, useCallback, useMemo, useState,
} from 'react';
import { StyleSheet, View } from 'react-native';

import {
  addMonths, startOfDay, subMonths, addDays, isBefore,
} from 'date-fns';
import {
  dateToString, stringToDate, useDidMountAndUpdate,
} from 'mapping-context-rn';
import type { MarkedDates, Theme } from 'react-native-calendars/src/types';

import { withTheme } from '../../theme';
import { AppThemeType } from '../../theme/default';
import Button from '../Button';
import Spacer from '../Spacer';
import Header from './CalendarHeader';
import {
  DATE_FORMAT, DAY_SIZE, StringDateType, getCommonTheme, getDefaultValue,
} from './utils';

const styles = StyleSheet.create({
  buttonsRow: { flexDirection: 'row' },
  buttonsContainer: { flexGrow: 1 },
});

export type RangeDateType = {
  start: StringDateType;
  end?: StringDateType;
};

/*
 * Importa a lib de forma inline e opcional para não obrigar os demais repositórios
 * a instalarem o também.
 */
type CalendarProps = import('react-native-calendars').CalendarProps;
let RNCalendar: ComponentType<CalendarProps>;
/* istanbul ignore next */
try {
  if (require('react-native-calendars')) {
    RNCalendar = require('react-native-calendars').Calendar;
  }
} catch (err) {
  if (process.env.NODE_ENV !== 'test') {
    console.warn(err);
  }
}

export type RangeCalendarPropsType = CalendarProps & {
  theme: AppThemeType;
  value?: RangeDateType;
  onChange: (value?: RangeDateType) => void;
  onApply?: () => void;
};

type DateCalendarType = {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
};

const RangeCalendar: React.FC<RangeCalendarPropsType> = ({
  theme, value, onChange, onApply, ...others
}) => {
  const [selectDate, setSelectDate] = useState<StringDateType | undefined>(value?.end ?? value?.start);
  const [currentMonth, setCurrentMonth] = useState<StringDateType | undefined>(selectDate);
  const [startDay, setStartDay] = useState<string | undefined>(value?.start);
  const [endDay, setEndDay] = useState<string | undefined>(value?.end);

  const defaultValue = useMemo(() => value?.end ?? value?.start, [value]);

  const themeCalendar: Theme = useMemo(
    () => ({
      ...getCommonTheme(theme),
      'stylesheet.day.period': {
        base: {
          height: DAY_SIZE,
          width: DAY_SIZE,
          borderBottomLeftRadius: theme.borders.radius.XL,
          borderBottomRightRadius: theme.borders.radius.XL,
          borderTopLeftRadius: theme.borders.radius.XL,
          borderTopRightRadius: theme.borders.radius.XL,
          alignItems: 'center',
          justifyContent: 'center',
        },
        fillers: {
          backgroundColor: theme.colors.neutralWhite,
          position: 'absolute',
          height: DAY_SIZE,
          flexDirection: 'row',
          left: 0,
          right: 0,
        },
        rightFiller: {
          height: DAY_SIZE,
          flex: 1,
          opacity: 0.05,
        },
        leftFiller: {
          height: DAY_SIZE,
          flex: 1,
          opacity: 0.05,
        },
      },
    }),
    [theme],
  );

  useDidMountAndUpdate(() => {
    setSelectDate(defaultValue);
    setCurrentMonth(getDefaultValue(defaultValue));
  }, [value]);

  const selectStartDay = useCallback((date: string) => {
    setStartDay(date);
    onChange({
      start: date as StringDateType,
      end: undefined,
    });
  }, [onChange]);

  const selectEndDay = useCallback((date: string) => {
    const isSelectedDateBeforeStartDay = isBefore(stringToDate(date), stringToDate(startDay!));
    if (isSelectedDateBeforeStartDay) {
      setStartDay(date);
      setEndDay(startDay);
      onChange({
        start: date as StringDateType,
        end: startDay as StringDateType,
      });
      return;
    }
    setEndDay(date);
    onChange({
      start: startDay as StringDateType,
      end: date as StringDateType,
    });
  }, [onChange, startDay]);

  const handleDateSelect = useCallback(
    (date: DateCalendarType) => {
      if (!startDay && !endDay) {
        selectStartDay(date.dateString);
        return;
      }
      if (startDay && !endDay) {
        selectEndDay(date.dateString);
        return;
      }
      setEndDay('');
      selectStartDay(date.dateString);
    },
    [endDay, selectEndDay, selectStartDay, startDay],
  );

  const handleNextMonthPress = useCallback(() => {
    const monthDate = stringToDate(currentMonth!, DATE_FORMAT);

    const nextMonth = addMonths(monthDate, 1);

    setCurrentMonth(dateToString(nextMonth, DATE_FORMAT) as StringDateType);
  }, [currentMonth]);

  const handlePreviousMonthPress = useCallback(() => {
    const monthDate = stringToDate(currentMonth!, DATE_FORMAT);

    const previousMonth = subMonths(monthDate, 1);

    setCurrentMonth(dateToString(previousMonth, DATE_FORMAT) as StringDateType);
  }, [currentMonth]);

  const renderHeader = useCallback(
    (date?: any) => {
      const stringDate = date?.toUTCString(DATE_FORMAT);

      /* istanbul ignore next */
      if (!stringDate) return null;

      return (
        <Header
          value={stringDate}
          onNextMonthPress={handleNextMonthPress}
          onPreviousMonthPress={handlePreviousMonthPress}
        />
      );
    },
    [handleNextMonthPress, handlePreviousMonthPress],
  );

  const selectedDayStyle = useMemo(() => ({
    color: theme.colors.primaryMain,
    textColor: theme.colors.neutralWhite,
  }), [theme.colors]);

  const inBetweenDayStyle = useMemo(() => ({
    color: theme.colors.primary100,
    textColor: theme.colors.primary600,
  }), [theme.colors]);

  const clearDates = useCallback(() => {
    setStartDay(undefined);
    setEndDay(undefined);
    onChange(undefined);
  }, [onChange]);

  const isCurrentDateBeforeEndDate = useCallback(
    (currentDate: Date) => isBefore(startOfDay(currentDate), startOfDay(stringToDate(endDay!))),
    [endDay],
  );

  const getFilledMarkedDates = useCallback(() => {
    const markedDates: MarkedDates = {
      [startDay!]: { startingDay: true, ...selectedDayStyle },
    };
    let currentDate = addDays(stringToDate(startDay!), 1);
    while (isCurrentDateBeforeEndDate(currentDate)) {
      const currentDateString = dateToString(currentDate, DATE_FORMAT);
      markedDates[currentDateString] = inBetweenDayStyle;
      currentDate = addDays(currentDate, 1);
    }
    markedDates[endDay!] = { endingDay: true, ...selectedDayStyle };
    return markedDates;
  }, [endDay, inBetweenDayStyle, isCurrentDateBeforeEndDate, selectedDayStyle, startDay]);

  const markedDates = useMemo(() => {
    const isOnlyOneDateSelected = (startDay && !endDay) || startDay === endDay;
    if (isOnlyOneDateSelected) {
      return {
        [startDay!]: {
          startingDay: true,
          endingDay: true,
          ...selectedDayStyle,
        },
      };
    }

    return getFilledMarkedDates();
  }, [endDay, getFilledMarkedDates, selectedDayStyle, startDay]);

  return (
    <View>
      <RNCalendar
        key={`calendar-${currentMonth}`}
        {...others}
        testID="range-calendar"
        current={currentMonth}
        date={currentMonth}
        markingType="period"
        hideArrows
        markedDates={markedDates}
        onDayPress={handleDateSelect}
        renderHeader={renderHeader}
        theme={themeCalendar}
        enableSwipeMonths
        hideExtraDays
      />
      <Spacer size={theme.spacings.sXL} />
      <View style={styles.buttonsRow}>
        <Button
          size="large"
          containerStyle={styles.buttonsContainer}
          variant="outlinedPrimary"
          onPress={clearDates}
          disabled={Boolean(!startDay && !endDay)}
        >
          Limpar
        </Button>
        <Spacer size={theme.spacings.sSmall} />
        <Button
          size="large"
          containerStyle={styles.buttonsContainer}
          onPress={onApply}
          disabled={!startDay || !endDay}
        >
          Aplicar
        </Button>
      </View>
    </View>
  );
};

export default withTheme(RangeCalendar);
