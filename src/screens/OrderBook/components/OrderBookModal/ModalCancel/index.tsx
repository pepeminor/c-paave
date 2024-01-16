import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { IEquityOrderStopCancel, IOrderStopHistoryResponse } from 'interfaces/equity';
import { IState } from 'reduxs/global-reducers';
import { ACCOUNT_TYPE, OrderBookScreenInitOption, SYSTEM_TYPE } from 'global';
import useStyles from '../styles';
import globalStyles from 'styles';
import {
  kisCancelEqtOrder,
  kisGetEqtAssetInfo,
  postEquityCancelLO,
  putOrderStopCancelEquity,
  setOrderBookSymbol,
} from 'reduxs/global-actions';
import { useTranslation } from 'react-i18next';
import { ModalContentProps } from '..';
import FormBtn from '../BaseModal/FormBtn';
import { ModalType } from 'screens/OrderBook/components/OrderBookModal';
import { IEqtOrderHistoryMappingResponse, IKisGetDerEnquiryOrderResponse } from 'interfaces/services';
import ModalOTPKIS from 'components/ModalOTPKIS';
import { generateKisCardFrom, generateNewKisCard, resetGenerateNewKisCard } from 'reduxs/global-actions/Authentication';
import useUpdateEffect from 'hooks/useUpdateEffect';
import { ReducerStatus } from 'interfaces/reducer';
import { IKisVerifyAndSaveOTPRequest } from 'interfaces/common';
import { kisVerifyAndSaveOTPFrom } from 'interfaces/authentication';
import { kisVerifyAndSaveOTP } from 'screens/LoginRealAccount/actions';
import useKisOTPAvailable from 'hooks/useKisOTPAvailable';
import config from 'config';
// import { KIS_CLEAR_OTP_TOKEN } from 'screens/LoginRealAccount/reducers';
import { useIsFocused } from '@react-navigation/core';
import { kisCancelDerOrder } from 'reduxs/global-actions/KisServicesDer';
import { isDerivativesAccount } from 'utils';

