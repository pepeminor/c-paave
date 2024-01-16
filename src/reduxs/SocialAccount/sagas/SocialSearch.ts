import { put, takeLatest } from 'redux-saga/effects';
import { socialSearch } from '../SocialAccount.action';
import { SocialSearchParams, SocialSearchResponse } from '../SocialAccount.type';
import APIList from 'config/api';
import { query } from 'utils';
import { IResponse, ToolkitAction } from 'interfaces/common';

function* doSocialSearch(action: ToolkitAction<SocialSearchParams>) {
  try {
    const { data }: IResponse<SocialSearchResponse> = yield query(APIList.socialSearch, action.payload);
    data.hashtags = data.hashtags.map(tag => {
      const count = tag.history.reduce((sum, item) => {
        const countItem = Number(item.uses);
        return sum + (isNaN(countItem) ? 0 : countItem);
      }, 0);
      return {
        ...tag,
        count,
      };
    });
    yield put({
      type: socialSearch.fulfilled,
      payload: data,
    });
    yield action.meta.callBack?.handleSuccess?.(data);
  } catch (err) {
    // console.log(err);
  }
}

export function* watchSocialSearch() {
  yield takeLatest(socialSearch.type, doSocialSearch);
}
