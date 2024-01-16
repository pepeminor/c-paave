import { NEWS_INIT } from './../../actions';
import { IAction } from 'interfaces/common';
import { INewsParams } from 'interfaces/news';
import { query } from 'utils';
import { takeLatest, call } from 'redux-saga/effects';
import APIList from 'config/api';

const getNews = (params: INewsParams) => {
  return query(APIList.news, params);
};

function* doGetNews(action: IAction<INewsParams>) {
  try {
    yield call(getNews, action.payload);
  } catch (error) {} // eslint-disable-line
}

export default function* watchGetNews() {
  yield takeLatest(NEWS_INIT, doGetNews);
}
