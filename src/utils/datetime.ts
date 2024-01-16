import * as dateFns from 'date-fns';
import { DATE_FORMAT_DISPLAY_MOMENT, DATE_TIME_FORMAT_INPUT, TIME_FORMAT_DISPLAY } from 'constants/main';
import moment from 'moment';
import { LANG } from 'global';
import { NativeModules, Platform } from 'react-native';

export function setLocale(language: LANG): void {
  if (Platform.OS === 'android') {
    const { LocaleModule } = NativeModules;
    LocaleModule.setLocale(language);
  }
}

export function dateIsValid(date: Date) {
  return !Number.isNaN(new Date(date).getTime());
}

export function formatDateToString(date: Date | null, formatOutput = 'yyyyMMdd') {
  if (date == null || !dateIsValid(date)) {
    return null;
  }
  return dateFns.format(date, formatOutput);
}

export function formatStringToDate(stringInput: string, formatInput = 'yyyyMMdd') {
  if (stringInput == null) {
    return new Date();
  }
  return dateFns.parse(stringInput, formatInput, new Date());
}

export function formatStringToDateString(stringInput: string | null, formatInput = 'yyyy/MM/dd') {
  if (stringInput == null) {
    return formatDateToString(new Date());
  }
  return formatDateToString(formatStringToDate(stringInput), formatInput);
}

export function formatTimeToDisplay(
  stringInput?: string,
  formatOutput = TIME_FORMAT_DISPLAY,
  formatInput = DATE_TIME_FORMAT_INPUT,
  ignoreTimeZone?: boolean
) {
  try {
    if (!stringInput) {
      return null;
    }
    let time = dateFns.parse(stringInput, formatInput, new Date());
    if (ignoreTimeZone === false) {
      time = dateFns.addHours(time, 7);
    }
    return dateFns.format(time, formatOutput);
  } catch (error) {
    return null;
  }
}

export function formatDateStringWithTimezone(
  dateTime: string,
  formatInput = `${TIME_FORMAT_DISPLAY} ${DATE_FORMAT_DISPLAY_MOMENT}`,
  formatOutput = `${TIME_FORMAT_DISPLAY} ${DATE_FORMAT_DISPLAY_MOMENT}`,
  offsetTimeZone = 7
) {
  const isMatchedFormat = dateTime != null && moment(dateTime, formatInput).format(formatInput) === dateTime;
  if (!isMatchedFormat) return null;

  const momentDateTime = moment(dateTime, formatInput).add(offsetTimeZone, 'hours');
  return momentDateTime.format(formatOutput);
}

export function formatTimeToUTC(a: Date, offsetTimeZone = 0) {
  const year = a.getFullYear();
  const month = a.getMonth();
  const date = a.getDate();
  const hour = a.getHours();
  const min = a.getMinutes();
  const sec = a.getSeconds();
  return Date.UTC(year, month, date, hour + offsetTimeZone, min, sec);
}

export const dateStringKIS2PAAVE = (dateString: string) => {
  const result: Date = formatStringToDate(dateString, 'yyyyMMddHHmmss');
  return formatDateToString(result, 'HH:mm:ss dd/MM/yyyy') ?? '';
};

export const isBeforeOrEqualDate = (date1: Date, date2: Date) => {
  return date1.setHours(0, 0, 0, 0) <= date2.setHours(0, 0, 0, 0);
};
