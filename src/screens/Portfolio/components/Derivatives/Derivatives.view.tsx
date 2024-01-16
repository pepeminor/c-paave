import { View, Text, TouchableOpacity } from 'react-native';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import useStyles from './styles';
import globalStyles, { scaleSize } from 'styles';
import DerivativeList from 'components/DerivativeList';
import LoginRequired from 'components/LoginRequired';
import ArrowRight from 'assets/icon/ArrowRight.svg';
import { IProps } from './Derivatives.type';
import { useDerivativesLogic } from './Derivatives.logic';

const Derivatives = (props: IProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const { handlers } = useDerivativesLogic(props);

  return (
    <View>
      <View style={[globalStyles.flexDirectionRow, styles.stockInfoTitleContainer]}>
        <View style={[globalStyles.container, globalStyles.justifyCenter]}>
          <Text allowFontScaling={false} style={styles.investmentText}>
            {t('Investment')}
          </Text>
        </View>
        <View style={[globalStyles.container, globalStyles.alignEnd, globalStyles.justifyCenter]}>
          <TouchableOpacity
            style={[globalStyles.flexDirectionRow, globalStyles.centered]}
            onPress={handlers.goToPortfolioInvestment}
          >
            <Text allowFontScaling={false} style={styles.reportText}>
              {t('View Detail')}
            </Text>
            <ArrowRight width={scaleSize(12)} height={scaleSize(12)} />
          </TouchableOpacity>
        </View>
      </View>
      <DerivativeList noFlatList={true} />
      <LoginRequired top={scaleSize(50)} />
    </View>
  );
};

export default memo(Derivatives);
