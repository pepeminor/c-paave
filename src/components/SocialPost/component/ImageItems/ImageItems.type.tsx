// eslint-disable-next-line @typescript-eslint/no-empty-interface
import { IMediaData } from 'reduxs';
import { mapDispatchToProps, mapStateToProps } from './index';
import { MapStateToProps } from 'constants/type';
import { ImageResizeMode } from 'react-native';

type IReduxType = typeof mapDispatchToProps & MapStateToProps<typeof mapStateToProps>;

export interface IInner extends IReduxType {}

export interface IOutter {
  imageList: IMediaData;
  resizeMode?: ImageResizeMode;
}

export type IProps = IInner & IOutter;
