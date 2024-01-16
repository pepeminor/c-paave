import LoginRequired from 'components/LoginRequired';
import React, { forwardRef, memo, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { Keyboard, View } from 'react-native';
import { useStyles } from './styles';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { TagItem } from './TagItem';
import { useDispatch } from 'react-redux';
import { scaleSize } from 'styles';
import { debounce } from 'lodash';
import { SearchedTag, SearchScreenTabRef } from '../type';
import { SocialAccountActions, SocialSearchResponse } from 'reduxs';
import config from 'config';
import PaaveText from 'components/PaaveText';
import { useTranslation } from 'react-i18next';

interface Props {}
export type SearchHashtag = SearchScreenTabRef;

const PAGE_SIZE = config.pageSize;

export const SearchHashtag = memo(
  forwardRef<SearchHashtag, Props>((_, ref) => {
    const { t } = useTranslation();
    const { styles } = useStyles();
    const dispatch = useDispatch();

    const isFullData = useRef(false);
    const currentValue = useRef('');
    const [data, setData] = useState<SearchedTag[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const renderItem = useCallback(({ item }: ListRenderItemInfo<SearchedTag>) => {
      return <TagItem data={item} key={`MemberRow_${item.name}`} />;
    }, []);

    const onSearchTextChange = useCallback(
      debounce((value: string) => {
        currentValue.current = value;
        isFullData.current = false;
        searchTag(value);
      }, 400),
      []
    );

    const searchTag = useCallback((value: string, offset = 0) => {
      if (value === '') {
        setData([]);
        return;
      }
      if (isFullData.current) {
        return;
      }
      setIsLoading(true);
      dispatch(
        SocialAccountActions.socialSearch({
          payload: {
            q: value,
            type: 'hashtags',
            limit: PAGE_SIZE,
            offset,
          },
          callBack: {
            handleSuccess(response: SocialSearchResponse) {
              const tags = response.hashtags;
              if (tags.length < PAGE_SIZE) {
                isFullData.current = true;
              }
              setData(pre => {
                if (offset === 0) {
                  return tags;
                }
                return [...pre, ...tags];
              });
              setIsLoading(false);
            },
            handleFail() {
              setIsLoading(false);
            },
          },
        })
      );
    }, []);

    const onEndReached = useCallback(() => {
      searchTag(currentValue.current, data.length);
    }, [data.length]);

    useImperativeHandle(ref, () => ({
      onSearchTextChange,
    }));

    return (
      <View style={styles.container}>
        <LoginRequired />
        <FlashList
          data={data}
          renderItem={renderItem}
          onMomentumScrollBegin={Keyboard.dismiss}
          onScrollBeginDrag={Keyboard.dismiss}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={scaleSize(56)}
          ListFooterComponent={isLoading ? <PaaveText style={styles.loadingText}>{t('Loading')}...</PaaveText> : null}
          onEndReachedThreshold={0.5}
          onEndReached={onEndReached}
          ListEmptyComponent={
            currentValue.current === '' ? (
              <View style={styles.noSearchText}>
                <PaaveText style={styles.hashtagNote}>(*) {t('search_hashtag_note')}</PaaveText>
              </View>
            ) : null
          }
        />
      </View>
    );
  })
);
