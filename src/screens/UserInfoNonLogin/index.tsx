// CORES
import React, { memo } from 'react';
import { StackScreenProps } from 'screens/RootNavigation';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

//STYLES
import globalStyles, { scaleSize } from 'styles';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';

// COMPONENT
import HeaderScreen from 'components/HeaderScreen';

// ICONS
import IconShare from 'assets/icon/ShareIcon.svg';
import IconUser from 'assets/icon/IconUser.svg';
import IconSetting from 'assets/icon/Setting.svg';
import IconHeadPhone from 'assets/icon/Support.svg';
import IconOutlineRight from 'assets/icon/OutlineRight.svg';
import IconSupport from 'assets/icon/IconSupport.svg';

const actionNameStyle = [globalStyles.flexDirectionRow, globalStyles.alignCenter];
const iconSize = { height: scaleSize(24), width: scaleSize(24) };

const UserInfoNonLogin = (props: StackScreenProps<'UserInfoNonLogin'>) => {
  const { t } = useTranslation();
  const { styles } = useStyles();

  const avaActionStyle = [globalStyles.container, globalStyles.centered, styles.avaAction];
  const actionButtonStyle = [
    globalStyles.flexDirectionRow,
    globalStyles.justifySpaceBetween,
    globalStyles.alignCenter,
    styles.btnAction,
  ];

  const goBack = () => {
    props.navigation.goBack();
  };

  const goToLiveChat = () => {
    props.navigation.navigate('LiveChat');
  };

  return (
    <View style={styles.container}>
      <HeaderScreen
        leftButtonIcon={true}
        goBackAction={goBack}
        headerTitle={'Account'}
        rightButtonListIcon={[
          <TouchableOpacity>
            <IconShare {...iconSize} />
          </TouchableOpacity>,
        ]}
      />
      <ScrollView style={[globalStyles.container]}>
        <View style={[styles.avaNameContainer]}>
          <TouchableOpacity style={[globalStyles.flexDirectionRow, globalStyles.alignCenter]}>
            <View style={[globalStyles.centered, styles.avaNameBlock]}>
              <IconUser style={[styles.avaNameIcon]} />
            </View>
            <Text style={[styles.avaNameText]}>{t('Trade with Paave!')}</Text>
          </TouchableOpacity>
          <View style={[globalStyles.flexDirectionRow, styles.avaActionContainer]}>
            <TouchableOpacity style={[...avaActionStyle, styles.avaActionRegister]}>
              <Text style={[styles.avaActionText, styles.avaActionRegisterText]}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[...avaActionStyle, styles.avaActionLogin]}>
              <Text style={[styles.avaActionText, styles.avaActionLoginText]}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[globalStyles.centered, styles.bannerContainer]}>
          <View style={[globalStyles.container2, globalStyles.backgroundColorDown, styles.banner]} />
        </View>
        <TouchableOpacity style={actionButtonStyle}>
          <View style={actionNameStyle}>
            <IconSetting {...iconSize} />
            <Text style={[styles.btnActionNameText]}>Setting</Text>
          </View>
          <IconOutlineRight />
        </TouchableOpacity>
        <TouchableOpacity style={actionButtonStyle}>
          <View style={actionNameStyle}>
            <IconHeadPhone {...iconSize} />
            <Text style={[styles.btnActionNameText]}>{'Help & Support'}</Text>
          </View>
          <IconOutlineRight />
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity onPress={goToLiveChat} style={[globalStyles.containerSupport]}>
        <IconSupport width={scaleSize(106)} height={scaleSize(106)} />
      </TouchableOpacity>
    </View>
  );
};

export default memo(UserInfoNonLogin);
