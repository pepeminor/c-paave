import React, { memo, useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import globalStyles, { scaleSize } from 'styles';
import HeaderScreen from 'components/HeaderScreen';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';
import SettingItemArrow from 'assets/icon/SettingItemArrow.svg';
import { useAppSelector } from 'hooks';
import { formatNumber, formatDateToString } from 'utils';
import { useDispatch } from 'react-redux';
import { getVirtualProfitLoss } from 'reduxs/global-actions';

const ROW_STYLE = [globalStyles.flexDirectionRow, globalStyles.justifySpaceBetween, globalStyles.alignCenter];

const Contest = (props: StackScreenProps<'Contest'>) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { styles } = useStyles();
  const { contestOrder, contestTab } = props.route.params || { contestOrder: undefined, contestTab: 'Description' };

  const contests = useAppSelector(state => state.contests?.contests ?? []);
  const TITLE_STYLE = [styles.textDarkBlue];

  const cashBalance = useAppSelector(state => state.virtualProfitLoss.data?.cashBalance) ?? 0;
  const getContestStatusColor = (status: 'Upcoming' | 'Happen now' | 'Ended') => {
    switch (status) {
      case 'Upcoming':
        return styles.statusWaitBlock;
      case 'Happen now':
        return styles.statusOkBlock;
      case 'Ended':
        return styles.statusEndedBlock;
    }
  };

  const goToTermAndCondition = (contestOrder: number) => () => {
    props.navigation.navigate('TermAndConditionVT', { contestOrder });
  };

  useEffect(() => {
    dispatch(getVirtualProfitLoss(null));
  }, []);

  useEffect(() => {
    if (contestOrder == undefined || contests == undefined || !contests || !contests[contestOrder]) return;
    if (contestOrder !== undefined || Number(contestOrder))
      props.navigation.navigate('TermAndConditionVT', { contestOrder: Number(contestOrder), contestTab });
  }, []);

  return (
    <View style={styles.container}>
      <HeaderScreen leftButtonIcon={true} goBackAction={props.navigation.goBack} headerTitle={'Contest'} />
      <View style={[styles.cardContainer, ROW_STYLE]}>
        <Text allowFontScaling={false} style={TITLE_STYLE}>
          {t('Cash Balance')}
        </Text>
        <Text allowFontScaling={false} style={[TITLE_STYLE, styles.textDarkGreen]}>
          {formatNumber(cashBalance, 2)}
        </Text>
      </View>
      <ScrollView>
        {contests.map((item, key) => {
          if (item == null) return null;
          return (
            <TouchableOpacity style={styles.cardContainer} onPress={goToTermAndCondition(key)} key={key}>
              <View style={[ROW_STYLE, styles.height40]}>
                <Text allowFontScaling={false} style={[TITLE_STYLE, styles.textMainBlue]}>
                  {t(item.name)}
                </Text>
                <SettingItemArrow width={scaleSize(24)} height={scaleSize(24)} />
              </View>
              <View style={[ROW_STYLE, styles.height44, globalStyles.borderBottom1]}>
                <Text allowFontScaling={false} style={TITLE_STYLE}>
                  {t('Prize')}
                </Text>
                <Text allowFontScaling={false} style={styles.itemPrize}>
                  {item.prize}
                </Text>
              </View>
              <View style={[ROW_STYLE, styles.height44]}>
                <Text allowFontScaling={false} style={TITLE_STYLE}>
                  {t('Period')}
                </Text>
                <Text allowFontScaling={false} style={styles.date}>
                  {formatDateToString(new Date(item.startDate), 'dd/MM/yyyy')}
                  {' - '}
                  {formatDateToString(new Date(item.endDate), 'dd/MM/yyyy')}
                </Text>
              </View>
              <View style={[styles.statusBlock, getContestStatusColor(item.status)]}>
                <Text allowFontScaling={false} style={styles.status}>
                  {t(item.status)}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default memo(Contest);
