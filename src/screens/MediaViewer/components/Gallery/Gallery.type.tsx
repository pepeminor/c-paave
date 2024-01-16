import { ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { IImage } from 'reduxs';

export interface Dimensions {
  height: number;
  width: number;
}

export interface RenderItemInfo<T> {
  index: number;
  item: T;
  setImageDimensions(imageDimensions: Dimensions): void;
}

export interface EventsCallbacks {
  onSwipeToClose?(): void;
  onTap?(): void;
  onDoubleTap?(): void;
  onScaleStart?(): void;
  onPanStart?(): void;
}

export type RenderItem<T> = (imageInfo: RenderItemInfo<T>) => React.ReactElement | null;

export interface ItemRef {
  reset(animated: boolean): void;
}

export interface GalleryRef {
  setIndex(newIndex: number): void;
  reset(animated?: boolean): void;
}

export type GalleryReactRef = React.Ref<GalleryRef>;

export type IDataGallery = IImage;

export type GalleryProps = EventsCallbacks & {
  ref?: any;
  data: IDataGallery[];
  renderItem?: RenderItem<IImage>;
  keyExtractor?(item: IImage, index: number): string | number;
  initialIndex?: number;
  onIndexChange?(index: number): void;
  numToRender?: number;
  emptySpaceWidth?: number;
  doubleTapScale?: number;
  doubleTapInterval?: number;
  maxScale?: number;
  style?: ViewStyle;
  containerDimensions?: { width: number; height: number };
  pinchEnabled?: boolean;
  disableTransitionOnScaledImage?: boolean;
  hideAdjacentImagesOnScaledImage?: boolean;
  disableVerticalSwipe?: boolean;
  disableSwipeUp?: boolean;
  loop?: boolean;
  onScaleChange?(scale: number): void;
  onScaleChangeRange?: { start: number; end: number };
  triggerAnimation: Animated.SharedValue<number>;
};
