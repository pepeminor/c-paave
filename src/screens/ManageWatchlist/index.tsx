import { connect } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import ManageWatchlist from './ManageWatchlist.view';
import { WatchListActions } from 'reduxs';

export const mapStateToProps = (state: IState) => ({
  watchListList: state.WatchListReducer.watchListList,
});

export const mapDispatchToProps = {
  deleteWatchList: WatchListActions.onDeleteWatchList,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageWatchlist);
