import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View, StyleProp, ViewStyle, Platform, Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { IState } from 'reduxs/global-reducers';

import Modal from '../Modal';
import globalStyles, { height } from 'styles';
import useStyles from './styles';

interface TPropsModalOrder {
  keyboardHeight: number;
  ListContentModal?: React.ComponentType<any> | React.ReactElement | null | undefined;
  isVisible: boolean;

  backgroundStyle?: StyleProp<ViewStyle>;
  onDisabled: boolean;
  errorDisabled: boolean;
  errorDisabledText: boolean;
  textButton: string;

  errorExit?: boolean;
  errorExitContent?: string;

  onConfirm: () => void;
  onCancel?: () => void;
}

const ModalOTP = (props: TPropsModalOrder) => {
  const { t } = useTranslation();
  const { styles } = useStyles();

  const onPressConfirm = () => {
    props.onConfirm();
  };

  const onPressCancel = () => {
    props.onCancel?.();
  };

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <Modal
      visible={props.isVisible}
      onRequestClose={onPressCancel}
      childrenContent={
        <TouchableWithoutFeedback onPress={hideKeyboard}>
          <View
            style={[
              Platform.OS === 'android' ? globalStyles.container : { height: height - props.keyboardHeight },
              globalStyles.centered,
              globalStyles.flexDirectionRow,
              styles.modalBackground,
              props.backgroundStyle,
            ]}
          >
            <View style={[globalStyles.justifyCenter, styles.modalContentContainer, styles.modalBackground]}>
              <View>
                {props.ListContentModal}
                {props.errorExit === true && (
                  <View style={[styles.errorExitStyle]}>
                    <Text allowFontScaling={false} style={[styles.errorExitContentStyle]}>
                      {props.errorExitContent != null ? t(props.errorExitContent) : undefined}
                    </Text>
                  </View>
                )}
              </View>

              <View style={[globalStyles.fillWidth, styles.marginBottom]}>
                <TouchableOpacity
                  disabled={props.onDisabled}
                  onPress={onPressConfirm}
                  style={[
                    globalStyles.centered,
                    styles.executeFormButton2,
                    { ...(props.errorDisabled && styles.disabledButton) },
                  ]}
                >
                  <Text
                    allowFontScaling={false}
                    style={[
                      styles.executeFormButtonText2,
                      { ...(props.errorDisabledText && styles.disabledButtonText) },
                    ]}
                  >
                    {t(props.textButton)}
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
        </TouchableWithoutFeedback>
      }
    />
  );
};

const mapStateToProps = (state: IState) => ({
  keyboardHeight: state.keyboardHeight,
});

export default memo(connect(mapStateToProps, null)(ModalOTP));
