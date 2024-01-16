import React, { useCallback } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import globalStyles, { scaleSize } from 'styles';
import HighLightIndexItem from './HighLightIndexItem';
import useStyles from '../styles';
import withMemo from 'HOC/withMemo';
import { useAppSelector } from 'hooks/useAppSelector';
import { SymbolDataSelector } from 'reduxs/SymbolData';
import useSubscribeSymbol from 'hooks/useSubscribeSymbol';
import OutlineUp from 'assets/icon/OutlineUp.svg';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

const IndexHeight = {
  normal: scaleSize(115),
  extended: scaleSize(205),
};

const Indices = () => {
  const { styles } = useStyles();
  const highLightIndexList = useAppSelector(state =>
    SymbolDataSelector.selectHighlightIndex(state).map(el => el.symbolCode)
  );
  useSubscribeSymbol(highLightIndexList, ['BID_OFFER', 'QUOTE'], true);

  const showDetail = useSharedValue(false);
  const viewAnimatedStyle = useAnimatedStyle(() => ({
    height: withSpring(showDetail.value ? IndexHeight.extended : IndexHeight.normal, { damping: 10, stiffness: 150 }),
  }));
  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateX: withTiming(showDetail.value ? '0deg' : '180deg') }],
  }));

  const toggleShowDetail = useCallback(() => {
    showDetail.value = !showDetail.value;
  }, []);

  return (
    <Animated.View style={[styles.listIndexChartContainer, viewAnimatedStyle]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={globalStyles.flexDirectionRow}>
        {highLightIndexList.map((el, idx) => (
          <HighLightIndexItem key={idx} code={el} showDetail={showDetail} />
        ))}
      </ScrollView>
      <Animated.View style={iconAnimatedStyle}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
          }}
          onPress={toggleShowDetail}
        >
          <OutlineUp />
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

export default withMemo(Indices);
