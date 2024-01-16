import React, { memo, useRef, useCallback, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Platform,
  ViewProps,
} from 'react-native';
import useStyles from './styles';
import { scaleSize } from 'styles';
import { useTranslation } from 'react-i18next';
import useUpdateEffect from 'hooks/useUpdateEffect';

export interface ScrollPicker extends ViewProps {
  currentItem: number;
  data: string[];
  containerHeight: number;

  setCurrentItem: (item: number) => void;
  confirmCurrentItem: (item: number) => void;
}

function ScrollPicker({
  currentItem,
  data,
  containerHeight,
  setCurrentItem,
  confirmCurrentItem,
  style: viewStyles,
  ...viewProps
}: ScrollPicker) {
  const flatLstRef = useRef<FlatList>(null);
  const { t } = useTranslation();
  const { styles } = useStyles();

  useEffect(() => {
    setTimeout(() => {
      flatLstRef.current?.scrollToOffset({ animated: true, offset: scaleSize(currentItem * 50) });
    }, 200);
  }, []);

  useUpdateEffect(() => {
    flatLstRef.current?.scrollToOffset({ animated: true, offset: scaleSize(currentItem * 50) });
  }, [currentItem]);

  const chooseItem = (item = 0) => {
    item = clamp(0, item, data.length - 1);
    setCurrentItem(item);
  };

  const chooseItemByScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (event.nativeEvent) {
      const contentOffset = event.nativeEvent.contentOffset.y;
      const scrollIndex = Math.round(contentOffset / scaleSize(50));
      chooseItem(scrollIndex);
    }
  }, []);

  function handleItemPressed(index = 0) {
    return () => {
      if (index === currentItem) confirmCurrentItem(index);
      else chooseItem(index);
    };
  }

  function renderItem({ item, index }: { item: string; index: number }) {
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={handleItemPressed(index)}>
        <Text allowFontScaling={false} style={index === currentItem ? styles.chosenItemText : styles.normalItemText}>
          {t(item)}
        </Text>
      </TouchableOpacity>
    );
  }

  const BlankComponent = memo(() => (
    <View
      style={{
        height: containerHeight / 2 - scaleSize(25),
      }}
    />
  ));

  return (
    <View style={[viewStyles, { height: containerHeight }]} {...viewProps}>
      <FlatList
        ref={flatLstRef}
        keyExtractor={(_item, index) => `${index}`}
        data={data}
        renderItem={renderItem}
        ListHeaderComponent={BlankComponent}
        ListFooterComponent={BlankComponent}
        initialScrollIndex={0}
        showsVerticalScrollIndicator={false}
        onScrollEndDrag={Platform.OS === 'ios' ? chooseItemByScroll : undefined}
        onMomentumScrollEnd={Platform.OS === 'android' ? chooseItemByScroll : undefined}
      />
      <View style={[styles.centerBar, { top: containerHeight / 2 - scaleSize(20) }]} />
    </View>
  );
}

export default memo(ScrollPicker);

const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);
