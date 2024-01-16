/* eslint-disable no-console */
import { IAPI, IResponse } from 'interfaces/common';
import { call } from 'ramda';
import { put } from 'redux-saga/effects';
import { query } from 'utils';
import { AdvisorActions } from './Advisor.redux';
import { AdvisorState } from './Advisor.type';
import APIList from 'config/api';
import { FollowingAdvisorParams, FollowingAdvisorResponse } from 'interfaces/Advisor';

type AdvisorResponse = {
  userId: string;
};

export const AdvisorFetcher = {
  fetchAdvisorData: function* (api: IAPI, params: unknown, reducerKey: keyof AdvisorState) {
    try {
      const response: IResponse<AdvisorResponse[]> = yield call(query, api, params);
      yield put(
        AdvisorActions.updateAdvisorState({
          [reducerKey]: response.data.reduce(
            (acc, cur) => ({
              ...acc,
              [cur.userId]: cur,
            }),
            {}
          ),
        })
      );
    } catch (error) {
      if (__DEV__) console.log('FetchAdvisorDataFailed', api.uri, params, error);
    }
  },
  fetchFollowingAdvisor: function* () {
    try {
      const followingAdvisorParams: FollowingAdvisorParams = {
        pageNumber: 0,
        pageSize: 30,
        type: 'ROBO_ADVISOR',
      };
      const response: IResponse<FollowingAdvisorResponse> = yield call(
        query,
        APIList.getFollowingAdvisor,
        followingAdvisorParams
      );
      yield put(
        AdvisorActions.updateAdvisorState({
          isFollowing: response.data.followingAccounts?.reduce(
            (acc, cur) => ({
              ...acc,
              [cur.followedId]: true,
            }),
            {}
          ),
        })
      );
    } catch (error) {
      if (__DEV__) console.log('FetchFollowingAdvisorFailed', error);
    }
  },
};
