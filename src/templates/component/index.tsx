import { connect } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import TemplateName from './TemplateName.view';

export const mapStateToProps = (state: IState) => ({
  userInfo: state.loginData?.userInfo,
});

export const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TemplateName);
