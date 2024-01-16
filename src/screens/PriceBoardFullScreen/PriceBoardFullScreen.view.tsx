import React, { useCallback, useEffect, useRef } from 'react';
import { ListRenderItem, SafeAreaView, View } from 'react-native';
import { usePriceBoardFullScreenLogic } from './PriceBoardFullScreen.logic';
import useStyles from './PriceBoardFullScreen.style';
import { IProps, ItemHeight } from './PriceBoardFullScreen.type';
import withMemo from 'HOC/withMemo';
import Animated, { FadeInDown } from 'react-native-reanimated';
import PriceBoardSelector from 'components/PriceBoardSelector';
import useSubscribeSymbol from 'hooks/useSubscribeSymbol';
import { throttle } from 'lodash';
import { CommonHeader, CommonRow } from './components/CommonBoard';
import { IndexHeader, IndexRow } from './components/IndexBoard';
import LazyFlatList from 'components/LazyFlatList';
import Orientation from 'react-native-orientation-locker';
import { useIsFocused } from '@react-navigation/native';
/**
 * The number of items to render before and after the visible area
 */
const ScrollViewRenderOffset = 5;

const PriceBoardFullScreen = (props: IProps) => {
  const priceBoardType = props.route.params.priceBoardType;
  const isFocused = useIsFocused();
  const { state, handlers, symbolList, flatListRef } = usePriceBoardFullScreenLogic(props);
  const { styles } = useStyles();

  useSubscribeSymbol(symbolList.slice(state.startRenderIndex, state.endRenderIndex), ['BID_OFFER', 'QUOTE'], true);

  useEffect(() => {
    if (!isFocused) return;
    Orientation.lockToLandscapeLeft();
  }, [isFocused]);

  useEffect(() => {
    return () => {
      Orientation.lockToPortrait();
    };
  }, []);

  const throttledSetRange = useRef(
    throttle(
      (startIndex: number, endIndex: number) => {
        handlers.setRenderRange({ startIndex, endIndex });
      },
      200,
      { trailing: true }
    )
  ).current;

  const renderCommonRow: ListRenderItem<string> = useCallback(
    ({ item }) => (
      <CommonRow key={item} symbolCode={item} priceChangeType={state.priceChangeType} totalType={state.totalType} />
    ),
    [state.priceChangeType, state.totalType]
  );

  const renderIndexRow: ListRenderItem<string> = useCallback(
    ({ item }) => <IndexRow key={item} symbolCode={item} />,
    []
  );

  const getFlatListLayout = useCallback((_, index: number) => {
    return {
      length: ItemHeight,
      offset: ItemHeight * index,
      index,
    };
  }, []);

  const onScroll = useCallback(
    e => {
      const scrollViewHeight = e.nativeEvent.layoutMeasurement.height;
      const startPosition = e.nativeEvent.contentOffset.y;
      const endPosition = startPosition + scrollViewHeight;
      const startIndex = Math.floor(startPosition / ItemHeight) - ScrollViewRenderOffset;
      const endIndex = Math.floor(endPosition / ItemHeight) + ScrollViewRenderOffset;
      throttledSetRange(startIndex < 0 ? 0 : startIndex, endIndex);
    },
    [throttledSetRange]
  );

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Animated.View style={styles.container} entering={FadeInDown.delay(400).duration(300)}>
        <PriceBoardSelector
          priceBoardType={priceBoardType}
          value={state.selectedList}
          onChange={handlers.setSelectedList}
        />
        <View style={styles.priceBoardContainer}>
          {state.selectedList !== 'All Indices' && (
            <CommonHeader
              priceChangeType={state.priceChangeType}
              totalType={state.totalType}
              togglePriceChangeType={handlers.togglePriceChangeType}
              toggleTotalType={handlers.toggleTotalType}
            />
          )}
          {state.selectedList === 'All Indices' && <IndexHeader />}
          {state.navigationDone && (
            <LazyFlatList
              data={symbolList}
              renderItem={state.selectedList === 'All Indices' ? renderIndexRow : renderCommonRow}
              onScroll={onScroll}
              getItemLayout={getFlatListLayout}
              initialNumToRender={15}
              scrollEventThrottle={200}
              ref={flatListRef}
              limit={30}
            />
          )}
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default withMemo(PriceBoardFullScreen);
