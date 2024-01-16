import { mapDispatchToProps, mapStateToProps } from './index';
import { MapStateToProps } from 'constants/type';

export type IProps = typeof mapDispatchToProps & MapStateToProps<typeof mapStateToProps>;
