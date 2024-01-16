import { View, Text, TouchableOpacity, ListRenderItemInfo, FlatList } from 'react-native';
import React from 'react';
import useStyles from './styles';
import { StackScreenProps } from 'screens/RootNavigation';
import HeaderScreen from 'components/HeaderScreen';
import globalStyles from 'styles';
import { RealAccountSec } from 'screens/AccountTrading';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { CompaniesLogo, CONNECT_SEC_FLOW } from 'global';

const ConnectRealAccount = (props: StackScreenProps<'ConnectRealAccount'>) => {
  const { styles } = useStyles();
  const goLoginReal = (sec: RealAccountSec) => {
    props.navigation.navigate(ScreenNames.LoginRealAccount, {
      sec,
      flow: CONNECT_SEC_FLOW.SIGNUP,
    });
  };

  const rightBack = () => {
    props.navigation.navigate('SignupCongratulation');
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  const renderItem = ({ item, index }: ListRenderItemInfo<RealAccountSec>) => {
    return (
      <View style={[globalStyles.flexDirectionRow]}>
        <TouchableOpacity
          key={index}
          onPress={() => goLoginReal(item)}
          style={[styles.boxTradingReal, styles.shadow, globalStyles.centered]}
        >
          {CompaniesLogo[item]}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderScreen
        leftButtonIcon={true}
        goBackAction={goBack}
        headerTitle={'Connect Real Account'}
        rightButtonListIcon={[
          <TouchableOpacity onPress={rightBack}>
            <Text style={[styles.rightText]}>Skip</Text>
          </TouchableOpacity>,
        ]}
      />
      <View style={styles.TitleTextContainer}>
        <Text allowFontScaling={false} style={styles.TitleText}>
          Which securities firm do you use?
        </Text>
      </View>
      <View style={[styles.containerFlat]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          keyExtractor={item => `${item}`}
          data={[RealAccountSec.KIS]}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default ConnectRealAccount;
