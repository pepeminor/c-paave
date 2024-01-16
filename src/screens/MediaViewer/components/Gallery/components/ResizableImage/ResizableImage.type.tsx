import Animated from 'react-native-reanimated';
import { EventsCallbacks, ItemRef, IDataGallery, RenderItem } from '../../Gallery.type';

export type IOutter = EventsCallbacks & {
  item: IDataGallery;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  translateX: Animated.SharedValue<number>;
  currentIndex: Animated.SharedValue<number>;
  renderItem: RenderItem<IDataGallery>;
  width: number;
  height: number;
  length: number;
  emptySpaceWidth: number;
  doubleTapInterval: number;
  doubleTapScale: number;
  maxScale: number;
  pinchEnabled: boolean;
  disableTransitionOnScaledImage: boolean;
  hideAdjacentImagesOnScaledImage: boolean;
  disableVerticalSwipe?: boolean;
  disableSwipeUp?: boolean;
  loop: boolean;
  onScaleChange?(scale: number): void;
  onScaleChangeRange?: { start: number; end: number };
  setRef({ index, value }: { index: number; value: ItemRef }): void;
  triggerAnimation: Animated.SharedValue<number>;
};

export type IProps = IOutter;
