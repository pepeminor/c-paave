import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import useStyles from './styles';
import { scaleSize } from 'styles';
import { useTranslation } from 'react-i18next';
import ArrowRight from 'assets/icon/ArrowRight.svg';
import { navigate } from 'utils/rootNavigation';
import StockList from 'components/StockList';
import { useAppSelector } from 'hooks';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import LoginRequired from 'components/LoginRequired';
import { ACCOUNT_TYPE, SYSTEM_TYPE } from 'global';
import { showNonLoginModal } from 'reduxs/global-actions/NonLogin';
import { useDispatch } from 'react-redux';
import withMemo from 'HOC/withMemo';
import { InvestmentSelectors } from 'reduxs';
import DerivativeList from 'components/DerivativeList';
import { kisGetDerAssetInformation } from 'reduxs/global-actions';
import { getDerivativePortfolio } from 'reduxs/global-actions/Derivative';

const Investment = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { styles } = useStyles();

  const selectedAccountType = useAppSelector(state => state.selectedAccount.type);
  const accountNo = useAppSelector(state =>
    state.selectedAccount.selectedSubAccount != null ? state.selectedAccount.selectedSubAccount.accountNumber : ''
  );
  const profitLossItems = useAppSelector(InvestmentSelectors.selectedProfitLossItems(false));
  const profitLossStockCodes = useAppSelector(InvestmentSelectors.selectedProfitLossStockCodes(false));

  const isSubD = useAppSelector(
    state =>
      state.selectedAccount.type === ACCOUNT_TYPE.KIS &&
      state.selectedAccount.selectedSubAccount?.accountSubs[0].type === SYSTEM_TYPE.DERIVATIVES
  );

  const onRefresh = React.useCallback(() => {
    if (!isSubD) return;
    dispatch(kisGetDerAssetInformation({ accountNo: accountNo as string }));
    dispatch(getDerivativePortfolio({ accountNo: accountNo as string }));
  }, [accountNo, isSubD, dispatch]);

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  const goToPortfolioInvestment = () => {
    if (selectedAccountType === ACCOUNT_TYPE.DEMO) {
      dispatch(showNonLoginModal());
      return;
    }
    navigate({ key: ScreenNames.PortfolioInvestment, params: { portfolioFlow: true } });
  };

  const goToProfitLossReport = () => {
    navigate({ key: ScreenNames.ProfitlossReport });
  };

  return (
    <View>
      <View style={styles.marginBottom8}>
        <View style={styles.stockInfoTitleContainer}>
          <Text allowFontScaling={false} style={styles.investmentText}>
            {t('Investment')}
          </Text>
          <TouchableOpacity style={styles.containerSeeMore} onPress={goToPortfolioInvestment}>
            <Text allowFontScaling={false} style={styles.reportText}>
              {t('View Detail')}
            </Text>
            <ArrowRight width={scaleSize(12)} height={scaleSize(12)} />
          </TouchableOpacity>
        </View>
        {selectedAccountType === ACCOUNT_TYPE.DEMO ? (
          <View style={styles.heightTableLoginRequired}>
            <LoginRequired />
          </View>
        ) : (
          <View>
            {isSubD ? (
              <DerivativeList noFlatList={true} />
            ) : (
              <StockList
                scrollEnabled={false}
                isOtherUser={false}
                listItems={profitLossItems}
                listCodes={profitLossStockCodes}
              />
            )}
          </View>
        )}
      </View>
      <TouchableOpacity onPress={goToProfitLossReport} style={styles.executeFormButton}>
        <Text allowFontScaling={false} style={styles.executeFormButtonText}>
          {isSubD ? t('Position Statement') : t('Daily P & L')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default withMemo(Investment);
