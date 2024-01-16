import React, { memo, useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';

import HeaderScreen from 'components/HeaderScreen';
import { InsightsStrategiesDetailOption, SELL_BUY_TYPE } from 'global';
import { formatNumber } from 'utils';
import SheetData, { ISheetDataConfig } from 'components/SheetData';
// Styles
import globalStyles, { scaleSize } from 'styles';
import useStyles from './styles';
// Icon
import IconFollow from 'assets/icon/IconFollow.svg';
import ArrowGreen from 'assets/icon/ArrowGreen.svg';
import ArrowIcon from 'assets/icon/arrow.svg';
import IconFollowed from 'assets/icon/IconFollowed.svg';

// type data in open position
type IFakeInsightsStrategiesDetailOpenPositionData = {
  symbol: string;
  openType: SELL_BUY_TYPE;
  price: number;
  openDate: string[];
  profit: number;
  profitRate: number;
};

// type data in trading history
type IFakeInsightsStrategiesDetailTradingHistoryData = {
  symbol: string;
  openType: SELL_BUY_TYPE;
  openDate: string[];
  closeDate: string[];
  openPrice: number;
  closePrice: number;
  profit: number;
  profitRate: number;
};

// type data in signal history
type IFakeInsightsStrategiesDetailSignalHistoryData = {
  id: number;
  symbol: string;
  type: SELL_BUY_TYPE;
  openSignal: number;
  price: number;
  profit: number;
  profitRate: number;
  createAt: string[];
  event: string;
  rateEvent: string;
};

// fake data open position in sheet data
const fakeInsightsStrategiesDetailOpenPositionData: IFakeInsightsStrategiesDetailOpenPositionData[] = [
  {
    symbol: 'CTG',
    openType: SELL_BUY_TYPE.BUY,
    price: 64400,
    openDate: ['01/06/2021', '08:23:07'],
    profit: 23700,
    profitRate: 1.6,
  },
  {
    symbol: 'CTG',
    openType: SELL_BUY_TYPE.BUY,
    price: 64400,
    openDate: ['01/06/2021', '08:23:07'],
    profit: 23700,
    profitRate: 1.6,
  },
  {
    symbol: 'CTG',
    openType: SELL_BUY_TYPE.BUY,
    price: 64400,
    openDate: ['01/06/2021', '08:23:07'],
    profit: 23700,
    profitRate: 1.6,
  },
  {
    symbol: 'CTG',
    openType: SELL_BUY_TYPE.BUY,
    price: 64400,
    openDate: ['01/06/2021', '08:23:07'],
    profit: 23700,
    profitRate: 1.6,
  },
  {
    symbol: 'CTG',
    openType: SELL_BUY_TYPE.BUY,
    price: 64400,
    openDate: ['01/06/2021', '08:23:07'],
    profit: 23700,
    profitRate: 1.6,
  },
  {
    symbol: 'CTG',
    openType: SELL_BUY_TYPE.BUY,
    price: 64400,
    openDate: ['01/06/2021', '08:23:07'],
    profit: 23700,
    profitRate: 1.6,
  },
  {
    symbol: 'CTG',
    openType: SELL_BUY_TYPE.BUY,
    price: 64400,
    openDate: ['01/06/2021', '08:23:07'],
    profit: 23700,
    profitRate: 1.6,
  },
  {
    symbol: 'CTG',
    openType: SELL_BUY_TYPE.BUY,
    price: 64400,
    openDate: ['01/06/2021', '08:23:07'],
    profit: 23700,
    profitRate: 1.6,
  },
  {
    symbol: 'CTG',
    openType: SELL_BUY_TYPE.BUY,
    price: 64400,
    openDate: ['01/06/2021', '08:23:07'],
    profit: 23700,
    profitRate: 1.6,
  },
  {
    symbol: 'CTG',
    openType: SELL_BUY_TYPE.BUY,
    price: 64400,
    openDate: ['01/06/2021', '08:23:07'],
    profit: 23700,
    profitRate: 1.6,
  },
];

// fake data trading history in sheet data
const fakeInsightsStrategiesDetailTradingHistoryData: IFakeInsightsStrategiesDetailTradingHistoryData[] = [
  {
    symbol: 'CTG',
    openType: SELL_BUY_TYPE.BUY,
    openDate: ['01/06/2021', '08:23:07'],
    closeDate: ['01/06/2021', '08:23:07'],
    openPrice: 64400,
    closePrice: 64400,
    profit: 23700,
    profitRate: 1.6,
  },
  {
    symbol: 'CTG',
    openType: SELL_BUY_TYPE.BUY,
    openDate: ['01/06/2021', '08:23:07'],
    closeDate: ['01/06/2021', '08:23:07'],
    openPrice: 64400,
    closePrice: 64400,
    profit: 23700,
    profitRate: 1.6,
  },
  {
    symbol: 'CTG',
    openType: SELL_BUY_TYPE.BUY,
    openDate: ['01/06/2021', '08:23:07'],
    closeDate: ['01/06/2021', '08:23:07'],
    openPrice: 64400,
    closePrice: 64400,
    profit: 23700,
    profitRate: 1.6,
  },
  {
    symbol: 'CTG',
    openType: SELL_BUY_TYPE.BUY,
    openDate: ['01/06/2021', '08:23:07'],
    closeDate: ['01/06/2021', '08:23:07'],
    openPrice: 64400,
    closePrice: 64400,
    profit: 23700,
    profitRate: 1.6,
  },
  {
    symbol: 'CTG',
    openType: SELL_BUY_TYPE.BUY,
    openDate: ['01/06/2021', '08:23:07'],
    closeDate: ['01/06/2021', '08:23:07'],
    openPrice: 64400,
    closePrice: 64400,
    profit: 23700,
    profitRate: 1.6,
  },
  {
    symbol: 'CTG',
    openType: SELL_BUY_TYPE.BUY,
    openDate: ['01/06/2021', '08:23:07'],
    closeDate: ['01/06/2021', '08:23:07'],
    openPrice: 64400,
    closePrice: 64400,
    profit: 23700,
    profitRate: 1.6,
  },
  {
    symbol: 'CTG',
    openType: SELL_BUY_TYPE.BUY,
    openDate: ['01/06/2021', '08:23:07'],
    closeDate: ['01/06/2021', '08:23:07'],
    openPrice: 64400,
    closePrice: 64400,
    profit: 23700,
    profitRate: 1.6,
  },
  {
    symbol: 'CTG',
    openType: SELL_BUY_TYPE.BUY,
    openDate: ['01/06/2021', '08:23:07'],
    closeDate: ['01/06/2021', '08:23:07'],
    openPrice: 64400,
    closePrice: 64400,
    profit: 23700,
    profitRate: 1.6,
  },
  {
    symbol: 'CTG',
    openType: SELL_BUY_TYPE.BUY,
    openDate: ['01/06/2021', '08:23:07'],
    closeDate: ['01/06/2021', '08:23:07'],
    openPrice: 64400,
    closePrice: 64400,
    profit: 23700,
    profitRate: 1.6,
  },
  {
    symbol: 'CTG',
    openType: SELL_BUY_TYPE.BUY,
    openDate: ['01/06/2021', '08:23:07'],
    closeDate: ['01/06/2021', '08:23:07'],
    openPrice: 64400,
    closePrice: 64400,
    profit: 23700,
    profitRate: 1.6,
  },
];

// fake data signal history in sheet data
const fakeInsightsStrategiesDetailSignalHistoryData: IFakeInsightsStrategiesDetailSignalHistoryData[] = [
  {
    id: 474,
    symbol: 'CTG',
    type: SELL_BUY_TYPE.BUY,
    openSignal: 172,
    price: 64400,
    profit: 23700,
    profitRate: 1.6,
    createAt: ['01/06/2021', '08:23:07'],
    event: '09/07/2021',
    rateEvent: '0.9473',
  },
  {
    id: 474,
    symbol: 'CTG',
    type: SELL_BUY_TYPE.BUY,
    openSignal: 172,
    price: 64400,
    profit: 23700,
    profitRate: 1.6,
    createAt: ['01/06/2021', '08:23:07'],
    event: '09/07/2021',
    rateEvent: '0.9473',
  },
  {
    id: 474,
    symbol: 'CTG',
    type: SELL_BUY_TYPE.BUY,
    openSignal: 172,
    price: 64400,
    profit: 23700,
    profitRate: 1.6,
    createAt: ['01/06/2021', '08:23:07'],
    event: '09/07/2021',
    rateEvent: '0.9473',
  },
  {
    id: 474,
    symbol: 'CTG',
    type: SELL_BUY_TYPE.BUY,
    openSignal: 172,
    price: 64400,
    profit: 23700,
    profitRate: 1.6,
    createAt: ['01/06/2021', '08:23:07'],
    event: '09/07/2021',
    rateEvent: '0.9473',
  },
  {
    id: 474,
    symbol: 'CTG',
    type: SELL_BUY_TYPE.BUY,
    openSignal: 172,
    price: 64400,
    profit: 23700,
    profitRate: 1.6,
    createAt: ['01/06/2021', '08:23:07'],
    event: '09/07/2021',
    rateEvent: '0.9473',
  },
  {
    id: 474,
    symbol: 'CTG',
    type: SELL_BUY_TYPE.BUY,
    openSignal: 172,
    price: 64400,
    profit: 23700,
    profitRate: 1.6,
    createAt: ['01/06/2021', '08:23:07'],
    event: '09/07/2021',
    rateEvent: '0.9473',
  },
  {
    id: 474,
    symbol: 'CTG',
    type: SELL_BUY_TYPE.BUY,
    openSignal: 172,
    price: 64400,
    profit: 23700,
    profitRate: 1.6,
    createAt: ['01/06/2021', '08:23:07'],
    event: '09/07/2021',
    rateEvent: '0.9473',
  },
  {
    id: 474,
    symbol: 'CTG',
    type: SELL_BUY_TYPE.BUY,
    openSignal: 172,
    price: 64400,
    profit: 23700,
    profitRate: 1.6,
    createAt: ['01/06/2021', '08:23:07'],
    event: '09/07/2021',
    rateEvent: '0.9473',
  },
];

const InsightsStrategiesDetail = (props: StackScreenProps<'InsightsStrategiesDetailItem'>) => {
  const [followed, setFollowed] = useState(false);
  const [optionSelecting, setOptionSelecting] = useState<InsightsStrategiesDetailOption>(
    InsightsStrategiesDetailOption.OPEN_POSITION
  );
  const [extended, setExtended] = useState(false);

  const { styles } = useStyles();

  // Toggle follow => followed or reverse
  const toggleFollow = () => {
    setFollowed(!followed);
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  // toggle importtant disclaimer
  const toggleExtend = () => {
    setExtended(!extended);
  };

  // Select option tab
  const onSelectOptionSelectingOpenPosition = () => {
    if (optionSelecting !== InsightsStrategiesDetailOption.OPEN_POSITION) {
      setOptionSelecting(InsightsStrategiesDetailOption.OPEN_POSITION);
    }
  };

  const onSelectOptionSelectingTradingHistory = () => {
    if (optionSelecting !== InsightsStrategiesDetailOption.TRADING_HISTORY) {
      setOptionSelecting(InsightsStrategiesDetailOption.TRADING_HISTORY);
    }
  };

  const onSelectOptionSelectingSignalHistory = () => {
    if (optionSelecting !== InsightsStrategiesDetailOption.SIGNAL_HISTORY) {
      setOptionSelecting(InsightsStrategiesDetailOption.SIGNAL_HISTORY);
    }
  };

  const cellStyle = [globalStyles.container2, globalStyles.centered];

  // config open position sheet data
  const configInsightsStrategiesDetailOpenPositionDataGrid: ISheetDataConfig = {
    columnFrozen: 1,
    maxHeightPerRow: 36,
    header: [
      {
        label: ['Symbol'],
        width: 70,
        element: (_key: string, rowData: IFakeInsightsStrategiesDetailOpenPositionData, _index: number) => (
          <View style={[cellStyle]}>
            <Text allowFontScaling={false} style={styles.text}>
              {rowData.symbol}
            </Text>
          </View>
        ),
      },
      {
        label: ['Open Type'],
        width: 90,
        element: (_key: string, rowData: IFakeInsightsStrategiesDetailOpenPositionData, _index: number) => (
          <View style={[cellStyle, styles.border1]}>
            <Text allowFontScaling={false} style={styles.text}>
              {rowData.openType}
            </Text>
          </View>
        ),
      },
      {
        label: ['Price'],
        width: 90,
        element: (_key: string, rowData: IFakeInsightsStrategiesDetailOpenPositionData, _index: number) => (
          <View style={[cellStyle, styles.border1]}>
            <Text allowFontScaling={false} style={styles.text}>
              {formatNumber(rowData.price, 2)}
            </Text>
          </View>
        ),
      },
      {
        label: ['Open Date'],
        width: 100,
        element: (_key: string, rowData: IFakeInsightsStrategiesDetailOpenPositionData, _index: number) => (
          <View style={[cellStyle, styles.border1]}>
            <Text allowFontScaling={false} style={styles.text}>
              {rowData.openDate.join(' ')}
            </Text>
          </View>
        ),
      },
      {
        label: ['Profit'],
        width: 142,
        element: (_key: string, rowData: IFakeInsightsStrategiesDetailOpenPositionData, _index: number) => (
          <View
            style={[
              globalStyles.container,
              globalStyles.fillWidth,
              globalStyles.justifyCenter,
              styles.border1,
              styles.paddingRight,
            ]}
          >
            <View style={[globalStyles.centered, globalStyles.flexDirectionRow, globalStyles.justifySpaceAround]}>
              <Text allowFontScaling={false} style={styles.quantity}>
                {formatNumber(rowData.profit, 2)}
              </Text>
              <ArrowGreen width={scaleSize(12)} height={scaleSize(10)} />
              <Text allowFontScaling={false} style={styles.quantity}>
                {formatNumber(rowData.profitRate, 2)}%
              </Text>
            </View>
          </View>
        ),
      },
    ],
  };

  // config trading history sheet data
  const configInsightsStrategiesDetailTradingHistoryDataGrid: ISheetDataConfig = {
    columnFrozen: 1,
    maxHeightPerRow: 36,
    header: [
      {
        label: ['Symbol'],
        width: 70,
        element: (_key: string, rowData: IFakeInsightsStrategiesDetailTradingHistoryData, _index: number) => (
          <View style={[cellStyle]}>
            <Text allowFontScaling={false} style={styles.text}>
              {rowData.symbol}
            </Text>
          </View>
        ),
      },
      {
        label: ['Open Type'],
        width: 90,
        element: (_key: string, rowData: IFakeInsightsStrategiesDetailTradingHistoryData, _index: number) => (
          <View style={[cellStyle, styles.border1]}>
            <Text allowFontScaling={false} style={styles.text}>
              {rowData.openType}
            </Text>
          </View>
        ),
      },
      {
        label: ['Open Date'],
        width: 100,
        element: (_key: string, rowData: IFakeInsightsStrategiesDetailTradingHistoryData, _index: number) => (
          <View style={[cellStyle, styles.border1]}>
            <Text allowFontScaling={false} style={styles.text}>
              {rowData.openDate.join(' ')}
            </Text>
          </View>
        ),
      },
      {
        label: ['Close Date'],
        width: 100,
        element: (_key: string, rowData: IFakeInsightsStrategiesDetailTradingHistoryData, _index: number) => (
          <View style={[cellStyle, styles.border1]}>
            <Text allowFontScaling={false} style={styles.text}>
              {rowData.closeDate.join(' ')}
            </Text>
          </View>
        ),
      },
      {
        label: ['Open Price'],
        width: 90,
        element: (_key: string, rowData: IFakeInsightsStrategiesDetailTradingHistoryData, _index: number) => (
          <View style={[cellStyle, styles.border1]}>
            <Text allowFontScaling={false} style={styles.text}>
              {formatNumber(rowData.openPrice, 2)}
            </Text>
          </View>
        ),
      },
      {
        label: ['Close Price'],
        width: 90,
        element: (_key: string, rowData: IFakeInsightsStrategiesDetailTradingHistoryData, _index: number) => (
          <View style={[cellStyle, styles.border1]}>
            <Text allowFontScaling={false} style={styles.text}>
              {formatNumber(rowData.closePrice, 2)}
            </Text>
          </View>
        ),
      },
      {
        label: ['Profit'],
        width: 142,
        element: (_key: string, rowData: IFakeInsightsStrategiesDetailTradingHistoryData, _index: number) => (
          <View
            style={[
              globalStyles.container,
              globalStyles.fillWidth,
              globalStyles.justifyCenter,
              styles.border1,
              styles.paddingRight,
            ]}
          >
            <View style={[globalStyles.centered, globalStyles.flexDirectionRow, globalStyles.justifySpaceAround]}>
              <Text allowFontScaling={false} style={styles.quantity}>
                {formatNumber(rowData.profit, 2)}
              </Text>
              <ArrowGreen width={scaleSize(12)} height={scaleSize(10)} />
              <Text allowFontScaling={false} style={styles.quantity}>
                {formatNumber(rowData.profitRate, 2)}%
              </Text>
            </View>
          </View>
        ),
      },
    ],
  };

  // config signal history sheet data
  const configInsightsStrategiesDetailSignalHistoryDataGrid: ISheetDataConfig = {
    columnFrozen: 1,
    maxHeightPerRow: 36,
    header: [
      {
        label: ['ID'],
        width: 50,
        element: (_key: string, rowData: IFakeInsightsStrategiesDetailSignalHistoryData, _index: number) => (
          <View style={[cellStyle]}>
            <Text allowFontScaling={false} style={styles.text}>
              {rowData.id}
            </Text>
          </View>
        ),
      },
      {
        label: ['Symbol'],
        width: 70,
        element: (_key: string, rowData: IFakeInsightsStrategiesDetailSignalHistoryData, _index: number) => (
          <View style={[cellStyle, styles.border1]}>
            <Text allowFontScaling={false} style={styles.text}>
              {rowData.symbol}
            </Text>
          </View>
        ),
      },
      {
        label: ['Type'],
        width: 70,
        element: (_key: string, rowData: IFakeInsightsStrategiesDetailSignalHistoryData, _index: number) => (
          <View style={[cellStyle, styles.border1]}>
            <Text allowFontScaling={false} style={styles.text}>
              {rowData.type}
            </Text>
          </View>
        ),
      },
      {
        label: ['Open Signal'],
        width: 100,
        element: (_key: string, rowData: IFakeInsightsStrategiesDetailSignalHistoryData, _index: number) => (
          <View style={[cellStyle, styles.border1]}>
            <Text allowFontScaling={false} style={styles.text}>
              {rowData.openSignal}
            </Text>
          </View>
        ),
      },
      {
        label: ['Price'],
        width: 90,
        element: (_key: string, rowData: IFakeInsightsStrategiesDetailSignalHistoryData, _index: number) => (
          <View style={[cellStyle, styles.border1]}>
            <Text allowFontScaling={false} style={styles.text}>
              {formatNumber(rowData.price, 2)}
            </Text>
          </View>
        ),
      },
      {
        label: ['Profit'],
        width: 142,
        element: (_key: string, rowData: IFakeInsightsStrategiesDetailSignalHistoryData, _index: number) => (
          <View
            style={[
              globalStyles.container,
              globalStyles.fillWidth,
              globalStyles.justifyCenter,
              styles.border1,
              styles.paddingRight,
            ]}
          >
            <View style={[globalStyles.centered, globalStyles.flexDirectionRow, globalStyles.justifySpaceAround]}>
              <Text allowFontScaling={false} style={styles.quantity}>
                {formatNumber(rowData.profit, 2)}
              </Text>
              <ArrowGreen width={scaleSize(12)} height={scaleSize(10)} />
              <Text allowFontScaling={false} style={styles.quantity}>
                {formatNumber(rowData.profitRate, 2)}%
              </Text>
            </View>
          </View>
        ),
      },
      {
        label: ['Create At'],
        width: 100,
        element: (_key: string, rowData: IFakeInsightsStrategiesDetailSignalHistoryData, _index: number) => (
          <View style={[cellStyle, styles.border1]}>
            <Text allowFontScaling={false} style={styles.text}>
              {rowData.createAt.join(' ')}
            </Text>
          </View>
        ),
      },
      {
        label: ['Event'],
        width: 170,
        element: (_key: string, rowData: IFakeInsightsStrategiesDetailSignalHistoryData, _index: number) => (
          <View
            style={[
              globalStyles.container,
              globalStyles.fillWidth,
              globalStyles.justifyCenter,
              styles.border1,
              styles.paddingRight,
            ]}
          >
            <View style={[globalStyles.centered, globalStyles.flexDirectionCol]}>
              <Text allowFontScaling={false}>{rowData.event}</Text>
              <Text allowFontScaling={false}>Rate = {rowData.rateEvent}%</Text>
            </View>
          </View>
        ),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <HeaderScreen leftButtonIcon={true} goBackAction={goBack} headerTitle={props.route.params.screenName} />
      <View>
        <Text style={styles.marginText}>
          This strategy generates signals for stocks based on price momentum and company valuation, monthly rebalancing
        </Text>
        <View style={[globalStyles.container, styles.followButtonContainer]}>
          <TouchableOpacity
            onPress={toggleFollow}
            style={[
              globalStyles.flexDirectionRow,
              globalStyles.centered,
              followed ? styles.followedButton : styles.followButton,
            ]}
          >
            {followed ? (
              <IconFollowed height={scaleSize(20)} width={scaleSize(20)} style={styles.followIcon} />
            ) : (
              <IconFollow height={scaleSize(20)} width={scaleSize(20)} style={styles.followIcon} />
            )}
            <Text allowFontScaling={false} style={followed ? styles.followedText : styles.followText}>
              {followed ? 'Followed' : 'Follow'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.border, styles.marginTop70]} />
      <View>
        <Text style={[styles.textTradingHistory, styles.marginLeft16, styles.marginVertical10]}>
          Trading History and Performance
        </Text>
        <View style={[globalStyles.flexDirectionRow, styles.screenOption]}>
          <TouchableOpacity
            onPress={onSelectOptionSelectingOpenPosition}
            style={[
              globalStyles.centered,
              globalStyles.container,
              styles.optionContainer,
              optionSelecting === InsightsStrategiesDetailOption.OPEN_POSITION && styles.optionContainerSelected,
            ]}
          >
            <Text
              style={
                optionSelecting === InsightsStrategiesDetailOption.OPEN_POSITION
                  ? styles.selectedText
                  : styles.unselectedText
              }
            >
              Open Position
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onSelectOptionSelectingTradingHistory}
            style={[
              globalStyles.centered,
              globalStyles.container,
              styles.optionContainer,
              optionSelecting === InsightsStrategiesDetailOption.TRADING_HISTORY && styles.optionContainerSelected,
            ]}
          >
            <Text
              style={
                optionSelecting === InsightsStrategiesDetailOption.TRADING_HISTORY
                  ? styles.selectedText
                  : styles.unselectedText
              }
            >
              Trading History
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onSelectOptionSelectingSignalHistory}
            style={[
              globalStyles.centered,
              globalStyles.container,
              styles.optionContainer,
              optionSelecting === InsightsStrategiesDetailOption.SIGNAL_HISTORY && styles.optionContainerSelected,
            ]}
          >
            <Text
              style={
                optionSelecting === InsightsStrategiesDetailOption.SIGNAL_HISTORY
                  ? styles.selectedText
                  : styles.unselectedText
              }
            >
              Signal History
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* tab open position */}
      {optionSelecting === InsightsStrategiesDetailOption.OPEN_POSITION && (
        <View
          style={[
            globalStyles.container2,
            styles.paddingTop8,
            Platform.OS === 'ios' ? styles.heightData : styles.heightDataAndroid,
          ]}
        >
          <SheetData
            data={fakeInsightsStrategiesDetailOpenPositionData}
            config={configInsightsStrategiesDetailOpenPositionDataGrid}
          />
        </View>
      )}

      {/* tab trading history */}
      {optionSelecting === InsightsStrategiesDetailOption.TRADING_HISTORY && (
        <View
          style={[
            globalStyles.container2,
            styles.paddingTop8,
            Platform.OS === 'ios' ? styles.heightData : styles.heightDataAndroid,
          ]}
        >
          <SheetData
            data={fakeInsightsStrategiesDetailTradingHistoryData}
            config={configInsightsStrategiesDetailTradingHistoryDataGrid}
          />
        </View>
      )}

      {/* tab signal history */}
      {optionSelecting === InsightsStrategiesDetailOption.SIGNAL_HISTORY && (
        <View
          style={[
            globalStyles.container2,
            styles.paddingTop8,
            Platform.OS === 'ios' ? styles.heightData : styles.heightDataAndroid,
          ]}
        >
          <SheetData
            data={fakeInsightsStrategiesDetailSignalHistoryData}
            config={configInsightsStrategiesDetailSignalHistoryDataGrid}
          />
        </View>
      )}

      <TouchableOpacity
        style={[
          globalStyles.centered,
          globalStyles.flexDirectionRow,
          globalStyles.justifySpaceBetween,
          extended ? styles.extendedButtonArea : styles.extendButtonArea,
        ]}
        onPress={toggleExtend}
      >
        <Text allowFontScaling={false} style={styles.extendText}>
          Important Disclaimer
        </Text>
        <ArrowIcon
          style={[styles.rotateIcon, extended ? styles.collapseIcon : {}]}
          height={scaleSize(9)}
          width={scaleSize(8)}
        />
      </TouchableOpacity>
      {extended && (
        <Text allowFontScaling={false} style={[styles.itemText, styles.extendBtn]}>
          All trade data and performance is hypothetical based on historical data. Matched price is assumed at the price
          when the signal arose. We only provide information and profit & Loss on behalf of the user's responsibility
        </Text>
      )}
    </View>
  );
};

export default memo(InsightsStrategiesDetail);
