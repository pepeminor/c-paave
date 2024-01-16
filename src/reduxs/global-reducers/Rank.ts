import { IAction } from 'interfaces/common';
import { IIndexRanks } from 'interfaces/rank';
import { ILoadingReducer, ReducerStatus } from 'interfaces/reducer';
import { FAILURE, SUCCESS } from 'reduxs/action-type-utils';
import { RANK_GET_INDEX_RANK } from 'reduxs/actions';

export function SymbolIndexRankList(
  state: ILoadingReducer<IIndexRanks[] | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IIndexRanks[]>
): ILoadingReducer<IIndexRanks[] | null> {
  switch (action.type) {
    case RANK_GET_INDEX_RANK:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(RANK_GET_INDEX_RANK):
      return { data: action.payload, status: ReducerStatus.SUCCESS };
    case FAILURE(RANK_GET_INDEX_RANK):
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}
