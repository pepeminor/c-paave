import Icon from 'components/Icon';
import LoginRequired from 'components/LoginRequired';
import { useAppSelector } from 'hooks';
import { ISearchUserResponse } from 'interfaces/user';
import React, { forwardRef, memo, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, Text, View } from 'react-native';
import { useStyles } from './styles';
import { searchUserInfo } from 'reduxs/global-actions';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import MemberRow from './MemberRow';
import { ReducerStatus } from 'interfaces/reducer';
import { useDispatch } from 'react-redux';
import config from 'config';
import { scaleSize } from 'styles';
import { debounce } from 'lodash';
import { SearchScreenTabRef } from '../type';

interface Props {}
export type SearchMember = SearchScreenTabRef;

const PAGE_SIZE = config.pageSize;

export const SearchMember = memo(
  forwardRef<SearchMember, Props>((_, ref) => {
    const { t } = useTranslation();
    const { styles, dynamicColors } = useStyles();
    const dispatch = useDispatch();

    const [listMemberSearch, setListMemberSearch] = useState<ISearchUserResponse[]>([]);
    const pageNumber = useRef(0);
    const searchText = useRef('');

    const isLoading = useAppSelector(state => state.querySearchUserInfo.status === ReducerStatus.LOADING);
    const isFetchAllData = useAppSelector(
      state => state.querySearchUserInfo.data != null && state.querySearchUserInfo.data.length < PAGE_SIZE
    );

    const onLoadMore = useCallback(() => {
      if (isFetchAllData || listMemberSearch.length < PAGE_SIZE) {
        return;
      }
      if (listMemberSearch.length === PAGE_SIZE * (pageNumber.current + 1)) {
        pageNumber.current += 1;
        if (searchText.current) {
          dispatch(
            searchUserInfo({
              payload: { name: searchText.current, pageSize: PAGE_SIZE, pageNumber: pageNumber.current },
              callBack: {
                handleSuccess: handleFetchUserSuccess,
              },
            })
          );
        }
      }
    }, [isFetchAllData, listMemberSearch.length]);

    const handleFetchUserSuccess = useCallback((responseData: ISearchUserResponse[]) => {
      if (responseData.length > 0) {
        setListMemberSearch(pre => {
          const newList = pre.concat(responseData);
          const uniqueList = [...new Map(newList.map(item => [item['userId'], item])).values()];
          return uniqueList;
        });
      }
    }, []);

    const renderItem = useCallback(({ item }: ListRenderItemInfo<ISearchUserResponse>) => {
      return <MemberRow userData={item} key={`MemberRow_${item.username}`} />;
    }, []);

    const onSearchTextChange = useCallback(
      debounce(
        (text: string) => {
          searchText.current = text;
          pageNumber.current = 0;
          setListMemberSearch([]);
          if (text) {
            dispatch(
              searchUserInfo({
                payload: { name: text, pageSize: PAGE_SIZE, pageNumber: pageNumber.current },
                callBack: {
                  handleSuccess: handleFetchUserSuccess,
                },
              })
            );
          }
        },
        300,
        { leading: false, trailing: true }
      ),
      []
    );

    useImperativeHandle(ref, () => ({
      onSearchTextChange,
    }));

    return (
      <View style={styles.container}>
        <LoginRequired />
        <FlashList
          key="Search_MEM_RESULT"
          data={listMemberSearch}
          renderItem={renderItem}
          onMomentumScrollBegin={Keyboard.dismiss}
          onScrollBeginDrag={Keyboard.dismiss}
          showsVerticalScrollIndicator={false}
          onEndReached={onLoadMore}
          ListFooterComponent={
            <>
              {isLoading && listMemberSearch.length >= PAGE_SIZE ? (
                <Text style={styles.loadingText}>{t('Loading')}...</Text>
              ) : null}
              {!isLoading && listMemberSearch.length === 0 && searchText.current !== '' && (
                <View style={styles.noMemberFound}>
                  <Icon name={'account'} color={dynamicColors.Blue5} size={scaleSize(66)} />
                  <Text allowFontScaling={false} style={styles.noMemberFoundText}>
                    {t('no.member.found')}
                  </Text>
                </View>
              )}
              {searchText.current === '' && (
                <View style={styles.noMemberFound}>
                  <Text allowFontScaling={false} style={styles.noMemberFoundText}>
                    (*) {t('search_member_note')}
                  </Text>
                </View>
              )}
            </>
          }
          estimatedItemSize={scaleSize(106)}
        />
      </View>
    );
  })
);
