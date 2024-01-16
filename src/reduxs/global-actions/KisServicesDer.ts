import { IDerivativesPurchasingPowerRequest } from 'interfaces/common';
import {
  IKisCancelDerOrderParams,
  IKisGetDerMaxLongShortEnquiryParams,
  IKisModifyDerOrderParams,
} from 'interfaces/services';
import { RESET } from 'reduxs/action-type-utils';
import {
  QUERRY_ASSET_INFO_DER_DATA,
  SERVICE_GET_DER_ENQUIRY_CLIENT_STOCK_STATEMENT,
  SERVICE_GET_DER_ENQUIRY_HISTORY_ORDER,
  SERVICE_GET_DER_ENQUIRY_ORDER,
  SERVICE_GET_DER_MAX_LONG_SHORT_ENQUIRY,
  SERVICE_PUT_DER_CANCEL_ORDER,
  SERVICE_PUT_DER_MODIFY_ORDER,
} from 'reduxs/actions';
import { generateAction } from 'utils';

export const kisGetDerEnquiryOrder = generateAction(SERVICE_GET_DER_ENQUIRY_ORDER);

export const kisGetDerEnquiryHistoryOrder = generateAction(SERVICE_GET_DER_ENQUIRY_HISTORY_ORDER);

export const kisCancelDerOrder = generateAction<IKisCancelDerOrderParams>(SERVICE_PUT_DER_CANCEL_ORDER);

export const kisModifyDerOrder = generateAction<IKisModifyDerOrderParams>(SERVICE_PUT_DER_MODIFY_ORDER);

export const kisGetDerEnquiryMaxLongShort = generateAction<IKisGetDerMaxLongShortEnquiryParams>(
  SERVICE_GET_DER_MAX_LONG_SHORT_ENQUIRY
);

export const kisGetDerAssetInformation = generateAction<IDerivativesPurchasingPowerRequest>(QUERRY_ASSET_INFO_DER_DATA);

export const kisGetDerEnquiryClientStockStatement = generateAction(SERVICE_GET_DER_ENQUIRY_CLIENT_STOCK_STATEMENT);

export const kisResetDerEnquiryClientStockStatement = generateAction(
  RESET(SERVICE_GET_DER_ENQUIRY_CLIENT_STOCK_STATEMENT)
);
