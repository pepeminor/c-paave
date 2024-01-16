import React, { memo } from 'react';
import { Text, View } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import useStyles from './styles';
import RowData from '../../components/RowData/index';
import HeaderScreen from 'components/HeaderScreen';
import { useTranslation } from 'react-i18next';
import ScreenNames from 'screens/RootNavigation/ScreenNames';

const KisEKYCAbout = (props: StackScreenProps<'KisEKYCAbout'>) => {
  const { t } = useTranslation();

  const { styles } = useStyles();

  type IInvestorSetting = {
    title: string;
    navigate(): void;
  };

  const InvestorSetting: IInvestorSetting[] = [
    {
      title: 'Vietnamese Investor',
      navigate: () =>
        props.navigation.navigate(ScreenNames.KisEKYCFirstStep, {
          email: props.route.params.email,
          flow: props.route.params.flow,
          sec: props.route.params.sec,
        }),
    },
    {
      title: 'Foreign Investor',
      navigate: () => props.navigation.navigate(ScreenNames.KisEKYCAboutForeign),
    },
  ];

  const goBack = () => {
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <HeaderScreen leftButtonIcon={true} goBackAction={goBack} headerTitle={'Open Trading Account'} />
      <View style={styles.padding16}>
        <Text style={styles.titleText}>{t('What kind of investor are you?')}</Text>
      </View>
      {InvestorSetting.map((item, index) => (
        <RowData
          key={index}
          title={t(item.title)}
          navigate={item.navigate}
          containerStyle={styles.rowData}
          titleStyle={styles.rowDataText}
        />
      ))}
    </View>
  );
};

export default memo(KisEKYCAbout);
