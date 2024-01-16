/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, ListRenderItemInfo, RefreshControl, View } from 'react-native';
import { useAppSelector } from 'hooks';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { AdvisorActions } from 'reduxs';
import SearchInput from 'components/SearchInput';
import AdvisorItem from '../AdvisorItem';
import { toNonAccentVietnamese } from 'utils';
import RocketLoader from 'components/RocketLoader';
import ItemSelector from 'components/ItemSelector';

const SortSelect = {
  Default: {
    label: 'Sort by',
    key: 'Default',
    hide: true,
  },
  MonthlyReturn: {
    label: 'Monthly Return',
    key: 'MonthlyReturn',
  },
  AnnualReturn: {
    label: 'Annual Return',
    key: 'AnnualReturn',
  },
  Views: {
    label: 'Views',
    key: 'Views',
  },
  Followers: {
    label: 'Followers',
    key: 'Followers',
  },
} as const;
type SortSelect = keyof typeof SortSelect;

const AdvisorList = () => {
  const dispatch = useDispatch();
  const { styles } = useStyles();

  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filter, _setFilter] = useState<SortSelect>('Default');
  const followedAdvisorsInSession = useRef<number[]>([]);

  const setFilter = useCallback((value: SortSelect) => {
    _setFilter(value);
    if (value === 'Default') {
      followedAdvisorsInSession.current = [];
    }
  }, []);

  const { advisorMap, lang, isLoaded, viewsAndFollowers, followingAdvisors, monthlySorted, annualSorted } =
    useAppSelector(state => ({
      advisorMap: state.Advisor.map,
      lang: state.lang,
      isLoaded: state.Advisor.monthlySorted.length > 0,
      viewsAndFollowers: state.Advisor.viewsAndFollowers,
      followingAdvisors: state.Advisor.isFollowing,
      annualSorted: state.Advisor.annualSorted,
      monthlySorted: state.Advisor.monthlySorted,
    }));

  const followedAdvisorsOutSession = useRef<number[]>(
    Object.entries(followingAdvisors)
      .filter(([_, value]) => value)
      .map(([key]) => Number(key))
  );

  const advisorList = filter === 'AnnualReturn' ? annualSorted : monthlySorted;

  const filteredAdvisorList = useMemo(() => {
    if (searchText.length === 0) {
      return advisorList;
    }
    const filtered = Object.values(advisorMap)
      .filter(advisor => {
        if (advisor == null) return false;
        const { fullname = '', username = '' } = advisor[lang] ?? {};

        return (
          toNonAccentVietnamese(fullname).toUpperCase().includes(searchText.toUpperCase()) ||
          username.toLowerCase().includes(searchText.toLowerCase())
        );
      })
      .map(advisor => advisor?.en?.userId);
    return advisorList.filter(advisor => filtered.includes(advisor));
  }, [advisorList, advisorMap, searchText, lang]);

  const sortedAdvisorList = useMemo(() => {
    switch (filter) {
      case 'Views':
        return [...filteredAdvisorList].sort((a, b) => {
          const aViews = viewsAndFollowers[a]?.totalViews ?? 0;
          const bViews = viewsAndFollowers[b]?.totalViews ?? 0;
          return bViews - aViews;
        });
      case 'Followers':
        return [...filteredAdvisorList].sort((a, b) => {
          const aFollowers = viewsAndFollowers[a]?.totalFollowers ?? 0;
          const bFollowers = viewsAndFollowers[b]?.totalFollowers ?? 0;
          return bFollowers - aFollowers;
        });
      default:
        return filteredAdvisorList;
    }
  }, [filteredAdvisorList, advisorMap, filter, viewsAndFollowers]);

  const followedPriorList = useMemo(() => {
    if (filter !== 'Default') return sortedAdvisorList;
    const normalList = [] as number[];
    const followedList = [] as number[];
    sortedAdvisorList.forEach(advisor => {
      if (
        (followingAdvisors[advisor] && !followedAdvisorsInSession.current.includes(advisor)) ||
        followedAdvisorsOutSession.current.includes(advisor)
      ) {
        followedList.push(advisor);
      } else {
        normalList.push(advisor);
      }
    });
    return [...followedList, ...normalList];
  }, [sortedAdvisorList, followingAdvisors, filter]);

  const onClearText = useCallback(() => {
    setSearchText('');
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setFilter('Default');
    onClearText();
    followedAdvisorsOutSession.current = Object.entries(followingAdvisors)
      .filter(([_, value]) => value)
      .map(([key]) => Number(key));
    dispatch(
      AdvisorActions.initAdvisorData({
        callBack: {
          handleSuccess: () => {
            setRefreshing(false);
          },
          handleFail: () => {
            setRefreshing(false);
          },
        },
      })
    );
  }, [followingAdvisors]);

  const onHearted = useCallback((advisor: number) => {
    followedAdvisorsInSession.current.push(advisor);
  }, []);

  const renderAIAdvisor = useCallback(
    ({ item, index }: ListRenderItemInfo<number>) => <AdvisorItem onHearted={onHearted} item={item} key={index} />,
    []
  );

  return (
    <>
      <View style={styles.topContainer}>
        <SearchInput
          containerStyle={styles.searchContainer}
          placeholder="Look for an AI Advisor"
          value={searchText}
          onChangeText={setSearchText}
          hideClearIcon={searchText.length === 0}
          onClear={onClearText}
        />
        <ItemSelector containerStyle={styles.filterContainer} config={SortSelect} setValue={setFilter} value={filter} />
      </View>
      <FlatList
        data={followedPriorList}
        renderItem={renderAIAdvisor}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={styles.contentContainer}
        initialNumToRender={4}
      />
      <RocketLoader isLoading={!isLoaded && !refreshing} />
    </>
  );
};

export default memo(AdvisorList);
