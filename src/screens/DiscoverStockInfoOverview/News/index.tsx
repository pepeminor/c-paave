import React, { memo, useEffect } from 'react';
import { Text, View } from 'react-native';
import globalStyles from 'styles';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { getEventByStock } from 'reduxs/global-actions';
import { LANG } from 'global';
import { ReducerStatus } from 'interfaces/reducer';
import { useTranslation } from 'react-i18next';
import EmptySymbol from 'assets/icon/EmptySymbol.svg';
import { useAppSelector } from 'hooks/useAppSelector';

const StockInfoNews = () => {
  const dispatch = useDispatch();
  const { styles } = useStyles();

  const getEventByStockData = useAppSelector(state => state.getEventByStock);
  const lang = useAppSelector(state => state.lang);
  const currentSymbolCode = useAppSelector(state => state.SymbolData.currentSymbolCode);

  const { t } = useTranslation();
  const STOCK_INFO_TABLE_CONTAINER = [globalStyles.flexDirectionRow, globalStyles.container, styles.cellTable];

  const STOCK_INFO_COLUMN_TABLE_1 = [styles.containerItem1, globalStyles.alignStart];

  const STOCK_INFO_COLUMN_TABLE_2 = [styles.containerItem2];

  const STOCK_INFO_COLUMN_TABLE_3 = [
    globalStyles.container,
    styles.containerItem3,
    styles.marginTop4,
    globalStyles.alignStart,
  ];

  const STOCK_INFO_COLUMN_HEADER_1 = [globalStyles.centered, styles.containerItem1, styles.columnHeader];

  const STOCK_INFO_COLUMN_HEADER_2 = [globalStyles.centered, styles.columnHeader2, styles.columnHeader];

  const STOCK_INFO_COLUMN_HEADER_3 = [globalStyles.centered, styles.containerItem3, styles.columnHeader];

  const STOCK_INFO_NO_DATA_STYLE = [globalStyles.container, globalStyles.centered, styles.marginTop10];
  useEffect(() => {
    if (currentSymbolCode == null) return;
    dispatch(getEventByStock({ stockCode: [currentSymbolCode] }));
  }, [currentSymbolCode]);

  const renderNoData = () => (
    <View style={STOCK_INFO_NO_DATA_STYLE}>
      <EmptySymbol />
      <Text allowFontScaling={false} style={styles.noData}>
        {t('There is no data')}
      </Text>
    </View>
  );

  const renderItemEvent = () => (
    <>
      {getEventByStockData.data != null &&
        getEventByStockData.data.map(
          (item, index) =>
            item.code === currentSymbolCode && (
              <View key={index} style={STOCK_INFO_TABLE_CONTAINER}>
                <View style={STOCK_INFO_COLUMN_TABLE_1}>
                  <Text style={styles.textItem}>{item.effectiveDate}</Text>
                </View>
                <View style={STOCK_INFO_COLUMN_TABLE_2}>
                  <Text style={styles.textItem}>{t(item.type)}</Text>
                </View>
                <View style={STOCK_INFO_COLUMN_TABLE_3}>
                  <Text style={styles.textItem}>{lang === LANG.VI ? item.note : item.noteEn}</Text>
                </View>
              </View>
            )
        )}
    </>
  );

  return (
    <View style={[globalStyles.container, styles.marginBottom16]}>
      {getEventByStockData.status === ReducerStatus.SUCCESS && getEventByStockData.data != null ? (
        <>
          <View style={STOCK_INFO_TABLE_CONTAINER}>
            <View style={STOCK_INFO_COLUMN_HEADER_1}>
              <Text style={styles.textHeader}>{t('Date')}</Text>
            </View>
            <View style={STOCK_INFO_COLUMN_HEADER_2}>
              <Text style={styles.textHeader}>{t('Type')}</Text>
            </View>
            <View style={STOCK_INFO_COLUMN_HEADER_3}>
              <Text style={styles.textHeader}>{t('Detail')}</Text>
            </View>
          </View>
          {getEventByStockData.data.filter(a => a.code === currentSymbolCode).length === 0
            ? renderNoData()
            : renderItemEvent()}
        </>
      ) : (
        <View>
          <View style={[globalStyles.flexDirectionRow, globalStyles.alignSpaceAround]}>
            <View style={[styles.labelPlaceHolderContainer2, styles.marginHorizontal]} />
            <View style={[styles.labelPlaceHolderContainer3, styles.marginHorizontal]} />
            <View style={[styles.labelPlaceHolderContainer4, styles.marginHorizontal]} />
          </View>
          <View style={styles.borderSkeleton} />
          <View style={[globalStyles.flexDirectionRow, globalStyles.alignSpaceAround, styles.marginTop8]}>
            <View style={[styles.labelPlaceHolderContainer2, styles.marginHorizontal]} />
            <View style={[styles.labelPlaceHolderContainer3, styles.marginHorizontal]} />
            <View style={[styles.labelPlaceHolderContainer4, styles.marginHorizontal]} />
          </View>
          <View style={[globalStyles.flexDirectionRow, globalStyles.alignSpaceAround, styles.marginTop8]}>
            <View style={[styles.labelPlaceHolderContainer2, styles.marginHorizontal]} />
            <View style={[styles.labelPlaceHolderContainer3, styles.marginHorizontal]} />
            <View style={[styles.labelPlaceHolderContainer4, styles.marginHorizontal]} />
          </View>
          <View style={[globalStyles.flexDirectionRow, globalStyles.alignSpaceAround, styles.marginTop8]}>
            <View style={[styles.labelPlaceHolderContainer2, styles.marginHorizontal]} />
            <View style={[styles.labelPlaceHolderContainer3, styles.marginHorizontal]} />
            <View style={[styles.labelPlaceHolderContainer4, styles.marginHorizontal]} />
          </View>
          <View style={[globalStyles.flexDirectionRow, globalStyles.alignSpaceAround, styles.marginTop8]}>
            <View style={[styles.labelPlaceHolderContainer2, styles.marginHorizontal]} />
            <View style={[styles.labelPlaceHolderContainer3, styles.marginHorizontal]} />
            <View style={[styles.labelPlaceHolderContainer4, styles.marginHorizontal]} />
          </View>
        </View>
      )}
    </View>
  );
};

export default memo(StockInfoNews);
