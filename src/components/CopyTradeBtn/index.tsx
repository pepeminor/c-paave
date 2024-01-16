import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import React, { memo, useCallback, useState } from 'react';
import useStyles from './styles';
import OutlineRightWhite from 'assets/icon/OutlineRightWhite.svg';
import { navigate } from 'utils';
import { useAppSelector } from 'hooks';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import globalStyles, { lightColors, scaleSize } from 'styles';
import { useDispatch } from 'react-redux';
import { CopyTradeAction } from 'reduxs/CopyTrade';
import Modal from 'components/Modal';
import { ACCOUNT_TYPE } from 'global';
import useModalOrder from 'hooks/useModalOrder';
import { useFocusEffect } from '@react-navigation/native';
import NewLogo from 'components/NewLogo';
import { CopyTradeBtnProps } from './type';
import Icon from 'components/Icon';
import { WalkthroughTooltip } from 'components/WalkthroughTooltip';
import CopyTradeBtnDisabled from './CopyTradeBtnDisabled';
import ModalKISRequired from './components/ModalKISRequired.component';
import ModalNeedToUnSub from './components/ModalNeedToUnSub.component';
import useSubAccountSelector from 'hooks/useSubAccountSelector';
import { store } from 'screens/App';

const OptionalBtnHeight = scaleSize(34);

export const getBotInfo = (username: string) => {
  const state = store.getState();
  const botData = Object.values(state.Advisor.map).find(bot => bot?.en?.username === username);
  return botData?.[state.lang];
};

