import { formatDateToString, formatStringToDate, formatStringToDateString } from 'utils/datetime';
import { IDailyProfitLosses, IDailyProfitLoss, IVNIndexResponse } from './DailyProfitLoss.type';
import { chartFilterData } from 'constants/profitloss';
import { addBusinessDays, subDays } from 'date-fns';
import { ArrayItem, IFormatDataChart } from 'interfaces/common';
import { mapV2 } from 'utils/common';

const DummyChartItem = {
  x: 0,
  y: 0,
  date: '',
  xLabel: '',
};

export const formatDailyProfitLossList = (data: IDailyProfitLosses[], createDate: string) => {
  const [NAVAsset, NAVProfitRatio, NAVDataPercent, VNIndexDataPercent] = mapV2(
    data,
    mapDailyProfitLossesToChartData
  ).reduce(
    (pre, curr) => {
      pre[0].push(curr[0]);
      pre[1].push(curr[1]);
      pre[2].push(curr[2]);
      pre[3].push(curr[3]);
      return pre;
    },
    [[], [], [], []] as IFormatDataChart[][]
  );

  const accumulatedProfitRatio: IFormatDataChart[] = [];
  const dataForAccChart = data.slice(1);
  const DUMMY_ACCUMULATED_PROFIT_ITEM = generateAccumulatedFirstPoint(dataForAccChart);
  const accumulatedProfit = dataForAccChart.reduce((pre, curr) => {
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

  return {
    dataProfitLoss: data,
    NAVAsset,
    NAVProfitRatio,
    NAVReturnData:
      data?.length > 0 && createDate === data[0]?.date
        ? [DummyChartItem, ...NAVDataPercent.map(item => ({ ...item, x: item.x + 1 }))]
        : NAVDataPercent,
    VNIndexReturnData:
      data?.length > 0 && createDate === data[0]?.date
        ? [DummyChartItem, ...VNIndexDataPercent.map(item => ({ ...item, x: item.x + 1 }))]
        : VNIndexDataPercent,
    accumulatedProfit: [DUMMY_ACCUMULATED_PROFIT_ITEM, ...accumulatedProfit],
    accumulatedProfitRatio: [DUMMY_ACCUMULATED_PROFIT_ITEM, ...accumulatedProfitRatio],
  };
};

export const mapDailyProfitLossesToChartData = (item: IDailyProfitLosses, index: number) => {
  const date = formatStringToDateString(item.date, 'dd/MM/yyyy');
  const xLabel = formatStringToDateString(item.date, 'dd/MM');
  return [
    {
      x: index,
      y: item.netAssetValue ?? 0,
      date,
      xLabel,
    },
    {
      x: index + 1,
      y: item.navProfitRatio ?? 0,
      date,
      xLabel,
    },
    {
      x: index,
      y: item.normalisedNAV ?? 0,
      date,
      xLabel,
    },
    {
      x: index,
      y: item.normalisedVNINDEX ?? 0,
      date,
      xLabel,
    },
  ];
};

export const mapVNIndexReturnToChartData = (item: ArrayItem<IVNIndexResponse['data']>, index: number) => {
  const date = formatStringToDateString(item.d, 'dd/MM/yyyy');
  const xLabel = formatStringToDateString(item.d, 'dd/MM');
  return {
    x: index,
    y: item.nr ?? 0,
    date,
    xLabel,
  };
};

export const generateDemoProfitLoss = () => {
  const dataProfitLoss = chartFilterData.reduce((preData, item) => {
    const [NAVAsset, NAVProfitRatio, NAVReturnData, VNIndexReturnData, accumulatedProfit, accumulatedProfitRatio] =
      generateDemoChartData(item.value);
    return {
      ...preData,
      [item.value]: {
        NAVAsset,
        NAVProfitRatio,
        NAVReturnData,
        VNIndexReturnData,
        accumulatedProfit,
        accumulatedProfitRatio,
      },
    };
  }, {} as IDailyProfitLoss);

  return dataProfitLoss;
};

export const generateDemoChartData = (sample: number) => {
  const tempNAV: IFormatDataChart[] = [];
  const tempNAVRatio: IFormatDataChart[] = [{ x: 0, y: 0, date: '', xLabel: '' }];
  const tempAccProfit: IFormatDataChart[] = [];
  const tempAccProfitRatio: IFormatDataChart[] = [];
  const endDate = new Date();
  const startDate = subDays(endDate, (sample || 365) + 1);
  let current = addBusinessDays(startDate, 1);
  while (current <= endDate) {
    const date = formatDateToString(current, 'dd/MM/yyyy');
    const xLabel = formatDateToString(current, 'dd/MM');
    tempNAV.push({ x: tempNAV.length, xLabel, y: 500000000, date });
    tempNAVRatio.push({ x: tempNAV.length, xLabel, y: 0, date });
    tempAccProfit.push({ x: tempAccProfit.length, xLabel, y: 0, date });
    tempAccProfitRatio.push({ x: tempAccProfitRatio.length, xLabel, y: 0, date });
    current = addBusinessDays(current, 1);
  }
  tempNAVRatio.push({ x: tempNAV.length + 1, y: 0, date: '', xLabel: '' });
  return [tempNAV, tempNAVRatio, [], [], tempAccProfit, tempAccProfitRatio];
};

const generateAccumulatedFirstPoint = (data: IDailyProfitLosses[]) => {
  const firstDate = data.length > 0 ? formatStringToDate(data[0].date) : new Date();
  const beforeFirstDate = subDays(firstDate, 1);
  return {
    x: 0,
    y: 0,
    date: formatDateToString(beforeFirstDate, 'dd/MM/yyyy'),
    xLabel: formatDateToString(beforeFirstDate, 'dd/MM'),
  };
};
