import React, { memo, useCallback, useMemo } from 'react';
import { View, FlatList, ListRenderItemInfo } from 'react-native';
import ReportChart from 'assets/icon/ReportChart.svg';
import Portfolio from 'assets/icon/Portfolio.svg';
import AssetInfo from 'assets/icon/AssetInfo.svg';
import CashStatement from 'assets/icon/CashStatementIcon.svg';
import useStyles from './styles';
import RowData from '../../components/RowData/index';
import HeaderScreen from 'components/HeaderScreen';
import { useAppSelector } from 'hooks/useAppSelector';
import { ACCOUNT_TYPE, SYSTEM_TYPE } from 'global';
import { navigateBack, navigationRef } from 'utils';
import ScreenNames from 'screens/RootNavigation/ScreenNames';

type IAssetInformationType = {
  title: string;
  svg: object;
  navigate(): void;
};

const AssetInformationSetting_CashStatement: IAssetInformationType = {
  title: 'Cash Statement',
  svg: CashStatement,
  navigate: () => navigationRef.navigate(ScreenNames.CashStatement),
};

const AssetInformationSetting = () => {
  const { styles } = useStyles();
  const selectedAccount = useAppSelector(state => state.selectedAccount);

  const isAccountDerivative =
    selectedAccount.type === ACCOUNT_TYPE.KIS &&
    selectedAccount.selectedSubAccount != null &&
    selectedAccount.selectedSubAccount.accountSubs[0] != null &&
    selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.DERIVATIVES;

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<IAssetInformationType>) => {
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

  const AssetInformationSettingData: IAssetInformationType[] = useMemo(
    () => [
      {
        title: 'Portfolio',
        svg: Portfolio,
        navigate: () => navigationRef.navigate(ScreenNames.PortfolioInvestment),
      },
      {
        title: isAccountDerivative ? 'Position Statement' : 'NAV Change',
        svg: ReportChart,
        navigate: () => navigationRef.navigate(ScreenNames.ProfitlossReport),
      },
      {
        title: 'Asset Information',
        svg: AssetInfo,
        navigate: () => navigationRef.navigate(ScreenNames.AssetInformation),
      },
    ],
    [navigationRef]
  );

  const InformationSetting: IAssetInformationType[] = useMemo(
    () =>
      selectedAccount.type === ACCOUNT_TYPE.KIS
        ? {
            ...AssetInformationSettingData,
            AssetInformationSetting_CashStatement,
          }
        : {
            ...AssetInformationSettingData,
          },
    [selectedAccount.type, AssetInformationSettingData]
  );

  return (
    <View style={styles.container}>
      <HeaderScreen leftButtonIcon={true} goBackAction={navigateBack} headerTitle={'Asset Management'} />
      <FlatList showsVerticalScrollIndicator={false} data={Object.values(InformationSetting)} renderItem={renderItem} />
    </View>
  );
};

export default memo(AssetInformationSetting);
