import { connect } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import Watchlist from './Watchlist.view';
import { WatchListActions } from 'reduxs';

export const mapStateToProps = (state: IState) => ({
  selectedWatchlistSymbolList: state.WatchListReducer.selectedWatchlistSymbolList,
  selectedWatchList: state.WatchListReducer.selectedWatchList,
  selectedAccount: state.selectedAccount,
  watchListType: state.WatchListReducer.watchListType,
});

export const mapDispatchToProps = {
  changeTypeWatchList: WatchListActions.onChangeType,
};

export default connect(mapStateToProps, mapDispatchToProps)(Watchlist);
