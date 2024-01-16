import APIList from 'config/api';
import { IndexRankType } from 'constants/enum';
import { IAction, IResponse } from 'interfaces/common';
import { IIndexRankResponse } from 'interfaces/rank';
import { IChangeCompositionActionParams } from 'interfaces/sagas/IChangeCompositionAction';
import { call, put, takeLatest } from 'redux-saga/effects';
import { FAILURE, SUCCESS } from 'reduxs/action-type-utils';
import { INDEX_INFO_QUERY_RANK_AND_SUBSCRIBE, RANK_GET_INDEX_RANK } from 'reduxs/actions';
import { CompositionOption } from 'screens/IndexInfo/TabDataSection/CompositionSection';
import { query } from 'utils';

function* handleOnQueryIndexRankAndSubscribe(action: IAction<IChangeCompositionActionParams>) {
  yield put({ type: RANK_GET_INDEX_RANK });

  if (action.payload.symbolCode != null) {
    const param = { index: action.payload.symbolCode, type: IndexRankType.TRADING_VOLUME, pageSize: 15 };

    switch (action.payload.option) {
      case CompositionOption.TOP_RETURN:
        param.type = IndexRankType.RATE_DESC;
        break;
      case CompositionOption.WORST_RETURN:
        param.type = IndexRankType.RATE_ASC;
        break;

      default:
        break;
    }

    try {
      const response: IResponse<IIndexRankResponse> = yield call(query, APIList.getIndexRank, param);
      if (response.data != null) {
        const indexRankList = response.data.indexRanks;
        yield put({
          type: SUCCESS(RANK_GET_INDEX_RANK),
          payload: indexRankList,
        });
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      if (__DEV__) console.error('fail in query', action.payload.option, err);
      yield put({
        type: FAILURE(RANK_GET_INDEX_RANK),
      });
    }
  }
}

export default function* watchOnEnterScreen() {
  yield takeLatest(INDEX_INFO_QUERY_RANK_AND_SUBSCRIBE, handleOnQueryIndexRankAndSubscribe);
}
