import React, { useMemo } from 'react';
import { View, TouchableOpacity, ScrollView, RefreshControl, Text, Keyboard } from 'react-native';
import { useTradeScreenLogic } from './TradeScreen.logic';
import useStyles from './TradeScreen.style';
import { IProps, tempListQuantity } from './TradeScreen.type';
import withMemo from 'HOC/withMemo';
import HeaderScreen from 'components/HeaderScreen';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { navigationRef } from 'utils';
import { TabTradeSelector, TradeFormLayout } from './components';
import Icon, { IconWithBackground } from 'components/Icon';
import { IS_ANDROID, IS_IOS } from 'constants/main';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Trade_GetLabelName } from './TradeScreen.helper';
import { InputAccessoryViewID } from 'constants/enum';
import { useTranslation } from 'react-i18next';
import ItemInputAccessoriesView from './components/ItemInputAccessoriesView';
// import DataErrorModal from './components/DataErrorModal';
import InputAccessoryViewComponent from './components/InputAccessoriesView';
import HeaderTab from './components/HeaderTab.component';

const TradeScreen = (props: IProps) => {
  const { handlers, state, refs } = useTradeScreenLogic(props);
  const { styles, dynamicColors } = useStyles();
  const { navigation, currentSymbol, route } = props;
  const isNotRefresh = route.params?.isNotRefresh;
  const { scrollRef, tradeFormRef } = refs;
  const { t } = useTranslation();

  const rightButtonListIcon = useMemo(
    () => [
      <TouchableOpacity key={'rightButtonListIcon0'} onPress={handlers.goToSearchSymbol}>
        <Icon size={25} name={'search'} color={dynamicColors.WHITE}></Icon>
      </TouchableOpacity>,
    ],
    []
  );

  const leftButtonIcon = useMemo(
    () => (
      <TouchableOpacity onPress={handlers.goToUserInfo} style={styles.headerIconLeft}>
        <Icon size={25} name={'author-outline'} color={dynamicColors.WHITE}></Icon>
      </TouchableOpacity>
    ),
    []
  );

  return (
    <View style={styles.container} onLayout={handlers.onLayout}>
      <HeaderScreen
        headerTitle={'Trade'}
        subAccountVisible={true}
        leftButtonIcon={navigationRef?.getCurrentRoute()?.name === ScreenNames.Trade1 || leftButtonIcon}
        goBackAction={navigation.goBack}
        rightButtonListIcon={rightButtonListIcon}
        eachIconGap={0}
      />
      <ScrollView
        keyboardDismissMode={'interactive'}
        keyboardShouldPersistTaps={'always'}
        refreshControl={
          <RefreshControl
            refreshing={state.refreshing}
            onRefresh={handlers.onRefresh}
            enabled={currentSymbol != null}
          />
        }
        stickyHeaderIndices={[1]}
        ref={scrollRef}
        onScroll={handlers.onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <TradeFormLayout
          tradeFormRef={tradeFormRef}
          triggerReload={state.refreshing}
          navigation={props.navigation}
          route={props.route}
          nativeIDForAndroid={state.nativeIDForAndroid}
          priceAccessoriesData={state.priceAccessoriesData}
          onChangeNativeIDForAndroid={handlers.onChangeNativeIDForAndroid}
        />
        {/* Giu HeaderTab ở vị trí trên cùng khi scroll list, props stickyHeaderIndices={[1]} ở scrollView*/}
        <HeaderTab />

        <TabTradeSelector
          triggerReload={state.refreshing}
          scrollToTop={handlers.scrollToTop}
          isNotRefresh={!!isNotRefresh}
        />
      </ScrollView>
      {IS_ANDROID && props.keyboardHeight > 0 && (
        <Animated.View
          style={styles.containerInputAccessory}
          entering={FadeIn.delay(200)}
          exiting={FadeOut.duration(200)}
        >
          <Text style={styles.inputAccessoriesText}>{t(Trade_GetLabelName(state.nativeIDForAndroid))}</Text>
          <View style={styles.containerItemAccessory}>
            {state.nativeIDForAndroid === InputAccessoryViewID.QUANTITY &&
              currentSymbol?.symbolType !== 'FUTURES' &&
              tempListQuantity.map((item, index) => {
                return (
                  <ItemInputAccessoriesView
                    key={`ItemInputAccessoriesView_list1_${index}_${item.value}`}
                    item={item}
                    index={index}
                    nativeID={state.nativeIDForAndroid}
                    onPress={handlers.onPressAccessories}
                  />
                );
              })}
          </View>
          <IconWithBackground
            name={'hide-keyboard'}
            size={24}
            containerStyle={styles.iconHideKeyboard}
            onPress={Keyboard.dismiss}
            iconColor={dynamicColors.BaliHai}
          />
        </Animated.View>
      )}
      {IS_IOS && (
        <InputAccessoryViewComponent
          nativeID={InputAccessoryViewID.QUANTITY}
          priceAccessoriesData={state.priceAccessoriesData}
          onPress={handlers.onPressAccessories}
        />
      )}
      {/* //Hiện ở màn hình Trade không thấy set dataErrorModalVisible true ở trường hợp nào */}
      {/* {state.dataErrorModalVisible === true && (
        <DataErrorModal
          visible={state.dataErrorModalVisible}
          onRefresh={handlers.onRefresh}
          handleCloseErrorModal={handlers.hideDataErrorModal}
        />
      )} */}
    </View>
  );
};

export default withMemo(TradeScreen);
