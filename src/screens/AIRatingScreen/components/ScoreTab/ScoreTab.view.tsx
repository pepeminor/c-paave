import EmptySymbol from 'assets/icon/EmptySymbol.svg';
import DatePicker from 'components/DatePicker';
import LazyFlatList from 'components/LazyFlatList';
import TextInputComponent from 'components/TextInput';
import { IAIRatingScore } from 'interfaces/market';
import { ReducerStatus } from 'interfaces/reducer';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ListRenderItemInfo, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path, SvgProps } from 'react-native-svg';
import { scaleSize } from 'styles';
import { handleNumberAI, insertObjectIf, insertObjectIfElse } from 'utils';
import AIRatingStock from '../AIRatingStock';
import StockFilter from '../StockFilter';
import useScoreTabLogic from './ScoreTab.logic';
import useStyles from './ScoreTab.style';
import { IProps } from './ScoreTab.type';
import Icon from 'components/Icon';
import ChartComponent from './components/Chart.component';
import { numberID, ITopNumberString, ITopNumber } from 'screens/AIRatingScreen/constants';
import TabView from 'components/TabView';

const ScoreTab = (props: IProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();

  const { dataAIRating } = props;
  const { state, handlers, filteredStocks, aiRating, refs } = useScoreTabLogic(props);

  const { aiRatingData, aiRatingInOut } = aiRating;

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<IAIRatingScore>) => (
      <AIRatingStock
        key={index}
        stock={item.code}
        rank={item.rank}
        change={Number(item.change)}
        overall={Number(handleNumberAI(item.overall))}
        valuationScore={item.valuationScore}
        techScore={item.techScore}
        gsCore={item.gsCore}
      />
    ),
    []
  );

  const renderScene = useCallback(
    ({ route }: { route: { key: string } }) => {
      switch (route.key) {
        case ITopNumberString.TOP5:
          return (
            <ChartComponent
              currentDate={state.currentDate}
              optionSelecting={ITopNumber.TOP5}
              onChangeEnabledScroll={handlers.onChangeEnabledScroll}
            />
          );
        case ITopNumberString.TOP10:
          return (
            <ChartComponent
              currentDate={state.currentDate}
              optionSelecting={ITopNumber.TOP10}
              onChangeEnabledScroll={handlers.onChangeEnabledScroll}
            />
          );

        case ITopNumberString.TOP15:
          return (
            <ChartComponent
              currentDate={state.currentDate}
              optionSelecting={ITopNumber.TOP15}
              onChangeEnabledScroll={handlers.onChangeEnabledScroll}
            />
          );

        default:
          return (
            <ChartComponent
              currentDate={state.currentDate}
              optionSelecting={ITopNumber.TOP20}
              onChangeEnabledScroll={handlers.onChangeEnabledScroll}
            />
          );
      }
    },
    [state.currentDate]
  );

  const renderLabel = useCallback(({ route, focused }) => {
    return (
      <View style={[styles.optionContainer, insertObjectIf(focused, styles.optionContainerSelected)]}>
        <Text allowFontScaling={false} style={insertObjectIfElse(focused, styles.selectedText, styles.unselectedText)}>
          {t(route.title)}
        </Text>
        {parseInt(route.key, 10) <= 10 && <StarIcon />}
      </View>
    );
  }, []);

  if (state.refreshing) return null;

  return (
    <View style={styles.container}>
      {/* Section 3 */}
      <LazyFlatList
        data={filteredStocks}
        refreshControl={<RefreshControl refreshing={state.refreshing} onRefresh={handlers.onRefresh} />}
        scrollEnabled={state.enabledScroll}
        ListHeaderComponent={
          <>
            {/* Section 1 */}
            <View style={styles.styleSection}>
              <TabView
                ref={refs.TabViewRef}
                routes={numberID}
                renderScene={renderScene}
                renderLabel={renderLabel}
                swipeEnabled={false}
                onChangeIndex={handlers.onChangeOption}
                animationEnabled={false}
              />
            </View>
            {/* Section 1.5 */}
            <View style={styles.styleSection3}>
              <Text style={styles.performanceText}>{t('topStock', { topStock: state.optionSelecting })}</Text>
              {/* stock code and datePicker */}
              <View style={styles.datePickerContainer}>
                {aiRatingData != null && aiRatingData[0] != null && aiRatingData[0].date != null ? (
                  <DatePicker
                    onChange={handlers.onChangeCurrentDate}
                    value={validateDate(new Date(aiRatingData[0].date))}
                    maxDate={new Date()}
                  />
                ) : (
                  <DatePicker
                    onChange={handlers.onChangeCurrentDate}
                    value={validateDate(state.currentDate)}
                    maxDate={new Date()}
                  />
                )}
              </View>
              {/* in out table */}
              <View style={styles.inAndOutContainer}>
                <View>
                  <View style={styles.rowTitle}>
                    <View style={styles.cellLeft}>
                      <Text allowFontScaling={false} style={styles.textTitle}>
                        {t('Enter top')} {state.optionSelecting}
                      </Text>
                    </View>
                    <View style={styles.cell}>
                      <Text allowFontScaling={false} style={styles.textTitle}>
                        {t('Exit top')} {state.optionSelecting}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.rowItem}>
                    <View style={styles.cellLeft}>
                      {aiRatingInOut != null &&
                        aiRatingInOut.in != null &&
                        (aiRatingInOut.in.length === 0 ? (
                          <Text allowFontScaling={false} style={styles.textIn}>
                            -
                          </Text>
                        ) : (
                          <View style={styles.widthTable}>
                            {aiRatingInOut.in.map((x, index) => {
                              return (
                                <TouchableOpacity
                                  style={styles.widthItem}
                                  key={index}
                                  onPress={handlers.goToStockInfo(x)}
                                >
                                  <Text allowFontScaling={false} style={styles.textIn} key={index}>
                                    {x}
                                  </Text>
                                </TouchableOpacity>
                              );
                            })}
                          </View>
                        ))}
                    </View>
                    <View style={styles.cell}>
                      {aiRatingInOut != null &&
                        aiRatingInOut.out != null &&
                        (aiRatingInOut.out.length === 0 ? (
                          <Text allowFontScaling={false} style={styles.textOut}>
                            -
                          </Text>
                        ) : (
                          <View style={styles.widthTable}>
                            {aiRatingInOut.out.map((x, index) => {
                              return (
                                <TouchableOpacity
                                  style={styles.widthItem}
                                  key={index}
                                  onPress={handlers.goToStockInfo(x)}
                                >
                                  <Text allowFontScaling={false} style={styles.textOut} key={index}>
                                    {x}
                                  </Text>
                                </TouchableOpacity>
                              );
                            })}
                          </View>
                        ))}
                    </View>
                  </View>
                </View>
              </View>
            </View>
            {/* Section 2 */}
            <View style={styles.styleSection2}>
              <StockFilter />
              <Text allowFontScaling={false} style={styles.normalText}>
                (*) {t('AI rating is updated after 3pm based on the close price everyday')}.
              </Text>
              <View style={[styles.searchStockAndDate]}>
                <TextInputComponent
                  value={state.stock}
                  onChangeText={handlers.onChangeStock}
                  placeholder={'Stock'}
                  icon={<SearchIconWrapper />}
                  wholeContainerStyle={styles.searchContainer}
                  textInputContainerStyle={styles.textInputContainer}
                  textInputStyle={styles.inputText}
                />
              </View>
            </View>
          </>
        }
        renderItem={renderItem}
        initialNumToRender={5}
        limit={20}
        contentContainerStyle={styles.flatListContainer}
        ListEmptyComponent={
          dataAIRating[state.optionSelecting]?.status !== ReducerStatus.LOADING ? (
            <View style={styles.noDataTextContainer}>
              <EmptySymbol />
              <Text allowFontScaling={false} style={styles.noDataText}>
                {t('There is no data')}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default memo(ScoreTab);

const SearchIconWrapper = memo(() => {
  const { styles, dynamicColors } = useStyles();
  return (
    <View style={styles.pr10}>
      <Icon name={'search'} size={24} color={dynamicColors.BaliHai} />
    </View>
  );
});

const StarIcon = (props: SvgProps) => {
  const { styles } = useStyles();
  return (
    <View style={styles.pl5}>
      <Svg width={scaleSize(21)} height={scaleSize(21)} fill="none" scaleX={0.8} scaleY={0.8} {...props}>
        <Path
          d="M19.994 7.234a1 1 0 0 0-.86-.67l-5.69-.83-2.55-5.17a1 1 0 0 0-1.8 0l-2.55 5.16-5.69.84a1 1 0 0 0-.81.68 1 1 0 0 0 .25 1l4.13 4-1 5.68a1 1 0 0 0 1.45 1.07l5.12-2.67 5.1 2.68c.14.08.299.12.46.12a1 1 0 0 0 .59-.19 1 1 0 0 0 .4-1l-1-5.68 4.13-4a1 1 0 0 0 .32-1.02Zm-6.15 4a1 1 0 0 0-.29.89l.72 4.19-3.76-2a1 1 0 0 0-.94 0l-3.76 2 .72-4.19a1 1 0 0 0-.29-.89l-3-3 4.21-.61a1 1 0 0 0 .76-.55l1.78-3.81 1.88 3.82a1 1 0 0 0 .76.55l4.21.61-3 2.99Z"
          fill="#FCAF17"
        />
      </Svg>
    </View>
  );
};

function validateDate(d: Date) {
  const isValid = d instanceof Date && !isNaN(d.getTime());
  if (isValid) {
    return d;
  }
  return new Date();
}
