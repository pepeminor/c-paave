import SheetData from 'components/SheetData';
import React, { memo, useState } from 'react';
import {
  // StyleProp,
  Text,
  // TouchableOpacity,
  View,
  // ViewStyle,
} from 'react-native';
import VNM from 'assets/VNM.svg';
// import BID from 'assets/BID.svg';
// import FPT from 'assets/FPT.svg';
// import Arrow from 'assets/icon/arrow.svg';
import { formatNumber } from 'utils';
import globalStyles, { scaleSize } from 'styles';
import useStyles from './styles';

type IFakeDataType = {
  image: React.ReactNode;
  stockCode: string;
  stockCodeCompanyName: string;
  weight: number;
  holdingDays: number;
  return: number;
};

const cellStyle = [globalStyles.container2, globalStyles.centered];

const fakeData: IFakeDataType[] = [
  {
    image: <VNM width={scaleSize(36)} height={scaleSize(36)} />,
    stockCode: 'SSI',
    stockCodeCompanyName: 'SSI Securities Corporation',
    weight: 20,
    holdingDays: 23,
    return: 10,
  },
  {
    image: <VNM width={scaleSize(36)} height={scaleSize(36)} />,
    stockCode: 'SSI',
    stockCodeCompanyName: 'SSI Securities Corporation',
    weight: 20,
    holdingDays: 23,
    return: 10,
  },
  {
    image: <VNM width={scaleSize(36)} height={scaleSize(36)} />,
    stockCode: 'SSI',
    stockCodeCompanyName: 'SSI Securities Corporation',
    weight: 20,
    holdingDays: 23,
    return: 10,
  },
  {
    image: <VNM width={scaleSize(36)} height={scaleSize(36)} />,
    stockCode: 'SSI',
    stockCodeCompanyName: 'SSI Securities Corporation',
    weight: 20,
    holdingDays: 23,
    return: 10,
  },
];

const StockListUserInfo = () => {
  const { styles } = useStyles();
  const [configGrid] = useState({
    columnFrozen: 0,
    maxHeightPerRow: 62,
    header: [
      {
        label: ['Symbol'],
        width: 172,
        element: (_key: string, rowData: IFakeDataType, _index: number) => (
          <View style={[cellStyle, globalStyles.flexDirectionRow, styles.border]}>
            <View style={[globalStyles.justifyCenter, styles.leftItemStockCode]}>{rowData.image}</View>
            <View style={[globalStyles.justifyCenter, globalStyles.container]}>
              <Text allowFontScaling={false} style={styles.stockCodeText}>
                {rowData.stockCode}
              </Text>
              <Text allowFontScaling={false} style={styles.stockCodeCompanyNameText}>
                {rowData.stockCodeCompanyName}
              </Text>
            </View>
          </View>
        ),
      },
      {
        label: ['Weight'],
        width: 66,
        element: (_key: string, rowData: IFakeDataType, _index: number) => (
          <View style={[cellStyle, styles.border]}>
            <View
              style={[
                globalStyles.container,
                globalStyles.fillWidth,
                globalStyles.justifyCenter,
                styles.alignItemEnd,
                styles.paddingRight,
              ]}
            >
              <Text allowFontScaling={false} style={styles.weight}>
                {formatNumber(rowData.weight, 2)}%
              </Text>
            </View>
          </View>
        ),
      },
      {
        label: ['Holding days'],
        width: 70,
        element: (_key: string, rowData: IFakeDataType, _index: number) => (
          <View style={[cellStyle, styles.border]}>
            <View
              style={[
                globalStyles.container,
                globalStyles.fillWidth,
                globalStyles.justifyCenter,
                styles.alignItemEnd,
                styles.paddingRight,
              ]}
            >
              <Text allowFontScaling={false} style={styles.weight}>
                {formatNumber(rowData.holdingDays, 2)}
              </Text>
            </View>
          </View>
        ),
      },
      {
        label: ['Return'],
        width: 64,
        element: (_key: string, rowData: IFakeDataType, _index: number) => (
          <View style={cellStyle}>
            <View
              style={[
                globalStyles.container,
                globalStyles.fillWidth,
                globalStyles.justifyCenter,
                styles.alignItemEnd,
                styles.paddingRight,
              ]}
            >
              <Text
                allowFontScaling={false}
                style={[
                  styles.weight2,
                  rowData.return > 0
                    ? globalStyles.colorUp
                    : rowData.return < 0
                    ? globalStyles.colorDown
                    : globalStyles.colorSteady,
                ]}
              >
                {formatNumber(rowData.return, 2)}%
              </Text>
            </View>
          </View>
        ),
      },
    ],
  });

  return (
    <View style={[globalStyles.container]}>
      <SheetData config={configGrid} data={fakeData} />
    </View>
  );
};

export default memo(StockListUserInfo);
