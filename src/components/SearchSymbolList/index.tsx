import { View, Text, TouchableOpacity } from 'react-native';
import React, { forwardRef, memo, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { removeAllRecently, useMasterSymbolList, useRecentViewedSymbolList } from './helpers';
import SearchSymbolListComponent from './components/SearchSymbolList.component';
import { toNonAccentVietnamese } from 'utils';
import { debounce } from 'lodash';
import { useStyles } from './styles';
import { useTranslation } from 'react-i18next';
import { scaleSize } from 'styles';
import { IconWithBackground } from 'components/Icon';
import { FlashList } from '@shopify/flash-list';
import { LANG } from 'global';
import { SearchSymbolFlow } from './type';
import { SearchScreenTabRef } from 'screens/SearchSymbolAndMember/type';
import { store } from 'screens/App';

type Props = {
  flow?: SearchSymbolFlow;
  onPressSymbol?: (code: string) => void;
  isInWatchList?: (code: string) => boolean;
};

export type SearchSymbolList = SearchScreenTabRef;

export const SearchSymbolList = memo(
  forwardRef<SearchSymbolList, Props>(({ flow = 'Search', onPressSymbol, isInWatchList }, ref) => {
    const { styles, dynamicColors } = useStyles();
    const { t } = useTranslation();

    const [data, setData] = useState<string[]>([]);
    const searchTextRef = useRef('');
    const searchListRef = useRef<FlashList<string>>(null);

    const { masterSymbolList, VN30List } = useMasterSymbolList(flow);
    const { recentViewedSymbolList, getRecentlyViewedDone, checkShowRecentViewed } = useRecentViewedSymbolList(
      setData,
      searchTextRef,
      VN30List
    );

    const searchChangeAction = useCallback(
      debounce((text: string) => {
        searchListRef.current?.scrollToOffset({ animated: false, offset: 0 });
        const stringInput: string = toNonAccentVietnamese(text).toUpperCase();
        const marketData = store.getState().SymbolData.marketData.symbolMap;
        const isVN = store.getState().lang === LANG.VI;

        const listSearchCode: string[] = [];
        const listSearch: string[] = [];
        const listSearchCompanyName: string[] = [];

        for (const item of masterSymbolList) {
          if (stringInput.length < 4 && item.slice(0, stringInput.length) === stringInput) {
            listSearchCode.push(item);
          } else if (item.includes(stringInput) && !listSearchCode.includes(item)) {
            listSearch.push(item);
          } else {
            const vietnameseName = marketData[item]?.vietnameseName;
            const englishName = marketData[item]?.englishName;
            if (
              (vietnameseName != null &&
                isVN &&
                toNonAccentVietnamese(vietnameseName).toUpperCase().includes(stringInput)) ||
              (englishName != null && !isVN && englishName.toUpperCase().includes(stringInput))
            ) {
              listSearchCompanyName.push(item);
            }
          }
        }

        setData([...listSearchCode, ...listSearch, ...listSearchCompanyName]);
      }, 300),
      [masterSymbolList]
    );

    const onSearchTextChange = useCallback(
      (text: string) => {
        searchTextRef.current = text;
        if (text === '' && checkShowRecentViewed()) {
          return;
        }
        searchChangeAction(text);
      },
      [checkShowRecentViewed, searchChangeAction]
    );

    const sectionTitle = (() => {
      if (searchTextRef.current !== '') {
        return 'search_result';
      }
      if (recentViewedSymbolList.length === 0 && getRecentlyViewedDone) {
        return 'vn30_list';
      }
      return 'Recently Viewed';
    })();

    useImperativeHandle(ref, () => ({ onSearchTextChange }));

    return (
      <>
        <View style={styles.titleContainer}>
          <Text allowFontScaling={false} style={styles.sectionTitle}>
            {t(sectionTitle)}
          </Text>
          {searchTextRef.current === '' && getRecentlyViewedDone && recentViewedSymbolList.length > 0 && (
            <TouchableOpacity onPress={removeAllRecently} style={styles.removeRecentContainer}>
              <Text allowFontScaling={false} style={styles.deleteAllText}>
                {t('Delete')}
              </Text>
              <IconWithBackground
                name={'close'}
                backgroundColor={dynamicColors.LIGHTRed}
                iconColor={dynamicColors.WHITE}
                size={scaleSize(14)}
                containerStyle={styles.deleteAllIcon}
              />
            </TouchableOpacity>
          )}
        </View>
        <SearchSymbolListComponent
          onPressSymbol={onPressSymbol}
          isInWatchList={isInWatchList}
          flow={flow}
          data={data}
          ref={searchListRef}
        />
      </>
    );
  })
);
