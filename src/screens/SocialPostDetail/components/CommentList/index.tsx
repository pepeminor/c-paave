import { connect } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import CommentList from './CommentList.view';
import { SocialPostSelectors } from 'reduxs';
import { IOutter } from './CommentList.type';

export const mapStateToProps = (state: IState, props: IOutter) => ({
  dataComment: SocialPostSelectors.selectDataPost(props.commentId)(state),
  commentChildList: SocialPostSelectors.selectCommentsPost(props.commentId)(state),
});

export const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
