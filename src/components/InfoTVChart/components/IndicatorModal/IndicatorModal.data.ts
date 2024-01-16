import { lightColors } from 'styles';
import { IIndicatorSelectionItem } from './IndicatorModal.type';
import { generateJS } from './IndicatorModal.helper';

const LineWidth = 3;

export const IndicatorSelectionRow1: IIndicatorSelectionItem[] = [
  {
    label: 'MA5',
    name: 'Moving Average 5',
    symbolicColor: lightColors.DarkBrow,
    activeMessage: generateJS({
      name: 'Moving Average',
      inputs: [5, 'close', 0],
      callBackName: 'Moving Average 5',
      // Increase strong
      overrides: {
        'Plot.color': lightColors.DarkBrow,
        'Plot.linewidth': LineWidth,
      },
    }),
  },
  {
    label: 'MA10',
    name: 'Moving Average 10',
    symbolicColor: lightColors.Green1,
    activeMessage: generateJS({
      name: 'Moving Average',
      inputs: [10, 'close', 0],
      callBackName: 'Moving Average 10',
      overrides: {
        'Plot.color': lightColors.Green1,
        'Plot.linewidth': LineWidth,
      },
    }),
  },
  {
    label: 'MA20',
    name: 'Moving Average 20',
    symbolicColor: lightColors.LIGHTRed2,
    activeMessage: generateJS({
      name: 'Moving Average',
      inputs: [20, 'close', 0],
      callBackName: 'Moving Average 20',
      overrides: {
        'Plot.color': lightColors.LIGHTRed2,
        'Plot.linewidth': LineWidth,
      },
    }),
  },
  {
    label: 'MA50',
    name: 'Moving Average 50',
    symbolicColor: lightColors.BLACK,
    activeMessage: generateJS({
      name: 'Moving Average',
      inputs: [50, 'close', 0],
      callBackName: 'Moving Average 50',
      overrides: {
        'Plot.color': lightColors.BLACK,
        'Plot.linewidth': LineWidth,
      },
    }),
  },
];

/* Don't remove */
// const IndicatorSelectionRow2: IIndicatorSelectionItem[] = [
//   {
//     label: 'MA50',
//     name: 'Moving Average 50',
//     symbolicColor: lightColors.BLACK,
//     activeMessage: generateJS({
//       name: 'Moving Average',
//       inputs: [50, 'close', 0],
//       callBackName: 'Moving Average 50',
//       overrides: { 'Plot.color': lightColors.BLACK },
//     }),
//   },
//   {
//     label: 'MA100',
//     name: 'Moving Average 100',
//     symbolicColor: lightColors.LIGHTYellow,
//     activeMessage: generateJS({
//       name: 'Moving Average',
//       inputs: [100, 'close', 0],
//       callBackName: 'Moving Average 100',
//       overrides: { 'Plot.color': lightColors.LIGHTYellow },
//     }),
//   },
//   {
//     label: 'MA200',
//     name: 'Moving Average 200',
//     symbolicColor: lightColors.DarkBrow,
//     activeMessage: generateJS({
//       name: 'Moving Average',
//       inputs: [200, 'close', 0],
//       callBackName: 'Moving Average 200',
//       overrides: { 'Plot.color': lightColors.DarkBrow }, // mau nau dat
//     }),
//   },
// ];

export const IndicatorSelectionRow3: IIndicatorSelectionItem[] = [
  {
    label: 'Bollinger Band (20,2)',
    name: 'Bollinger Bands',
    activeMessage: generateJS({
      name: 'Bollinger Bands',
      inputs: [20, 2],
      callBackName: 'Bollinger Bands',
    }),
  },
  {
    label: 'RSI 14',
    name: 'Relative Strength Index',
    activeMessage: generateJS({
      name: 'Relative Strength Index',
      inputs: [14],
      callBackName: 'Relative Strength Index',
    }),
  },
];
