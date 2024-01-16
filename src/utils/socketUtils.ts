/* eslint-disable no-console */
import config from 'config';
import { SocketStatus, WS } from 'constants/enum';
import { Global } from 'constants/main';
import { IError } from 'interfaces/common';
import publicIp from 'public-ip';
import { SOCKET_STATUS_CHANGE } from 'reduxs/actions';
import { RealAccountSec } from 'screens/AccountTrading';
import { create, SCClientSocket } from 'socketcluster-client';
import { alertMessage } from './common';
import { store } from 'screens/App';

const DEBUG_SOCKET = config.debugFlag.socketStatus;

type SocketInitCallback = {
  onConnecting?: () => void;
  onConnect?: (status: SCClientSocket.ConnectStatus) => void;
  onError?: (err: IError) => void;
  onClose?: () => void;
};

const connectSocket = async (
  socketName: WS | RealAccountSec,
  socketConfig: SCClientSocket.ClientOptions = {},
  callback: SocketInitCallback = {}
): Promise<boolean> => {
  if (Global.sourceIp == null) {
    try {
      Global.sourceIp = await publicIp.v4();
    } catch (error) {
      __DEV__ && console.log('Get ipv4 error', error);
    }
  }

  if (Global.sockets[socketName] != null) {
    Global.sockets[socketName]?.connect();
  } else {
    Global.sockets[socketName] = create(socketConfig);
  }

  return new Promise((resolve, reject) => {
    try {
      Global.sockets[socketName]?.on('connecting', async () => {
        if (__DEV__ && DEBUG_SOCKET) {
          console.log(`Connecting to ${socketName} socket...`);
        }
        store.dispatch({
          type: SOCKET_STATUS_CHANGE,
          payload: { [socketName]: SocketStatus.CONNECTING },
        });
        callback.onConnecting?.();
      });

      Global.sockets[socketName]?.on('connect', async (status: SCClientSocket.ConnectStatus) => {
        if (__DEV__ && DEBUG_SOCKET) {
          console.log(`Connected to ${socketName} socket`, status);
        }
        store.dispatch({
          type: SOCKET_STATUS_CHANGE,
          payload: { [socketName]: SocketStatus.CONNECTED },
        });
        callback.onConnect?.(status);
        resolve(true);
      });

      Global.sockets[socketName]?.on('close', async () => {
        if (__DEV__ && DEBUG_SOCKET) {
          console.log(`Disconnected from ${socketName} socket`);
        }
        store.dispatch({
          type: SOCKET_STATUS_CHANGE,
          payload: { [socketName]: SocketStatus.DISCONNECTED },
        });
        callback.onClose?.();
      });

      Global.sockets[socketName]?.on('error', async (err: IError) => {
        if (__DEV__ && DEBUG_SOCKET) {
          console.log(`Connect ${socketName} socket error:`, err.message);
        }
        callback.onError?.(err);
        reject(false);
      });
    } catch (error) {
      if (__DEV__ && DEBUG_SOCKET) {
        console.log(`Init ${socketName} socket error`, error);
      }
      reject(false);
      alertMessage('danger', 'Init socket error', 'Internal server error');
    }
  });
};

const socketInitiator = (socketName: WS | RealAccountSec, socketConfig: SCClientSocket.ClientOptions = {}) => {
  return {
    connect: (callback: SocketInitCallback = {}) => {
      return connectSocket(socketName, socketConfig, callback);
    },
  };
};

const { connect: connectPriceBoardSocket } = socketInitiator(WS.PRICE_BOARD, config.apiUrl.domain.socketCluster);

const { connect: connectKisSocket } = socketInitiator(RealAccountSec.KIS, config.KIS.domain.socketCluster);

export const socketUtils = {
  connectPriceBoardSocket,
  connectKisSocket,
};
