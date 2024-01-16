import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import config from 'config';
import UpThinArrow from 'assets/icon/UpThinArrow.svg';
import DownThinArrow from 'assets/icon/DownThinArrow.svg';
import UpArrow from 'assets/icon/UpArrow.svg';
import DownArrow from 'assets/icon/DownArrow.svg';
import BotUser from 'assets/icon/BotUser.svg';
import { useAppSelector } from 'hooks/useAppSelector';
import { useUsersAvatarColor } from 'hooks/useUserAvatarColor';
import { ILeaderBoardInvestingResponse } from 'interfaces/leaderBoard';
import globalStyles, { scaleSize } from 'styles';
import { formatNumber, generateNameAbbreviations, getColor } from 'utils';
import useStyles from 'screens/LeaderBoard/styles';
import withMemo from 'HOC/withMemo';
import { useTranslation } from 'react-i18next';

interface IProps {
  index: number;
  item: ILeaderBoardInvestingResponse;
  onPressItem?: (val: ILeaderBoardInvestingResponse) => any;
}

const InvestingItem = ({ index, item, onPressItem }: IProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();

  const leaderBoardInvesting = useAppSelector(state => state.leaderBoardInvesting);
  const usernameList = leaderBoardInvesting.data?.investors.map(item => item.username);
  const usersAvatar = useUsersAvatarColor(usernameList);
  const userAvatar = usersAvatar[item.username];
  const isBot = item.username.includes('advisor');

  return (
    <View style={globalStyles.containerBackground} key={index}>
      <TouchableOpacity
        style={[
          styles.investingReturnListEachItem,
          index === 0 && styles.investingReturnFirstItem,
          isBot && styles.botUserContainer,
        ]}
        onPress={onPressItem && onPressItem(item)}
      >
        <View style={[globalStyles.alignCenter, styles.rankContainer2]}>
          <View style={[globalStyles.centered, styles.rankContainer]}>
            <Text allowFontScaling={false} style={[styles.rankNumberText, isBot && globalStyles.textMainBlue]}>
              {item.ranking}
            </Text>
          </View>
          <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter]}>
            {item.rankingChanged > 0 ? (
              <UpThinArrow width={scaleSize(7)} height={scaleSize(10)} />
            ) : item.rankingChanged === 0 ? null : (
              <DownThinArrow width={scaleSize(7)} height={scaleSize(10)} />
            )}
            <Text
              style={[getColor(item.rankingChanged, 0, undefined, undefined, true).textStyle, styles.rankingStatusText]}
            >
              {item.rankingChanged === 0 ? '-' : Math.abs(item.rankingChanged)}
            </Text>
          </View>
        </View>
        <View style={{ ...styles.avatarImg, backgroundColor: userAvatar ?? config.avatarColors[0] }}>
          {isBot ? (
            <BotUser width={scaleSize(42)} height={scaleSize(42)} />
          ) : (
            <Text allowFontScaling={false} style={styles.avatarImgText}>
              {generateNameAbbreviations(item.username)}
            </Text>
          )}
        </View>
        <View
          style={[globalStyles.container, globalStyles.flexDirectionCol, globalStyles.centered, styles.nameContainer]}
        >
          <Text
            numberOfLines={1}
            allowFontScaling={false}
            style={[globalStyles.fillWidth, styles.nameText, isBot && globalStyles.textMainBlue]}
          >
            {item.fullname}
          </Text>
          <Text numberOfLines={1} allowFontScaling={false} style={[globalStyles.fillWidth, styles.usernameText]}>
            @{item.username}
          </Text>
        </View>
        <View style={[styles.bottomInfoLeaderboard, globalStyles.centered, isBot && styles.botUserReturnContainer]}>
          <Text allowFontScaling={false} style={styles.followerText}>
            {t('LN')}
          </Text>
          <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter]}>
            {item.investmentReturn > 0 ? (
              <UpArrow width={scaleSize(8)} height={scaleSize(7)} />
            ) : item.investmentReturn === 0 ? null : (
              <DownArrow width={scaleSize(8)} height={scaleSize(7)} />
            )}
            <Text
              numberOfLines={1}
              style={[
                item.investmentReturn > 0
                  ? globalStyles.colorUp
                  : item.investmentReturn === 0
                  ? globalStyles.colorSteady
                  : globalStyles.colorDown,
                styles.returnRateText,
              ]}
            >
              {`${formatNumber(item.investmentReturn, 2, undefined, true)}%`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default withMemo(InvestingItem);
