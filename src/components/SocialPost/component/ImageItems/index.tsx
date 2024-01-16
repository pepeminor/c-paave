import { connect } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import ImageItems from './ImageItems.view';

export const mapStateToProps = (_state: IState) => ({});

export const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ImageItems);
