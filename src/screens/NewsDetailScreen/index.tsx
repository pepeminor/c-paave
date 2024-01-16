import { connect } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import NewsDetailScreen from './NewsDetailScreen.view';
import { IOutter } from './NewsDetailScreen.type';
import { NewsSelectors, SocialPostSelectors } from 'reduxs';

export const mapStateToProps = (state: IState, props: IOutter) => ({
  newsData: NewsSelectors.selectNews(props.newsId)(state),
  dataPost: SocialPostSelectors.selectDataPost(props.postId)(state),
});

export const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NewsDetailScreen);
