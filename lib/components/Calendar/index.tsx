import React, {
  ComponentType, useCallback, useMemo, useState,
} from 'react';

import { addMonths, subMonths } from 'date-fns';
import { dateToString, stringToDate, useDidMountAndUpdate } from 'mapping-context-rn';
import { Theme } from 'react-native-calendars/src/types';

import { withTheme } from '../../theme';
import { AppThemeType } from '../../theme/default';
import Header from './CalendarHeader';
import {
  DATE_FORMAT, getCommonTheme, getDefaultValue, getDisabledDates, StringDateType,
} from './utils';

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

export type CalendarPropsType = CalendarProps & {
  theme: AppThemeType;
  value?: StringDateType | null;
  disabledDates?: StringDateType[];
  disableWeekends?: boolean;
  onChange: (value: StringDateType) => void;
};

type DateCalendarType = {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
};

const Calendar: React.FC<CalendarPropsType> = ({
  theme, value, disabledDates, onChange, disableWeekends, ...others
}) => {
  const [monthWeekends, setMonthWeekends] = useState<StringDateType[]>([]);
  const [selectDate, setSelectDate] = useState<StringDateType>(() => getDefaultValue(value));
  const [currentMonth, setCurrentMonth] = useState<StringDateType>(selectDate);

  useDidMountAndUpdate(() => {
    /*
     * Atualiza o estado interno de acordo com o "value" recebido de fora do componente.
     */
    const currentValue = getDefaultValue(value);

    setSelectDate(currentValue);
    setCurrentMonth(currentValue);
  }, [value]);

  const updateMonthWeekends = useCallback(() => {
    const weekendList: StringDateType[] = [];
    const SUNDAY = 0;
    const SATURDAY = 6;
    const [year, month] = currentMonth.split('-').map(Number);

    const lastDayOfMonth = new Date(year, month, 0).getDate();

    for (let date = 1; date <= lastDayOfMonth; date += 1) {
      const currentDate = new Date(year, month - 1, date);

      const isWeekend = currentDate.getDay() === SUNDAY || currentDate.getDay() === SATURDAY;

      if (isWeekend) {
        const dateString = currentDate.toISOString().split('T')[0] as StringDateType;
        weekendList.push(dateString);
      }
    }
    setMonthWeekends(weekendList);
  }, [currentMonth]);

  useDidMountAndUpdate(() => {
    updateMonthWeekends();
  }, [updateMonthWeekends]);

  const handleDateSelect = useCallback(
    (date: DateCalendarType) => {
      onChange(date.dateString as StringDateType);
    },
    [onChange],
  );

  const handleNextMonthPress = useCallback(() => {
    const monthDate = stringToDate(currentMonth, DATE_FORMAT);

    const nextMonth = addMonths(monthDate, 1);

    setCurrentMonth(dateToString(nextMonth, DATE_FORMAT) as StringDateType);
  }, [currentMonth]);

  const handlePreviousMonthPress = useCallback(() => {
    const monthDate = stringToDate(currentMonth, DATE_FORMAT);

    const previousMonth = subMonths(monthDate, 1);

    setCurrentMonth(dateToString(previousMonth, DATE_FORMAT) as StringDateType);
  }, [currentMonth]);

  const renderHeader = useCallback(
    (date?: any) => {
      /*
       * O objeto date retornado nessa função é uma instância de XDate, uma biblioteca para manipulação de datas.
       * https://github.com/wix/react-native-calendars/blob/ed80013a063709edf460b443904d89d61d9dbf83/src/calendar/header/index.tsx#L60
       *
       * Sendo assim, primeiro é convertido o valor para String ISO, e depois passado para o header.
       */

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

  const themeCalendar: Theme = useMemo(() => getCommonTheme(theme), [theme]);

  const markedDates = useMemo(() => {
    let datesToDisable = disabledDates ?? [];
    if (disableWeekends) {
      datesToDisable = datesToDisable.concat(monthWeekends);
    }
    return {
      ...getDisabledDates(datesToDisable),
      [selectDate]: {
        selected: true,
        marked: true,
        dotColor: 'transparent',
      },
    };
  }, [disableWeekends, disabledDates, monthWeekends, selectDate]);

  return (
    <RNCalendar
      /*
       * Altera a key de acordo com o mês selecionado para forçar a atualização do calendário:
       * https://github.com/wix/react-native-calendars/issues/1245
       */
      key={`calendar-${currentMonth}`}
      {...others}
      testID="calendar"
      current={currentMonth}
      date={currentMonth}
      hideArrows
      markedDates={markedDates}
      onDayPress={handleDateSelect}
      renderHeader={renderHeader}
      theme={themeCalendar}
      enableSwipeMonths
      hideExtraDays
    />
  );
};

export default withTheme(Calendar);
