import React, { useCallback, useEffect, useState } from 'react';
import withMemo from 'HOC/withMemo';
import Modal from 'components/Modal';
import { ImageBackground, Pressable, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Colors } from 'styles';
import { LANG } from 'global';
import { getStylesHook } from 'hooks/useStyles';
import { useAppSelector } from 'hooks/useAppSelector';
import IconClose from 'assets/icon/close.svg';
import BottomButton from 'components/BottomButton';
import { useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { navigationRef, getKey, setKey } from 'utils';
import { storageKey } from 'constants/enum';
import { CopyTradeAction } from 'reduxs/CopyTrade';
import { useTranslation } from 'react-i18next';

const ModalCopyTrade = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { styles } = useStyles();

  const [visible, setVisible] = useState(false);

  const lang = useAppSelector(state => state.lang);
  const isShowModalOTPKIS = useAppSelector(state => state.displayModalOTPPortfolio);
  const copyTradeBannerStatus = useAppSelector(state => state.copyTrade.copyTradeBanner);

  const isNotShowAgain = async () => await getKey(storageKey.NOT_SHOW_AGAIN_BANNER_COPY_TRADE);

  const handleTryNow = () => {
    handleClose();
    navigationRef.navigate('AIRating');
  };

  const handleClose = useCallback(() => {
    dispatch(CopyTradeAction.closeCopyTradeBanner());
    setVisible(false);
  }, []);

  const doNotShowAgain = useCallback(async () => {
    handleClose();
    await setKey(storageKey.NOT_SHOW_AGAIN_BANNER_COPY_TRADE, true);
  }, [handleClose]);

  const handleBanner = useCallback(async () => {
    // case: Do Not Show Again
    if (await isNotShowAgain()) return handleClose();

    // case: Check open After Close OTP Kis
    if (isShowModalOTPKIS) return;
    setVisible(copyTradeBannerStatus);
  }, [isFocused, isNotShowAgain, isShowModalOTPKIS, copyTradeBannerStatus, handleClose]);

  useEffect(() => {
    handleBanner();
  }, [handleBanner]);

  useEffect(() => {
    return () => {
      setVisible(false);
    };
  }, []);

  return (
    <Modal
      visible={visible}
      childrenContent={
        <Pressable onPress={handleClose} style={[styles.wrapModal]}>
          <TouchableWithoutFeedback>
            <ImageBackground
              resizeMode="contain"
              style={styles.wrapImage}
              source={
                lang === LANG.VI
                  ? require('assets/img/BannerPopUpCopyTrade-vi.png')
                  : require('assets/img/BannerPopUpCopyTrade-en.png')
              }
            >
              <TouchableOpacity onPress={handleClose} style={[styles.wrapIconClose]}>
                <IconClose />
              </TouchableOpacity>
            </ImageBackground>
          </TouchableWithoutFeedback>
          <BottomButton text="Try now" onPress={handleTryNow} containerStyle={styles.wrapBtnTryNow} />
          <TouchableOpacity onPress={doNotShowAgain}>
            <Text
              allowFontScaling={false}
              style={{ textAlign: 'center', fontWeight: 'bold', textDecorationLine: 'underline', color: Colors.WHITE }}
            >
              {t('Do not show again')}
            </Text>
          </TouchableOpacity>
        </Pressable>
      }
    />
  );
};

const useStyles = getStylesHook({
  wrapModal: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  wrapImage: {
    alignSelf: 'center',
    position: 'relative',
    width: 343,
    height: 428,
  },
  wrapIconClose: {
    position: 'absolute',
    top: 0,
    right: 18,
  },
  wrapCheckBox: {
    flexDirection: 'row',
    marginTop: 4,
    justifyContent: 'center',
  },
  wrapBtnTryNow: {
    paddingVertical: 8,
    backgroundColor: 'transparent',
  },
  checkBoxText: {
    color: Colors.WHITE,
    fontSize: 12,
  },
});

export default withMemo(ModalCopyTrade);
