import React, { useCallback, useMemo } from 'react';
import { View, Text, ScrollView, FlatList, ListRenderItemInfo } from 'react-native';
import globalStyles from 'styles';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';
import DerivativeList from 'components/DerivativeList';
import { useSelector } from 'react-redux';
import { IState } from '../../reduxs/global-reducers/index';
import { formatNumber } from 'utils/common';
import { IGetDerivativePortfolioItem } from 'interfaces/derivatives';
import withMemo from 'HOC/withMemo';

const keyExtractorGenerator = (_item: unknown, index: number) => `${index}_${index}`;
interface ISchemeHeader {
  title: string;
  info: string | number;
}

const DerivativeInfo = ({
  data,
  isRealizedPortfolio,
}: {
  data: IGetDerivativePortfolioItem[] | undefined;
  isRealizedPortfolio: boolean;
}) => {
  const { t } = useTranslation();
  const { styles } = useStyles();

  const derivativePortfolio = useSelector((state: IState) => state.derivativePortfolio);
  const derivativeCashBalance = useSelector((state: IState) => state.kisDerAssetInformationData);

  const schemeHeaderTitle = useMemo(() => {
    return [
      {
        title: t('Net Asset Value'),
        info: derivativeCashBalance.data ? formatNumber(derivativeCashBalance.data.accountSummary.totalEquity) : 0,
      },
      {
        title: t('Purchasing Power'),
        info: derivativeCashBalance.data
          ? formatNumber(
              Math.min(
                derivativeCashBalance.data.cashInformation.internal.EE,
                derivativeCashBalance.data.cashInformation.exchange.EE
              )
            )
          : 0,
      },
      {
        title: t('Profit Loss'),
        info: derivativePortfolio.data
          ? formatNumber(
              derivativePortfolio.data.openPositionList.reduce((acc: number, curr: IGetDerivativePortfolioItem) => {
                return (acc += curr.floatingPL);
              }, 0)
            )
          : 0,
      },
      {
        title: t('Account Ratio') + ' (%)',
        info: derivativeCashBalance.data
          ? Math.max(
              derivativeCashBalance.data.portfolioAssessment.internal.accountRatio,
              derivativeCashBalance.data.portfolioAssessment.exchange.accountRatio
            )
          : 0,
      },
    ];
  }, [derivativeCashBalance.data, derivativePortfolio.data]);

  const renderItemSchemeHeader = useCallback(({ item }: ListRenderItemInfo<ISchemeHeader>) => {
    return (
      <View style={styles.wrapInfo}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.content}>{item.info}</Text>
      </View>
    );
  }, []);

  return (
    <ScrollView>
      <View style={globalStyles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={schemeHeaderTitle}
          renderItem={renderItemSchemeHeader}
          keyExtractor={keyExtractorGenerator}
        />
        <View style={data && data.length > 0 ? [styles.paddingFlex] : null}>
          <DerivativeList isRealizedPortfolio={isRealizedPortfolio} scrollEnabled={true} />
        </View>
      </View>
    </ScrollView>
  );
};

export default withMemo(DerivativeInfo);
