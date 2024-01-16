import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import globalStyles, { scaleSize } from 'styles';
import IconUp from 'assets/icon/IconTriangleUp.svg';
import IconArrowUp from 'assets/icon/UpThinArrow.svg';

import useStyles from './styles';
import { investorDemoData } from './demo-data';
import HeaderScreen from 'components/HeaderScreen';

const DiscoverInvestor = () => {
  const navigation = useNavigation();
  const { styles } = useStyles();

  const goBack = () => {
    navigation.goBack();
  };

  const { t } = useTranslation();

  return (
    <View style={globalStyles.container}>
      <HeaderScreen leftButtonIcon={true} goBackAction={goBack} headerTitle={'CTG - Investor'} />
      <ScrollView>
        {investorDemoData.map(investor => (
          <TouchableOpacity style={styles.investor} key={investor.rank}>
            <View style={[globalStyles.flexDirectionRow, styles.leaderboard]}>
              <View style={[globalStyles.flexDirectionRow, styles.investorInfo]}>
                <View style={styles.rank}>
                  <View style={[globalStyles.centered, styles.rankIcon]}>
                    <Text style={styles.rankIconText}>{investor.rank}</Text>
                  </View>
                  <View style={globalStyles.flexDirectionRow}>
                    <IconArrowUp height={scaleSize(10)} width={scaleSize(10)} />
                    <Text style={styles.increaseText}>{investor.increase}</Text>
                  </View>
                </View>
                <View style={[globalStyles.flexDirectionRow, styles.name]}>
                  <View style={styles.avatar}></View>
                  <View style={styles.nameTextContainer}>
                    <Text style={[globalStyles.centered, styles.nameText]}>{investor.name}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.chart}>
                {/* <AreaChart
                containerStyle={styles.chart}
                chartConfig={{ hideXAxis: true, hideYAxis: true }}
                chartStyle={{ height: 20, width: 130, padding: 0 }}
                realtimeUpdate={{ code: 'HPG' }}
              /> */}
              </View>
            </View>
            <View style={[globalStyles.flexDirectionRow, styles.follow]}>
              <View style={[globalStyles.flexDirectionRow, styles.follower]}>
                <Text style={styles.followTitle}>{t('Followers')}</Text>
                <View style={styles.right}>
                  <Text style={styles.followNumber}>
                    {investor.followers} <Text style={styles.followNumberDays}>{t('days')}</Text>
                  </Text>
                </View>
              </View>
              <View style={[globalStyles.flexDirectionRow, styles.return]}>
                <Text style={styles.followTitle}>{t('Return')}</Text>
                <View style={[globalStyles.flexDirectionRow, styles.right, styles.returnValueContainer]}>
                  <View style={styles.returnIcon}>
                    <IconUp height={scaleSize(16)} width={scaleSize(16)} />
                  </View>
                  <Text style={styles.returnValue}>{investor.return}%</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default memo(DiscoverInvestor);
