import { useAppSelector } from 'hooks/useAppSelector';
import { ACCOUNT_TYPE, SYSTEM_TYPE } from 'global';

const useSubAccountSelector = () => {
  const subAccountChecker = useAppSelector(state => {
    const isKIS = state.selectedAccount.type === ACCOUNT_TYPE.KIS;
    const selectedSubAccount = state.selectedAccount.selectedSubAccount;
    if (!isKIS || selectedSubAccount == null) {
      return {
        isSubD: false,
        isSubXorM: false,
      };
    }
    return {
      isSubD: selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.DERIVATIVES,
      isSubXorM: selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.EQUITY,
    };
  });

  return subAccountChecker;
};

export default useSubAccountSelector;
