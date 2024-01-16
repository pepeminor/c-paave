import { connect } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import DiscoverWatchList from './DiscoverWatchList.view';
import { onEnterScreen } from './action';

export const mapStateToProps = (state: IState) => ({
  selectedWatchList: state.WatchListReducer.selectedWatchList,
  selectedWatchlistSymbolList: state.WatchListReducer.selectedWatchlistSymbolList,
  selectedAccountType: state.selectedAccount.type,
});

export const mapDispatchToProps = {
  onEnterScreen,
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverWatchList);
