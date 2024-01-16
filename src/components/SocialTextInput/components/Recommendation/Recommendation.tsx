import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, View, ViewStyle } from 'react-native';
import { useStyles } from './styles';
import { debounce, isEmpty } from 'lodash';
import { SocialTextInputEventHandler } from '../../event';
import { KeywordConfig } from '../../types';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { RecommendItem } from './RecommendItem';
import { useMasterSymbolList } from './helpers';
import { useDispatch } from 'react-redux';
import { SocialAccountActions, SocialSearchType, SocialSearchResponse } from 'reduxs';
import { RecommendData, RecommendSymbol, RecommendTag, RecommendUser } from './types';
import { isSymbolExist } from 'utils';

interface RecommendationProps {}

export const Recommendation = memo((_: RecommendationProps) => {
  const { styles, dynamicColors } = useStyles();
  const dispatch = useDispatch();
  const [box, setBox] = useState<ViewStyle>({});
  const keywordConfig = useRef<KeywordConfig>({});
  SocialTextInputEventHandler.useSubscribeOpenModal(position => {
    setBox(position as ViewStyle);
  });
  SocialTextInputEventHandler.useKeywordConfig(newConfig => {
    Object.entries(newConfig).forEach(([key, value]) => {
      keywordConfig.current[key as keyof KeywordConfig] = value;
    });
  });
  const [data, setData] = useState<RecommendData[]>([]);
  const [searching, setSearching] = useState(false);

  const { masterSymbolList } = useMasterSymbolList();

  const renderItem = useCallback(({ item, index }: ListRenderItemInfo<RecommendData>) => {
    return <RecommendItem key={`Recommend_Item_${index}`} data={item} keywordConfig={keywordConfig} />;
  }, []);

  const isMentioning = keywordConfig.current.MENTION?.keyword != null;
  const isTagging = keywordConfig.current.TAG?.keyword != null;
  const keywordExist = isMentioning || isTagging;

  useEffect(() => {
    if (!isMentioning) return;
    const keyword = keywordConfig.current.MENTION?.keyword;
    if (keyword == null || keyword === '') return setData([]);
    search('accounts', keyword);
  }, [keywordConfig.current.MENTION?.keyword]);

  useEffect(() => {
    const keyword = keywordConfig.current.TAG?.keyword;
    if (keyword == null || keyword === '') return setData([]);
    search('hashtags', keyword);
  }, [keywordConfig.current.TAG?.keyword, masterSymbolList]);

  const searchSymbol = useCallback(
    (text: string) => {
      const stringInput: string = text.toUpperCase();

      const listSearchCode: string[] = [];
      const listSearch: string[] = [];

      for (const item of masterSymbolList) {
        if (stringInput.length < 4 && item.slice(0, stringInput.length) === stringInput) {
          listSearchCode.push(item);
        } else if (item.includes(stringInput) && !listSearchCode.includes(item)) {
          listSearch.push(item);
        }
      }

      return [...listSearchCode, ...listSearch].map(
        item =>
          ({
            symbol: item,
          } as RecommendSymbol)
      );
    },
    [masterSymbolList]
  );

  const search = useCallback(
    debounce((type: SocialSearchType, value: string) => {
      setSearching(true);
      dispatch(
        SocialAccountActions.socialSearch({
          payload: {
            q: value,
            type,
          },
          callBack: {
            handleSuccess(response: SocialSearchResponse) {
              switch (type) {
                case 'accounts':
                  setData(
                    response.accounts.map(
                      item =>
                        ({
                          username: item.username,
                          fullname: item.display_name,
                        } as RecommendUser)
                    )
                  );
                  break;
                case 'hashtags': {
                  const symbols = searchSymbol(value) ?? [];
                  const tags = response.hashtags
                    .filter(item => {
                      if (!isSymbolExist(item.name.toUpperCase())) return true;
                      const symbol = symbols.find(symbol => symbol.symbol === item.name);
                      if (symbol) {
                        symbol.count = item.count;
                      }
                      return false;
                    })
                    .map(item => ({ tag: item.name, count: item.count } as RecommendTag));
                  setData([...tags, ...symbols]);
                  break;
                }
              }
              setSearching(false);
            },
            handleFail() {
              setSearching(false);
            },
          },
        })
      );
    }, 400),
    [searchSymbol]
  );

  if (isEmpty(box) || !keywordExist || (data.length === 0 && !searching)) return null;

  return (
    <View style={[styles.recommendedContainer, box]}>
      <FlashList
        bounces={true}
        estimatedItemSize={20}
        renderItem={renderItem}
        data={data}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          searching ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={dynamicColors.BlueNewColor} />
            </View>
          ) : null
        }
      />
    </View>
  );
});
