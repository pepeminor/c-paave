import React, { memo, useCallback, useMemo } from 'react';
import { View, TouchableOpacity, FlatList, ListRenderItemInfo } from 'react-native';
import useStyles from './styles';
import globalStyles, { scaleSize } from 'styles';
import ShareIcon from 'assets/icon/ShareIcon.svg';
import IconSupport from 'assets/icon/IconSupport.svg';
import RowData from '../../components/RowData/index';
import IconInternalTransfer from 'assets/icon/IconInternalTransfer.svg';
import IconBankTransfer from 'assets/icon/IconBankTransfer.svg';
import IconMoney from 'assets/icon/IconMoney.svg';
import HeaderScreen from 'components/HeaderScreen';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { TYPE_OPTION_VALUE } from '../CashTransaction/index';
import { SvgProps } from 'react-native-svg';
import { useAppSelector } from 'hooks/useAppSelector';
import { SYSTEM_TYPE } from 'global';
import { navigateBack, navigationRef } from 'utils';

// const KIS_LOGIN_URL = 'https://trading.kisvn.vn/login';

type ISettingAccountCashTransaction = {
  title: string;
  svg: React.FC<SvgProps>;
  navigate(): void;
};

const AccountCashTransaction_CashInAdvanceSetting: ISettingAccountCashTransaction = {
  title: 'Cash In Advance',
  svg: IconMoney,
  navigate: () => {
    navigationRef.navigate(ScreenNames.CashInAdvance);
  },
};

const AccountCashTransaction_DepositSetting: ISettingAccountCashTransaction = {
  title: 'Deposit to VSD',
  svg: IconBankTransfer,
  navigate: () => {
    navigationRef.navigate(ScreenNames.CashTransaction, {
      CashOption: TYPE_OPTION_VALUE.DEPOSIT_TO_VSD,
    });
  },
};
const AccountCashTransaction_WithdrawSetting: ISettingAccountCashTransaction = {
  title: 'Withdraw from VSD',
  svg: IconBankTransfer,
  navigate: () => {
    navigationRef.navigate(ScreenNames.CashTransaction, {
      CashOption: TYPE_OPTION_VALUE.WITHDRAW_FROM_VSD,
    });
  },
};

const AccountCashTransaction_Setting: ISettingAccountCashTransaction[] = [
  {
    title: 'Internal Transfer',
    svg: IconInternalTransfer,
    navigate: () =>
      navigationRef.navigate(ScreenNames.CashTransaction, {
        CashOption: TYPE_OPTION_VALUE.CASH_INTERNAL,
      }),
  },
  {
    title: 'To Bank Transfer',
    svg: IconBankTransfer,
    navigate: () => {
      navigationRef.navigate(ScreenNames.CashTransaction, {
        CashOption: TYPE_OPTION_VALUE.CASH_BANK,
      });
    },
  },
];

const AccountCashTransaction = () => {
  const { styles } = useStyles();
  const selectedAccount = useAppSelector(state => state.selectedAccount);

  const isSubD =
    selectedAccount.selectedSubAccount != null &&
    selectedAccount.selectedSubAccount.accountSubs[0] != null &&
    selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.DERIVATIVES;

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<ISettingAccountCashTransaction>) => {
      return (
        <RowData
          key={index}
          title={item.title}
          svg={item.svg}
          navigate={item.navigate}
          containerStyle={styles.rowData}
          titleStyle={styles.rowDataText}
        />
      );
    },
    [styles]
  );

  const AccountCashTransactionSettingData: ISettingAccountCashTransaction[] = useMemo(
    () =>
      isSubD
        ? {
            ...AccountCashTransaction_Setting,
            AccountCashTransaction_DepositSetting,
            AccountCashTransaction_WithdrawSetting,
          }
        : {
            ...AccountCashTransaction_Setting,
            AccountCashTransaction_CashInAdvanceSetting,
          },
    [selectedAccount, AccountCashTransaction_Setting]
  );

  const goToLiveChat = () => {
    navigationRef.navigate(ScreenNames.LiveChat);
  };

  return (
    <View style={styles.container}>
      <HeaderScreen
        leftButtonIcon={true}
        goBackAction={navigateBack}
        headerTitle={'Cash Transaction'}
        rightButtonListIcon={[
          <TouchableOpacity>
            <ShareIcon style={globalStyles.hide} height={scaleSize(24)} width={scaleSize(24)} />
          </TouchableOpacity>,
        ]}
      />
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={Object.values(AccountCashTransactionSettingData)}
          renderItem={renderItem}
        />
      </View>
      <TouchableOpacity onPress={goToLiveChat} style={[globalStyles.containerSupport, globalStyles.hide]}>
        <IconSupport width={scaleSize(106)} height={scaleSize(106)} />
      </TouchableOpacity>
    </View>
  );
};

export default memo(AccountCashTransaction);
