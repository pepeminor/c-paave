import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import useStyles from './styles';
import { StackScreenProps } from 'screens/RootNavigation';
import HeaderScreen from 'components/HeaderScreen';
import { useTranslation } from 'react-i18next';
import globalStyles from 'styles';

import Radio from '../../components/Radio';

const RealTrading = (props: StackScreenProps<'RealTrading'>) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(-1);
  const { styles } = useStyles();

  const openConnect = () => {
    props.navigation.navigate('SignupCongratulation');
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <HeaderScreen leftButtonIcon={true} goBackAction={goBack} headerTitle={t('Real Trading Settings')} />
      <View style={[globalStyles.container, styles.RealTradingSettingsContainer]}>
        <View style={[styles.contentContainer]}>
          <Radio
            selected={selected}
            options={['Share your portfolio with other traders at the same securities', 'Only for yourself']}
            horizontal={true}
            onChangeSelect={setSelected}
            textOptions={[
              ['Only share portfolio allocation percentages and returns. Your Profit & Loss amount are never shown.'],
            ]}
          />
          <View style={[styles.containerText]}>
            <View style={[globalStyles.flexDirectionRow]}>
              <Text style={[styles.textContentT]}>・ </Text>
              <Text style={[styles.textContent]}>Track your own performance.</Text>
            </View>
            <View style={[globalStyles.flexDirectionRow]}>
              <Text style={[styles.textContentT]}>・ </Text>
              <Text style={[styles.textContent]}>Not visible to others.</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={[globalStyles.container]} />
      <View style={[globalStyles.container, globalStyles.justifyEnd]}>
        <TouchableOpacity
          disabled={selected === 1 || selected === 0 ? false : true}
          style={[
            globalStyles.centered,
            styles.executeFormButton,
            !(selected === 1 || selected === 0) && styles.executeFormDisableButton,
          ]}
          onPress={openConnect}
        >
          <Text allowFontScaling={false} style={styles.executeFormButtonText}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RealTrading;
