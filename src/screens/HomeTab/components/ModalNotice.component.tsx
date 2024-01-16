import React, { useCallback } from 'react';
import withMemo from 'HOC/withMemo';
import Modal from 'components/Modal';
import { ImageBackground, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, View } from 'react-native';
import { scaleSize } from 'styles';
import { LANG } from 'global';
import { getStylesHook } from 'hooks/useStyles';
import { useAppSelector } from 'hooks/useAppSelector';
import IconClose from 'assets/icon/close.svg';
import { lightColors } from 'styles';
import { hideNotice } from 'reduxs/global-actions/Notice';
import { useDispatch } from 'react-redux';

const ModalNotice = () => {
  const dispatch = useDispatch();
  const lang = useAppSelector(state => state.lang);
  const noticeShow = useAppSelector(state => state.noticeShow);
  const { styles } = useStyles();

  const onClose = useCallback(() => {
    dispatch(hideNotice({}));
  }, []);

  if (!noticeShow) return null;

  return (
    <Modal
      visible={noticeShow}
      childrenContent={
        <TouchableHighlight onPress={onClose} style={styles.noticeContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.noticeImgContainer}>
              <ImageBackground
                resizeMode="cover"
                source={
                  lang === LANG.VI ? require('assets/notice/500BannerVI.png') : require('assets/notice/500BannerEN.png')
                }
                style={styles.imgStyle}
              >
                <TouchableOpacity style={styles.buttonClose} onPress={onClose}>
                  <IconClose width={scaleSize(24)} height={scaleSize(24)} />
                </TouchableOpacity>
              </ImageBackground>
            </View>
          </TouchableWithoutFeedback>
        </TouchableHighlight>
      }
    />
  );
};

const useStyles = getStylesHook({
  noticeContainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: lightColors.BACKGROUND_MODAL2,
    justifyContent: 'center',
  },
  noticeImgContainer: {
    height: 440,
  },
  buttonClose: {
    position: 'absolute',
    width: 34,
    height: 34,
    backgroundColor: lightColors.LIGHTRed,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    top: 5,
    right: 5,
  },
  imgStyle: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
});

export default withMemo(ModalNotice);