const ModalCancel = ({ symbol }: ModalContentProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { styles } = useStyles();
  const isFocused = useIsFocused();
  const [otpKisValue, setOtpKisValue] = useState<string>('');
  const kisCheckOTP = useSelector((state: IState) => state.kisCheckOTP);
  const [valueOTPError, setValueOTPError] = useState<boolean>(false);
  const [valueOTPErrorContent, setValueOTPErrorContent] = useState<string>('');
  const generateKisCardResult = useSelector((state: IState) => state.generateKisCardResult);
  const type = useSelector((state: IState) => state.orderBookScreenOption);
  const selectedAccount = useSelector((state: IState) => state.selectedAccount);
  const generateKisCardFailedTrigger = useSelector((state: IState) => state.generateKisCardFailedTrigger);
  const onModalOTPKIS = useSelector((state: IState) => state.onModalOTPKIS);
  const kisOTPToken = useSelector((state: IState) => state.kisOTPToken);
  const [isDisableForm, setIsDisableForm] = useState(false);
  const kisOTPAvailable = useKisOTPAvailable(otpKisValue);
  const kisOTPErrorValue = useSelector((state: IState) => state.kisOTPErrorValue);

  useEffect(() => {
    setIsDisableForm(false);
    setOtpKisValue('');
    setValueOTPError(false);
    setValueOTPErrorContent('');
    if (selectedAccount.type === ACCOUNT_TYPE.KIS && (kisOTPToken == null || kisOTPToken.trim() === '')) {
      dispatch(generateNewKisCard({ username: selectedAccount.username!, from: generateKisCardFrom.CANCEL_ORDER }));
    }
  }, []);

  useUpdateEffect(() => {
    closeModal();
  }, [generateKisCardFailedTrigger, onModalOTPKIS]);

  useUpdateEffect(() => {
    if (!isFocused) return;
    if (kisCheckOTP.status === ReducerStatus.FAILED) {
      setValueOTPError(true);
      kisOTPErrorValue != null && setValueOTPErrorContent(t(kisOTPErrorValue));
      setIsDisableForm(false);
    } else if (kisCheckOTP.status === ReducerStatus.SUCCESS) {
      confirmCancel();
      setValueOTPError(false);
      setValueOTPErrorContent('');
      setIsDisableForm(false);
    }
  }, [kisCheckOTP, kisOTPErrorValue, isFocused]);

  const onChangeOtpKisValue = (value: string) => {
    setOtpKisValue(value);
    if (valueOTPError) {
      setValueOTPError(false);
      setValueOTPErrorContent('');
    }
  };

  const closeModal = () => {
    setOtpKisValue('');
    setIsDisableForm(false);
    dispatch(setOrderBookSymbol({ symbol: null, type: ModalType.CANCEL }));
    dispatch(resetGenerateNewKisCard());
  };

  const confirmCancel = () => {
    if (symbol == null) return;

    switch (type) {
      case OrderBookScreenInitOption.ORDER_BOOK:
        const isKisAcc = selectedAccount.type === ACCOUNT_TYPE.KIS;
        const isDerAcc = isDerivativesAccount(selectedAccount);
        const selectedSubAccount = selectedAccount.selectedSubAccount;
        const selectedUsername = selectedAccount.username;
        const isEquityAcc = selectedSubAccount != null && selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.EQUITY;

        if (isKisAcc && isEquityAcc && selectedSubAccount != null && selectedUsername != null) {
          dispatch(
            kisCancelEqtOrder(
              {
                accountNo: selectedSubAccount.accountNumber,
                orders: [
                  {
                    orderNo: String((symbol as IEqtOrderHistoryMappingResponse).orderID),
                    orderGroupNo: (symbol as IEqtOrderHistoryMappingResponse).orderGroupNo,
                  },
                ],
                clientID: selectedUsername,
              },
              {
                message: 'LO_CANCEL_SUCCESS',
              },
              undefined,
              true,
              undefined,
              {
                handleSuccess: () => {
                  dispatch(
                    kisGetEqtAssetInfo({
                      accountNumber: selectedAccount?.selectedSubAccount?.accountNumber!,
                      clientID: selectedAccount.username!,
                      sellBuyType: symbol.sellBuyType,
                      genBuyAllParams: {
                        clientID: selectedAccount.username!,
                        symbolCode: symbol.stockCode!,
                        market: '',
                        price: 0,
                      },
                    })
                  );
                },
              }
            )
          );
        } else if (isKisAcc && isDerAcc && selectedSubAccount != null) {
          const {
            marketID = '',
            validity = '',
            orderType = '',
            stockCode: symbolCode = '',
            orderID: orderNumber = '',
            sellBuyType = '',
            orderGroupID = '',
            validityDate = '',
            commodityName = '',
            contractMonth = '',
          } = symbol as IKisGetDerEnquiryOrderResponse;

          dispatch(
            kisCancelDerOrder(
              {
                accountNumber: selectedSubAccount.accountNumber,
                orderInfo: [
                  {
                    marketID,
                    validity,
                    orderType,
                    symbolCode,
                    orderNumber,
                    sellBuyType,
                    orderGroupID,
                    validityDate,
                    commodityName,
                    contractMonth,
                  },
                ],
              },
              { message: 'LO_CANCEL_SUCCESS' },
              undefined,
              true
            )
          );
        } else {
          dispatch(
            postEquityCancelLO(
              { orderId: parseInt((symbol as IEqtOrderHistoryMappingResponse).orderID) },
              { message: 'LO_CANCEL_SUCCESS' },
              undefined,
              true
            )
          );
        }

        break;
      case OrderBookScreenInitOption.CONDITION_ORDER: {
        const params: IEquityOrderStopCancel = {
          stopOrderId: (symbol as IOrderStopHistoryResponse).stopOrderID,
        };
        dispatch(
          putOrderStopCancelEquity(
            params,
            {
              message: 'STOP_ORDER_CANCEL_SUCCESS',
            },
            undefined,
            true
          )
        );
        break;
      }
      default:
        break;
    }
    closeModal();
  };

  const handleConfirmCancel = () => {
    if (selectedAccount.type === ACCOUNT_TYPE.KIS && (kisOTPToken == null || kisOTPToken.trim() === '')) {
      setIsDisableForm(true);
      const params: IKisVerifyAndSaveOTPRequest = {
        expireTime: config.kisOTPTokenExpireTime,
        verifyType: 'MATRIX_CARD',
        wordMatrixId: generateKisCardResult != null ? generateKisCardResult.wordMatrixId : 0,
        wordMatrixValue: otpKisValue,
      };
      dispatch(kisVerifyAndSaveOTP(params, kisVerifyAndSaveOTPFrom.CANCEL_ORDER));
    } else {
      confirmCancel();
    }
  };

  return (
    <>
      <View style={globalStyles.alignCenter}>
        <Text allowFontScaling={false} style={styles.quantityText2}>
          {t('Are you sure you want to cancel this order?')}
        </Text>
      </View>
      {selectedAccount.type === ACCOUNT_TYPE.KIS && (kisOTPToken == null || kisOTPToken.trim() === '') && (
        <ModalOTPKIS
          valueOTP={otpKisValue}
          onChangeValueOTP={onChangeOtpKisValue}
          generateKisCardResult={generateKisCardResult}
          ListContentModal={true}
          valueOTPError={valueOTPError}
          valueOTPErrorContent={valueOTPErrorContent}
          autoFocus={false}
        />
      )}
      {/* <Text
        onPress={() => {
          dispatch({
            type: KIS_CLEAR_OTP_TOKEN,
          });
        }}
      >
        delete otp token
      </Text> */}
      <FormBtn
        isDisable={
          (selectedAccount.type === ACCOUNT_TYPE.KIS &&
            (kisOTPToken == null || kisOTPToken.trim() === '') &&
            !kisOTPAvailable) ||
          isDisableForm
        }
        onConfirm={handleConfirmCancel}
        onCancel={closeModal}
      />
    </>
  );
};

export default ModalCancel;
