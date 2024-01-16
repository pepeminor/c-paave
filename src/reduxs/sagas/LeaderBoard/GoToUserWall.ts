import { put, call, takeLeading } from 'redux-saga/effects';
import { IAction, IResponse } from 'interfaces/common';
import APIList from 'config/api';
import { LEADER_BOARD_GO_TO_USER_WALL } from 'reduxs/actions';
import { query, navigate } from 'utils';
import { ISearchUserResponse } from 'interfaces/user';

function* goToUserWall(action: IAction<string>) {
  try {
    const response: IResponse<ISearchUserResponse[]> = yield call(query, APIList.getSearchUserInfo, {
      name: action.payload,
    });
    for (const user of response.data) {
      if (action.payload === user.username) {
        navigate({ key: 'UserWall', params: { userData: user, isFromSearch: true } });
        return;
      }
    }
  } catch (error) {
    yield put({
      type: action.response?.fail,
      hideLoading: true,
    });
  }
}

export default function* watchGoToUserWall() {
  yield takeLeading(LEADER_BOARD_GO_TO_USER_WALL, goToUserWall);
}
