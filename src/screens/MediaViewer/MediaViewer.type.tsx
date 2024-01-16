import { StackScreenProps } from 'screens/RootNavigation';
import ScreenNames from 'screens/RootNavigation/ScreenNames';

interface IInner extends StackScreenProps<ScreenNames.MediaViewer> {}

interface IOutter {}

export type IProps = IInner & IOutter;
