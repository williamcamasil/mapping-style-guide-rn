import { dateToString } from 'mapping-context-rn';
import type { MarkedDates, Theme } from 'react-native-calendars/src/types';

import { AppThemeType } from '../../theme';

type ExtendedTheme = Theme & {
  'stylesheet.calendar.header': object;
  'stylesheet.day.basic': object;
};

/**
 * Define o tipo de data para o formato yyyy-MM-dd
 */
export type StringDateType = `${number}${number}${number}${number}-${number}${number}-${number}${number}`;

export const DATE_FORMAT = 'yyyy-MM-dd';

export const DAY_SIZE = 42;

export const getDefaultValue = (value?: StringDateType | null) => (
  value ?? dateToString(new Date(), DATE_FORMAT) as StringDateType
);

export const getDisabledDates = (disabledDates?: StringDateType[]) => {
  if (!disabledDates?.length) return {};
  const dates: MarkedDates = {};
  disabledDates.forEach((date: StringDateType) => {
    dates[date] = {
      disabled: true,
      disableTouchEvent: true,
    };
  });
  return dates;
};

export const getCommonTheme = (theme: AppThemeType): ExtendedTheme => ({
  selectedDayBackgroundColor: theme.colors.primaryMain,
  todayTextColor: theme.colors.primaryMain,
  dayTextColor: theme.colors.neutralGray600,
  textDayFontFamily: theme.typography.weights.bold.fontFamily,
  textMonthFontFamily: theme.typography.weights.bold.fontFamily,
  textDayHeaderFontFamily: theme.typography.weights.bold.fontFamily,
  textDayFontWeight: theme.typography.weights.bold.fontWeight,
  textMonthFontWeight: theme.typography.weights.bold.fontWeight,
  textDayHeaderFontWeight: theme.typography.weights.bold.fontWeight,
  textDayFontSize: theme.typography.sizes.small,
  textMonthFontSize: theme.typography.sizes.small,
  textDayHeaderFontSize: theme.typography.sizes.small,
  'stylesheet.calendar.header': {
    dayHeader: {
      marginTop: theme.spacings.sXS,
      marginBottom: theme.spacings.sXS,
      textAlign: 'center',
      fontSize: theme.typography.sizes.small,
      color: theme.colors.primaryMain,
      fontFamily: theme.typography.weights.bold.fontFamily,
      fontWeight: theme.typography.weights.bold.fontWeight,
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
      borderBottomLeftRadius: theme.borders.radius.XL,
      borderBottomRightRadius: theme.borders.radius.XL,
      borderTopLeftRadius: theme.borders.radius.XL,
      borderTopRightRadius: theme.borders.radius.XL,
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
});
