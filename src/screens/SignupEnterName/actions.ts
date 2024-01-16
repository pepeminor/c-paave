import { SIGNUP_ENTER_NAME_SUBMIT_ACTION } from 'reduxs/actions';
import { ISignupEnterNameSubmitAction } from 'interfaces/sagas/ISignupEnterNameSubmitAction';
import { generateAction, SagaAction } from 'utils/common';

export const submitName: SagaAction<ISignupEnterNameSubmitAction> = generateAction<ISignupEnterNameSubmitAction>(
  SIGNUP_ENTER_NAME_SUBMIT_ACTION
);
