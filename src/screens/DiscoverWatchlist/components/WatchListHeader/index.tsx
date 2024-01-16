import { connect } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import WatchListHeader from './WatchListHeader.view';
import { showNonLoginModal } from 'reduxs/global-actions/NonLogin';

export const mapStateToProps = (state: IState) => ({
  selectedWatchList: state.WatchListReducer.selectedWatchList,
  selectedAccountType: state.selectedAccount.type,
  accessToken: state.authToken.accessToken,
});

export const mapDispatchToProps = {
  showNonLoginModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(WatchListHeader);
