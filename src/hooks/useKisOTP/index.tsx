import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'hooks';
import ModalOTPKIS from 'components/ModalOTPKIS';
import { ACCOUNT_TYPE } from 'global';
import { generateKisCardFrom, generateNewKisCard, resetGenerateNewKisCard } from 'reduxs/global-actions';
import useUpdateEffect from 'hooks/useUpdateEffect';
import { ReducerStatus } from 'interfaces/reducer';
import { IKisVerifyAndSaveOTPRequest } from 'interfaces/common';
import { kisVerifyAndSaveOTP } from 'screens/LoginRealAccount/actions';
import { kisVerifyAndSaveOTPFrom } from 'interfaces/authentication';
import { useIsFocused } from '@react-navigation/native';
import config from 'config';
import { Keyboard } from 'react-native';
import { useTranslation } from 'react-i18next';

type useKisOTPProps = {
  visible: boolean;
  submitAction: () => void;
  hideModal: () => void;
  fromLogin?: boolean;
};

const useKisOTP = ({
  visible,
  submitAction,
  hideModal,
  fromLogin,
}: useKisOTPProps): [
  ModalOTP: JSX.Element | null,
  handleConfirm: () => void,
  handleCancel: () => void,
  isSubmitBtnDisabled: boolean,
  isFormDisabled: boolean
] => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { t } = useTranslation();
  const [showModalOtpKis, setShowModalOtpKis] = useState(false);
  const [otpKisValue, setOtpKisValue] = useState<string>('');
  const [valueOTPError, setValueOTPError] = useState<boolean>(false);
  const [valueOTPErrorContent, setValueOTPErrorContent] = useState<string>('');
  const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);

  const selectedAccount = useAppSelector(state => state.selectedAccount);
  const kisOTPToken = useAppSelector(state => state.kisOTPToken);
  const generateKisCardResult = useAppSelector(state => state.generateKisCardResult);
  const kisCheckOTP = useAppSelector(state => state.kisCheckOTP);
  const kisOTPErrorValue = useAppSelector(state => state.kisOTPErrorValue);

  useEffect(() => {
    if (visible) {
      setIsFormDisabled(false);
      setOtpKisValue('');
      setValueOTPError(false);
      setValueOTPErrorContent('');
      if (selectedAccount.type === ACCOUNT_TYPE.KIS && (kisOTPToken == null || kisOTPToken.trim() === '')) {
        setShowModalOtpKis(true);
        dispatch(
          generateNewKisCard({
            username: selectedAccount.username ?? '',
            from: fromLogin ? generateKisCardFrom.LOGIN : generateKisCardFrom.NOT_LOGIN,
          })
        );
      }
    } else {
      setShowModalOtpKis(false);
      dispatch(resetGenerateNewKisCard());
    }
  }, [visible]);

  useUpdateEffect(() => {
    if (isFocused) {
      if (kisCheckOTP.status === ReducerStatus.FAILED) {
        setValueOTPError(true);
        kisOTPErrorValue != null && setValueOTPErrorContent(t(kisOTPErrorValue));
        setIsFormDisabled(false);
      } else if (kisCheckOTP.status === ReducerStatus.SUCCESS) {
        submitAction();
        setValueOTPError(false);
        setValueOTPErrorContent('');
        setIsFormDisabled(false);
      }
      Keyboard.dismiss();
    }
  }, [kisCheckOTP, kisOTPErrorValue, isFocused]);

  const onChangeOtpKisValue = (value: string) => {
    setOtpKisValue(value);
    if (valueOTPError) {
      setValueOTPError(false);
      setValueOTPErrorContent('');
    }
  };

  const handleConfirm = () => {
    if (isFormDisabled) {
      return;
    }
    if (selectedAccount.type === ACCOUNT_TYPE.KIS && (kisOTPToken == null || kisOTPToken.trim() === '')) {
      setIsFormDisabled(true);
      const params: IKisVerifyAndSaveOTPRequest = {
        expireTime: config.kisOTPTokenExpireTime,
        verifyType: 'MATRIX_CARD',
        wordMatrixId: generateKisCardResult != null ? generateKisCardResult.wordMatrixId : 0,
        wordMatrixValue: otpKisValue,
      };
      dispatch(
        kisVerifyAndSaveOTP(params, fromLogin ? kisVerifyAndSaveOTPFrom.LOGIN : kisVerifyAndSaveOTPFrom.NOT_LOGIN)
      );
    } else {
      submitAction();
    }
  };

  const handleCancel = () => {
    setOtpKisValue('');
    setIsFormDisabled(false);
    hideModal();
  };

  const ModalOTP = showModalOtpKis ? (
    <ModalOTPKIS
      valueOTP={otpKisValue}
      onChangeValueOTP={onChangeOtpKisValue}
      generateKisCardResult={generateKisCardResult}
      ListContentModal={true}
      valueOTPError={valueOTPError}
      valueOTPErrorContent={valueOTPErrorContent}
      autoFocus={false}
    />
  ) : null;

  const isSubmitBtnDisabled =
    selectedAccount.type === ACCOUNT_TYPE.KIS &&
    (kisOTPToken == null || kisOTPToken.trim() === '') &&
    (generateKisCardResult == null || otpKisValue.trim() === '') &&
    kisCheckOTP.status === ReducerStatus.LOADING;

  return [ModalOTP, handleConfirm, handleCancel, isSubmitBtnDisabled, isFormDisabled];
};

export default useKisOTP;
