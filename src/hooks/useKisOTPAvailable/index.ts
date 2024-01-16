import { useAppSelector } from 'hooks/useAppSelector';
import { ReducerStatus } from 'interfaces/reducer';
import { useEffect, useState } from 'react';

export default function useKisOTPAvailable(otpKisValue: string): boolean {
  const generateKisCardResult = useAppSelector(state => state.generateKisCardResult);
  const kisCheckOTPStatus = useAppSelector(state => state.kisCheckOTP.status);
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    setAvailable(
      generateKisCardResult != null && otpKisValue.trim() !== '' && kisCheckOTPStatus !== ReducerStatus.LOADING
    );
  }, [generateKisCardResult, otpKisValue, kisCheckOTPStatus]);

  return available;
}
