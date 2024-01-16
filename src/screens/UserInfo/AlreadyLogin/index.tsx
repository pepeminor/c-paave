import React, { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, LayoutChangeEvent } from 'react-native';
import SignOut from 'assets/icon/SignOut.svg';
import Support from 'assets/icon/Support.svg';
import ExtendIcon from 'assets/icon/ExtendIcon.svg';
import EditUserIntro from 'assets/icon/EditUserIntro.svg';
import Security from 'assets/icon/Security.svg';
import Setting from 'assets/icon/Setting.svg';
import Trading from 'assets/icon/Trading.svg';
import History from 'assets/icon/History.svg';
import CashTransaction from 'assets/icon/CashTransaction.svg';
import Utilities from 'assets/icon/Utilities.svg';
import AssetInfo from 'assets/icon/AssetInfo.svg';
import { ACCOUNT_TYPE, ALL_SETTING_LABEL, AUTHEN_TYPE, OrderBookScreenInitOption } from 'global';
import globalStyles, { Colors, scaleSize } from 'styles';
import useStyles from './styles';
import { navigate, generateNameAbbreviations, insertObjectIf } from 'utils';
import { useSelector } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import { setOrderBookScreenOption } from 'reduxs/global-actions';
import { useTranslation } from 'react-i18next';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import useUserAvatarColor from 'hooks/useUserAvatarColor';
import { AMPLITUDE_EVENT } from 'interfaces/Amplitude';
import { track } from '@amplitude/analytics-react-native';
import Icon, { IconWithBackground } from 'components/Icon';
import withMemo from 'HOC/withMemo';
import Item from './components/ItemRow';
import SignOutRow from './components/SignOut';
import Feedback from './components/Feedback';
import { store } from 'screens/App';

export type ISettingItem = {
  icon: ReactElement;
  label: ALL_SETTING_LABEL;
  borderBottom: '1' | '5' | 'no';
  rightArrow: boolean;
  onPress: (accountName?: string) => void;
};

type ISetting = {
  [AUTHEN_TYPE.NO_LOGIN]: ISettingItem[];
  [AUTHEN_TYPE.LIVE]: ISettingItem[];
  [AUTHEN_TYPE.KIS]: ISettingItem[];
};

const LEADER_BOARD_SETTING_ICON: ISettingItem = {
  icon: <IconWithBackground name="trophy" size={24} iconColor={Colors.Blue5} />,
  label: ALL_SETTING_LABEL.LEADER_BOARD_SETTING,
  borderBottom: '5',
  rightArrow: true,
  onPress: accountName => {
    track(AMPLITUDE_EVENT.CLICK_SETTING, {
      selectedAccount: accountName,
    });
    navigate({ key: ScreenNames.LeaderboardSetting });
  },
};

const SIGN_OUT_SETTING_ICON: ISettingItem = {
  icon: <SignOut width={scaleSize(24)} height={scaleSize(24)} />,
  label: ALL_SETTING_LABEL.SIGN_OUT,
  borderBottom: 'no',
  rightArrow: false,
  onPress: accountName => {
    track(AMPLITUDE_EVENT.SIGN_OUT, {
      selectedAccount: accountName,
    });
  },
};

