import { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { navigate } from 'utils/rootNavigation';
import { ACCOUNT_TYPE } from 'global';
import { showNonLoginModal } from 'reduxs/global-actions/NonLogin';
import useHandlers from 'hooks/useHandlers';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { IProps } from './Derivatives.type';
import { kisGetDerAssetInformation } from 'reduxs/global-actions/KisServicesDer';
import { getDerivativePortfolio } from 'reduxs/global-actions/Derivative';

const useDerivativesLogic = (props: IProps) => {
  const dispatch = useDispatch();

  const propsRef = useRef({
    ...props,
  });
  propsRef.current = { ...propsRef.current, ...props };

  const accountNo =
    props.selectedAccount.selectedSubAccount != null ? props.selectedAccount.selectedSubAccount.accountNumber : '';

  const initDerivativeData = useCallback(() => {
    if (!accountNo) return;
    dispatch(getDerivativePortfolio({ accountNo: accountNo }));
    dispatch(kisGetDerAssetInformation({ accountNo: accountNo }));
  }, [dispatch, accountNo]);

  const handlers = useHandlers({
    goToPortfolioInvestment: () => {
      if (propsRef.current.selectedAccountType === ACCOUNT_TYPE.DEMO) {
        dispatch(showNonLoginModal());
        return;
      }
      navigate({ key: ScreenNames.PortfolioDerivatives });
    },
  });

  useEffect(() => {
    initDerivativeData();
  }, [initDerivativeData]);

  return {
    handlers,
  };
};

export { useDerivativesLogic };
