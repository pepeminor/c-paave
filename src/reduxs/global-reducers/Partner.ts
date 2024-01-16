import { IAction, IGetAllPartnersResponse } from 'interfaces/common';

export const GET_ALL_PARTNER_SUCCESS = 'GET_ALL_PARTNER_SUCCESS';
export const GET_ALL_PARTNER_FAIL = 'GET_ALL_PARTNER_FAIL';

export function AllPartner(
  state: IGetAllPartnersResponse[] = [],
  action: IAction<IGetAllPartnersResponse[]>
): IGetAllPartnersResponse[] {
  switch (action.type) {
    case GET_ALL_PARTNER_SUCCESS:
      return action.payload;
    case GET_ALL_PARTNER_FAIL:
      return [];
    default:
      return state;
  }
}
