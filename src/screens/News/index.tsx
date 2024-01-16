import { connect } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import News from './News.view';
import { NewsActions, NewsSelectors } from 'reduxs';

export const mapStateToProps = (state: IState) => ({
  listNewsPinned: NewsSelectors.selectListNewsPinned(state),
  listNewsNotPinned: NewsSelectors.selectListNewsNotPinned(state),
  listNews: NewsSelectors.selectListNews(state),
  listNewsSearch: NewsSelectors.selectListNewsSearch(state),
  isEndListNews: NewsSelectors.selectIsEndListNews(state),
  isEndListNewsSearch: NewsSelectors.selectIsEndListNewsSearch(state),
});

export const mapDispatchToProps = {
  getNews: NewsActions.getNewsRequest,
  clearSearch: NewsActions.clearDataSearch,
};

export default connect(mapStateToProps, mapDispatchToProps)(News);
