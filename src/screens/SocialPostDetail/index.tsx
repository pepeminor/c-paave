import { connect } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import SocialPostDetail from './SocialPostDetail.view';
import { SocialNewPostActions, SocialPostActions, SocialPostSelectors } from 'reduxs';
import { withOutReduxType } from './SocialPostDetail.type';

export const mapStateToProps = (state: IState, props: withOutReduxType) => ({
  commentsList: SocialPostSelectors.selectCommentsPost(props.route.params.postId)(state),
  isLimitSocial: SocialPostSelectors.selectLimitSocial(state),
  loadingComments: SocialPostSelectors.selectLoadingComments(state),
  hasPost: SocialPostSelectors.selectHasPost(props.route.params.postId)(state),
});

export const mapDispatchToProps = {
  getPostDetail: SocialPostActions.getPostDetailRequest,
  getCommentsOfPost: SocialPostActions.getCommentsOfPostRequest,
  resetComment: SocialNewPostActions.reset,
};

export default connect(mapStateToProps, mapDispatchToProps)(SocialPostDetail);
