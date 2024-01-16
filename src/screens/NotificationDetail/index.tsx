import React, { memo } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import globalStyles from 'styles';
import useStyles from './styles';
import HeaderScreen from 'components/HeaderScreen';
import { formatDateToString } from 'utils';
import { useSelector } from 'react-redux';
import { LANG } from 'global';
import { IState } from 'reduxs/global-reducers';
import { useTranslation } from 'react-i18next';

const NotificationDetail = (props: StackScreenProps<'NotificationDetail'>) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const lang: LANG = useSelector((state: IState) => state.lang);
  const item = props.route.params;
  const title = (lang === LANG.VI ? item.titleVi : item.title) ?? item.title;

  return (
    <View style={[globalStyles.container, styles.container]}>
      <HeaderScreen leftButtonIcon={true} goBackAction={props.navigation.goBack} headerTitle={'Notifications'} />
      <ScrollView style={styles.wrapContent}>
        <View style={styles.titleContainer}>
          <Text allowFontScaling={false} style={styles.titleText}>
            {t(title)}
          </Text>

          <Text allowFontScaling={false} style={styles.timeText}>
            {formatDateToString(new Date(item.date), 'dd/MM/yyyy HH:mm')}
          </Text>
        </View>
        <View style={[globalStyles.container, styles.contentContainer]}>
          <Text allowFontScaling={false} style={styles.contentText}>
            {lang === LANG.VI ? item.contentVi : item.contentEn}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default memo(NotificationDetail);
