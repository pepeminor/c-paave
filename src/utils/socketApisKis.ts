import { IClientData, IResponse } from 'interfaces/common';
import 'url-search-params-polyfill';
import { SCClientSocket } from 'socketcluster-client';
import { Global } from 'constants/main';
import { RealAccountSec } from 'screens/AccountTrading';
import { socketUtils } from './socketUtils';
import i18next from 'i18next';
import { store } from 'screens/App';

export async function loadKisClientData(socket: SCClientSocket | undefined) {
  if (socket == null) {
    throw new Error(i18next.t('INTERNAL_SERVER_ERROR'));
  }

  return new Promise<IResponse<IClientData>>(
    (resolve: (data: IResponse<IClientData>) => void, reject: (err: Error) => void) => {
      const data = {
        headers: {
          'accept-language': store.getState().lang,
        },
        body: {
          serviceName: 'abcxyz',
          sourceIp: Global.sourceIp,
        },
      };

      socket.emit('loadServiceConfig', data, (err: Error, responseData: IResponse<IClientData>) => {
        if (err) {
          // eslint-disable-next-line no-console
          console.log(socket);
          reject(err);
        } else {
          resolve(responseData);
        }
      });
    }
  );
}

export async function loginDomainKis(socket: SCClientSocket | undefined, params: object) {
  if (socket == null) {
    throw new Error(i18next.t('INTERNAL_SERVER_ERROR'));
  }

  return new Promise<IResponse<object>>((resolve: (data: IResponse<object>) => void, reject: (err: Error) => void) => {
    const data = {
      headers: {
        'accept-language': store.getState().lang,
      },
      body: params != null ? { ...params, sourceIp: Global.sourceIp } : { sourceIp: Global.sourceIp },
    };

    socket.emit('login', data, (err: Error, responseData: IResponse<object>) => {
      if (err) {
        reject(err);
      } else {
        resolve(responseData);
      }
    });
  });
}

export const getKisClientData = async () => {
  if (Global.kisClientData) return Global.kisClientData;

  if (!Global.sockets[RealAccountSec.KIS]) {
    await socketUtils.connectKisSocket();
  }
  Global.kisClientData = (await loadKisClientData(Global.sockets[RealAccountSec.KIS])).data;
  return Global.kisClientData;
};
