import { connect } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import Post from './Post.view';
import { IOutter } from './Post.type';
import { SocialAccountActions, SocialPostSelectors, SymbolDataSelector } from 'reduxs';

export const mapStateToProps = (state: IState, props: IOutter) => ({
  dataPost: SocialPostSelectors.selectDataPost(props.postId)(state),
  dataSymbolMap: SymbolDataSelector.selectSymbolMap(state),
});

export const mapDispatchToProps = {
  getAccountInfoById: SocialAccountActions.getAccountInfoById,
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
