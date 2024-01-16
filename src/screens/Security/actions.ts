import {
  IBiometricRegisterKisParams,
  IQueryBiometricStatusRequest,
  IRegisterBiometricRequest,
} from 'interfaces/common';
import {
  QUERY_BIOMETRIC_STATUS,
  REGISTER_BIOMETRIC,
  UNREGISTER_BIOMETRIC,
  REGISTER_BIOMETRIC_KIS,
  TEMPORARILY_DISABLED_BIOMETRIC,
} from 'reduxs/actions';
import { generateAction, generateActionObject } from 'utils';

export const registerBiometric = generateAction<IRegisterBiometricRequest>(REGISTER_BIOMETRIC);

export const registerBiometricKis = generateAction<IBiometricRegisterKisParams>(REGISTER_BIOMETRIC_KIS);

export const unregisterBiometric = generateAction(UNREGISTER_BIOMETRIC);

export const queryBiometricStatus = generateAction<IQueryBiometricStatusRequest>(QUERY_BIOMETRIC_STATUS);

export const temporarilyBiometricStatus = generateActionObject<boolean>(TEMPORARILY_DISABLED_BIOMETRIC);
