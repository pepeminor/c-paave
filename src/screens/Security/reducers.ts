import { IAction } from 'interfaces/common';
import { FAILURE, RESET, SUCCESS } from 'reduxs/action-type-utils';
import {
  QUERY_BIOMETRIC_STATUS,
  REGISTER_BIOMETRIC,
  REGISTER_BIOMETRIC_KIS,
  TEMPORARILY_DISABLED_BIOMETRIC,
} from 'reduxs/actions';

export function RegisterBiometricSuccessTrigger(state = false, action: IAction<null>) {
  switch (action.type) {
    case SUCCESS(REGISTER_BIOMETRIC):
      return !state;
    case SUCCESS(REGISTER_BIOMETRIC_KIS):
      return !state;
    default:
      return state;
  }
}

export function RegisterBiometricFailedTrigger(state = false, action: IAction<null>) {
  switch (action.type) {
    case FAILURE(REGISTER_BIOMETRIC):
      return !state;
    case FAILURE(REGISTER_BIOMETRIC_KIS):
      return !state;
    default:
      return state;
  }
}

export function QueryBiometricStatus(state: boolean | null = null, action: IAction<boolean>) {
  switch (action.type) {
    case SUCCESS(QUERY_BIOMETRIC_STATUS):
      return action.payload;
    case FAILURE(QUERY_BIOMETRIC_STATUS):
      return action.payload;
    case RESET(QUERY_BIOMETRIC_STATUS):
      return null;
    default:
      return state;
  }
}

export function TemporarilyBiometricStatus(state = false, action: IAction<boolean>) {
  switch (action.type) {
    case TEMPORARILY_DISABLED_BIOMETRIC:
      return action.payload;
    default:
      return state;
  }
}
