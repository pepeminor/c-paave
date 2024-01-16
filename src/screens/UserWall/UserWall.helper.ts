import { IFollowingDailyProfitLoss, IFollowingDailyProfitLossResponse } from 'interfaces/equity';
import { addBusinessDays, isEqual, subDays } from 'date-fns';
import { formatStringToDateString, isBeforeOrEqualDate, formatStringToDate } from 'utils/datetime';
import { HolidaysState } from 'reduxs/global-reducers/ResourceFiles';
import { IFormatDataChart } from 'interfaces/common';
import { useEffect } from 'react';
import { query } from 'utils';
import APIList from 'config/api';

const START_NAV = 500000000;

export const processInvestmentData = (
  followingDailyProfits?: IFollowingDailyProfitLoss[],
  accountCreatedDate?: string
) => {
  const currentProfitLoss =
    followingDailyProfits && followingDailyProfits.length > 0
      ? followingDailyProfits[followingDailyProfits.length - 1]
      : undefined;

  const [sampledProfitLoss, sampledProfitLossRatio] = (() => {
    if (followingDailyProfits == null) return [0, 0];
    const totalSample = followingDailyProfits.length;
    if (totalSample === 0) return [0, 0];
    if (totalSample === 1) return [followingDailyProfits[0].navProfit, followingDailyProfits[0].navProfitRatio / 100];

    const newNAV = followingDailyProfits[totalSample - 1].netAssetValue;
    let oldNAV = followingDailyProfits[0].netAssetValue;

    if (
      isEqual(
        formatStringToDate(accountCreatedDate ?? '', 'yyyyMMdd'),
        formatStringToDate(followingDailyProfits[0].date ?? '', 'yyyyMMdd')
      ) ||
      isEqual(
        addBusinessDays(formatStringToDate(accountCreatedDate ?? '', 'yyyyMMdd'), 1),
        formatStringToDate(followingDailyProfits[0].date ?? '', 'yyyyMMdd')
      )
    ) {
      oldNAV = START_NAV;
    }

    return [newNAV - oldNAV, newNAV / oldNAV - 1];
  })();

  return {
    currentNAV: currentProfitLoss?.netAssetValue,
    currentCash: currentProfitLoss?.cashBalance,
    currentStockValue: currentProfitLoss?.stockBalance,
    sampledProfitLoss,
    sampledProfitLossRatio: sampledProfitLossRatio * 100,
  };
};

export const getLastTradingDay = (sample: number, holidays: HolidaysState) => {
  let lastTradingDay = new Date();
  const newDate = new Date();
  switch (sample) {
    case 7: {
      lastTradingDay = subDays(newDate, 7);
      break;
    }
    case 30: {
      lastTradingDay = subDays(newDate, 30);
      break;
    }
    case 90: {
      lastTradingDay = subDays(newDate, 90);
      break;
    }
    case 180: {
      lastTradingDay = subDays(newDate, 180);
      break;
    }
    case 365: {
      lastTradingDay = subDays(newDate, 365);
      break;
    }
    default:
      break;
  }
  // Sub 1 day if last trading day is holiday
  holidays.holidays.forEach(holiday => {
    while (isBeforeOrEqualDate(holiday.start, lastTradingDay) && isBeforeOrEqualDate(lastTradingDay, holiday.end)) {
      lastTradingDay = subDays(lastTradingDay, 1);
    }
  });
  return lastTradingDay;
};

export const getUserChartData = (
  followingDailyProfitLoss?: IFollowingDailyProfitLossResponse | null,
  isKis?: boolean
): [IFormatDataChart[], IFormatDataChart[], IFormatDataChart[], IFormatDataChart[]] => {
  if (followingDailyProfitLoss == null) return [[], [], [], []];

  let startNAV = followingDailyProfitLoss.followingDailyProfits[0].netAssetValue;
  let useStartNAV = false;

  const accountCreatedDate = isKis
    ? followingDailyProfitLoss.accountLinkedDate
    : followingDailyProfitLoss.accountCreatedDate;
  const { followingDailyProfits } = followingDailyProfitLoss;
  if (
    isEqual(
      formatStringToDate(accountCreatedDate ?? '', 'yyyyMMdd'),
      formatStringToDate(followingDailyProfits[0].date ?? '', 'yyyyMMdd')
    ) ||
    isEqual(
      addBusinessDays(formatStringToDate(accountCreatedDate ?? '', 'yyyyMMdd'), 1),
      formatStringToDate(followingDailyProfits[0].date ?? '', 'yyyyMMdd')
    )
  ) {
    startNAV = START_NAV;
    useStartNAV = true;
  }
  if (followingDailyProfitLoss == null) return [[], [], [], []];
  const NAVDataPercent = followingDailyProfitLoss.followingDailyProfits.map((item, i) => ({
    x: i,
    y: ((i === 0 && useStartNAV ? START_NAV : item.netAssetValue) / startNAV - 1) * 100,
    date: formatStringToDateString(item.date, 'dd/MM/yyyy'),
    xLabel: formatStringToDateString(item.date, 'dd/MM'),
  }));
  const VNIndexDataPercent = followingDailyProfitLoss.followingDailyProfits.map((item, i) => ({
    x: i,
    y: item.normalisedVnIndex,
    date: formatStringToDateString(item.date, 'dd/MM/yyyy'),
    xLabel: formatStringToDateString(item.date, 'dd/MM'),
  }));
  const NetAssetVale = followingDailyProfitLoss.followingDailyProfits.map((item, i) => ({
    x: i,
    y: item.netAssetValue,
    date: formatStringToDateString(item.date, 'dd/MM/yyyy'),
    xLabel: formatStringToDateString(item.date, 'dd/MM'),
  }));
  const NavProfit = followingDailyProfitLoss.followingDailyProfits.map((item, i) => ({
    x: i + 1,
    y: item.navProfit,
    date: formatStringToDateString(item.date, 'dd/MM/yyyy'),
    xLabel: formatStringToDateString(item.date, 'dd/MM'),
  }));
  const createDate = followingDailyProfitLoss.accountCreatedDate;
  const dataFirstDay = followingDailyProfitLoss.followingDailyProfits[0].date;
  if (createDate === dataFirstDay) {
    return [
      [
        {
          x: 0,
          y: 0,
          date: formatStringToDateString(dataFirstDay, 'dd/MM/yyyy'),
          xLabel: formatStringToDateString(dataFirstDay, 'dd/MM'),
        },
        ...NAVDataPercent.map(item => ({ ...item, x: item.x + 1 })),
      ],
      [{ x: 0, y: 0, date: '', xLabel: '' }, ...VNIndexDataPercent.map(item => ({ ...item, x: item.x + 1 }))],
      NetAssetVale,
      NavProfit,
    ];
  } else {
    return [NAVDataPercent, VNIndexDataPercent, NetAssetVale, NavProfit];
  }
};

export const useUpdateUserViewCount = (userId: number) => {
  // Increase views count of a user by 1
  useEffect(() => {
    try {
      query(APIList.updateHistoryAccount, {
        viewedUserId: userId,
      });
    } catch (error) {
      //
    }
  }, []);
};
