import { connect } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import DeleteSymbols from './DeleteSymbols.view';
import { WatchListActions } from 'reduxs';

export const mapStateToProps = (state: IState) => ({
  selectedWatchlistSymbolList: state.WatchListReducer.selectedWatchlistSymbolList,
  watchListId: state.WatchListReducer.selectedWatchList?.watchListId,
  accountType: state.selectedAccount.type,
});

export const mapDispatchToProps = {
  addMultiSymbols: WatchListActions.onAddMultiSymbols,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteSymbols);
