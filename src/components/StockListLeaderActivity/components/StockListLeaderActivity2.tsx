import React, { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import globalStyles from 'styles';
import useStyles from '../styles';
import { useDispatch } from 'react-redux';
import { putIncreaseSearch, putIncreaseSearchForKis } from 'reduxs/global-actions';
import { ACCOUNT_TYPE } from 'global';
import { useTranslation } from 'react-i18next';
import { ITradingHistories } from 'interfaces/profile';
import SheetData, { ISheetDataConfig } from 'components/SheetData';
import ImagesLogo from 'components/ImagesLogo';
import { formatNumber, getColor, navigateToSymbolInfoOverview, isSymbolExist } from 'utils';
import withMemo from 'HOC/withMemo';
import { WatchListActions } from 'reduxs';
import { useAppSelector, useTypedSelector } from 'hooks/useAppSelector';

type IStockListLeaderActivity2Props = {
  profileId?: number | undefined;
  listTradingHistory?: ITradingHistories[];
  isLoadingHistory?: boolean;
};

const cellStyle = [globalStyles.container2, globalStyles.centered];

const StockListLeaderActivity2 = ({ listTradingHistory, isLoadingHistory }: IStockListLeaderActivity2Props) => {
  const tradingHistory = useAppSelector(state => state.tradingHistory);
  const selectedAccount = useAppSelector(state => state.selectedAccount);
  const listCurrentSymbol = useTypedSelector(state => state.SymbolData.marketData.symbolMap);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { styles } = useStyles();

  const isFuturesCode = useCallback(
    (symbolCode: string) => {
      if (
        listCurrentSymbol == null ||
        listCurrentSymbol[symbolCode] == null ||
        listCurrentSymbol[symbolCode].symbolType !== 'FUTURES'
      ) {
        return false;
      } else {
        return true;
      }
    },
    [listCurrentSymbol]
  );

  const renderLoadingText = () => {
    if (isLoadingHistory) {
      return (
        <View>
          <Text style={styles.loadingText}>{t('Loading')}...</Text>
        </View>
      );
    }
    return <></>;
  };

  const goToStockInfoOverView = (item: ITradingHistories) => {
    if (!isSymbolExist(item.stockCode)) return;
    if (selectedAccount.type === ACCOUNT_TYPE.VIRTUAL) {
      dispatch(putIncreaseSearch({ code: item.stockCode }));
    }
    if (selectedAccount.type === ACCOUNT_TYPE.KIS) {
      dispatch(putIncreaseSearchForKis({ code: item.stockCode, partnerId: 'kis' }));
    }
    dispatch(
      WatchListActions.getSymbolIncludeWatchList({
        code: item.stockCode,
      })
    );
    navigateToSymbolInfoOverview(item.stockCode, dispatch);
  };

  const columnConfig: ISheetDataConfig = {
    columnFrozen: 4,
    maxHeightPerRow: 50,
    header: [
      {
        label: ['Symbol'],
        width: 96,
        element: (_key: string, rowData: ITradingHistories) => (
          <TouchableOpacity
            activeOpacity={1}
            style={[cellStyle, styles.border1, globalStyles.flexDirectionRow]}
            onPress={() => goToStockInfoOverView(rowData)}
          >
            <ImagesLogo
              codeLogo={rowData.stockCode}
              logoSize={36}
              logoStyle={[globalStyles.overflowHidden, styles.logoContainer]}
            />
            <Text allowFontScaling={false} style={styles.symbolCode}>
              {rowData.stockCode}
            </Text>
          </TouchableOpacity>
        ),
      },
      {
        label: ['Buy Price', 'Sell Price'],
        width: 84,
        element: (_key: string, rowData: ITradingHistories) => (
          <TouchableOpacity style={cellStyle} activeOpacity={1} onPress={() => goToStockInfoOverView(rowData)}>
            <View
              style={[
                cellStyle,
                styles.border1,
                globalStyles.container,
                globalStyles.fillWidth,
                globalStyles.justifyCenter,
                styles.paddingRightS,
              ]}
            >
              <Text allowFontScaling={false} style={styles.textPrice}>
                {isFuturesCode(rowData.stockCode)
                  ? formatNumber(rowData.buyingPrice, 1, undefined, true)
                  : formatNumber(rowData.buyingPrice / 1000, 2, undefined, true)}
              </Text>
            </View>
            <View
              style={[
                cellStyle,
                styles.border1,
                globalStyles.container,
                globalStyles.fillWidth,
                globalStyles.justifyCenter,
                styles.paddingRightS,
              ]}
            >
              <Text allowFontScaling={false} style={styles.textPrice1}>
                {isFuturesCode(rowData.stockCode)
                  ? formatNumber(rowData.sellingPrice, 1, undefined, true)
                  : formatNumber(rowData.sellingPrice / 1000, 2, undefined, true)}
              </Text>
            </View>
          </TouchableOpacity>
        ),
      },
      {
        label: ['Profit'],
        width: 95,
        element: (_key: string, rowData: ITradingHistories) => (
          <TouchableOpacity style={cellStyle} activeOpacity={1} onPress={() => goToStockInfoOverView(rowData)}>
            <View
              style={[
                cellStyle,
                styles.border1,
                globalStyles.container,
                globalStyles.fillWidth,
                globalStyles.justifyCenter,
                styles.paddingRightS,
              ]}
            >
              <Text
                allowFontScaling={false}
                style={[
                  styles.textPrice,
                  getColor(rowData.profitLossRate, 0, undefined, undefined, undefined).textStyle,
                ]}
              >
                {formatNumber(rowData.profitLoss)}
              </Text>
            </View>
            <View
              style={[
                cellStyle,
                styles.border1,
                globalStyles.container,
                globalStyles.fillWidth,
                globalStyles.justifyCenter,
                styles.paddingRightS,
              ]}
            >
              <Text
                style={[
                  styles.textPrice1,
                  getColor(rowData.profitLossRate, 0, undefined, undefined, undefined).textStyle,
                ]}
              >
                {formatNumber(rowData.profitLossRate, 2, undefined, true)}%
              </Text>
            </View>
          </TouchableOpacity>
        ),
      },
      {
        label: ['Date Buy', 'Date Sell'],
        width: 100,
        element: (_key: string, rowData: ITradingHistories) => (
          <TouchableOpacity style={cellStyle} activeOpacity={1} onPress={() => goToStockInfoOverView(rowData)}>
            <View
              style={[
                cellStyle,
                styles.border1,
                globalStyles.container,
                globalStyles.fillWidth,
                globalStyles.justifyCenter,
              ]}
            >
              <Text allowFontScaling={false} style={styles.textDate}>
                {rowData.buyingDate}
              </Text>
            </View>
            <View
              style={[
                cellStyle,
                styles.border1,
                globalStyles.container,
                globalStyles.fillWidth,
                globalStyles.justifyCenter,
              ]}
            >
              <Text allowFontScaling={false} style={styles.textDate}>
                {rowData.sellingDate}
              </Text>
            </View>
          </TouchableOpacity>
        ),
      },
    ],
  };

  return (
    <View style={[globalStyles.container, styles.wrap]}>
      {tradingHistory.data != null ? (
        <SheetData data={listTradingHistory ?? []} config={columnConfig} renderFooter={renderLoadingText} />
      ) : null}
    </View>
  );
};

export default withMemo(StockListLeaderActivity2);
