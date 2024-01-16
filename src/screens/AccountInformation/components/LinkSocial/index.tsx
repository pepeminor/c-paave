import { connect } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import LinkSocial from './LinkSocial.view';
import { AuthenticationActions } from 'reduxs';

export const mapStateToProps = (_state: IState) => ({});

export const mapDispatchToProps = {
  linkSocial: AuthenticationActions.linkSocialRequest,
  unlinkSocial: AuthenticationActions.unlinkSocialRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(LinkSocial);
