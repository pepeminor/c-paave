import { WS } from 'constants/enum';
import { Global } from 'constants/main';
import { SCChannel } from 'sc-channel';
import { deepMapFields } from 'utils';
import { StockThemeSchema } from './StockTheme.schema';
import { ThemeData } from 'interfaces/stockTheme';
import { StockThemeActions } from './StockTheme.redux';
import { ThemeMapItem, ThemePeriod } from './StockTheme.type';
import { store } from 'screens/App';

/**
 * Global store to keep track of subscribed channels
 */
const ChannelsStore = {
  themeChannels: new Map<string, ChannelItem>(),
} as const;

type ChannelItem = {
  channel: SCChannel;
  count: number;
};

export const ThemeSubscribeHelper = {
  subscribe(themeCodeList?: string[]) {
    const themeCodes =
      themeCodeList ?? Object.values(store.getState().StockThemeReducer['1D'].themeMap).map(item => item.themeCode);
    themeCodes.forEach(themeCode => {
      ThemeHelper.subscribe(themeCode);
    });
  },
  unsubscribe(themeCodeList?: string[]) {
    const themeCodes =
      themeCodeList ?? Object.values(store.getState().StockThemeReducer['1D'].themeMap).map(item => item.themeCode);
    themeCodes.forEach(themeCode => {
      ThemeHelper.unsubscribe(themeCode);
    });
  },
};

const ThemeHelper = {
  subscribe(themeCode: string) {
    const socket = Global.sockets[WS.PRICE_BOARD];
    if (socket == null) return;
    const channel = ChannelsStore.themeChannels.get(themeCode);
    if (channel != null) {
      channel.count += 1;
      return;
    }
    const newChannel = socket.subscribe(`market.theme.${themeCode}`, { batch: true });
    ChannelsStore.themeChannels.set(themeCode, {
      channel: newChannel,
      count: 1,
    });
    newChannel.watch(rawData => {
      const mappedData = deepMapFields(rawData, StockThemeSchema.themeData);
      updateThemeData(mappedData, themeCode, '1D');
      updateThemeData(mappedData, themeCode, '3D');
      updateThemeData(mappedData, themeCode, '1W');
    });
  },
  unsubscribe(themeCode: string) {
    const channel = ChannelsStore.themeChannels.get(themeCode);
    if (channel == null) return;
    channel.count = -1 + channel.count;
    if (channel.count > 0) return;
    channel.channel.unwatch();
    channel.channel.unsubscribe();
    ChannelsStore.themeChannels.delete(themeCode);
  },
};

function updateThemeData(mappedData: any, themeCode: string, period: ThemePeriod) {
  const { themeName, updatedDate, themeData = [] } = mappedData;
  const dataByPeriod = themeData.find((item: any) => item.period === period);
  if (dataByPeriod == null) return;
  const data: ThemeData = {
    themeName,
    updatedDate,
    themeCode,
    ...dataByPeriod,
    stockData: dataByPeriod.stockData?.reduce((acc: any, item: any) => {
      acc[item.symbol] = item;
      return acc;
    }, {}),
  };
  const oldData: ThemeMapItem = store.getState().StockThemeReducer[period].themeMap[themeName];
  if (
    oldData == null ||
    oldData.themeChangeRate !== data.themeChangeRate ||
    oldData.noOfIncreases !== data.noOfIncreases ||
    oldData.noOfDecreases !== data.noOfDecreases ||
    oldData.noOfUnchanges !== data.noOfUnchanges
  ) {
    store.dispatch(
      StockThemeActions.updateThemeMap({
        period,
        data: { [themeName]: data },
      })
    );
    store.dispatch(StockThemeActions.updateLastUpdateTime(updatedDate));
  }
}
