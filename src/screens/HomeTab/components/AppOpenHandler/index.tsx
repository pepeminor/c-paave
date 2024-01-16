import { ACCOUNT_TYPE } from 'global';
import { useAppSelector } from 'hooks/useAppSelector';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserAccountInfo, getUserKisAccountInfo } from 'reduxs/global-actions';
import { useNetInfo } from '@react-native-community/netinfo';
import { SocialAccountActions } from 'reduxs';

export default function AppOpenHandler() {
  const netInfo = useNetInfo();
  const dispatch = useDispatch();

  const kisClientID = useAppSelector(state => state.accountList['KIS']?.username);
  const selectedAccountType = useAppSelector(state => state.selectedAccount.type);
  const refreshToken = useAppSelector(state => state.authToken.refreshToken);
  const kisRefreshToken = useAppSelector(state => state.kisAuthToken.refreshToken);

  useEffect(() => {
    if (refreshToken == '') return;
    if (netInfo.isConnected && selectedAccountType !== ACCOUNT_TYPE.DEMO) {
      dispatch(getUserAccountInfo(null));
      dispatch(SocialAccountActions.getSocialAccountInfo());
    }
  }, [netInfo.isConnected, refreshToken]);

  useEffect(() => {
    if (kisRefreshToken == '') return;
    if (netInfo.isConnected && selectedAccountType !== ACCOUNT_TYPE.DEMO) {
      if (kisClientID) {
        dispatch(getUserKisAccountInfo({ clientID: kisClientID }));
      }
    }
  }, [netInfo.isConnected, kisRefreshToken]);

  return null;
}
