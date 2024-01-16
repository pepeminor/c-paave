import { isAfter, isBefore } from 'date-fns';
import { insertAll, repeat } from 'ramda';

export const formatDataChart = (data: {
  ignoreLunchTime: boolean;
  firstPoint: number;
  dataPoint: number[];
  dataTime: number[];
  resolution: number;
}) => {
  const { ignoreLunchTime, firstPoint, dataPoint, dataTime, resolution } = data;
  const dataPointTemp = [firstPoint, ...dataPoint];
  if (ignoreLunchTime === true) {
    return dataPointTemp;
  } else {
    const timeDate = new Date(dataTime[dataTime.length - 1] * 1000); //time * 1000 get Date with timestamp
    const lunchTimeOfCurrentDay = new Date(timeDate.getFullYear(), timeDate.getMonth(), timeDate.getDate(), 12, 59);
    if (isBefore(timeDate, lunchTimeOfCurrentDay)) {
      return dataPointTemp;
    } else {
      const indexOfLastMorningMinute = dataTime.findIndex(item =>
        isAfter(new Date(item * 1000), lunchTimeOfCurrentDay)
      );
      if (indexOfLastMorningMinute > -1) {
        const listPointLunch = repeat(dataPointTemp[indexOfLastMorningMinute], 90 / resolution); //Insert 90 points at noon
        const dataPoint = insertAll(indexOfLastMorningMinute + 1, listPointLunch, dataPointTemp);
        return dataPoint;
      }

      return dataPointTemp;
    }
  }
};
