/* eslint-disable @typescript-eslint/no-empty-interface */
import { mapDispatchToProps, mapStateToProps } from './index';
import { MapStateToProps } from 'constants/type';

export type IInner = typeof mapDispatchToProps & MapStateToProps<typeof mapStateToProps>;

export type IProps = IInner;
