import { isNotValidNumber } from 'ramda-adjunct';

export const getDifferentColorOffsetChart = (maxValue: number, minValue: number): number => {
  if (isNotValidNumber(maxValue) || isNotValidNumber(minValue)) return 0;
  if (maxValue === minValue) return 0;
  return (maxValue / (maxValue - minValue)) * 100 - 0.5;
};
