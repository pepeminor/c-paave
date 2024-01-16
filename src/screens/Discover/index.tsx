import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { FlatList, RefreshControl, TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import IconSearch from 'assets/icon/IconSearch.svg';
import UserIcon from 'assets/icon/UserIcon.svg';
import { scaleSize } from 'styles';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import HeaderScreen from 'components/HeaderScreen';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { useFocusEffect } from '@react-navigation/native';
import Indices from './Indices';
import { insertObjectIf, navigate } from 'utils';
import { track } from '@amplitude/analytics-react-native';
import { AMPLITUDE_EVENT } from 'interfaces/Amplitude';
import withMemo from 'HOC/withMemo';
import { useAppSelector } from 'hooks/useAppSelector';
import { DiscoverActions, discoverSelectors } from 'reduxs/Discover';
import News from './News';
import { TabBody, TabHeader } from './Tab';
import Videos from './Videos';
import { SocialPostActions } from 'reduxs';

const DUMMY_LIST = [0];
const STICKY_INDICES = [1];
const HeaderButtonHitSlop = { top: 10, bottom: 10, left: 10, right: 10 };

const Discover = (props: StackScreenProps<'Discover'>) => {
  const dispatch = useDispatch();
  const { styles } = useStyles();
  const refreshing = useAppSelector(discoverSelectors.selectRefreshingDiscover);
  const selectedAccount = useAppSelector(state => state.selectedAccount);
  const flatListRef = React.useRef<FlatList>(null);
  const tabBodyRef = React.useRef<TabBody>(null);
  const [showFooter, setShowFooter] = React.useState(false);

  useFocusEffect(
    useCallback(() => {
      track(AMPLITUDE_EVENT.DiscoverTab, {
        selectedAccount: selectedAccount?.selectedSubAccount?.accountName ?? 'NON_LOGIN',
      });
    }, [])
  );

  useEffect(() => {
    dispatch(SocialPostActions.checkLimitSocial());
  }, []);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerShown: false,
    });
  }, [props.navigation]);

  const goToSearchSymbolAndMember = useCallback(() => {
    props.navigation.navigate(ScreenNames.SearchSymbolAndMember);
  }, []);

  const goToUserInfo = useCallback(() => {
    navigate({ key: 'UserInfo' });
  }, []);

  const onRefresh = useCallback(() => {
    dispatch(DiscoverActions.refreshDiscoverScreen());
  }, []);

  const renderItem = useCallback(() => {
    return <TabHeader tabBodyRef={tabBodyRef} />;
  }, []);

  const onScroll = useCallback(() => {
    setShowFooter(true);
  }, []);

  return (
    <View style={styles.container}>
      <HeaderScreen
        leftButtonIcon={
          <TouchableOpacity onPress={goToUserInfo} style={styles.headerIconLeft} hitSlop={HeaderButtonHitSlop}>
            <UserIcon height={scaleSize(24)} width={scaleSize(24)} />
          </TouchableOpacity>
        }
        headerTitle={'Discover'}
        rightButtonListIcon={[
          <TouchableOpacity onPress={goToSearchSymbolAndMember} key={'0'} hitSlop={HeaderButtonHitSlop}>
            <IconSearch width={scaleSize(24)} height={scaleSize(24)}></IconSearch>
          </TouchableOpacity>,
        ]}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={DUMMY_LIST}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ref={flatListRef}
        onScroll={onScroll}
        ListHeaderComponent={
          <>
            <Indices />
            <View style={styles.border} />
            <News />
            <View style={styles.border} />
          </>
        }
        stickyHeaderIndices={STICKY_INDICES}
        {...insertObjectIf(showFooter, {
          ListFooterComponent: (
            <>
              <TabBody ref={tabBodyRef} />
              <Videos />
            </>
          ),
        })}
      />
    </View>
  );
};

export default withMemo(Discover);
