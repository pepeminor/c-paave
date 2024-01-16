/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import config from 'config';
import UpThinArrow from 'assets/icon/UpThinArrow.svg';
import DownThinArrow from 'assets/icon/DownThinArrow.svg';
import UpArrow from 'assets/icon/UpArrow.svg';
import DownArrow from 'assets/icon/DownArrow.svg';
import { useAppSelector } from 'hooks/useAppSelector';
import { useUsersAvatarColor } from 'hooks/useUserAvatarColor';
import globalStyles, { scaleSize } from 'styles';
import { formatNumber, generateNameAbbreviations, getColor } from 'utils';
import useStyles from 'screens/LeaderBoard/styles';
import withMemo from 'HOC/withMemo';
import { useTranslation } from 'react-i18next';
import { ContestResultItemData } from 'interfaces/File';

interface IProps {
  index: number;
  item: ContestResultItemData;
  onPressItem?: (val: ContestResultItemData) => any;
}

const InvestingLastWeekItem = ({ index, item, onPressItem }: IProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();

  const leaderBoardInvesting = useAppSelector(state => state.leaderBoardInvesting);
  const usernameList = leaderBoardInvesting.data?.investors.map(item => item.username);
  const usersAvatar = useUsersAvatarColor(usernameList);
  const userAvatar = usersAvatar[item.username];

  return (
    <View style={globalStyles.containerBackground} key={index}>
      <TouchableOpacity
        style={[styles.investingReturnListEachItem, index === 0 && styles.investingReturnFirstItem]}
        onPress={onPressItem && onPressItem(item)}
      >
        <View style={[globalStyles.alignCenter, styles.rankContainer2]}>
          <View style={[globalStyles.centered, styles.rankContainer]}>
            <Text allowFontScaling={false} style={styles.rankNumberText}>
              {item.rank}
            </Text>
          </View>
          <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter]}>
            {Number(item.rankingChanged) > 0 ? (
              <UpThinArrow width={scaleSize(7)} height={scaleSize(10)} />
            ) : Number(item.rankingChanged) === 0 ? null : (
              <DownThinArrow width={scaleSize(7)} height={scaleSize(10)} />
            )}
            <Text
              style={[
                getColor(Number(item.rankingChanged), 0, undefined, undefined, true).textStyle,
                styles.rankingStatusText,
              ]}
            >
              {Number(item.rankingChanged) === 0 ? '-' : Math.abs(Number(item.rankingChanged))}
            </Text>
          </View>
        </View>
        <View style={{ ...styles.avatarImg, backgroundColor: userAvatar ?? config.avatarColors[0] }}>
          <Text allowFontScaling={false} style={styles.avatarImgText}>
            {generateNameAbbreviations(item.username)}
          </Text>
        </View>
        <View
          style={[globalStyles.container, globalStyles.flexDirectionCol, globalStyles.centered, styles.nameContainer]}
        >
          <Text numberOfLines={1} allowFontScaling={false} style={[globalStyles.fillWidth, styles.nameText]}>
            {item.fullName}
          </Text>
          <Text numberOfLines={1} allowFontScaling={false} style={[globalStyles.fillWidth, styles.usernameText]}>
            @{item.username}
          </Text>
        </View>
        <View style={[styles.bottomInfoLeaderboard, globalStyles.centered]}>
          <Text allowFontScaling={false} style={styles.followerText}>
            {t('LN')}
          </Text>
          <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter]}>
            {item.returnRate > 0 ? (
              <UpArrow width={scaleSize(8)} height={scaleSize(7)} />
            ) : item.returnRate === 0 ? null : (
              <DownArrow width={scaleSize(8)} height={scaleSize(7)} />
            )}
            <Text
              numberOfLines={1}
              style={[
                item.returnRate > 0
                  ? globalStyles.colorUp
                  : item.returnRate === 0
                  ? globalStyles.colorSteady
                  : globalStyles.colorDown,
                styles.returnRateText,
              ]}
            >
              {`${formatNumber(item.returnRate, 2, undefined, true)}%`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default withMemo(InvestingLastWeekItem);