const BaseSettingListData: ISetting = {
  [AUTHEN_TYPE.NO_LOGIN]: [
    {
      icon: <Setting width={scaleSize(24)} height={scaleSize(24)} />,
      label: ALL_SETTING_LABEL.SETTING,
      borderBottom: '1',
      rightArrow: true,
      onPress: accountName => {
        track(AMPLITUDE_EVENT.CLICK_SETTING, {
          selectedAccount: accountName,
        });
        navigate({ key: ScreenNames.Setting });
      },
    },
    {
      icon: <Support width={scaleSize(24)} height={scaleSize(24)} />,
      label: ALL_SETTING_LABEL.HELP,
      borderBottom: '1',
      rightArrow: true,
      onPress: accountName => {
        track(AMPLITUDE_EVENT.CLICK_HELP, {
          selectedAccount: accountName,
        });
        navigate({ key: ScreenNames.HelpAndSupport });
      },
    },
  ],
  [AUTHEN_TYPE.LIVE]: [
    {
      icon: <Trading width={scaleSize(24)} height={scaleSize(24)} />,
      label: ALL_SETTING_LABEL.TRADING_ACCOUNT,
      borderBottom: '1',
      rightArrow: true,
      onPress: accountName => {
        track(AMPLITUDE_EVENT.CLICK_TRADING_ACCOUNT, {
          selectedAccount: accountName,
        });
        navigate({ key: ScreenNames.AccountTrading });
      },
    },
    {
      icon: <AssetInfo width={scaleSize(24)} height={scaleSize(24)} />,
      label: ALL_SETTING_LABEL.ASSET_MANAGEMENT,
      borderBottom: '1',
      rightArrow: true,
      onPress: accountName => {
        track(AMPLITUDE_EVENT.CLICK_ASSET_MANAGEMENT, {
          selectedAccount: accountName,
        });
        navigate({ key: ScreenNames.AssetInformationSetting });
      },
    },
    {
      icon: <History width={scaleSize(24)} height={scaleSize(24)} />,
      label: ALL_SETTING_LABEL.ORDER_HIS,
      borderBottom: '1',
      rightArrow: true,
      onPress: accountName => {
        track(AMPLITUDE_EVENT.CLICK_ORDER_HISTORY, {
          selectedAccount: accountName,
        });
        store.dispatch(setOrderBookScreenOption(OrderBookScreenInitOption.ORDER_HISTORY));
        navigate({ key: 'OrderBook' });
      },
    },
    {
      icon: <Security width={scaleSize(24)} height={scaleSize(24)} />,
      label: ALL_SETTING_LABEL.SECURITY,
      borderBottom: '1',
      rightArrow: true,
      onPress: accountName => {
        track(AMPLITUDE_EVENT.CLICK_SECURITY, {
          selectedAccount: accountName,
        });
        navigate({ key: ScreenNames.Security });
      },
    },
    {
      icon: <Setting width={scaleSize(24)} height={scaleSize(24)} />,
      label: ALL_SETTING_LABEL.SETTING,
      borderBottom: '1',
      rightArrow: true,
      onPress: accountName => {
        track(AMPLITUDE_EVENT.CLICK_SETTING, {
          selectedAccount: accountName,
        });
        navigate({ key: ScreenNames.Setting });
      },
    },
    {
      icon: <Support width={scaleSize(24)} height={scaleSize(24)} />,
      label: ALL_SETTING_LABEL.HELP,
      borderBottom: '1',
      rightArrow: true,
      onPress: accountName => {
        track(AMPLITUDE_EVENT.CLICK_HELP, {
          selectedAccount: accountName,
        });
        navigate({ key: ScreenNames.HelpAndSupport });
      },
    },
  ],
  [AUTHEN_TYPE.KIS]: [
    {
      icon: <Trading width={scaleSize(24)} height={scaleSize(24)} />,
      label: ALL_SETTING_LABEL.TRADING_ACCOUNT,
      borderBottom: '1',
      rightArrow: true,
      onPress: accountName => {
        track(AMPLITUDE_EVENT.CLICK_TRADING_ACCOUNT, {
          selectedAccount: accountName,
        });
        navigate({ key: ScreenNames.AccountTrading });
      },
    },
    {
      icon: <AssetInfo width={scaleSize(24)} height={scaleSize(24)} />,
      label: ALL_SETTING_LABEL.ASSET_MANAGEMENT,
      borderBottom: '1',
      rightArrow: true,
      onPress: accountName => {
        track(AMPLITUDE_EVENT.CLICK_ASSET_MANAGEMENT, {
          selectedAccount: accountName,
        });
        navigate({ key: ScreenNames.AssetInformationSetting });
      },
    },
    {
      icon: <History width={scaleSize(24)} height={scaleSize(24)} />,
      label: ALL_SETTING_LABEL.ORDER_HIS,
      borderBottom: '1',
      rightArrow: true,
      onPress: accountName => {
        track(AMPLITUDE_EVENT.CLICK_ORDER_HISTORY, {
          selectedAccount: accountName,
        });
        store.dispatch(setOrderBookScreenOption(OrderBookScreenInitOption.ORDER_HISTORY));
        navigate({ key: 'OrderBook' });
      },
    },
    {
      icon: <CashTransaction width={scaleSize(24)} height={scaleSize(24)} />,
      label: ALL_SETTING_LABEL.CASH_TRANSACTION,
      borderBottom: '1',
      rightArrow: true,
      onPress: accountName => {
        track(AMPLITUDE_EVENT.CLICK_CASH_TRANSACTION, {
          selectedAccount: accountName,
        });
        navigate({ key: ScreenNames.AccountCashTransaction });
      },
    },
    {
      icon: <Utilities width={scaleSize(24)} height={scaleSize(24)} />,
      label: ALL_SETTING_LABEL.UTILITIES,
      borderBottom: '1',
      rightArrow: true,
      onPress: accountName => {
        track(AMPLITUDE_EVENT.CLICK_UTILITIES, {
          selectedAccount: accountName,
        });
        navigate({ key: ScreenNames.AccountUtilities });
      },
    },
    LEADER_BOARD_SETTING_ICON,

    {
      icon: <Security width={scaleSize(24)} height={scaleSize(24)} />,
      label: ALL_SETTING_LABEL.SECURITY,
      borderBottom: '1',
      rightArrow: true,
      onPress: accountName => {
        track(AMPLITUDE_EVENT.CLICK_SECURITY, {
          selectedAccount: accountName,
        });
        navigate({ key: ScreenNames.Security });
      },
    },
    {
      icon: <Setting width={scaleSize(24)} height={scaleSize(24)} />,
      label: ALL_SETTING_LABEL.SETTING,
      borderBottom: '1',
      rightArrow: true,
      onPress: accountName => {
        track(AMPLITUDE_EVENT.CLICK_SETTING, {
          selectedAccount: accountName,
        });
        navigate({ key: ScreenNames.Setting });
      },
    },
    {
      icon: <Support width={scaleSize(24)} height={scaleSize(24)} />,
      label: ALL_SETTING_LABEL.HELP,
      borderBottom: '1',
      rightArrow: true,
      onPress: accountName => {
        track(AMPLITUDE_EVENT.CLICK_HELP, {
          selectedAccount: accountName,
        });
        navigate({ key: ScreenNames.HelpAndSupport });
      },
    },
    SIGN_OUT_SETTING_ICON,
  ],
};

