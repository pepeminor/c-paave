import { GET_ALL_PARTNER } from 'reduxs/actions';
import { GET_ALL_PARTNER_FAIL, GET_ALL_PARTNER_SUCCESS } from 'reduxs/global-reducers/Partner';

export const getAllPartner = (payload: string) => ({
  type: GET_ALL_PARTNER,
  response: {
    success: GET_ALL_PARTNER_SUCCESS,
    fail: GET_ALL_PARTNER_FAIL,
  },
  payload,
});
