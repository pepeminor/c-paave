import { connect } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import News from './News.view';
import { ACCOUNT_TYPE } from 'global';
import { SocialPostSelectors, NewsActions } from 'reduxs';

export const mapStateToProps = (state: IState) => {
  const listNews = state.NewsReducer.listNews;
  const newsLatest = state.NewsReducer.listNewsJson[listNews[0]];
  const isDemo = state.selectedAccount.type === ACCOUNT_TYPE.DEMO;
  const dataPost = SocialPostSelectors.selectDataPost(newsLatest?.socialNewsId)(state);
  return {
    listNews,
    newsLatest,
    isDemo,
    dataPost,
  };
};

export const mapDispatchToProps = {
  getNewsRequest: NewsActions.getNewsRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(News);
