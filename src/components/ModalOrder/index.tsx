import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Text,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import globalStyles, { height } from 'styles';
import useStyles from './styles';
import Modal from '../Modal';

export interface TPropsModalOrder {
  keyboardHeight: number;
  ListContentModal?: Element;
  title?: string;
  confirmText: string;
  isVisible: boolean;
  disabledExecuteButton?: boolean;
  isDisableWholeForm?: boolean;

  backgroundStyle?: StyleProp<ViewStyle>;

  onConfirm: () => void;
  onCancel?: () => void;
}

const ModalOrder = ({
  title,
  confirmText,
  backgroundStyle,
  ListContentModal,
  isVisible,
  onConfirm,
  onCancel,
  disabledExecuteButton,
  keyboardHeight,
  isDisableWholeForm,
}: TPropsModalOrder) => {
  const { t } = useTranslation();
  const { styles } = useStyles();

  const onPressConfirm = () => {
    onConfirm();
  };

  const onPressCancel = () => {
    onCancel?.();
  };

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <Modal
      visible={isVisible}
      onRequestClose={onPressCancel}
      childrenContent={
        <TouchableWithoutFeedback onPress={hideKeyboard} disabled={isDisableWholeForm === true ? true : false}>
          <View
            style={[
              Platform.OS === 'android' ? globalStyles.container : { height: height - keyboardHeight },
              globalStyles.centered,
              globalStyles.flexDirectionRow,
              styles.modalBackground,
              backgroundStyle,
            ]}
          >
            <View style={[globalStyles.justifyCenter, styles.modalContentContainer]}>
              {title && (
                <View style={[globalStyles.centered, styles.modalTitle]}>
                  <Text allowFontScaling={false} style={[styles.modalTitleText]}>
                    {t(title)}
                  </Text>
                </View>
              )}
              <View style={[styles.modalContent, styles.containerContent]}>
                <View style={styles.content}>{ListContentModal}</View>
                <View style={[globalStyles.fillWidth, styles.marginBottom]}>
                  <TouchableOpacity
                    disabled={disabledExecuteButton}
                    onPress={onPressConfirm}
                    style={[
                      globalStyles.centered,
                      styles.executeFormButton2,
                      disabledExecuteButton === true && globalStyles.disableBackground,
                    ]}
                  >
                    <Text allowFontScaling={false} style={styles.executeFormButtonText2}>
                      {t(confirmText)}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={[globalStyles.fillWidth]}>
                  <TouchableOpacity
                    onPress={onPressCancel}
                    style={[globalStyles.centered, styles.cancelExecuteFormButton2]}
                  >
                    <Text allowFontScaling={false} style={styles.cancelExecuteFormButtonText2}>
                      {t('Cancel')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      }
    />
  );
};

const mapStateToProps = (state: IState) => ({
  keyboardHeight: state.keyboardHeight,
});

export default memo(connect(mapStateToProps, null)(ModalOrder));
