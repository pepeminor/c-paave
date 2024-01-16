import { View } from 'react-native';
import React, { FunctionComponent, forwardRef, memo, useCallback, useImperativeHandle, useRef } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import DiscoverTheme from '../DiscoverTheme';
import { useStyles } from './styles';
import { DiscoverTabType } from '../constants';
import { IProps as Top100Type } from 'components/Top100Stocks/Top100Stocks.type';
import { width as screenWidth } from 'styles';

export type TabBody = {
  onTabPressed: (tab: DiscoverTabType, index: number) => void;
};

export const TabBody = memo(
  forwardRef<TabBody, unknown>((_props, ref) => {
    const { styles } = useStyles();

    const [_, setTab] = React.useState<DiscoverTabType>('StockTheme');

    const containerOffset = useSharedValue(0);
    const animatedContainerStyles = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateX: withTiming(containerOffset.value),
          },
        ],
      };
    });
    const WatchListTab = useRef<FunctionComponent>();
    const HotStockTab = useRef<FunctionComponent>();
    const Top100Tab = useRef<FunctionComponent<Top100Type>>();
    const ForeignTrading = useRef<FunctionComponent>();

    const onTabPressed = useCallback((tab: DiscoverTabType, index: number) => {
      switch (tab) {
        case 'Watchlist':
          if (WatchListTab) {
            WatchListTab.current = require('../Watchlist/index.tsx').default; //Lazy loading tab WatchListTab
          }
          break;
        case 'HotStock':
          if (HotStockTab) {
            HotStockTab.current = require('../HotStock/index.tsx').default; //Lazy loading tab WatchListTab
          }
          break;
        case 'Top100':
          if (Top100Tab) {
            Top100Tab.current = require('components/Top100Stocks/index.tsx').default; //Lazy loading tab Top100Tab
          }
          break;
        case 'ForeignTrading':
          if (ForeignTrading) {
            ForeignTrading.current = require('../ForeignTrading/index.tsx').default; //Lazy loading tab ForeignTrading
          }
          break;
      }
      containerOffset.value = -screenWidth * index;
      setTab(tab);
    }, []);

    useImperativeHandle(ref, () => ({
      onTabPressed,
    }));

    return (
      <Animated.View style={[styles.containerRow, animatedContainerStyles]}>
        <View style={styles.containerContent}>
          <DiscoverTheme />
        </View>
        <View style={styles.containerContent}>{WatchListTab.current && <WatchListTab.current />}</View>
        <View style={styles.containerContent}>{HotStockTab.current && <HotStockTab.current />}</View>
        <View style={styles.containerContent}>{Top100Tab.current && <Top100Tab.current limit={10} showHeader />}</View>
        <View style={styles.containerContent}>{ForeignTrading.current && <ForeignTrading.current />}</View>
      </Animated.View>
    );
  })
);
