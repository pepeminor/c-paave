import { IAction } from 'interfaces/common';
import { SOCKET_STATUS_CHANGE } from 'reduxs/actions';
import { SocketStatus as SocketStatusEnum, WS } from 'constants/enum';
import { RealAccountSec } from 'screens/AccountTrading';

type SocketState = {
  [k in WS | RealAccountSec]?: SocketStatusEnum;
};

export const SocketStatus = (state: SocketState = {}, action: IAction<SocketState>): SocketState => {
  switch (action.type) {
    case SOCKET_STATUS_CHANGE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
