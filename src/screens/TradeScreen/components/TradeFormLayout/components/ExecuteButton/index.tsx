import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SELL_BUY_TYPE } from 'global';
import useStyles from './styles';
import withMemo from 'HOC/withMemo';
import globalStyles from 'styles';

interface IExecuteButtonProp {
  isShowButton: boolean;
  getDisableButton: boolean;
  isProhibited: boolean;
  sellBuyType: SELL_BUY_TYPE;
  showProhibitedAlert: () => void;
  onExecuteForm: () => void;
}

const ExecuteButton = ({
  isShowButton,
  getDisableButton,
  isProhibited,
  sellBuyType,
  showProhibitedAlert,
  onExecuteForm,
}: IExecuteButtonProp) => {
  const { styles } = useStyles();
  const { t } = useTranslation();

  if (!isShowButton) {
    return (
      <View>
        <View style={styles.executeButton} />
      </View>
    );
  }

  return (
    <View style={[styles.container, (getDisableButton || isProhibited) && globalStyles.disableBackground]}>
      <TouchableOpacity
        onPress={isProhibited ? showProhibitedAlert : onExecuteForm}
        style={[
          sellBuyType === SELL_BUY_TYPE.BUY ? styles.backgroundColorBuy : styles.backgroundColorSell,
          styles.executeButton,
        ]}
        disabled={getDisableButton}
      >
        <Text allowFontScaling={false} style={styles.executeButtonText}>
          {sellBuyType === SELL_BUY_TYPE.BUY ? t('Buy') : t('Sell')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default withMemo(ExecuteButton);
