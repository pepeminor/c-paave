import APIList from 'config/api';
import { IAction, IResponse } from 'interfaces/common';
import { IKisGetEqtEnquiryOrderResponse, IEqtEnquiryPortfolioParams } from 'interfaces/services';
import { call, put, takeLeading } from 'redux-saga/effects';
import { SERVICE_GET_EQUITY_ENQUIRY_PORTFOLIO } from 'reduxs/actions';
import { queryKis } from 'utils';

function* sagaHandling(action: IAction<IEqtEnquiryPortfolioParams>) {
  try {
    const response: IResponse<{ beanList: IKisGetEqtEnquiryOrderResponse[] }> = yield call(
      queryKis,
      APIList.getKisEqtEquityPortfolio,
      action.payload
    );
    yield action.response?.success != null &&
      put({
        type: action.response.success,
        payload: response.data,
      });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Get equity enquiry portfolio failed ->', error);
    yield action.response?.fail != null &&
      put({
        type: action.response.fail,
      });
  }
}

export default function* watchOnGetEquityEnquiryPortfolio() {
  yield takeLeading(SERVICE_GET_EQUITY_ENQUIRY_PORTFOLIO, sagaHandling);
}
