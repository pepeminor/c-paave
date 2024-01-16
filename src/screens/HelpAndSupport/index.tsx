import React, { memo } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import globalStyles from 'styles';
import useStyles from './styles';
import HeaderScreen from 'components/HeaderScreen';
import UserManualIcon from 'assets/icon/userManual.svg';
import EmailIcon from 'assets/icon/bigEmail.svg';
import FaqIcon from 'assets/icon/faq.svg';
import { useTranslation } from 'react-i18next';
import { LANG } from 'global';
import { useSelector } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import { goToEmailSupport } from 'utils';

const HelpAndSupport = (props: StackScreenProps<'HelpAndSupport'>) => {
  const { t } = useTranslation();
  const { styles } = useStyles();

  const lang: LANG = useSelector((state: IState) => state.lang);

  const goBack = () => {
    props.navigation.goBack();
  };

  const onPressUsermanual = () => {
    const url = lang === LANG.VI ? 'https://www.paave.io/vi/user-manual/' : 'https://www.paave.io/en/user-manual/';
    // eslint-disable-next-line no-console
    Linking.openURL(url).catch(err => console.error('Open URL failed', err));
  };

  const onPressFaqs = () => {
    const url = lang === LANG.VI ? 'https://www.paave.io/vi/faqs.html' : 'https://www.paave.io/en/faqs.html';
    // eslint-disable-next-line no-console
    Linking.openURL(url).catch(err => console.error('Open URL failed', err));
  };

  const containerWrapper = [globalStyles.container, styles.backgroundContainer];

  const container = [globalStyles.flexDirectionRow, styles.container];

  const containerItem1 = [styles.containerItem, globalStyles.centered];

  const containerItem2 = [styles.containerItem, styles.marginLeft16, globalStyles.centered];

  return (
    // <View style={[globalStyles.container, globalStyles.containerBackground]}>
    //   <ScrollView style={[globalStyles.container, globalStyles.containerBackground]}>
    //     <TouchableOpacity
    //       onPress={() => onPressUsermanual()}
    //       style={[
    //         globalStyles.flexDirectionRow,
    //         globalStyles.alignCenter,
    //         styles.settingContainer,
    //         styles.borderBottom5,
    //       ]}
    //       // key={index}
    //     >
    //       <UserManualIcon/>
    //       <Text allowFontScaling={false} style={[globalStyles.container, styles.settingItemText]}>
    //         User Manual
    //       </Text>
    //       <SettingItemArrow width={wp(`${getPercentWidth(24)}%`)} height={hp(`${getPercentHeight(24)}%`)} />
    //     </TouchableOpacity>
    //     {/* <View
    //       // onPress={() => onPressSettingItem(item.label)}
    //       style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.settingContainer]}
    //       // key={index}
    //     >
    //       <Text allowFontScaling={false} style={[globalStyles.container, styles.settingItemTextTitle]}>
    //         FAQs
    //       </Text>
    //     </View>
    //     {listFAQ.map((item, index) => {
    //       return (
    //         <TouchableOpacity
    //           // onPress={() => onPressUsermanual()}
    //           style={[
    //             globalStyles.flexDirectionRow,
    //             globalStyles.alignCenter,
    //             styles.settingContainer2,
    //             index < listFAQ.length - 1 ? styles.borderBottom1 : styles.borderBottom5,
    //           ]}
    //           key={index}
    //         >
    //           <Text allowFontScaling={false} style={[globalStyles.container, styles.settingItemText2]}>
    //             {item.question}
    //           </Text>
    //           <SettingItemArrow
    //             width={wp(`${getPercentWidth(24)}%`)}
    //             height={hp(`${getPercentHeight(24)}%`)}
    //             style={styles.marginLeft8}
    //           />
    //         </TouchableOpacity>
    //       );
    //     })} */}
    //     <View
    //       // onPress={() => onPressSettingItem(item.label)}
    //       style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.settingContainer]}
    //       // key={index}
    //     >
    //       <Text allowFontScaling={false} style={[globalStyles.container, styles.settingItemTextTitle]}>
    //         Contact Us
    //       </Text>
    //     </View>
    //     {/* <TouchableOpacity
    //       onPress={() => {
    // Linking.openURL(`tel:${'0388704567'}`).catch(err => console.error('Open URL failed', err));
    //       }}
    //       style={[
    //         globalStyles.flexDirectionRow,
    //         globalStyles.alignCenter,
    //         styles.settingContainer,
    //         styles.borderBottom1,
    //       ]}
    //     >
    //       <Phone width={wp(`${getPercentWidth(24)}%`)} height={hp(`${getPercentHeight(24)}%`)} />
    //       <Text allowFontScaling={false} style={[globalStyles.container, styles.settingItemText, styles.marginLeft8]}>
    //         Phone Number
    //       </Text>
    //       <Text allowFontScaling={false} style={[styles.settingItemText2]}>
    //         0912 345 678
    //       </Text>
    //     </TouchableOpacity> */}
    //     <TouchableOpacity
    //       onPress={() => {
    // Linking.openURL(`mailto:nhan.phan@difisoft.com`).catch(err => console.error('Open URL failed', err));
    //       }}
    //       style={[
    //         globalStyles.flexDirectionRow,
    //         globalStyles.alignCenter,
    //         styles.settingContainer,
    //         styles.borderBottom1,
    //       ]}
    //     >
    //       <Mail width={wp(`${getPercentWidth(24)}%`)} height={hp(`${getPercentHeight(24)}%`)} />
    //       <Text allowFontScaling={false} style={[globalStyles.container, styles.settingItemText, styles.marginLeft8]}>
    //         Email
    //       </Text>
    //       <Text allowFontScaling={false} style={[styles.settingItemText2]}>
    //         support@paave.com
    //       </Text>
    //     </TouchableOpacity>

    //     {/* // Ẩn các phần chưa launch PAAVE-527
    //     <TouchableOpacity
    //       onPress={goToLiveChat}
    //       style={[
    //         globalStyles.flexDirectionRow,
    //         globalStyles.alignCenter,
    //         styles.settingContainer,
    //         styles.borderBottom1,
    //       ]}
    //     >
    //       <Chat width={wp(`${getPercentWidth(24)}%`)} height={hp(`${getPercentHeight(24)}%`)} />
    //       <Text allowFontScaling={false} style={[globalStyles.container, styles.settingItemText, styles.marginLeft8]}>
    //         Chat
    //       </Text>
    //       <Text allowFontScaling={false} style={[styles.settingItemText2]}>
    //         Live Chat
    //       </Text>
    //     </TouchableOpacity> */}
    //   </ScrollView>
    //   {/* // Ẩn các phần chưa launch PAAVE-527
    //   <TouchableOpacity onPress={goToLiveChat} style={[globalStyles.containerSupport]}>
    //     <IconSupport width={wp(`${getPercentWidth(106)}%`)} height={hp(`${getPercentHeight(106)}%`)} />
    //   </TouchableOpacity> */}
    // </View>

    <View style={containerWrapper}>
      <HeaderScreen leftButtonIcon={true} goBackAction={goBack} headerTitle={'Help & Support'} />
      <View style={container}>
        <TouchableOpacity style={containerItem1} onPress={onPressUsermanual}>
          <UserManualIcon />
          <Text style={styles.textUser}>{t('User Manual')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={containerItem2} onPress={goToEmailSupport}>
          <EmailIcon />
          <Text style={styles.textUser}>support@paave.io</Text>
        </TouchableOpacity>
      </View>
      <View style={container}>
        <TouchableOpacity style={containerItem1} onPress={onPressFaqs}>
          <FaqIcon />
          <Text style={styles.textUser}>{t('FAQs')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(HelpAndSupport);
