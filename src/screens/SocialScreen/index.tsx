import { connect } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import SocialScreen from './SocialScreen.view';
import { SocialPostActions, SocialPostSelectors } from 'reduxs';

export const mapStateToProps = (state: IState) => ({
  showModal: SocialPostSelectors.selectShowModalIntroduce(state),
});

export const mapDispatchToProps = {
  checkLimitSocial: SocialPostActions.checkLimitSocial,
  updateShowModalIntroduce: SocialPostActions.updateShowModalIntroduce,
};

export default connect(mapStateToProps, mapDispatchToProps)(SocialScreen);
