import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import globalStyles, { scaleSize } from 'styles';
import useStyles from './styles';
import CandleStickChart from 'components/Chart/CandleStickChart';
import { navigate } from 'utils';

/* ICONS */
import OutlineRight from 'assets/icon/OutlineRight.svg';
import IconUpPnL from 'assets/icon/IconUpPnL.svg';
import IconFollow from 'assets/icon/IconFollow.svg';
import IconFollowed from 'assets/icon/IconFollowed.svg';

const candlestickData = [
  { x: 1, open: 5, close: 10, high: 15, low: 0 },
  { x: 2, open: 10, close: 15, high: 20, low: 5 },
  { x: 3, open: 15, close: 20, high: 22, low: 10 },
  { x: 4, open: 20, close: 10, high: 25, low: 7 },
  { x: 5, open: 10, close: 8, high: 15, low: 5 },

  { x: 6, open: 5, close: 10, high: 15, low: 0 },
  { x: 7, open: 10, close: 15, high: 20, low: 5 },
  { x: 8, open: 15, close: 20, high: 22, low: 10 },
  { x: 9, open: 20, close: 10, high: 25, low: 7 },
  { x: 10, open: 10, close: 8, high: 15, low: 5 },

  { x: 11, open: 5, close: 10, high: 15, low: 0 },
  { x: 12, open: 10, close: 15, high: 20, low: 5 },
  { x: 13, open: 15, close: 20, high: 22, low: 10 },
  { x: 14, open: 20, close: 10, high: 25, low: 7 },
  { x: 15, open: 10, close: 8, high: 15, low: 5 },
];

const barData = [
  { x: 1, y: 2 },
  { x: 2, y: 3 },
  { x: 3, y: 4 },
  { x: 4, y: 3 },
  { x: 5, y: 5 },

  { x: 6, y: 2 },
  { x: 7, y: 3 },
  { x: 8, y: 4 },
  { x: 9, y: 3 },
  { x: 10, y: 5 },

  { x: 11, y: 2 },
  { x: 12, y: 3 },
  { x: 13, y: 4 },
  { x: 14, y: 3 },
  { x: 15, y: 5 },
];

export interface IStrategies {
  id: number;
  title: string;
  ratio: number;
}

type IStrategiesItemProps = {
  data: IStrategies;
  onFollowPress?: (id: number) => void;
  marginTop?: boolean;
  followed?: boolean;
};

const StrategiesItem = (props: IStrategiesItemProps) => {
  const onGoToDetail = (title: string) => {
    navigate({ key: 'InsightsStrategiesDetailItem', params: { screenName: title } });
  };

  const onHandleFollow = (id: number) => {
    if (props.onFollowPress) props.onFollowPress(id);
  };

  const { styles } = useStyles();

  return (
    <View style={[styles.chartBlock, props.marginTop && styles.chartBlockMarginTop]}>
      {/* Header */}
      <View
        style={[
          globalStyles.flexDirectionRow,
          globalStyles.alignCenter,
          globalStyles.justifySpaceBetween,
          styles.headerContainer,
        ]}
      >
        <View style={[globalStyles.justifyCenter, styles.headerInfo]}>
          <TouchableOpacity onPress={() => onGoToDetail(props.data.title)}>
            <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, globalStyles.justifySpaceBetween]}>
              <Text style={[styles.headerTitleText]}>{props.data.title}</Text>
              <OutlineRight width={scaleSize(24)} height={scaleSize(24)} />
            </View>
            <View style={[globalStyles.flexDirectionRow, styles.headerRate]}>
              <View style={[globalStyles.centered, styles.iconContainer]}>
                <IconUpPnL width={scaleSize(9)} height={scaleSize(7.5)} />
              </View>
              <Text>21.59%</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => onHandleFollow(props.data.id)}
          style={[
            globalStyles.flexDirectionRow,
            globalStyles.centered,
            props.followed ? styles.btnFollowed : styles.btnFollow,
          ]}
        >
          {props.followed ? (
            <IconFollowed width={scaleSize(24)} height={scaleSize(24)} />
          ) : (
            <IconFollow width={scaleSize(24)} height={scaleSize(24)} />
          )}
          <Text style={[props.followed ? styles.txtFollowed : styles.txtFollow]}>
            {props.followed ? 'Followed' : 'Follow'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Chart */}
      <View style={[styles.chartContainer]}>
        <CandleStickChart
          chartData={{ candlestickData: candlestickData, barData: barData }}
          containerStyle={[globalStyles.container]}
          chartStyle={{ height: 240 }}
        />
      </View>

      {/* Total rate value */}
      <View style={[globalStyles.flexDirectionRow, styles.totalRateValueContainer]}>
        <View style={[globalStyles.centered, styles.totalRateValueItem, styles.itemBorderLeft, styles.itemBorderRight]}>
          <Text style={styles.totalItemName}>ROI</Text>
          <Text style={styles.totalItemRate}>23.3%</Text>
        </View>
        <View style={[globalStyles.centered, styles.totalRateValueItem, styles.itemBorderRight]}>
          <Text style={styles.totalItemName}>Drawdown</Text>
          <Text style={styles.totalItemRate}>45.23%</Text>
        </View>
        <View style={[globalStyles.centered, styles.totalRateValueItem, styles.itemBorderRight]}>
          <Text style={styles.totalItemName}>Following</Text>
          <Text style={styles.totalItemRate}>343</Text>
        </View>
        <View style={[globalStyles.centered, styles.totalRateValueItem, styles.itemBorderRight]}>
          <Text style={styles.totalItemName}>Views</Text>
          <Text style={styles.totalItemRate}>23.439</Text>
        </View>
      </View>
    </View>
  );
};

export default memo(StrategiesItem);
