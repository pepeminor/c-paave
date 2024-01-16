import React, { useCallback, useMemo, useRef } from 'react';
import { ActivityIndicator, Text, View, ViewToken } from 'react-native';
import withMemo from 'HOC/withMemo';
import { useScreenLogic } from './Top100Stocks.logic';
import { FinancialRatioConfig, IProps, IndicesConfig } from './Top100Stocks.type';
import { useStyles } from './Top100Stocks.style';
import ItemSelector from 'components/ItemSelector';
import globalStyles, { scaleSize, textStyles } from 'styles';
import SheetDataHeader from 'components/SheetDataHeader';
import SheetData3, { HeaderComponentProps, HeaderConfig } from 'components/SheetData3';
import SheetDataRow from './components/SheetDataRow';
import { useAppSelector } from 'hooks/useAppSelector';
import { throttle } from 'lodash';
import Header from './components/Header';
import LoginRequired from 'components/LoginRequired';
import { useTranslation } from 'react-i18next';

const ItemHeight = scaleSize(42);
const getFlatListLayout = (_: unknown, index: number) => {
  return {
    length: ItemHeight,
    offset: ItemHeight * index,
    index,
  };
};

const Top100Stocks = (props: IProps) => {
  const { limit = 100, showHeader = false } = props;
  const { handlers, data, flatListRef, selectedIndex, selectedFinancialRatio } = useScreenLogic(props);
  const showedData = useMemo(() => data.slice(0, limit), [data, limit]);
  const { styles } = useStyles();
  const { t } = useTranslation();
  const isLoading = useAppSelector(state => state.top100Stocks.isLoading);

  const headerConfig: HeaderConfig = useMemo(
    () => ({
      height: 60,
      data: [
        {
          content: 'Rank',
          width: 55,
          frozen: true,
        },
        {
          content: 'Symbol',
          width: 60,
          frozen: true,
        },
        {
          content: (
            <Text style={styles.headerText} allowFontScaling={false}>
              {FinancialRatioConfig[selectedFinancialRatio].label === 'financial_ratio.market_cap'
                ? `${t(FinancialRatioConfig[selectedFinancialRatio].label)} (${t('Bil')})`
                : t(FinancialRatioConfig[selectedFinancialRatio].label)}
            </Text>
          ),
          width: 70,
        },
        [
          { content: 'Current Price', width: 100, style: { paddingVertical: 4 } },
          { content: 'Change', width: 100, style: { paddingVertical: 4 } },
        ],
        [
          { content: 'Volume', width: 90, style: { paddingVertical: 4 } },
          { content: 'value_bil', width: 90, style: { paddingVertical: 4 } },
        ],
      ],
    }),
    [selectedFinancialRatio]
  );

  const onViewableItemsChanged = useRef(
    throttle(({ viewableItems }: { viewableItems: ViewToken[] }) => handlers.updateViewableItems(viewableItems), 200, {
      trailing: true,
    })
  ).current;

  const HeaderSheetData = useCallback(
    ({ frozenStyle }: HeaderComponentProps) => {
      return <SheetDataHeader {...headerConfig} frozenStyle={frozenStyle} />;
    },
    [selectedFinancialRatio, headerConfig]
  );

  return (
    <View style={styles.container}>
      {showHeader && <Header />}
      <View style={styles.selectorContainer}>
        <ItemSelector
          value={selectedIndex}
          setValue={handlers.onChangeIndices}
          config={IndicesConfig}
          containerStyle={globalStyles.container}
          labelStyle={textStyles.fontSize14}
        />
        <ItemSelector
          value={selectedFinancialRatio}
          setValue={handlers.onChangeFinancialRatio}
          config={FinancialRatioConfig}
          containerStyle={globalStyles.container}
          labelStyle={textStyles.fontSize14}
        />
      </View>
      <SheetData3
        HeaderComponent={HeaderSheetData}
        data={showedData}
        RowComponent={SheetDataRow}
        onEndReached={data.length < limit ? handlers.onEndReached : undefined}
        getItemLayout={getFlatListLayout}
        useFlatList={true}
        style={globalStyles.container}
        onViewableItemsChanged={onViewableItemsChanged}
        flatListRef={flatListRef}
        columnWidth={scaleSize(442)}
      />
      {isLoading && data.length > 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : null}
      <LoginRequired />
    </View>
  );
};

export default withMemo(Top100Stocks);
