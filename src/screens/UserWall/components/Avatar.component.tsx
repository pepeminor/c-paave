import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import withMemo from 'HOC/withMemo';
import { getStylesHook } from 'hooks/useStyles';
import globalStyles, { lightColors, scaleSize, textStyles } from 'styles';
import { generateNameAbbreviations } from 'utils';
import BotUser from 'assets/icon/BotUser.svg';
import { useDispatch } from 'react-redux';
import { AdvisorActions, AdvisorSelectors } from 'reduxs';
import { useAppSelector } from 'hooks/useAppSelector';
import Heart from 'assets/icon/Heart.svg';
import NoHeart from 'assets/icon/NoHeart.svg';

interface IProps {
  userId: number;
  fullName: string;
  username: string;
  userAvatar: string;
  showFollowButton?: boolean;
}

const HIT_SLOPE = { top: 10, bottom: 10, left: 10, right: 10 };

const Avatar = ({ userId, fullName, username, userAvatar, showFollowButton = false }: IProps) => {
  const isBot = username.includes('advisor');
  const { styles } = useStyles();
  const dispatch = useDispatch();
  const isFollowing = useAppSelector(AdvisorSelectors.isFollowing(userId));

  const followRobo = useCallback(() => {
    dispatch(
      AdvisorActions.followAdvisor({
        payload: userId,
      })
    );
  }, [userId]);

  const unFollowRobo = useCallback(() => {
    dispatch(
      AdvisorActions.unFollowAdvisor({
        payload: userId,
      })
    );
  }, [userId]);

  return (
    <View style={styles.avaContainer}>
      <View style={{ ...styles.avatarImg, backgroundColor: userAvatar ?? lightColors.WHITE }}>
        {isBot ? (
          <BotUser width={scaleSize(32)} height={scaleSize(32)} />
        ) : (
          <Text allowFontScaling={false} style={styles.avatarImgText}>
            {generateNameAbbreviations(fullName)}
          </Text>
        )}
      </View>
      <View style={styles.nameContainer}>
        <Text allowFontScaling={false} style={styles.nameText} numberOfLines={1}>
          {fullName}
        </Text>
        <Text allowFontScaling={false} style={styles.nameText2} numberOfLines={1}>
          @{username}
        </Text>
      </View>
      {isBot &&
        showFollowButton &&
        (!isFollowing ? (
          <TouchableOpacity style={styles.followedIcon} hitSlop={HIT_SLOPE} onPress={followRobo}>
            <NoHeart width={scaleSize(20)} height={scaleSize(19)} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.followedIcon} hitSlop={HIT_SLOPE} onPress={unFollowRobo}>
            <Heart width={scaleSize(20)} height={scaleSize(19)} />
          </TouchableOpacity>
        ))}
    </View>
  );
};

const useStyles = getStylesHook({
  avaContainer: {
    ...globalStyles.flexDirectionRow,
    ...globalStyles.alignCenter,
    padding: 10,
    height: 50,
    width: '100%',
  },
  avatarImg: {
    ...globalStyles.centered,
    height: 32,
    width: 32,
    borderRadius: 25,
  },
  avatarImgText: {
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: lightColors.WHITE,
    fontSize: 16,
  },
  nameText: {
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 16,
    color: lightColors.LIGHTTextContent,
    paddingLeft: 8,
  },
  nameText2: {
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 14,
    color: lightColors.BlueNewColor,
    paddingLeft: 8,
  },
  nameContainer: {
    flex: 1,
  },
  followContainer: {
    ...globalStyles.centered,
    backgroundColor: lightColors.BlueNewColor,
    borderRadius: 10,
    paddingHorizontal: 8,
    height: 24,
    marginRight: 12,
  },
  followText: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
    color: lightColors.WHITE,
  },
  followedIcon: {
    width: 25,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 16,
  },
});

export default withMemo(Avatar);
