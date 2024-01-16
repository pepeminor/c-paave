import { connect } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import LikedScreen from './LikedScreen.view';
import { SocialPostActions, SocialPostSelectors } from 'reduxs';

export const mapStateToProps = (state: IState) => ({
  likedList: SocialPostSelectors.selectLikedList(state),
  loading: SocialPostSelectors.selectLikedLoading(state),
});

export const mapDispatchToProps = {
  getLikedList: SocialPostActions.getLikedListRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(LikedScreen);
