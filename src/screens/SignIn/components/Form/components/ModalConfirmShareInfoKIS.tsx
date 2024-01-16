import withMemo from 'HOC/withMemo';
import Modal from 'components/Modal';
import { getStylesHook } from 'hooks/useStyles';
import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import { textStyles } from 'styles';
import { lightColors } from 'styles';
import CheckBox from 'components/CheckBox';
import { insertObjectIf } from 'utils';

export interface IProps {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ModalConfirmShareInfoKis = (props: IProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const [isChecked, setIsChecked] = useState(false);

  const onPressConfirm = useCallback(() => {
    props.onConfirm();
  }, [props.onConfirm]);

  const onPressCancel = useCallback(() => {
    props.onCancel?.();
  }, [props.onCancel]);

  const onPressChecked = useCallback(() => {
    setIsChecked(!isChecked);
  }, [isChecked]);

  return (
    <Modal
      visible={props.isVisible}
      onRequestClose={onPressCancel}
      childrenContent={
        <View style={styles.container}>
          <View style={styles.containerContent}>
            <Text allowFontScaling={false} style={styles.title}>
              {t('Link account to Paave')}
            </Text>
            <Text allowFontScaling={false} style={styles.title}>
              {t('Paave requires the following permissions on your account')}
            </Text>

            <View style={styles.itemContainer}>
              <View style={styles.dot} />
              <Text allowFontScaling={false} style={styles.textItem}>
                {t('Allow Paave to view account information')}
              </Text>
            </View>

            <View style={styles.itemContainer}>
              <View style={styles.dot} />
              <Text allowFontScaling={false} style={styles.textItem}>
                {t('Allow Paave to view and edit account information')}
              </Text>
            </View>

            <View style={styles.itemContainer}>
              <View style={styles.dot} />
              <Text allowFontScaling={false} style={styles.textItem}>
                {t('Allow Paave to view the information of cash balance, stock balance')}
              </Text>
            </View>

            <View style={styles.itemContainer}>
              <View style={styles.dot} />
              <Text allowFontScaling={false} style={styles.textItem}>
                {t('Allow Paave to view your order history')}
              </Text>
            </View>

            <View style={styles.itemContainer}>
              <View style={styles.dot} />
              <Text allowFontScaling={false} style={styles.textItem}>
                {t('Allow Paave to view, place and modify your orders')}
              </Text>
            </View>

            <CheckBox value={isChecked} onPress={onPressChecked} style={styles.checkedContainer}>
              <Text allowFontScaling={false} style={styles.infoText}>
                {t('I have read, understand and agree to grant access to the application')}
              </Text>
            </CheckBox>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={{ ...styles.buttonConfirm, ...insertObjectIf(!isChecked, styles.buttonDisable) }}
                onPress={onPressConfirm}
                disabled={!isChecked}
              >
                <Text allowFontScaling={false} style={styles.textButton}>
                  {t('Confirm')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonDecline} onPress={onPressCancel}>
                <Text allowFontScaling={false} style={styles.textButton}>
                  {t('Decline')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      }
    />
  );
};

const useStyles = getStylesHook({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: lightColors.BACKGROUND_MODAL2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerContent: {
    justifyContent: 'center',
    backgroundColor: lightColors.WHITE,
    borderRadius: 21,
    width: '100%',
    padding: 16,
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: lightColors.BlueNewColor,
    marginTop: 8,
  },
  itemContainer: {
    marginTop: 16,
    flexDirection: 'row',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 4,
    backgroundColor: lightColors.BLACK,
    marginTop: 10,
  },
  textItem: {
    fontSize: 14,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: lightColors.BlueNewColor,
    marginLeft: 8,
  },
  infoText: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
    color: lightColors.LIGHTTextContent,
    paddingRight: 16,
  },
  buttonConfirm: {
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: lightColors.BlueNewColor,
  },
  textButton: {
    fontSize: 14,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: lightColors.WHITE,
  },
  buttonDecline: {
    marginLeft: 24,
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: lightColors.LIGHTGRAY,
  },
  checkedContainer: {
    marginTop: 16,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonDisable: {
    backgroundColor: lightColors.LIGHTTextDisable,
  },
});

export default withMemo(ModalConfirmShareInfoKis);
