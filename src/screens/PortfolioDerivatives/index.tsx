import React, { memo, useEffect, useRef } from 'react';
import { View } from 'react-native';
import globalStyles from 'styles';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../reduxs/global-reducers/index';
import { ReducerStatus } from 'interfaces/reducer';
import { useIsFocused } from '@react-navigation/native';
import { kisGetDerAssetInformation } from 'reduxs/global-actions/KisServicesDer';
import { getDerivativePortfolio } from 'reduxs/global-actions/Derivative';
import DerivativeInfo from './DerivativeInfo';

const PortfolioDerivatives = () => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const isFirstFetch = useRef<boolean>(true);

  const selectedAccount = useSelector((state: IState) => state.selectedAccount);
  const accountNo = selectedAccount.selectedSubAccount?.accountNumber;

  const derivativePortfolio = useSelector((state: IState) => state.derivativePortfolio);

  const onRefresh = React.useCallback(() => {
    dispatch(kisGetDerAssetInformation({ accountNo: accountNo as string }));
    dispatch(getDerivativePortfolio({ accountNo: accountNo as string }));
  }, [accountNo]);

  useEffect(() => {
    if (
      isFirstFetch.current ||
      derivativePortfolio.status !== ReducerStatus.SUCCESS ||
      derivativePortfolio.data == null
    ) {
      isFirstFetch.current = false;
      onRefresh();
    }
  }, [isFocused]);

  return (
    <View style={globalStyles.container}>
      <DerivativeInfo
        isRealizedPortfolio={false}
        data={derivativePortfolio.data ? derivativePortfolio.data.openPositionList : undefined}
      />
    </View>
  );
};

export default memo(PortfolioDerivatives);
