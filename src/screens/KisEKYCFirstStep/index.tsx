import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import globalStyles, { scaleSize } from '../../styles';
import KisEKYCStep1 from 'assets/icon/KisEKYCStep1.svg';
import IDCard from 'assets/icon/IDCard.svg';
import HeaderScreen from 'components/HeaderScreen';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';
import ScreenNames from 'screens/RootNavigation/ScreenNames';

const KisEKYCFirstStep = (props: StackScreenProps<'KisEKYCFirstStep'>) => {
  const { t } = useTranslation();
  const { styles } = useStyles();

  const goBack = () => {
    props.navigation.goBack();
  };

  const goToKisEKYCStep1TypeOfInvestor = () => {
    props.navigation.navigate(ScreenNames.KisEKYCStep1TypeOfInvestor, {
      email: props.route.params.email,
      flow: props.route.params.flow,
      sec: props.route.params.sec,
    });
  };

  // const openLink = async () => {
  // await Linking.openURL('https://kisvn.vn/en/san-pham-dich-vu/dich-vu-chung-khoan/chung-khoan-co-so/open-account/').catch(err => console.error('Open URL failed', err));
  // };

  return (
    <View style={styles.container}>
      <HeaderScreen
        leftButtonIcon={true}
        headerTitle={
          <View style={[globalStyles.container, globalStyles.alignCenter]}>
            <KisEKYCStep1 height={scaleSize(32)} width={scaleSize(275)} />
          </View>
        }
        goBackAction={goBack}
      />
      <IDCard height={scaleSize(48)} width={scaleSize(86)} style={styles.iDCardContainer} />
      <Text style={styles.titleText} allowFontScaling={false}>
        {t('ID Card Citizen Card Passport Authentication')}
      </Text>
      <Text style={styles.titleText2} allowFontScaling={false}>
        {t('Please help to take a photo of both side of your ID card Citizen Card Passport')}
      </Text>
      <View style={[globalStyles.flexDirectionRow, globalStyles.centered, styles.ruleContainer]}>
        <View style={[globalStyles.centered, styles.numberContainer]}>
          <Text style={styles.ruleNumber} allowFontScaling={false}>
            1
          </Text>
        </View>
        <Text style={styles.ruleText} allowFontScaling={false}>
          {t("Document must be valid. It's still in original form and not a copy scanned copy one")}
        </Text>
      </View>
      <View style={[globalStyles.flexDirectionRow, globalStyles.centered, styles.ruleContainer]}>
        <View style={[globalStyles.centered, styles.numberContainer]}>
          <Text style={styles.ruleNumber} allowFontScaling={false}>
            2
          </Text>
        </View>
        <Text style={styles.ruleText} allowFontScaling={false}>
          {t('Put the document on the flat surface')}
        </Text>
      </View>
      <View style={[globalStyles.flexDirectionRow, globalStyles.centered, styles.ruleContainer]}>
        <View style={[globalStyles.centered, styles.numberContainer]}>
          <Text style={styles.ruleNumber} allowFontScaling={false}>
            3
          </Text>
        </View>
        <Text style={styles.ruleText} allowFontScaling={false}>
          {t('Ensure document details are clear to read with no blur or glare')}
        </Text>
      </View>
      <View style={[globalStyles.centered, styles.executeButtonContainer]}>
        <TouchableOpacity
          style={[globalStyles.container, globalStyles.fillWidth, globalStyles.centered, styles.executeButton]}
          onPress={goToKisEKYCStep1TypeOfInvestor}
        >
          <Text style={styles.executeButtonText} allowFontScaling={false}>
            {t('Next')}
          </Text>
        </TouchableOpacity>
      </View>
      {/* <View style={[styles.paddingTop24, styles.paddingHorizontal14, globalStyles.alignCenter]}>
        <Text allowFontScaling={false} style={styles.warningText}>
          {`${t('If you are a foreign investor, please visit KIS branch to')}`}
          <Text onPress={openLink} allowFontScaling={false} style={styles.openAccountText}>{` ${t(
            'open account'
          )}`}</Text>
        </Text>
      </View> */}
    </View>
  );
};

export default KisEKYCFirstStep;
