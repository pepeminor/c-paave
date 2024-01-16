import React, { useCallback, useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ReducerStatus } from 'interfaces/reducer';
import SheetData3, { HeaderConfig } from 'components/SheetData3';
import renderRow from './components/DerivativeRow';
import { IGetDerivativePortfolioItem } from 'interfaces/derivatives';
import { useTranslation } from 'react-i18next';
import { getStylesHook } from 'hooks/useStyles';
import { Colors, lightColors } from 'styles';
import EmptySymbol from 'assets/icon/EmptySymbol.svg';
import { mapV2, navigate } from 'utils';
import { useDispatch } from 'react-redux';
import { setCurrentSymbol } from 'reduxs/SymbolData';
import { setSellBuyType } from 'reduxs/global-actions';
import { SELL_BUY_TYPE } from 'global';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import SheetDataHeader from 'components/SheetDataHeader';
import useSubscribeSymbol from 'hooks/useSubscribeSymbol';
import { useAppSelector } from 'hooks/useAppSelector';
import withMemo from 'HOC/withMemo';

type IDerivativeListProps = {
  scrollEnabled?: boolean;
  noFlatList?: boolean;
  onRefreshData?(): void;
  isRealizedPortfolio?: boolean;
  isShowHeader?: boolean;
};

const goToTrade = () => navigate({ key: ScreenNames.Trade });

const DerivativeList = ({ isRealizedPortfolio, isShowHeader = true }: IDerivativeListProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { styles } = useStyles();

  const derivativePortfolio = useAppSelector(state => state.derivativePortfolio);
  const { status } = derivativePortfolio;
  const data = derivativePortfolio?.data?.openPositionList;

  const goToDerivativeTradeView = useCallback((item: IGetDerivativePortfolioItem) => {
    const isBuyOrSell = item.long > item.short ? SELL_BUY_TYPE.SELL : SELL_BUY_TYPE.BUY;
    dispatch(setCurrentSymbol(item.seriesID as string));
    dispatch(setSellBuyType(isBuyOrSell));
    navigate({ key: 'Trade1' });
  }, []);

  const dataSub = useMemo(() => {
    return status === ReducerStatus.SUCCESS ? mapV2(data, item => item.seriesID) : [];
  }, [data]);

  useSubscribeSymbol(dataSub, ['QUOTE']);

  const headerCols = useMemo(() => {
    const headerColOne = { width: 106, content: t('Symbol') };

    const headerColTwo = isRealizedPortfolio
      ? [
          { content: t('Long'), width: 80 },
          { content: t('Short'), width: 80 },
        ]
      : [
          { content: t('Long Qtt'), width: 80 },
          { content: t('Short Qtt'), width: 80 },
        ];
    const headerColThree = isRealizedPortfolio
      ? [
          { content: t('Avg Bid'), width: 80 },
          { content: t('Avg Ask'), width: 80 },
        ]
      : [
          { content: t('Cur Price'), width: 80 },
          { content: t('Avg Price'), width: 80 },
        ];
    const headerColFour = isRealizedPortfolio
      ? [{ content: t('P/L'), width: 108 }]
      : [{ content: t('Floating P/L'), width: 108 }];

    return [headerColOne, headerColTwo, headerColThree, headerColFour] as HeaderConfig['data'];
  }, [isRealizedPortfolio]);

  const RenderRow = renderRow({ isRealizedPortfolio, goToDerivativeTradeView });

  return (
    <View>
      {isShowHeader && <SheetDataHeader data={headerCols} height={60} />}
      {status === ReducerStatus.SUCCESS && data != null ? <SheetData3 data={data} RowComponent={RenderRow} /> : null}
      {(status === ReducerStatus.LOADING || data?.length === 0) && (
        <View style={styles.noDataCon}>
          <EmptySymbol />
          <Text style={styles.noDataText}>{t('There is no data')}</Text>
          <TouchableOpacity style={styles.noDataBtn} onPress={goToTrade}>
            <Text allowFontScaling={false} style={styles.noDataBtnText}>
              {t('Trade Now')}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default withMemo(DerivativeList);

const useStyles = getStylesHook({
  noDataCon: {
    width: 375,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },

  noDataText: {
    fontFamily: 'Roboto',
    marginTop: 16,
    fontSize: 16,
    color: Colors.LIGHTTextContent,
    textAlign: 'center',
  },
  noDataBtn: {
    marginTop: 16,
    marginBottom: 7,
  },
  noDataBtnText: {
    fontSize: 14,
    lineHeight: 18,
    color: lightColors.DARK_GREEN,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
