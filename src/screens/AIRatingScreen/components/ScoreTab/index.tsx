import { memo } from 'react';
import ScoreTab from './ScoreTab.view';
import { connect } from 'react-redux';
import { IState } from 'reduxs/global-reducers';

export const mapStateToProps = (state: IState) => ({
  dataAIRating: state.AIRatingReducer.dataAIRating,
  indexStockList: state.SymbolData.indexStockList,
  selectedAccount: state.selectedAccount,
  filterStock: state.AIRatingReducer.stockFilter,
});

export const mapDispatchToProps = {};

export default memo(connect(mapStateToProps, mapDispatchToProps)(ScoreTab));
