import { connect } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import Poll from './Poll.view';
import { SocialPostActions, SocialPostSelectors } from 'reduxs';
import { IOutter } from './Poll.type';

export const mapStateToProps = (state: IState, props: IOutter) => ({
  isOwner: SocialPostSelectors.selectIsOwner(props.postId)(state),
  lang: state.lang,
});

export const mapDispatchToProps = {
  votePoll: SocialPostActions.votePollRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Poll);
