import Modal from 'components/Modal';
import { getStylesHook } from 'hooks/useStyles';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import globalStyles, { lightColors } from 'styles';
import * as RNLocalize from 'react-native-localize';
import CodePush from 'react-native-code-push';

export interface IProps {
  isVisibleModal: boolean;
}

const ModalUpdateCodePush = (props: IProps) => {
  const { styles } = useStyles();
  const { isVisibleModal } = props;
  const getLocalesVi = RNLocalize.getLocales().some(item => item.languageCode === 'vi');

  const onPressRestartApp = () => {
    CodePush.restartApp();
  };
  return (
    <Modal
      visible={isVisibleModal}
      childrenContent={
        <View style={styles.modalBackground}>
          <View style={styles.containerBackground}>
            <Text style={styles.title}>{getLocalesVi ? 'Cập nhật mới' : 'New Update Available'}</Text>
            <View style={globalStyles.padding16}>
              <Text style={styles.subTitle}>
                {getLocalesVi
                  ? 'Cập nhật mới đã sẵn sàng. Vui lòng cài đặt để trải nghiệm ứng dụng tốt hơn.'
                  : 'An update is available. Please update for a better experience.'}
              </Text>
              <TouchableOpacity style={styles.button} onPress={onPressRestartApp}>
                <Text style={styles.confirm}>{getLocalesVi ? 'Cập nhật ngay' : 'Update Now'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      }
    />
  );
};

const useStyles = getStylesHook({
  modalBackground: {
    ...globalStyles.container,
    ...globalStyles.centered,
    ...globalStyles.flexDirectionRow,
    backgroundColor: lightColors.BACKGROUND_MODAL2,
  },
  containerBackground: {
    ...globalStyles.borderModalUpdate,
    ...globalStyles.justifyCenter,
    backgroundColor: lightColors.WHITE,
  },
  button: {
    ...globalStyles.executeFormButton,
    ...globalStyles.centered,
    backgroundColor: lightColors.BlueNewColor,
  },
  title: {
    ...globalStyles.textTitleModalUpdate,
    ...globalStyles.textAlignCenter,
    ...globalStyles.modalBackgroundUpdate2,
  },
  subTitle: {
    ...globalStyles.textModalUpdate,
    ...globalStyles.modalBackgroundUpdate,
    ...globalStyles.textColorModalUpdate,
    ...globalStyles.textFontWeightNormal,
    ...globalStyles.textAlignCenter,
  },
  confirm: {
    ...globalStyles.textModalUpdate,
    ...globalStyles.textAlignCenter,
    ...globalStyles.textColorModalUpdate2,
    ...globalStyles.textFontWeightBold,
  },
});

export default ModalUpdateCodePush;
