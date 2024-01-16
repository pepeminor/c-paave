import React, { memo, useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import RowItem from 'components/RowItem';
import useStyles from './styles';
import HeaderScreen from 'components/HeaderScreen';
import { useDispatch } from 'react-redux';
import { ReducerStatus } from 'interfaces/reducer';
import { formatNumber } from 'utils';
import {
  ASSETS_INFORMATION_ACCOUNT_KIS,
  ASSETS_INFORMATION_ACCOUNT_KIS_D,
  ASSETS_INFORMATION_ACCOUNT_KIS_M,
  ASSETS_INFORMATION_TITLE,
} from 'constants/enum';
import RowData from 'components/RowData';
import { ACCOUNT_TYPE, SUB_ACCOUNT_TYPE } from 'global';
import { onEnterAssetInfoScreen } from './action';
import { useAppSelector } from 'hooks/useAppSelector';
import globalStyles from 'styles';
import { useTranslation } from 'react-i18next';

const AssetInformation = (props: StackScreenProps<'AssetInformation'>) => {
  // store data
  const profitLoss = useAppSelector(state => state.profitLoss);
  const selectedAccount = useAppSelector(state => state.selectedAccount);
  const getAssetInfoFromPortfolio = useAppSelector(state => state.cashAndStockBalance);
  const getAccountBalance = useAppSelector(state => state.accountBalance);
  const kisDerAssetInformationData = useAppSelector(state => state.kisDerAssetInformationData);

  // state
  const [isSummaryExpand, setIsSummaryExpand] = useState<boolean>(true);
  const [isSummaryDExpand, setIsSummaryDExpand] = useState<boolean>(true);
  const [isCashExpand, setIsCashExpand] = useState<boolean>(true);
  const [isMarginExpand, setIsMarginExpand] = useState<boolean>(true);
  const [isAssessmentExpand, setIsAssessmentExpand] = useState<boolean>(true);
  const [isInformationExpand, setIsInformationExpand] = useState<boolean>(true);

  const dispatch = useDispatch();
  const { styles } = useStyles();
  const { t } = useTranslation();

  // find sub account X, M and D
  const subAccountX =
    selectedAccount.selectedSubAccount != null &&
    selectedAccount.selectedSubAccount.accountNumber.includes(SUB_ACCOUNT_TYPE.SUB_ACCOUNT_X);
  const subAccountM =
    selectedAccount.selectedSubAccount != null &&
    selectedAccount.selectedSubAccount.accountNumber.includes(SUB_ACCOUNT_TYPE.SUB_ACCOUNT_M);
  const subAccountD =
    selectedAccount.selectedSubAccount != null &&
    selectedAccount.selectedSubAccount.accountNumber.includes(SUB_ACCOUNT_TYPE.SUB_ACCOUNT_D);

  useEffect(() => {
    dispatch(
      onEnterAssetInfoScreen({
        selectedAccount: selectedAccount,
      })
    );
  }, [selectedAccount]);

  const expandSummary = () => {
    setIsSummaryExpand(pre => !pre);
  };

  const expandSummaryD = () => {
    setIsSummaryDExpand(pre => !pre);
  };

  const expandCash = () => {
    setIsCashExpand(pre => !pre);
  };

  const expandMargin = () => {
    setIsMarginExpand(pre => !pre);
  };

  const expandAssessment = () => {
    setIsAssessmentExpand(pre => !pre);
  };

  const expandInformation = () => {
    setIsInformationExpand(pre => !pre);
  };

  // Assets Information account Virtual
  const renderContentVirtual = () => {
    return (
      profitLoss.data != null &&
      profitLoss.status === ReducerStatus.SUCCESS && (
        <>
          <RowItem
            title={ASSETS_INFORMATION_TITLE.NET_ASSET_VALUE}
            value={`${formatNumber(profitLoss.data.netAsset, 2)}`}
            valueStyle={styles.rowDataNumber}
            titleStyle={styles.rowDataText}
            containerStyle={styles.rowData}
          />
          <RowItem
            title={ASSETS_INFORMATION_TITLE.NET_ASSET_RETURN}
            value={`${formatNumber(profitLoss.data.netAssetReturn, 2, undefined, undefined)}%`}
            valueStyle={styles.rowDataNumber}
            titleStyle={styles.rowDataText}
            containerStyle={styles.rowData}
          />
          <RowItem
            title={ASSETS_INFORMATION_TITLE.STOCK_VALUE}
            value={formatNumber(profitLoss.data.stockBalance, 2)}
            valueStyle={styles.rowDataNumber}
            titleStyle={styles.rowDataText}
            containerStyle={styles.rowData}
          />
          <RowItem
            title={ASSETS_INFORMATION_TITLE.CASH_BALANCE}
            value={formatNumber(profitLoss.data.cashBalance, 2)}
            valueStyle={styles.rowDataNumber}
            titleStyle={styles.rowDataText}
            containerStyle={styles.rowData}
          />
          <RowItem
            title={ASSETS_INFORMATION_TITLE.AWAITING_CASH}
            value={formatNumber(profitLoss.data.totalAwaitCash, 2)}
            valueStyle={styles.rowDataNumber}
            titleStyle={styles.rowDataText}
            containerStyle={styles.rowData}
          />
          <RowItem
            title={ASSETS_INFORMATION_TITLE.PURCHASING_POWER}
            value={formatNumber(profitLoss.data.buyingPower, 2)}
            valueStyle={styles.rowDataNumber}
            titleStyle={styles.rowDataText}
            containerStyle={styles.rowData}
          />
          {/* hide Margin info (Avail Advance, Awaiting Match, Total Debt, Margin Rate) at iss 1813
          <RowItem
            title={ASSETS_INFORMATION_TITLE.AVAILABLE_ADVANCE}
            value={0}
            valueStyle={styles.rowDataNumber}
            titleStyle={styles.rowDataText}
            containerStyle={styles.rowData}
          />
          <RowItem
            title={ASSETS_INFORMATION_TITLE.AWAITING_MATCH}
            value={0}
            valueStyle={styles.rowDataNumber}
            titleStyle={styles.rowDataText}
            containerStyle={styles.rowData}
          />
          <RowItem
            title={ASSETS_INFORMATION_TITLE.TOTAL_DEBT}
            value={0}
            valueStyle={styles.rowDataNumber}
            titleStyle={styles.rowDataText}
            containerStyle={styles.rowData}
          />
          <RowItem
            title={ASSETS_INFORMATION_TITLE.MARGIN_RATE}
            value={0}
            valueStyle={styles.rowDataNumber}
            titleStyle={styles.rowDataText}
            containerStyle={styles.rowData}
          /> */}
        </>
      )
    );
  };

  // Assets Information account KIS X
  const renderContentKISX = () => {
    return (
      <>
        <RowData
          title="Account Summary"
          titleStyle={isSummaryExpand ? styles.titleStyleHighlight : styles.titleStyle}
          containerStyle={isSummaryExpand ? styles.titleContainerExpand : styles.titleContainer}
          isDown={isSummaryExpand}
          navigate={expandSummary}
        />
        {isSummaryExpand && (
          <>
            <RowItem
              title={ASSETS_INFORMATION_ACCOUNT_KIS.TOTAL_ASSET}
              value={
                getAssetInfoFromPortfolio.data != null
                  ? formatNumber(getAssetInfoFromPortfolio.data.accountSummary.totalAsset, 2)
                  : '-'
              }
              valueStyle={styles.rowDataNumber}
              titleStyle={styles.rowDataText}
              containerStyle={styles.rowData1}
            />
            <RowItem
              title={ASSETS_INFORMATION_ACCOUNT_KIS.TOTAL_STOCK_MARKET_VALUE}
              value={
                getAssetInfoFromPortfolio.data != null
                  ? formatNumber(getAssetInfoFromPortfolio.data.accountSummary.totalStockMarketValue, 2)
                  : '-'
              }
              valueStyle={styles.rowDataNumber}
              titleStyle={styles.rowDataText}
              containerStyle={styles.rowData}
            />
            <RowItem
              title={ASSETS_INFORMATION_ACCOUNT_KIS.NET_ASSET_VALUE}
              value={
                getAssetInfoFromPortfolio.data != null
                  ? formatNumber(getAssetInfoFromPortfolio.data.accountSummary.netAssetValue, 2)
                  : '-'
              }
              valueStyle={styles.rowDataNumber}
              titleStyle={styles.rowDataText}
              containerStyle={styles.rowData}
            />
            <RowItem
              title={ASSETS_INFORMATION_ACCOUNT_KIS.PURCHARSING_POWER}
              value={
                getAssetInfoFromPortfolio.data != null
                  ? formatNumber(getAssetInfoFromPortfolio.data.buyingPower.purchasingPower, 2)
                  : '-'
              }
              valueStyle={styles.rowDataNumber}
              titleStyle={styles.rowDataText}
              containerStyle={styles.rowDataNoBorder}
            />
          </>
        )}
        <View style={styles.border} />
        <RowData
          title="Cash Information"
          titleStyle={isCashExpand ? styles.titleStyleHighlight : styles.titleStyle}
          containerStyle={isCashExpand ? styles.titleContainerExpand : styles.titleContainer}
          isDown={isCashExpand}
          navigate={expandCash}
        />
        {isCashExpand && (
          <>
            <RowItem
              title={ASSETS_INFORMATION_ACCOUNT_KIS.CASH_WITHDRAWAL}
              value={
                getAssetInfoFromPortfolio.data != null
                  ? formatNumber(getAssetInfoFromPortfolio.data.cashInformation.cashWithdrawal, 2)
                  : '-'
              }
              valueStyle={styles.rowDataNumber}
              titleStyle={styles.rowDataText}
              containerStyle={styles.rowData1}
            />
            <RowItem
              title={ASSETS_INFORMATION_ACCOUNT_KIS.AVAIABLE_CASH_IN_ADVANCE}
              value={
                getAssetInfoFromPortfolio.data != null
                  ? formatNumber(getAssetInfoFromPortfolio.data.cashInformation.availableAdvancedCash, 2)
                  : '-'
              }
              valueStyle={styles.rowDataNumber}
              titleStyle={styles.rowDataText}
              containerStyle={styles.rowData}
            />
            <RowItem
              title={ASSETS_INFORMATION_ACCOUNT_KIS.PENDING_WITHDRAWAL_APPROVAL}
              value={
                getAssetInfoFromPortfolio.data != null
                  ? formatNumber(getAssetInfoFromPortfolio.data.cashInformation.pendingApprovalForWithdrawal, 2)
                  : '-'
              }
              valueStyle={styles.rowDataNumber}
              titleStyle={styles.rowDataText}
              containerStyle={styles.rowData}
            />
            <RowItem
              title={ASSETS_INFORMATION_ACCOUNT_KIS.HOLD_FOR_PENDING_PURCHASE}
              value={
                getAssetInfoFromPortfolio.data != null
                  ? formatNumber(getAssetInfoFromPortfolio.data.cashInformation.holdForPendingPurchaseT0, 2)
                  : '-'
              }
              valueStyle={styles.rowDataNumber}
              titleStyle={styles.rowDataText}
              containerStyle={styles.rowData}
            />
            <RowItem
              title={ASSETS_INFORMATION_ACCOUNT_KIS.HOLD_FOR_EXECUTED_PURCHASE}
              value={
                getAssetInfoFromPortfolio.data != null
                  ? formatNumber(getAssetInfoFromPortfolio.data.cashInformation.holdForExecutedPurchaseT0, 2)
                  : '-'
              }
              valueStyle={styles.rowDataNumber}
              titleStyle={styles.rowDataText}
              containerStyle={styles.rowData}
            />
            <RowItem
              title={ASSETS_INFORMATION_ACCOUNT_KIS.SOLD_T0}
              value={
                getAssetInfoFromPortfolio.data != null
                  ? formatNumber(getAssetInfoFromPortfolio.data.cashInformation.soldT0, 2)
                  : '-'
              }
              valueStyle={styles.rowDataNumber}
              titleStyle={styles.rowDataText}
              containerStyle={styles.rowData}
            />
            <RowItem
              title={ASSETS_INFORMATION_ACCOUNT_KIS.SOLD_T1}
              value={
                getAssetInfoFromPortfolio.data != null
                  ? formatNumber(getAssetInfoFromPortfolio.data.cashInformation.soldT1, 2)
                  : '-'
              }
              valueStyle={styles.rowDataNumber}
              titleStyle={styles.rowDataText}
              containerStyle={styles.rowData}
            />
          </>
        )}
      </>
    );
  };

  // Assets Information account KIS M
  const renderContentKISM = () => {
    return profitLoss.data != null && profitLoss.status === ReducerStatus.SUCCESS ? (
      <>
        <RowData
          title="Margin"
          titleStyle={isMarginExpand ? styles.titleStyleHighlight : styles.titleStyle}
          containerStyle={isMarginExpand ? styles.titleContainerExpand : styles.titleContainer}
          isDown={isMarginExpand}
          navigate={expandMargin}
        />
        {isMarginExpand && (
          <>
            <RowItem
              title={ASSETS_INFORMATION_ACCOUNT_KIS_M.OUTSTANDING_LOAN}
              value={getAssetInfoFromPortfolio.data != null ? getAssetInfoFromPortfolio.data.margin.fixedLoan : '-'}
              valueStyle={styles.rowDataNumber}
              titleStyle={styles.rowDataText}
              containerStyle={styles.rowData1}
            />
            <RowItem
              title={ASSETS_INFORMATION_ACCOUNT_KIS_M.DAY_LOAN}
              value={getAssetInfoFromPortfolio.data != null ? getAssetInfoFromPortfolio.data.margin.dayLoan : '-'}
              valueStyle={styles.rowDataNumber}
              titleStyle={styles.rowDataText}
              containerStyle={styles.rowData}
            />
            <RowItem
              title={ASSETS_INFORMATION_ACCOUNT_KIS_M.ACCRURED_DEBIT_INTEREST}
              value={
                getAssetInfoFromPortfolio.data != null
                  ? getAssetInfoFromPortfolio.data.margin.accuredDebitInterest
                  : '-'
              }
              valueStyle={styles.rowDataNumber}
              titleStyle={styles.rowDataText}
              containerStyle={styles.rowData}
            />
            <RowItem
              title={ASSETS_INFORMATION_ACCOUNT_KIS_M.STOCK_MAIN}
              value={
                getAssetInfoFromPortfolio.data != null
                  ? formatNumber(getAssetInfoFromPortfolio.data.margin.stockMain, 2)
                  : '-'
              }
              valueStyle={styles.rowDataNumber}
              titleStyle={styles.rowDataText}
              containerStyle={styles.rowData}
            />
            <RowItem
              title={ASSETS_INFORMATION_ACCOUNT_KIS_M.EQUITY}
              value={
                getAssetInfoFromPortfolio.data != null
                  ? formatNumber(getAssetInfoFromPortfolio.data.margin.equity, 2)
                  : '-'
              }
              valueStyle={styles.rowDataNumber}
              titleStyle={styles.rowDataText}
              containerStyle={styles.rowData}
            />
            <RowItem
              title={ASSETS_INFORMATION_ACCOUNT_KIS_M.MARGIN_RATIO}
              value={
                getAssetInfoFromPortfolio.data != null
                  ? `${formatNumber(getAssetInfoFromPortfolio.data.margin.marginRatio, 2, undefined, true)}%`
                  : '-'
              }
              valueStyle={styles.rowDataNumber}
              titleStyle={styles.rowDataText}
              containerStyle={styles.rowData}
            />
            <RowItem
              title={ASSETS_INFORMATION_ACCOUNT_KIS_M.MAINTENANCE_RATIO}
              value={
                getAssetInfoFromPortfolio.data != null
                  ? `${formatNumber(getAssetInfoFromPortfolio.data.margin.maintenanceRatio, 2, undefined, true)}%`
                  : '-'
              }
              valueStyle={styles.rowDataNumber}
              titleStyle={styles.rowDataText}
              containerStyle={styles.rowData}
            />
            <RowItem
              title={ASSETS_INFORMATION_ACCOUNT_KIS_M.MARGIN_CALL_BY_STOCK_MAIN_ATM}
              value={
                getAccountBalance.data != null && getAccountBalance.data.marginCallByStockMainAmount != null
                  ? getAccountBalance.data.marginCallByStockMainAmount
                  : '-'
              }
              valueStyle={styles.rowDataNumber}
              titleStyle={styles.rowDataText}
              containerStyle={styles.rowData}
            />
            <RowItem
              title={ASSETS_INFORMATION_ACCOUNT_KIS_M.MARGIN_CALL_BY_CASH}
              value={
                getAccountBalance.data != null && getAccountBalance.data.marginCallByCash != null
                  ? getAccountBalance.data.marginCallByCash
                  : '-'
              }
              valueStyle={styles.rowDataNumber}
              titleStyle={styles.rowDataText}
              containerStyle={styles.rowData}
            />
          </>
        )}
      </>
    ) : (
      <View />
    );
  };

  // Assets Information account KIS D
  const renderContentKISD = () => {
    const accountSummary =
      kisDerAssetInformationData.data != null ? kisDerAssetInformationData.data.accountSummary : null;
    const portfolioAssessment =
      kisDerAssetInformationData.data != null ? kisDerAssetInformationData.data.portfolioAssessment : null;
    const cashInformation =
      kisDerAssetInformationData.data != null ? kisDerAssetInformationData.data.cashInformation : null;

    // format numbers separated by /
    const formatNumberSeparated = (number: string) => {
      const parts = number.split('/');
      const formattedFirstPart = parseInt(parts[0]).toLocaleString('en-US');
      const formattedFirstPart2 = parseInt(parts[1]).toLocaleString('en-US');
      const formattedNumber = `${formattedFirstPart}/${formattedFirstPart2}`;
      return formattedNumber;
    };

    return kisDerAssetInformationData.data != null && kisDerAssetInformationData.status === ReducerStatus.SUCCESS ? (
      <>
        <RowData
          title="Account Summary"
          titleStyle={isSummaryDExpand ? styles.titleStyleHighlight : styles.titleStyle}
          containerStyle={isSummaryDExpand ? styles.titleContainerExpand : styles.titleContainer}
          isDown={isSummaryDExpand}
          navigate={expandSummaryD}
        />
        {isSummaryDExpand && (
          <>
            <RowItem
              title={ASSETS_INFORMATION_ACCOUNT_KIS_D.NET_ASSET_VALUE}
              value={
                accountSummary != null && accountSummary.totalEquity != null
                  ? `${formatNumber(accountSummary.totalEquity, 2)}`
                  : '-'
              }
              valueStyle={styles.rowDataNumber}
              titleStyle={styles.rowDataText}
              containerStyle={styles.rowData1}
            />
            <RowItem
              title={ASSETS_INFORMATION_ACCOUNT_KIS_D.ACCOUNT_BALANCE}
              value={
                accountSummary != null && accountSummary.accountBalance != null
                  ? `${formatNumber(accountSummary.accountBalance, 2)}`
                  : '-'
              }
              valueStyle={styles.rowDataNumber}
              titleStyle={styles.rowDataText}
              containerStyle={styles.rowData}
            />
            <RowItem
              title={ASSETS_INFORMATION_ACCOUNT_KIS_D.COMMISSION}
              value={
                accountSummary != null && accountSummary.commission_tax != null
                  ? formatNumberSeparated(String(accountSummary.commission_tax))
                  : '-'
              }
              valueStyle={styles.rowDataNumber}
              titleStyle={styles.rowDataText}
              containerStyle={styles.rowData}
            />
            <RowItem
              title={ASSETS_INFORMATION_ACCOUNT_KIS_D.TAX}
              value={
                accountSummary != null && accountSummary.commission_tax != null
                  ? formatNumberSeparated(String(accountSummary.commission_tax))
                  : '-'
              }
              valueStyle={styles.rowDataNumber}
              titleStyle={styles.rowDataText}
              containerStyle={styles.rowData}
            />
            <RowItem
              title={ASSETS_INFORMATION_ACCOUNT_KIS_D.TOTAL_LOANS}
              value={
                accountSummary != null && accountSummary.extLoan != null
                  ? `${formatNumber(accountSummary.extLoan, 2)}`
                  : '-'
              }
              valueStyle={styles.rowDataNumber}
              titleStyle={styles.rowDataText}
              containerStyle={styles.rowData}
            />
            <RowItem
              title={ASSETS_INFORMATION_ACCOUNT_KIS_D.DELIVERY_AMOUNT}
              value={
                accountSummary != null && accountSummary.deliveryAmount != null
                  ? `${formatNumber(accountSummary.deliveryAmount, 2)}`
                  : '-'
              }
              valueStyle={styles.rowDataNumber}
              titleStyle={styles.rowDataText}
              containerStyle={styles.rowData}
            />
            <RowItem
              title={ASSETS_INFORMATION_ACCOUNT_KIS_D.INTEREST}
              value={
                accountSummary != null && accountSummary.interest != null
                  ? `${formatNumber(accountSummary.interest, 2)}`
                  : '-'
              }
              valueStyle={styles.rowDataNumber}
              titleStyle={styles.rowDataText}
              containerStyle={styles.rowData}
            />
            <RowItem
              title={ASSETS_INFORMATION_ACCOUNT_KIS_D.FLOATING_PL}
              value={
                accountSummary != null && accountSummary.floatingPL_tradingPL != null
                  ? `${formatNumber(accountSummary.floatingPL_tradingPL, 2)}`
                  : '-'
              }
              valueStyle={styles.rowDataNumber}
              titleStyle={styles.rowDataText}
              containerStyle={styles.rowData}
            />
            <RowItem
              title={ASSETS_INFORMATION_ACCOUNT_KIS_D.TOTAL_PL}
              value={
                accountSummary != null && accountSummary.floatingPL_tradingPL != null
                  ? `${formatNumber(accountSummary.floatingPL_tradingPL, 2)}`
                  : '-'
              }
              valueStyle={styles.rowDataNumber}
              titleStyle={styles.rowDataText}
              containerStyle={styles.rowData}
            />
            <RowItem
              title={ASSETS_INFORMATION_ACCOUNT_KIS_D.MIN_RESERVE}
              value={
                accountSummary != null && accountSummary.minReserve != null
                  ? `${formatNumber(accountSummary.minReserve, 2)}`
                  : '-'
              }
              valueStyle={styles.rowDataNumber}
              titleStyle={styles.rowDataText}
              containerStyle={styles.rowData}
            />
            <RowItem
              title={ASSETS_INFORMATION_ACCOUNT_KIS_D.MARGINABLE}
              value={
                accountSummary != null && accountSummary.marginable != null
                  ? `${formatNumber(accountSummary.marginable, 2)}`
                  : '-'
              }
              valueStyle={styles.rowDataNumber}
              titleStyle={styles.rowDataText}
              containerStyle={styles.rowData}
            />
            <RowItem
              title={ASSETS_INFORMATION_ACCOUNT_KIS_D.RC_CALL}
              value={
                accountSummary != null && accountSummary.rcCall != null
                  ? `${formatNumber(accountSummary.rcCall, 2)}`
                  : '-'
              }
              valueStyle={styles.rowDataNumber}
              titleStyle={styles.rowDataText}
              containerStyle={styles.rowData}
            />
            <RowItem
              title={ASSETS_INFORMATION_ACCOUNT_KIS_D.CASH}
              value={
                accountSummary != null && accountSummary.cash_nonCash != null
                  ? formatNumberSeparated(String(accountSummary.cash_nonCash))
                  : '-'
              }
              valueStyle={styles.rowDataNumber}
              titleStyle={styles.rowDataText}
              containerStyle={styles.rowData}
            />
            <RowItem
              title={ASSETS_INFORMATION_ACCOUNT_KIS_D.NON_CASH}
              value={
                accountSummary != null && accountSummary.cash_nonCash != null
                  ? formatNumberSeparated(String(accountSummary.cash_nonCash))
                  : '-'
              }
              valueStyle={styles.rowDataNumber}
              titleStyle={styles.rowDataText}
              containerStyle={styles.rowDataNoBorder}
            />
          </>
        )}
        <View style={styles.border} />
        <RowData
          title="Portfolio Assessment"
          titleStyle={isAssessmentExpand ? styles.titleStyleHighlight : styles.titleStyle}
          containerStyle={isAssessmentExpand ? styles.titleContainerExpand : styles.titleContainer}
          isDown={isAssessmentExpand}
          navigate={expandAssessment}
        />
        {isAssessmentExpand && (
          <>
            <View style={globalStyles.flexDirectionRow}>
              <View style={[styles.tableContent1, styles.borderTop]} />
              <View style={[styles.tableContent2, globalStyles.centered, styles.borderBottom]}>
                <Text style={styles.tableText}>{t('Internal')}</Text>
              </View>
              <View style={[styles.tableContent2, globalStyles.centered, styles.borderBottom]}>
                <Text style={styles.tableText}>{t('Exchange')}</Text>
              </View>
            </View>
            <View style={globalStyles.flexDirectionRow}>
              <View style={[styles.tableContent1, globalStyles.justifyCenter]}>
                <Text style={styles.rowDataText}>{t(ASSETS_INFORMATION_ACCOUNT_KIS_D.INITIAL_MARGIN)}</Text>
              </View>
              <View style={[globalStyles.centered, styles.tableContent3]}>
                <Text style={styles.rowDataNumber}>
                  {portfolioAssessment != null &&
                  portfolioAssessment.internal != null &&
                  portfolioAssessment.internal.initialMargin != null
                    ? `${formatNumber(portfolioAssessment.internal.initialMargin, 2)}`
                    : '-'}
                </Text>
              </View>
            </View>
            <View style={globalStyles.flexDirectionRow}>
              <View style={[styles.tableContent1, globalStyles.justifyCenter]}>
                <Text style={styles.rowDataText}>{t(ASSETS_INFORMATION_ACCOUNT_KIS_D.SPREAD_MARGIN)}</Text>
              </View>
              <View style={[globalStyles.centered, styles.tableContent2]}>
                <Text style={styles.rowDataNumber}>
                  {portfolioAssessment != null &&
                  portfolioAssessment.internal != null &&
                  portfolioAssessment.internal.spreadMargin != null
                    ? `${formatNumber(portfolioAssessment.internal.spreadMargin, 2)}`
                    : '-'}
                </Text>
              </View>
              <View style={[globalStyles.centered, styles.tableContent2]}>
                <Text style={styles.rowDataNumber}>
                  {portfolioAssessment != null &&
                  portfolioAssessment.exchange != null &&
                  portfolioAssessment.exchange.spreadMargin != null
                    ? `${formatNumber(portfolioAssessment.exchange.spreadMargin, 2)}`
                    : '-'}
                </Text>
              </View>
            </View>
            <View style={globalStyles.flexDirectionRow}>
              <View style={[styles.tableContent1, globalStyles.justifyCenter]}>
                <Text style={styles.rowDataText}>{t(ASSETS_INFORMATION_ACCOUNT_KIS_D.DELIVERY_MARGIN)}</Text>
              </View>
              <View style={[globalStyles.centered, styles.tableContent2]}>
                <Text style={styles.rowDataNumber}>
                  {portfolioAssessment != null &&
                  portfolioAssessment.internal != null &&
                  portfolioAssessment.internal.deliveryMargin != null
                    ? `${formatNumber(portfolioAssessment.internal.deliveryMargin, 2)}`
                    : '-'}
                </Text>
              </View>
              <View style={[globalStyles.centered, styles.tableContent2]}>
                <Text style={styles.rowDataNumber}>
                  {portfolioAssessment != null &&
                  portfolioAssessment.exchange != null &&
                  portfolioAssessment.exchange.deliveryMargin != null
                    ? `${formatNumber(portfolioAssessment.exchange.deliveryMargin, 2)}`
                    : '-'}
                </Text>
              </View>
            </View>
            <View style={globalStyles.flexDirectionRow}>
              <View style={[styles.tableContent1, globalStyles.justifyCenter]}>
                <Text style={styles.rowDataText}>{t(ASSETS_INFORMATION_ACCOUNT_KIS_D.MARGIN_REQ)}</Text>
              </View>
              <View style={[globalStyles.centered, styles.tableContent2]}>
                <Text style={styles.rowDataNumber}>
                  {portfolioAssessment != null &&
                  portfolioAssessment.internal != null &&
                  portfolioAssessment.internal.marginReq != null
                    ? `${formatNumber(portfolioAssessment.internal.marginReq, 2)}`
                    : '-'}
                </Text>
              </View>
              <View style={[globalStyles.centered, styles.tableContent2]}>
                <Text style={styles.rowDataNumber}>
                  {portfolioAssessment != null &&
                  portfolioAssessment.exchange != null &&
                  portfolioAssessment.exchange.marginReq != null
                    ? `${formatNumber(portfolioAssessment.exchange.marginReq, 2)}`
                    : '-'}
                </Text>
              </View>
            </View>
            <View style={globalStyles.flexDirectionRow}>
              <View style={[styles.tableContent1, globalStyles.justifyCenter]}>
                <Text style={styles.rowDataText}>{t(ASSETS_INFORMATION_ACCOUNT_KIS_D.ACCOUNT_RATIO)}</Text>
              </View>
              <View style={[globalStyles.centered, styles.tableContent2]}>
                <Text style={styles.rowDataNumber}>
                  {portfolioAssessment != null &&
                  portfolioAssessment.internal != null &&
                  portfolioAssessment.internal.accountRatio != null
                    ? `${formatNumber(portfolioAssessment.internal.accountRatio, 2)}`
                    : '-'}
                </Text>
              </View>
              <View style={[globalStyles.centered, styles.tableContent2]}>
                <Text style={styles.rowDataNumber}>
                  {portfolioAssessment != null &&
                  portfolioAssessment.exchange != null &&
                  portfolioAssessment.exchange.accountRatio != null
                    ? `${formatNumber(portfolioAssessment.exchange.accountRatio, 2)}`
                    : '-'}
                </Text>
              </View>
            </View>
            <View style={globalStyles.flexDirectionRow}>
              <View style={[styles.tableContent1, globalStyles.justifyCenter]}>
                <Text style={styles.rowDataText}>{t(ASSETS_INFORMATION_ACCOUNT_KIS_D.WARNING_123)}</Text>
              </View>
              <View style={[globalStyles.centered, styles.tableContent2]}>
                <Text style={styles.rowDataNumber}>
                  {portfolioAssessment != null &&
                  portfolioAssessment.internal != null &&
                  portfolioAssessment.internal.warning123 != null
                    ? portfolioAssessment.internal.warning123
                    : '-'}
                </Text>
              </View>
              <View style={[globalStyles.centered, styles.tableContent2]}>
                <Text style={styles.rowDataNumber}>
                  {portfolioAssessment != null &&
                  portfolioAssessment.exchange != null &&
                  portfolioAssessment.exchange.warning123 != null
                    ? portfolioAssessment.exchange.warning123
                    : '-'}
                </Text>
              </View>
            </View>
            <View style={globalStyles.flexDirectionRow}>
              <View style={[styles.tableContent1, globalStyles.justifyCenter]}>
                <Text style={styles.rowDataText}>{t(ASSETS_INFORMATION_ACCOUNT_KIS_D.MARGIN_CALL)}</Text>
              </View>
              <View style={[globalStyles.centered, styles.tableContent2, styles.borderBottom]}>
                <Text style={styles.rowDataNumber}>
                  {portfolioAssessment != null &&
                  portfolioAssessment.internal != null &&
                  portfolioAssessment.internal.marginCall != null
                    ? `${formatNumber(portfolioAssessment.exchange.marginCall, 2)}`
                    : '-'}
                </Text>
              </View>
              <View style={[globalStyles.centered, styles.tableContent2, styles.borderBottom]}>
                <Text style={styles.rowDataNumber}>
                  {portfolioAssessment != null &&
                  portfolioAssessment.exchange != null &&
                  portfolioAssessment.exchange.marginCall != null
                    ? `${formatNumber(portfolioAssessment.exchange.marginCall, 2)}`
                    : '-'}
                </Text>
              </View>
            </View>
          </>
        )}
        <View style={styles.border} />
        <RowData
          title="Cash Information"
          titleStyle={isInformationExpand ? styles.titleStyleHighlight : styles.titleStyle}
          containerStyle={isInformationExpand ? styles.titleContainerExpand : styles.titleContainer}
          isDown={isInformationExpand}
          navigate={expandInformation}
        />
        {isInformationExpand && (
          <>
            <View style={globalStyles.flexDirectionRow}>
              <View style={[styles.tableContent1, styles.borderTop]} />
              <View style={[styles.tableContent2, globalStyles.centered]}>
                <Text style={styles.tableText}>{t('Internal')}</Text>
              </View>
              <View style={[styles.tableContent2, globalStyles.centered]}>
                <Text style={styles.tableText}>{t('Exchange')}</Text>
              </View>
            </View>
            <View style={globalStyles.flexDirectionRow}>
              <View style={[styles.tableContent1, globalStyles.justifyCenter]}>
                <Text style={styles.rowDataText}>{t(ASSETS_INFORMATION_ACCOUNT_KIS_D.CASH)}</Text>
              </View>
              <View style={[globalStyles.centered, styles.tableContent2]}>
                <Text style={styles.rowDataNumber}>
                  {cashInformation != null && cashInformation.internal != null && cashInformation.internal.cash != null
                    ? `${formatNumber(cashInformation.internal.cash, 2)}`
                    : '-'}
                </Text>
              </View>
              <View style={[globalStyles.centered, styles.tableContent2]}>
                <Text style={styles.rowDataNumber}>
                  {cashInformation != null && cashInformation.exchange != null && cashInformation.exchange.cash != null
                    ? `${formatNumber(cashInformation.exchange.cash, 2)}`
                    : '-'}
                </Text>
              </View>
            </View>
            <View style={globalStyles.flexDirectionRow}>
              <View style={[styles.tableContent1, globalStyles.justifyCenter]}>
                <Text style={styles.rowDataText}>{t(ASSETS_INFORMATION_ACCOUNT_KIS_D.TOTAL_VALUE)}</Text>
              </View>
              <View style={[globalStyles.centered, styles.tableContent2]}>
                <Text style={styles.rowDataNumber}>
                  {cashInformation != null &&
                  cashInformation.internal != null &&
                  cashInformation.internal.totalValue != null
                    ? `${formatNumber(cashInformation.internal.totalValue, 2)}`
                    : '-'}
                </Text>
              </View>
              <View style={[globalStyles.centered, styles.tableContent2]}>
                <Text style={styles.rowDataNumber}>
                  {cashInformation != null &&
                  cashInformation.exchange != null &&
                  cashInformation.exchange.totalValue != null
                    ? `${formatNumber(cashInformation.exchange.totalValue, 2)}`
                    : '-'}
                </Text>
              </View>
            </View>
            <View style={globalStyles.flexDirectionRow}>
              <View style={[styles.tableContent1, globalStyles.justifyCenter]}>
                <Text style={styles.rowDataText}>{t(ASSETS_INFORMATION_ACCOUNT_KIS_D.CASH_WITHDRAWABLE)}</Text>
              </View>
              <View style={[globalStyles.centered, styles.tableContent2]}>
                <Text style={styles.rowDataNumber}>
                  {cashInformation != null &&
                  cashInformation.internal != null &&
                  cashInformation.internal.cashWithdrawable != null
                    ? `${formatNumber(cashInformation.internal.cashWithdrawable, 2)}`
                    : '-'}
                </Text>
              </View>
              <View style={[globalStyles.centered, styles.tableContent2]}>
                <Text style={styles.rowDataNumber}>
                  {cashInformation != null &&
                  cashInformation.exchange != null &&
                  cashInformation.exchange.cashWithdrawable != null
                    ? `${formatNumber(cashInformation.exchange.cashWithdrawable, 2)}`
                    : '-'}
                </Text>
              </View>
            </View>
            <View style={globalStyles.flexDirectionRow}>
              <View style={[styles.tableContent1, globalStyles.justifyCenter]}>
                <Text style={styles.rowDataText}>{t(ASSETS_INFORMATION_ACCOUNT_KIS_D.EE)}</Text>
              </View>
              <View style={[globalStyles.centered, styles.tableContent2, styles.borderBottom]}>
                <Text style={styles.rowDataNumber}>
                  {cashInformation != null && cashInformation.internal != null && cashInformation.internal.EE != null
                    ? `${formatNumber(cashInformation.internal.EE, 2)}`
                    : '-'}
                </Text>
              </View>
              <View style={[globalStyles.centered, styles.tableContent2, styles.borderBottom]}>
                <Text style={styles.rowDataNumber}>
                  {cashInformation != null && cashInformation.exchange != null && cashInformation.exchange.EE != null
                    ? `${formatNumber(cashInformation.exchange.EE, 2)}`
                    : '-'}
                </Text>
              </View>
            </View>
          </>
        )}
      </>
    ) : (
      <View />
    );
  };

  return (
    <View style={styles.container}>
      <HeaderScreen
        leftButtonIcon={true}
        goBackAction={props.navigation.goBack}
        headerTitle={'Asset Information'}
        subAccountVisible={true}
      />
      {selectedAccount.type === ACCOUNT_TYPE.VIRTUAL && renderContentVirtual()}
      {selectedAccount.type === ACCOUNT_TYPE.KIS && subAccountX && renderContentKISX()}
      {selectedAccount.type === ACCOUNT_TYPE.KIS && subAccountM && (
        <ScrollView>
          {renderContentKISX()}
          <View style={styles.border} />
          {renderContentKISM()}
        </ScrollView>
      )}
      {selectedAccount.type === ACCOUNT_TYPE.KIS && subAccountD && <ScrollView>{renderContentKISD()}</ScrollView>}
    </View>
  );
};

export default memo(AssetInformation);
