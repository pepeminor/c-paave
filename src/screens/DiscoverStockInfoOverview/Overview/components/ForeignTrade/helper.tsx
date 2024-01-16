import { isWeekend, subDays } from 'date-fns';
import { HolidaysState } from 'reduxs/global-reducers/ResourceFiles';
import { isBeforeOrEqualDate } from 'utils';

export const getLastTradingDay = (holidays: HolidaysState) => {
  let lastTradingDay = new Date();
  const newDate = new Date();

  lastTradingDay = subDays(newDate, lastTradingDay.getDay() === 0 ? 2 : lastTradingDay.getDay() === 6 ? 1 : 0);

  // Sub 1 day if last trading day is holiday
  holidays.holidays.forEach(holiday => {
    while (isBeforeOrEqualDate(holiday.start, lastTradingDay) && isBeforeOrEqualDate(lastTradingDay, holiday.end)) {
      lastTradingDay = subDays(lastTradingDay, 1);
    }
  });

  return lastTradingDay;
};

export const isHolidayOrWeekend = (holidays: HolidaysState) => {
  const today = new Date();
  let isHolidayOrWeekend = false;
  if (isWeekend(today)) return true;
  holidays.holidays.forEach(holiday => {
    if (isBeforeOrEqualDate(holiday.start, today) && isBeforeOrEqualDate(today, holiday.end)) {
      isHolidayOrWeekend = true;
    }
  });

  return isHolidayOrWeekend;
};
