import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import globalStyles from 'styles';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';

interface FormBtnProps {
  isDisable?: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
}

const FormBtn = ({ onConfirm, onCancel, isDisable }: FormBtnProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();

  return (
    <>
      <View style={[globalStyles.fillWidth, styles.marginBottom, styles.marginTop]}>
        <TouchableOpacity
          disabled={isDisable}
          onPress={onConfirm}
          style={[
            globalStyles.centered,
            styles.executeFormButton2,
            isDisable === true && globalStyles.disableBackground,
          ]}
        >
          <Text allowFontScaling={false} style={styles.executeFormButtonText2}>
            {t('Confirm')}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[globalStyles.fillWidth]}>
        <TouchableOpacity onPress={onCancel} style={[globalStyles.centered, styles.cancelExecuteFormButton2]}>
          <Text allowFontScaling={false} style={styles.cancelExecuteFormButtonText2}>
            {t('Cancel')}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default FormBtn;
