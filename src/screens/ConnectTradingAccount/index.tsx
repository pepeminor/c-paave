import { View, Text, TouchableOpacity, FlatList, ListRenderItemInfo } from 'react-native';
import React from 'react';
import { StackScreenProps } from 'screens/RootNavigation';
import HeaderScreen from 'components/HeaderScreen';
import { useTranslation } from 'react-i18next';
import useStyles from './styles';
import globalStyles, { scaleSize } from 'styles';
import Logo from 'assets/logo-paave.svg';
import { RealAccountSec } from 'screens/AccountTrading';
import { CompaniesLogo } from 'global';

const ConnectTradingAccount = (props: StackScreenProps<'ConnectTradingAccount'>) => {
  const { t } = useTranslation();
  const { styles } = useStyles();

  const goBack = () => {
    props.navigation.goBack();
  };

  const headerTitle = () => {
    return (
      <View>
        <View style={styles.TitleContainer}>
          <Text allowFontScaling={false} style={styles.TitleText}>
            Virtual trading account
          </Text>
        </View>
        <View style={[styles.boxTradingReal, styles.shadow, globalStyles.centered]}>
          <Logo width={scaleSize(120)} height={scaleSize(52)} />
        </View>
        <View style={styles.TitleTextContainer}>
          <Text allowFontScaling={false} style={styles.TitleText}>
            Or connect to your real trading account
          </Text>
        </View>
      </View>
    );
  };

  const renderItem = ({ item }: ListRenderItemInfo<RealAccountSec>) => {
    return (
      <View style={[globalStyles.flexDirectionRow]}>
        <TouchableOpacity style={[styles.boxTradingReal, styles.shadow, globalStyles.centered]}>
          {CompaniesLogo[item]}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderScreen leftButtonIcon={true} goBackAction={goBack} headerTitle={t('Account Information')} />
      <FlatList
        ListHeaderComponent={headerTitle}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        keyExtractor={item => `${item}`}
        data={[RealAccountSec.KIS]}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ConnectTradingAccount;
