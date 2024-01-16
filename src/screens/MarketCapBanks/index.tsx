import React, { memo } from 'react';
import { Text, View } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import SortIcon from 'assets/icon/SortIcon.svg';
import IconIncrease from 'assets/icon/IconIncrease.svg';
import { formatNumber } from 'utils';
import SheetData, { ISheetDataConfig } from 'components/SheetData';
import globalStyles, { scaleSize } from 'styles';
import useStyles from './styles';
import HeaderScreen from 'components/HeaderScreen';
import i18n from 'i18next';

type IFakeDataType = {
  stockCode: string;
  fullName: string;
  currentPrice: number;
  currentRate: number;
  marketCap: number;
};

const gridData: IFakeDataType[] = [
  {
    stockCode: 'CTG',
    fullName: 'Ngân hàng TMCP Công thương Việt Nam',
    currentPrice: 10000,
    currentRate: 20,
    marketCap: 432700000,
  },
  {
    stockCode: 'CTG',
    fullName: 'Ngân hàng TMCP Công thương Việt Nam',
    currentPrice: 10000,
    currentRate: 20,
    marketCap: 432700000,
  },
  {
    stockCode: 'CTG',
    fullName: 'Ngân hàng TMCP Công thương Việt Nam',
    currentPrice: 10000,
    currentRate: 20,
    marketCap: 432700000,
  },
  {
    stockCode: 'CTG',
    fullName: 'Ngân hàng TMCP Công thương Việt Nam',
    currentPrice: 10000,
    currentRate: 20,
    marketCap: 432700000,
  },
  {
    stockCode: 'CTG',
    fullName: 'Ngân hàng TMCP Công thương Việt Nam',
    currentPrice: 10000,
    currentRate: 20,
    marketCap: 432700000,
  },
  {
    stockCode: 'CTG',
    fullName: 'Ngân hàng TMCP Công thương Việt Nam',
    currentPrice: 10000,
    currentRate: 20,
    marketCap: 432700000,
  },
  {
    stockCode: 'CTG',
    fullName: 'Ngân hàng TMCP Công thương Việt Nam',
    currentPrice: 10000,
    currentRate: 20,
    marketCap: 432700000,
  },
  {
    stockCode: 'CTG',
    fullName: 'Ngân hàng TMCP Công thương Việt Nam',
    currentPrice: 10000,
    currentRate: 20,
    marketCap: 432700000,
  },
  {
    stockCode: 'CTG',
    fullName: 'Ngân hàng TMCP Công thương Việt Nam',
    currentPrice: 10000,
    currentRate: 20,
    marketCap: 432700000,
  },
  {
    stockCode: 'CTG',
    fullName: 'Ngân hàng TMCP Công thương Việt Nam',
    currentPrice: 10000,
    currentRate: 20,
    marketCap: 432700000,
  },
  {
    stockCode: 'CTG',
    fullName: 'Ngân hàng TMCP Công thương Việt Nam',
    currentPrice: 10000,
    currentRate: 20,
    marketCap: 432700000,
  },
  {
    stockCode: 'CTG',
    fullName: 'Ngân hàng TMCP Công thương Việt Nam',
    currentPrice: 10000,
    currentRate: 20,
    marketCap: 432700000,
  },
];

