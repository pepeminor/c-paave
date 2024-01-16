import { IChangeCompositionActionParams } from 'interfaces/sagas/IChangeCompositionAction';
import { INDEX_INFO_QUERY_RANK_AND_SUBSCRIBE } from 'reduxs/actions';
import { generateAction } from 'utils';

export const queryIndexRankAndSubscribe = generateAction<IChangeCompositionActionParams>(
  INDEX_INFO_QUERY_RANK_AND_SUBSCRIBE
);