const CopyTradeBtn = memo(({ followingType, followingUsername, followingFullName }: CopyTradeBtnProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { styles } = useStyles();

  const [visibleModal, setVisibleModal] = useState(false);

  const { subAccountNumber, selectedAccountType, subscribeForCurrentSub, isSubscribed, subAccountIsSubscribed } =
    useAppSelector(state => {
      const selectedAccountType = state.selectedAccount.type;
      const subAccountNumber = state.selectedAccount.selectedSubAccount?.accountNumber;
      const subscribeForCurrentSub = state.copyTrade.subscription[subAccountNumber ?? ''];
      const isSubscribed = (() => {
        if (subAccountNumber == null) return false;
        if (followingType !== 'Advisor') return subscribeForCurrentSub?.followingID.match(/^AIRating/) != null;
        return subscribeForCurrentSub != null && subscribeForCurrentSub.followingID === followingUsername;
      })();
      const subAccountIsSubscribed = !isSubscribed && subscribeForCurrentSub != null;
      return {
        selectedAccountType,
        subAccountNumber,
        subscribeForCurrentSub,
        isSubscribed,
        subAccountIsSubscribed,
      };
    });

  const { isSubD } = useSubAccountSelector();

  const { showMoreBtnAnimatedStyle, moreOptionAnimatedStyle, handleShowMore, hideOptionalBtn } = useButtonAnimation();

  const handleModal = useCallback(() => {
    setVisibleModal(pre => !pre);
  }, []);

  const onPressBtn = useCallback(() => {
    if (selectedAccountType !== ACCOUNT_TYPE.KIS || subAccountIsSubscribed) {
      handleModal();
      return;
    }
    navigate({
      key: 'CopyTradeScreen',
      params: { isFormDisabled: isSubscribed, followingType, followingUsername, followingFullName },
    });
  }, [isSubscribed, selectedAccountType, followingType, followingUsername, followingFullName, subAccountIsSubscribed]);

  const editCopyTrade = useCallback(() => {
    navigate({ key: 'CopyTradeScreen', params: { isEdit: true, followingType, followingUsername, followingFullName } });
    handleShowMore();
  }, [followingType, followingUsername, followingFullName]);

  const stopCopyTrade = useCallback(() => {
    dispatch(
      CopyTradeAction.unSubscribeCopyTrade({
        callBack: {
          handleSuccess: handleShowMore,
        },
      })
    );
  }, []);

  const [ModalStopCopyTrade, onVisibleModalStopCopyTrade] = useModalOrder({
    title: 'Stop auto copy trade',
    onConfirm: stopCopyTrade,
    confirmText: 'Yes',
    ListContentModal: (
      <View style={globalStyles.alignCenter}>
        <Text allowFontScaling={false}>{t('Do you want to stop auto copy trade')}?</Text>
      </View>
    ),
  });

  const openModalStopCopyTrade = useCallback(() => {
    onVisibleModalStopCopyTrade();
  }, [onVisibleModalStopCopyTrade]);

  useFocusEffect(
    useCallback(() => {
      hideOptionalBtn();
    }, [subAccountNumber])
  );

  if (isSubD) return null;

  return (
    <View style={styles.copyTradeBtnContainer}>
      <TouchableOpacity
        style={[styles.copyTradeBtnWrapper, isSubscribed && styles.copyTradeBtnWrapperSubscribed]}
        onPress={onPressBtn}
      >
        <Animated.View style={[styles.copyTradeMoreOptionContainer, moreOptionAnimatedStyle]}>
          <TouchableOpacity style={styles.optionContainer} onPress={editCopyTrade}>
            <Text allowFontScaling={false} style={styles.optionText}>
              {t('Edit Auto Trade')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.optionContainer, styles.ml16]} onPress={openModalStopCopyTrade}>
            <Text allowFontScaling={false} style={styles.optionText}>
              {t('Stop Auto Trade')}
            </Text>
          </TouchableOpacity>
        </Animated.View>
        <View style={styles.copyTradeBtn}>
          {subAccountIsSubscribed && (
            <WalkthroughTooltip
              style={styles.infoButton}
              content={
                subscribeForCurrentSub.followingID.match(/^AIRating/) != null
                  ? t('You are auto copy AI Rating')
                  : `${t('You are auto copy robo')} ${getBotInfo(subscribeForCurrentSub.followingID)?.fullname ?? ''}`
              }
              placement="top"
              absoluteTooltip={true}
              topAdjustment={scaleSize(-16)}
            >
              <Icon name={'info'} color={lightColors.WHITE} size={24} />
            </WalkthroughTooltip>
          )}
          <Text allowFontScaling={false} style={styles.copyTradeBtnText}>
            {t(
              followingType === 'Advisor'
                ? isSubscribed
                  ? 'You are auto copying this Robo Advisor'
                  : 'Auto copy trade this Robo Advisor'
                : isSubscribed
                ? 'You are auto copying Top 5 AI Rating strategy'
                : 'Auto copy trade following AI Rating'
            )}
          </Text>
          {isSubscribed && (
            <TouchableOpacity style={styles.copyTradeMoreOptionBtn} onPress={handleShowMore}>
              <Animated.View style={showMoreBtnAnimatedStyle}>
                <OutlineRightWhite />
              </Animated.View>
            </TouchableOpacity>
          )}
        </View>
        {!isSubscribed && <NewLogo position={'absolute'} />}
      </TouchableOpacity>
      <Modal visible={visibleModal} onRequestClose={handleModal}>
        <View style={styles.modalContainer}>
          {subAccountIsSubscribed ? (
            <ModalNeedToUnSub followingID={subscribeForCurrentSub.followingID} closeModal={handleModal} />
          ) : (
            <ModalKISRequired
              handleModal={handleModal}
              followingType={followingType}
              followingFullName={followingFullName}
              followingUsername={followingUsername}
            />
          )}
          <TouchableWithoutFeedback onPress={handleModal}>
            <View style={[globalStyles.invisibleBackground, styles.modalBackground]} />
          </TouchableWithoutFeedback>
        </View>
      </Modal>
      {ModalStopCopyTrade}
    </View>
  );
});

export default function (props: CopyTradeBtnProps) {
  const { followingType } = props;
  const isFeatureEnabled = useAppSelector(state => state.featureConfiguration?.AdvisorCopyTrade.enabled);
  if (followingType === 'Advisor') {
    return isFeatureEnabled ? <CopyTradeBtn {...props} /> : <CopyTradeBtnDisabled />;
  }
  return <CopyTradeBtn {...props} />;
}

function useButtonAnimation() {
  const openState = useSharedValue(0);
  const showMoreBtnAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scaleX: withTiming(-openState.value * 2 + 1) }],
    };
  });
  const moreOptionAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(openState.value * OptionalBtnHeight),
      marginBottom: withTiming(openState.value * 10),
      opacity: withTiming(openState.value),
    };
  });

  const handleShowMore = useCallback(() => {
    openState.value = openState.value === 0 ? 1 : 0;
  }, []);

  const hideOptionalBtn = useCallback(() => {
    openState.value = 0;
  }, []);

  return {
    showMoreBtnAnimatedStyle,
    moreOptionAnimatedStyle,
    handleShowMore,
    hideOptionalBtn,
  };
}
