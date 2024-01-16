import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useCallback, useEffect, useRef } from 'react';
import { CopyTradeConfig, FollowingOption, FollowingType, IProps, OrderType } from './CopyTradeScreen.type';
import { useAppSelector } from 'hooks';
import { FulfilledRequestError, formatNumber, navigationRef } from 'utils';
import { useDispatch } from 'react-redux';
import { IResponse } from 'interfaces/common';
import { GetCopySubscriptionResponse } from 'interfaces/CopyTrade';
import { useTranslation } from 'react-i18next';
import { getCashBalanceAndStockBalanceForKis } from 'reduxs/global-actions';
import { CopyTradeAction } from 'reduxs/CopyTrade';
import { store } from 'screens/App';

const useCopyTradeScreenLogic = (props: IProps) => {
  const { t } = useTranslation();
  const { followingType, followingUsername } = props.route.params;
  const accountMap = useAppSelector(state => {
    const subAccounts = state.selectedAccount.subAccounts ?? [];
    return subAccounts.reduce((accountMap, subAccount) => {
      if (subAccount.accountNumber.includes('D')) return accountMap;
      accountMap[subAccount.accountNumber] = subAccount.accountNumber;
      return accountMap;
    }, {} as Record<string, string>);
  });
  const selectedAccountNumber = useAppSelector(state => state.selectedAccount.selectedSubAccount?.accountNumber);
  const username = useAppSelector(state => state.selectedAccount.username);
  const availableBalance = useAppSelector(state => state.cashAndStockBalance.data?.accountSummary.cashBalance ?? 0);
  const copyTradeSubscription = useAppSelector(state => state.copyTrade.subscription);

  const initializeState: {
    followingType: FollowingType | string;
    followingOption: FollowingOption;
    copyAccount: string;
    maxCash: number;
    orderType: OrderType;
    pin: string;
    isAgree: boolean;
    // Error state
    maxCashError: string;
    pinError: string;
    isAgreeError: string;
  } = {
    followingType: followingType === 'Advisor' ? followingUsername ?? '' : followingType,
    followingOption: 'ALL_STOCK_FIRST_BUY',
    copyAccount: selectedAccountNumber ?? '',
    maxCash: 50000000,
    orderType: 'ATO',
    pin: '',
    isAgree: false,
    maxCashError: '',
    pinError: '',
    isAgreeError: '',
  };

  const propsRef = useRef({
    ...props,
    ...initializeState,
    availableBalance,
    copyTradeSubscription,
  });
  propsRef.current = { ...propsRef.current, ...props, availableBalance, copyTradeSubscription };
  const [state, setState] = useMergingState(initializeState, propsRef);

  const dispatch = useDispatch();

  const queryNAV = useCallback(
    (accountNumber: string) => {
      dispatch(
        getCashBalanceAndStockBalanceForKis({
          accountNumber: accountNumber,
          clientID: username,
        })
      );
    },
    [username]
  );

  const validators = useHandlers({
    validatePin: () => {
      if (propsRef.current.pin === '') {
        setState({ pinError: 'INVALID_PIN' });
      } else if (propsRef.current.pin.length !== 4) {
        setState({ pinError: 'PIN_MAX_LENGTH' });
      } else {
        setState({ pinError: '' });
        return true;
      }
      return false;
    },
    validateMaxCash: () => {
      if (propsRef.current.maxCash > CopyTradeConfig.maxCashBoundary.max) {
        setState({
          maxCashError: t('MAX_CASH_MUST_LESS_OR_EQUAL') + ' ' + formatNumber(CopyTradeConfig.maxCashBoundary.max),
        });
      } else if (propsRef.current.maxCash < CopyTradeConfig.maxCashBoundary.min) {
        setState({
          maxCashError: t('MAX_CASH_MUST_GREAT_OR_EQUAL') + ' ' + formatNumber(CopyTradeConfig.maxCashBoundary.min),
        });
      } else if (propsRef.current.maxCash > Math.ceil(propsRef.current.availableBalance)) {
        setState({ maxCashError: 'CASH_BALANCE_NOT_ENOUGH' });
      } else {
        setState({ maxCashError: '' });
        return true;
      }
      return false;
    },
    validateAgreement: (error?: string) => {
      if (error != null) {
        setState({ isAgreeError: error });
      } else if (!propsRef.current.isAgree) {
        setState({ isAgreeError: 'AGREEMENT_REQUIRED' });
      } else {
        setState({ isAgreeError: '' });
        return true;
      }
      return false;
    },
  });

  const validateForm = useCallback(() => {
    let result = true;
    result = validators.validatePin() && result;
    result = validators.validateMaxCash() && result;
    if (!propsRef.current.route.params.isEdit) {
      result = validators.validateAgreement() && result;
    }
    return result;
  }, [setState]);

  const handlers = useHandlers({
    handleFollowingType: (followingType: FollowingType) => {
      setState({ followingType });
    },
    handleFollowingOption: (followingOption: FollowingOption) => {
      setState({ followingOption });
    },
    handleCopyAccount: (copyAccount: string) => {
      const data = propsRef.current.copyTradeSubscription[copyAccount];
      if (data != null) {
        setState({
          followingType: data.followingID as FollowingType,
          copyAccount: data.subAccount,
          orderType: data.autoOrderType,
          maxCash: data.maxCash,
          maxCashError: '',
          pin: '',
          pinError: '',
        });
      } else {
        setState({ copyAccount, maxCashError: '', pin: '', pinError: '' });
      }
      if (copyAccount) {
        queryNAV(copyAccount);
      }
    },
    handleMaxCash: (maxCash: string) => {
      const newAmount = parseInt(maxCash.replace(/,/g, ''));
      if (!isNaN(newAmount)) {
        setState({ maxCash: newAmount, maxCashError: '' });
      } else {
        setState({ maxCash: 0, maxCashError: '' });
      }
    },
    handleOrderType: (orderType: OrderType) => () => {
      setState({ orderType });
    },
    handlePin: (pin: string) => {
      setState({ pin, pinError: '' });
    },
    handleCheckbox: () => {
      setState({ isAgree: !propsRef.current.isAgree });
      validators.validateAgreement();
    },
    submitForm: () => {
      if (validateForm()) {
        const params = {
          followingID: propsRef.current.followingType,
          account: propsRef.current.copyAccount.slice(0, -2),
          subAccount: propsRef.current.copyAccount,
          maxCash: propsRef.current.maxCash,
          autoOrderType: propsRef.current.orderType,
          accountPin: propsRef.current.pin,
          option: propsRef.current.followingOption,
        };
        const handleFail = (error: unknown) => {
          if (error instanceof FulfilledRequestError) {
            if (error.data.code === 'INVALID_ACCOUNT_PIN') setState({ pinError: error.data.code });
          }
        };
        if (!propsRef.current.route.params.isEdit) {
          dispatch(
            CopyTradeAction.subscribeCopyTrade({
              payload: params,
              callBack: {
                handleSuccess: navigationRef.goBack,
                handleFail,
              },
            })
          );
        } else {
          dispatch(
            CopyTradeAction.editCopyTradeSubscription({
              payload: params,
              callBack: {
                handleSuccess: navigationRef.goBack,
                handleFail,
              },
            })
          );
        }
      }
    },
  });

  useEffect(() => {
    queryNAV(propsRef.current.copyAccount);
    const subscription = store.getState().copyTrade.subscription[selectedAccountNumber ?? ''];
    if (subscription != null) {
      setState({
        copyAccount: subscription.subAccount,
        maxCash: subscription.maxCash,
        orderType: subscription.autoOrderType,
        followingOption: subscription.option,
      });
    }
    dispatch(
      CopyTradeAction.getCopyTradeSubscription({
        callBack: {
          handleSuccess(response?: IResponse<GetCopySubscriptionResponse[]>) {
            const data = response?.data?.find(item => item.subAccount === selectedAccountNumber);
            if (data != null) {
              setState({
                copyAccount: data.subAccount,
                maxCash: data.maxCash,
                orderType: data.autoOrderType,
              });
            }
          },
          handleFail() {
            setState(initializeState);
          },
        },
      })
    );
  }, []);

  return {
    state,
    handlers,
    validators,
    reducerState: {
      accountMap,
      availableBalance,
      isSubscribed: copyTradeSubscription[state.copyAccount],
    },
  };
};

export { useCopyTradeScreenLogic };
