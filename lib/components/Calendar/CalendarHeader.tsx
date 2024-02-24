import React from 'react';
import {
  Insets,
  StyleSheet, TouchableOpacity, View,
} from 'react-native';

import { dateToString, stringToDate } from 'mapping-context-rn';

import { Icons } from '../../assets';
import { useViewStyles } from '../../hooks';
import { withTheme } from '../../theme';
import { AppThemeType } from '../../theme/default';
import Spacer from '../Spacer';
import Text from '../Text';
import { DATE_FORMAT, StringDateType } from './utils';

type CalendarHeaderPropsType = {
  value: StringDateType;
  theme: AppThemeType;
  onNextMonthPress: () => any;
  onPreviousMonthPress: () => any;
};

const BUTTONS_HIT_SLOP: Insets = {
  top: 10,
  left: 10,
  bottom: 10,
  right: 10,
};

const BUTTONS_SIZE = 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  arrowsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  previousContainer: {
    height: BUTTONS_SIZE,
    width: BUTTONS_SIZE,
  },
  nextContainer: {
    height: BUTTONS_SIZE,
    width: BUTTONS_SIZE,
  },
  title: {
    textTransform: 'capitalize',
  },
});

const CalendarHeader: React.FC<CalendarHeaderPropsType> = ({
  value, onNextMonthPress, onPreviousMonthPress, theme,
}) => {
  const renderMonth = () => {
    const dateValue = stringToDate(value, DATE_FORMAT);
    return dateToString(dateValue, 'MMMM yyyy');
  };

  const containerStyles = useViewStyles(() => [
    styles.container,
    {
      // padding fixo para que o header se ajuste a largura do calendário
      paddingHorizontal: 6,
      marginBottom: theme.spacings.sXS,
    },
  ], [theme.spacings.sXS]);

  return (
    <View style={containerStyles}>
      <View style={styles.titleContainer}>
        <Text
          style={styles.title}
          variant="body"
          lineHeight="small"
          color="neutralGray700"
          weight="bold"
          testID="name-month-and-year"
        >
          {renderMonth()}
        </Text>
      </View>
      <View style={styles.arrowsContainer}>
        <TouchableOpacity
          testID="button-arrow-left"
          activeOpacity={theme.opacities.intense}
          onPress={onPreviousMonthPress}
          style={styles.previousContainer}
          hitSlop={BUTTONS_HIT_SLOP}
        >
          <Icons.Small.Left
            width={BUTTONS_SIZE}
            height={BUTTONS_SIZE}
            color={theme.colors.neutralGray600}
          />
        </TouchableOpacity>

        <Spacer size={theme.spacings.sXS} />

        <TouchableOpacity
          testID="button-arrow-right"
          activeOpacity={theme.opacities.intense}
          onPress={onNextMonthPress}
          style={styles.nextContainer}
          hitSlop={BUTTONS_HIT_SLOP}
        >
          <Icons.Small.Right
            width={BUTTONS_SIZE}
            height={BUTTONS_SIZE}
            color={theme.colors.neutralGray600}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default withTheme(CalendarHeader);
