import { connect } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import HeaderPost from './HeaderPost.view';
import { IOutter } from './HeaderPost.type';
import { SocialPostSelectors } from 'reduxs';

export const mapStateToProps = (state: IState, props: IOutter) => ({
  lang: state.lang,
  isOwner: SocialPostSelectors.selectIsOwner(props.postId)(state),
});

export const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderPost);
