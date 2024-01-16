import React, { useCallback, useRef, useState } from 'react';
import ScreenNames from '../RootNavigation/ScreenNames';
import { StackScreenProps } from '../RootNavigation/index';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import HeaderScreen from 'components/HeaderScreen';
import useStyles from './styles';
import { ACCOUNT_TYPE } from 'global/index';
import globalStyles from 'styles';
import { scaleSize, lightColors as Colors } from 'styles/index';
import Search from 'assets/icon/Search.svg';
import TextInputComponent from 'components/TextInput';
import withMemo from 'HOC/withMemo';
import { useAppSelector } from 'hooks/useAppSelector';
import { WatchListActions } from 'reduxs';
import { SearchSymbolList } from 'components/SearchSymbolList';

const AddSymbolsToWatchlist = (props: StackScreenProps<ScreenNames.AddSymbolsToWatchlist>) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { styles } = useStyles();

  const accountType = useAppSelector(state => state.selectedAccount.type);
  const currentSymbolList = useAppSelector(state => state.WatchListReducer.selectedWatchlistSymbolList);

  const listSymbols = useRef(
    currentSymbolList.data != null && currentSymbolList.data.length > 0
      ? currentSymbolList.data.map(item => item.code)
      : []
  );

  const searchSymbolListRef = useRef<SearchSymbolList>(null);

  const watchListId = useAppSelector(state => state.WatchListReducer.selectedWatchList?.watchListId);

  const [isAdding, setIsAdding] = useState<boolean>(false);

  const handleConfirmSymbolAction = useCallback(() => {
    setIsAdding(true);

    const originalListSymbolsLength = currentSymbolList.data.length;

    const listCodeKis = accountType === ACCOUNT_TYPE.DEMO ? listSymbols.current : listSymbols.current.reverse();
    const listAddCodeVT = listCodeKis.slice(originalListSymbolsLength).reverse();
    const listCodeVT =
      originalListSymbolsLength === 0
        ? [...listAddCodeVT]
        : [...listSymbols.current.slice(0, originalListSymbolsLength), ...listAddCodeVT];

    const listCode = accountType === ACCOUNT_TYPE.VIRTUAL ? listCodeVT : listCodeKis;

    watchListId != null &&
      dispatch(
        WatchListActions.onAddMultiSymbols({
          code: listCode,
          watchListId: [watchListId],
          callback: {
            handleSuccess: () => {
              props.navigation.goBack();
            },
            handleFail: () => {
              setIsAdding(false);
              props.navigation.goBack();
            },
          },
        })
      );
  }, [watchListId, listSymbols]);

  const searchChangeAction = useCallback((v: string) => {
    searchSymbolListRef.current?.onSearchTextChange(v);
  }, []);

  const onPressSymbol = useCallback((symbolCode: string) => {
    const inWatchlist = listSymbols.current.includes(symbolCode);
    inWatchlist
      ? (listSymbols.current = listSymbols.current.filter(symbol => symbol !== symbolCode))
      : (listSymbols.current = [symbolCode, ...listSymbols.current]);
    return !inWatchlist;
  }, []);

  const isInWatchList = useCallback((symbolCode: string) => {
    return listSymbols.current.includes(symbolCode);
  }, []);

  return (
    <View style={globalStyles.container}>
      <HeaderScreen
        leftButtonIcon={props.navigation.canGoBack()}
        goBackAction={props.navigation.goBack}
        headerTitle={'Add Symbol To Watchlist'}
      />
      <View style={styles.paddingFix}>
        <View style={styles.headerTitleContainer}>
          <TextInputComponent
            onChangeText={searchChangeAction}
            wholeContainerStyle={styles.wholeContainerStyleIOS}
            placeholder={'Search'}
            textInputContainerStyle={styles.textInputContainerIOS}
            placeholderTextColor={Colors.LIGHTTextDisable}
            textInputStyle={styles.textInputSearchStyle}
          />
          <Search height={scaleSize(18)} width={scaleSize(18)} style={styles.iconStyle} />
        </View>
        <SearchSymbolList
          onPressSymbol={onPressSymbol}
          isInWatchList={isInWatchList}
          ref={searchSymbolListRef}
          flow={'Watchlist'}
        />
        <TouchableOpacity onPress={handleConfirmSymbolAction} style={styles.btnEnable}>
          {!isAdding && (
            <Text allowFontScaling={false} style={styles.cancelText}>
              {t('Done')}
            </Text>
          )}
          {isAdding && <ActivityIndicator size={'small'} color={Colors.WHITE} />}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default withMemo(AddSymbolsToWatchlist);