const AlreadyLogin = () => {
  const { t } = useTranslation();
  const { styles, dynamicColors } = useStyles();
  const [extended, setExtended] = useState(false);
  const [extendedVisible, setExtendedVisible] = useState(false);
  const getAccountInfo = useSelector((state: IState) => state.getUserAccountInfo);
  const getKisAccountInfo = useSelector((state: IState) => state.getUserKisAccountInfo);
  const selectedAccount = useSelector((state: IState) => state.selectedAccount);
  const isHaveKisAccount = useSelector((state: IState) => state.accountList.KIS != null);
  const userAvatarColor = useUserAvatarColor(
    selectedAccount.type === ACCOUNT_TYPE.KIS ? selectedAccount.username : getAccountInfo.data?.username
  );
  const settingListData = useMemo(
    () =>
      isHaveKisAccount
        ? {
            ...BaseSettingListData,
            [AUTHEN_TYPE.LIVE]: [
              ...BaseSettingListData[AUTHEN_TYPE.LIVE],
              LEADER_BOARD_SETTING_ICON,
              SIGN_OUT_SETTING_ICON,
            ],
          }
        : {
            ...BaseSettingListData,
            [AUTHEN_TYPE.LIVE]: [...BaseSettingListData[AUTHEN_TYPE.LIVE], SIGN_OUT_SETTING_ICON],
          },
    [isHaveKisAccount, selectedAccount.type]
  );

  const getBioComponentHeight = useCallback((event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    height < scaleSize(104) ? setExtendedVisible(false) : setExtendedVisible(true);
  }, []);

  useEffect(() => {
    track(AMPLITUDE_EVENT.VIEW_MY_PROPFILE, {
      selectedAccount: selectedAccount.selectedSubAccount?.accountName,
    });
  }, []);

  const toggleExtend = useCallback(() => {
    setExtended(!extended);
  }, []);

  const goToUserIntroduction = useCallback(() => {
    navigate({ key: ScreenNames.UserIntroduction });
  }, []);

  const onPressAccountInfo = useCallback(() => {
    track(AMPLITUDE_EVENT.CLICK_ACCOUNT_INFO, {
      selectedAccount: selectedAccount.selectedSubAccount?.accountName,
    });
    navigate({ key: ScreenNames.AccountInformation });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.avatarContainer} onPress={onPressAccountInfo}>
          {selectedAccount.type === ACCOUNT_TYPE.VIRTUAL && getAccountInfo.data != null && (
            <View style={globalStyles.flexDirectionRow}>
              <View style={{ ...styles.avatarImg, backgroundColor: userAvatarColor }}>
                <Text allowFontScaling={false} style={styles.avatarImgText}>
                  {generateNameAbbreviations(getAccountInfo.data.fullname)}
                </Text>
              </View>

              <View style={styles.avatarTextContainer}>
                <Text allowFontScaling={false} style={styles.nameText} numberOfLines={1} ellipsizeMode="tail">
                  {getAccountInfo.data.fullname}
                </Text>
                <Text allowFontScaling={false} style={styles.nameText2} numberOfLines={1}>
                  {getAccountInfo.data.username}
                </Text>
              </View>
            </View>
          )}
          {selectedAccount.type === ACCOUNT_TYPE.KIS && getKisAccountInfo.data != null && (
            <View style={globalStyles.flexDirectionRow}>
              <View style={{ ...styles.avatarImg, backgroundColor: userAvatarColor }}>
                <Text allowFontScaling={false} style={styles.avatarImgText}>
                  {generateNameAbbreviations(getKisAccountInfo.data.customerProfile.userName)}
                </Text>
              </View>

              <View style={styles.avatarTextContainer}>
                <Text allowFontScaling={false} style={styles.nameText} numberOfLines={1} ellipsizeMode="tail">
                  {getKisAccountInfo.data.customerProfile.userName}
                </Text>
              </View>
            </View>
          )}
          <Icon name={'arrow-right-2'} color={dynamicColors.LIGHTGRAY} style={styles.arrowContainer} size={24} />
        </TouchableOpacity>

        {selectedAccount.type === ACCOUNT_TYPE.VIRTUAL && (
          <View style={[styles.basicInfoAreaDefault, !extended && styles.basicInfoArea]}>
            <View style={styles.userIntroContainer}>
              <Text allowFontScaling={false} style={styles.userIntroText}>
                {t('User Introduction')}
              </Text>
              <TouchableOpacity onPress={goToUserIntroduction} style={styles.containerIconEdit}>
                <EditUserIntro />
              </TouchableOpacity>
            </View>

            {getAccountInfo.data != null && (
              <View onLayout={getBioComponentHeight}>
                {getAccountInfo.data.bio === '' ? (
                  <Text allowFontScaling={false} style={styles.textNoBio}>
                    {t('No bio yet')}
                  </Text>
                ) : (
                  <Text allowFontScaling={false} style={styles.introText}>
                    {getAccountInfo.data.bio}
                  </Text>
                )}
              </View>
            )}
          </View>
        )}
        {selectedAccount.type === ACCOUNT_TYPE.VIRTUAL &&
          (extendedVisible ? (
            <TouchableOpacity style={styles.extendButtonArea} onPress={toggleExtend}>
              <Text allowFontScaling={false} style={styles.extendText}>{`${extended ? t('Hide') : t('Extend')}`}</Text>
              <ExtendIcon style={insertObjectIf(extended, styles.collapseIcon)} />
            </TouchableOpacity>
          ) : (
            <View style={styles.extendArea} />
          ))}

        <View style={styles.border} />
        {settingListData[selectedAccount.type === ACCOUNT_TYPE.KIS ? AUTHEN_TYPE.KIS : AUTHEN_TYPE.LIVE].map(
          (item, index) => {
            if (item.label === ALL_SETTING_LABEL.SIGN_OUT) return <SignOutRow item={item} key={index} />;
            return <Item item={item} key={index} />;
          }
        )}

        <Feedback />
      </ScrollView>
    </View>
  );
};

export default withMemo(AlreadyLogin);
