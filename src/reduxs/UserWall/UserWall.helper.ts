import { formatDateToString, formatStringToDate, formatStringToDateString } from 'utils';
import { IFormatDataChart } from 'interfaces/common';
import { addBusinessDays, isEqual, subDays } from 'date-fns';
import { IFollowingDailyProfitLossResponse } from './UserWall.type';
import { IFollowingDailyProfitLoss } from 'interfaces/equity';

const START_NAV = 500000000;

export const formatDailyProfitLoss = (
  followingDailyProfitLoss?: IFollowingDailyProfitLossResponse | null
): [
  IFormatDataChart[],
  IFormatDataChart[],
  IFormatDataChart[],
  IFormatDataChart[],
  IFormatDataChart[],
  IFormatDataChart[]
] => {
  if (followingDailyProfitLoss == null) return [[], [], [], [], [], []];
  const { accountCreatedDate, followingDailyProfits } = followingDailyProfitLoss.data;
  const dataFirstDay = followingDailyProfits[0].date;

  let startNAV = followingDailyProfits[0].netAssetValue;
  let useStartNAV = false;
  if (
    isEqual(
      formatStringToDate(accountCreatedDate ?? '', 'yyyyMMdd'),
      formatStringToDate(dataFirstDay ?? '', 'yyyyMMdd')
    ) ||
    isEqual(
      addBusinessDays(formatStringToDate(accountCreatedDate ?? '', 'yyyyMMdd'), 1),
      formatStringToDate(dataFirstDay ?? '', 'yyyyMMdd')
    )
  ) {
    startNAV = START_NAV;
    useStartNAV = true;
  }
  if (followingDailyProfitLoss == null) return [[], [], [], [], [], []];
  const { NAVDataPercent, VNIndexDataPercent, NetAssetVale, NavProfit } = followingDailyProfits.reduce(
    (prev, curr, index) => {
      const navPercent = {
        x: accountCreatedDate === dataFirstDay ? index + 1 : index,
        y: ((index === 0 && useStartNAV ? START_NAV : curr.netAssetValue) / startNAV - 1) * 100,
        date: formatStringToDateString(curr.date, 'dd/MM/yyyy'),
        xLabel: formatStringToDateString(curr.date, 'dd/MM'),
      };
      const indexPercent = {
        x: accountCreatedDate === dataFirstDay ? index + 1 : index,
        y: curr.normalisedVnIndex,
        date: formatStringToDateString(curr.date, 'dd/MM/yyyy'),
        xLabel: formatStringToDateString(curr.date, 'dd/MM'),
      };
      const netAsset = {
        x: index,
        y: curr.netAssetValue,
        date: formatStringToDateString(curr.date, 'dd/MM/yyyy'),
        xLabel: formatStringToDateString(curr.date, 'dd/MM'),
      };
      const navProfit = {
        x: index + 1,
        y: curr.navProfit,
        date: formatStringToDateString(curr.date, 'dd/MM/yyyy'),
        xLabel: formatStringToDateString(curr.date, 'dd/MM'),
      };

      prev.NAVDataPercent.push(navPercent);
      prev.VNIndexDataPercent.push(indexPercent);
      prev.NetAssetVale.push(netAsset);
      prev.NavProfit.push(navProfit);

      return prev;
    },
    {
      NAVDataPercent:
        accountCreatedDate === dataFirstDay
          ? [
              {
                x: 0,
                y: 0,
                date: '',
                xLabel: '',
              },
            ]
          : [],
      VNIndexDataPercent: accountCreatedDate === dataFirstDay ? [{ x: 0, y: 0, date: '', xLabel: '' }] : [],
      NetAssetVale: [],
      NavProfit: [],
    } as {
      NAVDataPercent: IFormatDataChart[];
      VNIndexDataPercent: IFormatDataChart[];
      NetAssetVale: IFormatDataChart[];
      NavProfit: IFormatDataChart[];
    }
  );

  const accumulatedProfitRatio: IFormatDataChart[] = [];
  const profitDataToCalculate = followingDailyProfits.slice(1); // Remove first item because Normalized data is not include first day
  const DUMMY_ACCUMULATED_PROFIT_ITEM = generateAccumulatedFirstPoint(profitDataToCalculate);
  const accumulatedProfit = profitDataToCalculate.reduce((pre, curr) => {
    const date = formatStringToDateString(curr.date, 'dd/MM/yyyy');
    const xLabel = formatStringToDateString(curr.date, 'dd/MM');

    const accNav = pre.length > 0 ? pre[pre.length - 1].y : 0;
    pre.push({
      x: pre.length,
      y: accNav + curr.navProfit,
      date,
      xLabel,
    });

    const accNavRatio =
      accumulatedProfitRatio.length > 0 ? accumulatedProfitRatio[accumulatedProfitRatio.length - 1].y : 0;
    const todayRatio =
      curr.netAssetValue - curr.navProfit === 0 ? 0 : curr.navProfit / (curr.netAssetValue - curr.navProfit);

    if (isNaN(accNavRatio) || isNaN(todayRatio)) return pre;

    accumulatedProfitRatio.push({
      x: pre.length,
      y: accNavRatio === 0 ? todayRatio : (1 + accNavRatio) * (1 + todayRatio) - 1,
      date,
      xLabel,
    });
    return pre;
  }, [] as IFormatDataChart[]);

  return [
    NAVDataPercent,
    VNIndexDataPercent,
    NetAssetVale,
    NavProfit,
    [DUMMY_ACCUMULATED_PROFIT_ITEM, ...accumulatedProfit],
    [DUMMY_ACCUMULATED_PROFIT_ITEM, ...accumulatedProfitRatio],
  ];
};

const generateAccumulatedFirstPoint = (data: IFollowingDailyProfitLoss[]) => {
  const firstDate = data.length > 0 ? formatStringToDate(data[0].date) : new Date();
  const beforeFirstDate = subDays(firstDate, 1);
  return {
    x: 0,
    y: 0,
    date: formatDateToString(beforeFirstDate, 'dd/MM/yyyy'),
    xLabel: formatDateToString(beforeFirstDate, 'dd/MM'),
  };
};
