import NetInfo from '@react-native-community/netinfo';
import { showModalDisconnectNetwork } from 'reduxs/global-actions';
import { CommonError } from './errors';
import { store } from 'screens/App';

export async function checkConnection() {
  const result = await NetInfo.fetch();
  if (!result.isConnected) {
    store.dispatch(showModalDisconnectNetwork(true));
    throw { code: CommonError.NETWORK_ERROR };
  }
}
