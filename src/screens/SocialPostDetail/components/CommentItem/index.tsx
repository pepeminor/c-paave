import { connect } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import CommentItem from './CommentItem.view';
import { IOutter } from './CommentItem.type';
import { SocialAccountActions, SocialPostActions, SocialPostSelectors } from 'reduxs';

export const mapStateToProps = (state: IState, props: IOutter) => ({
  dataComment: SocialPostSelectors.selectDataPost(props.commentId)(state),
});

export const mapDispatchToProps = {
  getCommentsOfPost: SocialPostActions.getCommentsOfPostRequest,
  getAccountInfoById: SocialAccountActions.getAccountInfoById,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);
