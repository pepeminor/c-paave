import { connect } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import BottomPost from './BottomPost.view';
import { SocialPostActions, SocialPostSelectors } from 'reduxs';

export const mapStateToProps = (state: IState) => ({
  isLimitSocial: SocialPostSelectors.selectLimitSocial(state),
});

export const mapDispatchToProps = {
  favouritesPost: SocialPostActions.favouritesPost,
  reblogPost: SocialPostActions.reblogPostRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(BottomPost);
