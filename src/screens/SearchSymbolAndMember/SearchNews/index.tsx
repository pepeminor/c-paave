import { connect } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import { SearchNews } from './view';
import { NewsActions, NewsSelectors } from 'reduxs';

export const mapStateToProps = (state: IState) => ({
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

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(SearchNews);
