import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useEffect, useRef } from 'react';
import { IChangeNativeAndroid, IProps } from './TradeScreen.type';
import { Keyboard, LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent, ScrollView } from 'react-native';
import useSubscribeSymbol from 'hooks/useSubscribeSymbol';
import useUpdateEffect from 'hooks/useUpdateEffect';
import { useIsFocused } from '@react-navigation/native';
import { IS_ANDROID, IS_IOS } from 'constants/main';
import { ITempListPriceType, TradeFormRef } from './components/TradeFormLayout/components/TradeForm/TradeForm.type';
import { InputAccessoryViewID } from 'constants/enum';
import { insertObjectIf, isCloseToBottom } from 'utils';
import { throttle } from 'lodash';
import { EndReachedEventHandler } from './TradeScreen.helper';

const initializeState = {
  refreshing: false,
  dataErrorModalVisible: false,
  priceAccessoriesData: [] as ITempListPriceType[],
  nativeIDForAndroid: InputAccessoryViewID.PRICE,
};

const useTradeScreenLogic = (props: IProps) => {
  const propsRef = useRef({
    ...props,
    ...initializeState,
  });
  propsRef.current = { ...propsRef.current, ...props };
  const [state, setState] = useMergingState(initializeState, propsRef);
  const isFocused = useIsFocused();
  const scrollRef = useRef<ScrollView>(null);
  const tradeFormRef = useRef<TradeFormRef>(null);
  const screenHeight = useRef(0);
  const throttledOnEndReached = useRef(throttle(EndReachedEventHandler.onEndReached, 1000, { trailing: true })).current;

  useSubscribeSymbol([props.currentSymbol?.symbolCode], ['BID_OFFER', 'QUOTE']);

  const handlers = useHandlers({
    onLayout: (event: LayoutChangeEvent) => {
      const { height } = event.nativeEvent.layout;
      screenHeight.current = height;
    },

    goToSearchSymbol: () => {
      propsRef.current.navigation.navigate('SearchSymbol');
    },
    goToUserInfo: () => {
      propsRef.current.navigation.navigate('UserInfo');
    },
    onRefresh: () => {
      setState({
        refreshing: true,
      });

      setTimeout(() => {
        setState({
          refreshing: false,
        });
      }, 1000);
    },
    onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      IS_ANDROID && Keyboard.dismiss();
      if (isCloseToBottom(e.nativeEvent)) {
        throttledOnEndReached();
      }
    },
    scrollToTop: () => {
      if (scrollRef == null) return;
      scrollRef?.current?.scrollTo?.({
        y: 0,
        animated: true,
      });
    },
    hideDataErrorModal: () => {
      setState({ dataErrorModalVisible: false });
    },
    onChangeNativeIDForAndroid: ({ nativeID, tempListPrice }: IChangeNativeAndroid) => {
      setState({
        ...insertObjectIf(nativeID, { nativeIDForAndroid: nativeID }),
        ...insertObjectIf(tempListPrice, { priceAccessoriesData: tempListPrice }),
      });
    },
    onPressAccessories: ({ item, nativeID }: { item: ITempListPriceType; nativeID: InputAccessoryViewID }) => {
      tradeFormRef.current?.setPrice({ item, nativeID });
    },
  });

  useUpdateEffect(() => {
    if (isFocused) {
      handlers.scrollToTop();
    }
  }, [isFocused, props.currentSymbol?.symbolCode]);

  useEffect(() => {
    if (props.profitLossStockCodes?.length > 0 && props.route.name === 'Trade') {
      props.setCurrentSymbol(props.profitLossStockCodes, false);
    }
  }, []);

  useUpdateEffect(() => {
    if (props.keyboardHeight > 0 && IS_IOS) {
      if (scrollRef?.current != null) {
        scrollRef.current.scrollTo({
          y: props.isRealAccount ? 500 : 330,
          animated: true,
        });
      }
    } else {
      IS_IOS && handlers.scrollToTop();
    }
  }, [props.keyboardHeight]);

  return {
    state,
    handlers,
    refs: {
      scrollRef,
      tradeFormRef,
      screenHeight,
    },
  };
};

export { useTradeScreenLogic };
