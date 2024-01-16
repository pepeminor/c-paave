import { useCallback, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import { ReducerStatus } from 'interfaces/reducer';
import { useTranslation } from 'react-i18next';
import useUpdateEffect from 'hooks/useUpdateEffect';

const useModalOTPKis = () => {
  const { t } = useTranslation();
  const kisCheckOTP = useSelector((state: IState) => state.kisCheckOTP);
  const kisOTPErrorValue = useSelector((state: IState) => state.kisOTPErrorValue);
  const [valueOTPError, setValueOTPError] = useState<boolean>(false);
  const [valueOTPErrorContent, setValueOTPErrorContent] = useState<string>('');
  const [otpKisValue, setOtpKisValue] = useState<string>('');

  const resetFormModalOTPKIS = () => {
    setOtpKisValue('');
    setValueOTPError(false);
    setValueOTPErrorContent('');
  };

  const onChangeOtpKisValue = useCallback(
    (value: string) => {
      setOtpKisValue(value);
      if (valueOTPError) {
        setValueOTPError(false);
        setValueOTPErrorContent('');
      }
    },
    [valueOTPError]
  );

  useEffect(() => {
    setValueOTPError(false);
    setValueOTPErrorContent('');
  }, []);

  useUpdateEffect(() => {
    if (kisCheckOTP.status === ReducerStatus.FAILED) {
      setValueOTPError(true);
      if (kisOTPErrorValue != null) setValueOTPErrorContent(t(kisOTPErrorValue));
    } else {
      setValueOTPError(false);
      setValueOTPErrorContent('');
    }
  }, [kisCheckOTP, kisOTPErrorValue]);

  return { valueOTPError, valueOTPErrorContent, otpKisValue, onChangeOtpKisValue, resetFormModalOTPKIS };
};

export default useModalOTPKis;
