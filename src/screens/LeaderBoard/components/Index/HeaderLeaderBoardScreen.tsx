import React, { memo, useEffect } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { lightColors, scaleSize, textStyles } from 'styles';
import IconSearch from 'assets/icon/IconSearch.svg';
import UserIcon from 'assets/icon/UserIcon.svg';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { useDispatch } from 'react-redux';
import { WatchListActions } from 'reduxs';
import { ACCOUNT_TYPE } from 'global';
import { navigate, navigationRef } from 'utils/rootNavigation';
import TrophyButton from './TrophyButton';
import { getStylesHook } from 'hooks/useStyles';
import HeaderScreen from 'components/HeaderScreen';
import { useAppSelector } from 'hooks/useAppSelector';
import { LEADER_BOARD_ACCOUNT_SELECTOR } from 'reduxs/actions';
import { setSelectedAccount } from 'components/AccountPicker/actions';
import { isNotNilOrEmpty } from 'ramda-adjunct';
import { useIsFocused } from '@react-navigation/native';
import { store } from 'screens/App';

const HeaderLeaderBoardScreen_goToSearchSymbolAndMember = () => {
  navigationRef.navigate(ScreenNames.SearchSymbolAndMember);
  store.dispatch(WatchListActions.initWatchList({ screenId: ScreenNames.LeaderBoard }));
};

const goToUserInfo = () => navigate({ key: 'UserInfo' });

interface IProps {
  isFocusedLeaderBoard: boolean;
  titleHeader: string;
}

const HeaderLeaderBoardScreen = (props: IProps) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { styles } = useStyles();

  const isKisSelected = useAppSelector(state => state.leaderboardAccountSelector === ACCOUNT_TYPE.KIS);
  const isDemoAccount = useAppSelector(state => state.selectedAccount.type === ACCOUNT_TYPE.DEMO);
  const leaderboardSetting = useAppSelector(state => state.leaderboardSetting);
  const selectedAccount = useAppSelector(state => state.selectedAccount);
  const accountList = useAppSelector(state => state.accountList);

  useEffect(() => {
    // if login by Account Demo then do not show switch leaderboard mode
    // and only show leaderboard mode is PAAVE
    if (isFocused || isDemoAccount) {
      if (selectedAccount.type === ACCOUNT_TYPE.KIS) {
        dispatch({ type: LEADER_BOARD_ACCOUNT_SELECTOR, payload: ACCOUNT_TYPE.KIS });
        return;
      }
      if (accountList.KIS != null) {
        dispatch({ type: LEADER_BOARD_ACCOUNT_SELECTOR, payload: ACCOUNT_TYPE.VIRTUAL });
      }

      return;
    }
    if (isKisSelected) {
      if (isNotNilOrEmpty(accountList?.KIS?.subAccounts)) {
        const subAccount = accountList?.KIS?.subAccounts?.find(
          subAccount => subAccount.accountNumber === leaderboardSetting.data?.subAccount
        );
        const account = subAccount
          ? subAccount
          : selectedAccount.type === ACCOUNT_TYPE.KIS
          ? selectedAccount.selectedSubAccount
          : accountList?.KIS?.subAccounts?.[0];
        accountList.KIS &&
          dispatch(
            setSelectedAccount({
              ...accountList.KIS,
              selectedSubAccount: account,
              oldType: selectedAccount.type,
              oldSelectedSubAccount: selectedAccount.selectedSubAccount,
            })
          );
      }
    } else {
      dispatch(
        setSelectedAccount({
          ...accountList.PAAVE,
          selectedSubAccount: accountList?.PAAVE?.subAccounts?.[0],
          oldType: selectedAccount.type,
          oldSelectedSubAccount: selectedAccount.selectedSubAccount,
        })
      );
    }
  }, [isFocused, isDemoAccount]);

  return (
    <>
      <HeaderScreen
        leftButtonIcon={
          <TouchableOpacity onPress={goToUserInfo} style={styles.headerIconLeft}>
            <UserIcon height={scaleSize(24)} width={scaleSize(24)} />
          </TouchableOpacity>
        }
        headerTitle={
          props.isFocusedLeaderBoard
            ? isKisSelected
              ? 'Kis_Leaderboard_Header_Title'
              : 'Virtual_Leaderboard_Header_Title'
            : props.titleHeader
        }
        subAccountVisible={!isDemoAccount && props.isFocusedLeaderBoard}
        currentScreen={props.isFocusedLeaderBoard ? ScreenNames.LeaderBoard : undefined}
        rightButtonListIcon={
          props.isFocusedLeaderBoard
            ? [
                <TrophyButton />,
                <TouchableOpacity
                  onPress={HeaderLeaderBoardScreen_goToSearchSymbolAndMember}
                  style={styles.settingIcon}
                >
                  <IconSearch width={scaleSize(24)} height={scaleSize(24)} />
                </TouchableOpacity>,
              ]
            : [
                <TouchableOpacity
                  onPress={HeaderLeaderBoardScreen_goToSearchSymbolAndMember}
                  style={styles.settingIcon}
                >
                  <IconSearch width={scaleSize(24)} height={scaleSize(24)} />
                </TouchableOpacity>,
              ]
        }
      />
    </>
  );
};

export default memo(HeaderLeaderBoardScreen);

const useStyles = getStylesHook({
  topContainer: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: Platform.OS === 'ios' ? 40 : 0,
    zIndex: 10,
  },
  title: {
    ...textStyles.fontSize18,
    ...textStyles.roboto700,
    color: lightColors.WHITE,
    width: '100%',
    marginHorizontal: 16,
    textAlign: 'center',
    position: 'absolute',
  },
  backIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    zIndex: 1,
  },
  iconsRight: {
    flexDirection: 'row',
  },
  settingIcon: {
    marginLeft: 16,
    justifyContent: 'center',
  },
  headerIconLeft: {
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
});
