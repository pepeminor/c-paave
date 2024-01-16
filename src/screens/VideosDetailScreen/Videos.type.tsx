// eslint-disable-next-line @typescript-eslint/no-empty-interface
import { StackScreenProps } from 'screens/RootNavigation';
import { mapDispatchToProps, mapStateToProps } from './index';
import { MapStateToProps } from 'constants/type';
import ScreenNames from 'screens/RootNavigation/ScreenNames';

export type IProps = typeof mapDispatchToProps &
  MapStateToProps<typeof mapStateToProps> &
  StackScreenProps<ScreenNames.VideosDetailScreen>;
