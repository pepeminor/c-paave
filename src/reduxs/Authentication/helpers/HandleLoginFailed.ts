import { FulfilledRequestError, alertMessage } from 'utils';
import { ERROR } from 'constants/error';

export async function handleLoginFailed(error: any) {
  if (error instanceof FulfilledRequestError) {
    switch (error.data.code) {
      case ERROR.INVALID_CLIENT_CREDENTIAL:
        alertMessage('danger', ERROR.INVALID_CLIENT_CREDENTIAL, '', error.requester?.rid);
        break;
      case ERROR.LOGIN_BIOMETRIC_SIGNATURE_VERIFICATION_FAILED:
        alertMessage('danger', ERROR.LOGIN_BIOMETRIC_SIGNATURE_VERIFICATION_FAILED, '', error.requester?.rid);
        break;
      case ERROR.LOGIN_BIOMETRIC_NOT_FOUND:
        alertMessage('danger', ERROR.LOGIN_BIOMETRIC_NOT_FOUND, '', error.requester?.rid);
        break;
      case ERROR.BIOMETRIC_ACTIVE_ON_ANOTHER_ACCOUNT:
        alertMessage('danger', ERROR.BIOMETRIC_ACTIVE_ON_ANOTHER_ACCOUNT, '', error.requester?.rid);
        break;
      case ERROR.BIOMETRIC_ACTIVE_ON_ANOTHER_DEVICE:
        alertMessage('danger', ERROR.BIOMETRIC_ACTIVE_ON_ANOTHER_DEVICE, '', error.requester?.rid);
        break;
      default:
        alertMessage('danger', 'error_please_try_again', '', error.requester?.rid);
        break;
    }
  }
}
