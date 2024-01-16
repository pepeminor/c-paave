import { connect } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import NewFeed from './NewFeed.view';
import { SocialPostActions, SocialPostSelectors } from 'reduxs';

export const mapStateToProps = (state: IState) => ({
  listPost: SocialPostSelectors.selectSocialPostList(state),
  loading: SocialPostSelectors.selectSocialLoading(state),
  refreshing: SocialPostSelectors.selectSocialPostRefreshing(state),
  isPostLimited: SocialPostSelectors.selectLimitSocial(state),
});

export const mapDispatchToProps = {
  getNewsFeed: SocialPostActions.getSocialPostListRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewFeed);