const MarketCapBanks = (props: StackScreenProps<'MarketCapBanks'>) => {
  const { styles } = useStyles();
  const goBack = () => {
    props.navigation.goBack();
  };
  const cellStyle = [globalStyles.container2, globalStyles.centered];

  const configGrid: ISheetDataConfig = {
    columnFrozen: 0,
    maxHeightPerRow: 54,
    header: [
      {
        label: [
          <View
            style={[
              globalStyles.container2,
              globalStyles.centered,
              globalStyles.flexDirectionRow,
              styles.sheetDataHeaderBackground,
            ]}
          >
            <View style={[globalStyles.container, globalStyles.centered]}>
              <Text allowFontScaling={false} style={[styles.newsEachItemContentTitleText2]}>
                {i18n.t('Symbol')}
              </Text>
            </View>
            <SortIcon style={styles.newsEachItemContentTitleText3} height={scaleSize(16)} width={scaleSize(16)} />
          </View>,
        ],
        width: 174,
        element: (_key: string, rowData: IFakeDataType, _index: number) => (
          <View style={[cellStyle, styles.borderRight]}>
            <View style={[globalStyles.container2, globalStyles.flexDirectionRow]}>
              <View style={styles.itemImage}></View>
              <View style={[globalStyles.container, globalStyles.justifyCenter]}>
                <Text allowFontScaling={false} style={styles.stockCodeText}>
                  {rowData.stockCode}
                </Text>
                <Text allowFontScaling={false} style={styles.fullNameText}>
                  {rowData.fullName}
                </Text>
              </View>
            </View>
          </View>
        ),
      },
      {
        label: [
          <View
            style={[
              globalStyles.container2,
              globalStyles.centered,
              globalStyles.flexDirectionRow,
              styles.sheetDataHeaderBackground,
            ]}
          >
            <View style={[globalStyles.container, globalStyles.centered]}>
              <Text allowFontScaling={false} style={[styles.newsEachItemContentTitleText2]}>
                {i18n.t('Current Price')}
              </Text>
            </View>
            <SortIcon style={styles.newsEachItemContentTitleText3} height={scaleSize(16)} width={scaleSize(16)} />
          </View>,
        ],
        width: 86,
        element: (_key: string, rowData: IFakeDataType, _index: number) => (
          <View style={[cellStyle, styles.borderRight]}>
            <View
              style={[
                globalStyles.container,
                globalStyles.fillWidth,
                globalStyles.justifyCenter,
                globalStyles.alignEnd,
                styles.paddingRight,
              ]}
            >
              <Text
                allowFontScaling={false}
                style={[
                  styles.numberText,
                  rowData.currentRate > 0
                    ? globalStyles.colorUp
                    : rowData.currentRate < 0
                    ? globalStyles.colorDown
                    : globalStyles.colorSteady,
                ]}
              >
                {formatNumber(rowData.currentPrice, 2)}
              </Text>
              <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter]}>
                <IconIncrease width={scaleSize(9)} height={scaleSize(8)} style={styles.iconStyle} />
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.numberText,
                    rowData.currentRate > 0
                      ? globalStyles.colorUp
                      : rowData.currentRate < 0
                      ? globalStyles.colorDown
                      : globalStyles.colorSteady,
                  ]}
                >
                  {formatNumber(rowData.currentRate, 2)}%
                </Text>
              </View>
            </View>
          </View>
        ),
      },
      {
        label: [
          <View
            style={[
              globalStyles.container2,
              globalStyles.centered,
              globalStyles.flexDirectionRow,
              styles.sheetDataHeaderBackground,
            ]}
          >
            <View style={[globalStyles.container, globalStyles.centered]}>
              <Text allowFontScaling={false} style={[styles.newsEachItemContentTitleText2]}>
                {i18n.t('Market Cap')}
              </Text>
            </View>
            <SortIcon style={styles.newsEachItemContentTitleText3} height={scaleSize(16)} width={scaleSize(16)} />
          </View>,
        ],
        width: 115,
        element: (_key: string, rowData: IFakeDataType, _index: number) => (
          <View style={cellStyle}>
            <View style={[globalStyles.container, globalStyles.fillWidth, globalStyles.centered]}>
              <Text allowFontScaling={false} style={styles.numberText}>
                {formatNumber(rowData.marketCap, 2)}
              </Text>
            </View>
          </View>
        ),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <HeaderScreen leftButtonIcon={true} goBackAction={goBack} headerTitle={'Market Cap - Bank'} />
      <SheetData config={configGrid} data={gridData} />
    </View>
  );
};

export default memo(MarketCapBanks);
