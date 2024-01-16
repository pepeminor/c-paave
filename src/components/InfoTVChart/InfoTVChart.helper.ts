import { scaleSize } from 'styles';
import { defaultButtonList } from './InfoTVChart.data';
import { IInfoTVChartProps, IOptionType, OtherButton, TVChartFilter, TimeframeChart } from './InfoTVChart.type';

export const getButtonList = (props: IInfoTVChartProps) => {
  if (props.buttonList != null) {
    return props.buttonList;
  }

  if (props.modifyDefaultButtonList != null) {
    return props.modifyDefaultButtonList(defaultButtonList());
  }

  return defaultButtonList();
};

const INCREASE_HEIGHT = scaleSize(30);
export const handleHeight = (type: IOptionType) => {
  return type === 'ADD' ? INCREASE_HEIGHT : -INCREASE_HEIGHT;
};

export const calculatorRangeButton: (timeframe: TimeframeChart) => [number, number] = timeframe => {
  const value = parseInt(timeframe.slice(0, -1));
  const unit = timeframe.slice(-1);
  const currentDate = new Date();
  let spacingDate = 22;

  /* Handling from date */
  if (unit === 'D') {
    currentDate.setDate(currentDate.getDate() - value);
    spacingDate = 1;
  }

  if (unit === 'W') {
    currentDate.setDate(currentDate.getDate() - 7 * value);
    spacingDate *= value / 7;
  }

  if (unit === 'M') {
    currentDate.setMonth(currentDate.getMonth() - value);
    spacingDate *= value / 12;
  }

  if (unit === 'Y') {
    currentDate.setFullYear(currentDate.getFullYear() - value);
    spacingDate *= value;
  }

  const fromTime = Math.floor(currentDate.getTime() / 1000);
  const toTime = Math.floor(Date.now() / 1000) + 86400 * Math.floor(spacingDate);

  return [fromTime, toTime];
};

export const isTVChartFilter = (value: OtherButton | TVChartFilter): value is TVChartFilter => {
  return 'name' in value;
};
