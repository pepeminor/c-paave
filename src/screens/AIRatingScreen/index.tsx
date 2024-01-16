import { connect } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import AiRatingScreen from './AiRatingScreen.view';
import AdvisorList from './components/AdvisorTab/components/AdvisorList';

export const mapStateToProps = (state: IState) => ({
  selectedAccountName: state.selectedAccount?.selectedSubAccount?.accountName ?? 'NON_LOGIN',
});

export const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AiRatingScreen);

export { AdvisorList };
