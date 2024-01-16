import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import globalStyles from 'styles';
import useStyles from './styles';
import Modal from 'components/Modal';

interface IDataErrorModalBaseProps {
  visible: boolean;

  onRefresh: () => void;
  handleCloseErrorModal: () => void;
}

const DataErrorModal = (props: IDataErrorModalBaseProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  return (
    <Modal
      visible={props.visible}
      onRequestClose={props.handleCloseErrorModal}
      childrenContent={
        <View
          style={[
            globalStyles.container,
            globalStyles.centered,
            globalStyles.flexDirectionRow,
            styles.modalBackground2,
          ]}
        >
          <View style={[globalStyles.justifyCenter, styles.modalContentContainer2]}>
            <View style={[globalStyles.centered, styles.modalTitle2]}>
              <Text allowFontScaling={false} style={[styles.modalTitleText]}>
                {t('Loading Info Error')}
              </Text>
            </View>
            <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.executeModalEachItem2]}>
              <Text allowFontScaling={false} style={[globalStyles.container, styles.executeLabelText]}>
                {t('An error occured while loading Symbol Info, Press OK to reload')}!
              </Text>
            </View>
            <View style={styles.paddingHorizontal16}>
              <View style={[globalStyles.fillWidth, styles.marginBottom, styles.marginTop17]}>
                <TouchableOpacity onPress={props.onRefresh} style={[globalStyles.centered, styles.executeFormButton2]}>
                  <Text allowFontScaling={false} style={styles.executeFormButtonText2}>
                    {t('OK')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      }
    />
  );
};

export default DataErrorModal;
