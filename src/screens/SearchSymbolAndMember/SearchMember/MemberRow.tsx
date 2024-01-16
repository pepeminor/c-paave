import React, { memo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useStyles } from './styles';
import { useTranslation } from 'react-i18next';
import { ISearchUserResponse } from 'interfaces/user';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { generateNameAbbreviations, navigate } from 'utils';
import { useDispatch } from 'react-redux';
import { getUserContestSubAccountFromSearch } from 'reduxs/global-actions';
import Animated, { FadeInUp } from 'react-native-reanimated';
import useUserAvatarColor from 'hooks/useUserAvatarColor';
import config from 'config';
import { scaleSize } from 'styles';
import BotUser from 'assets/icon/BotUser.svg';

interface Props {
  userData: ISearchUserResponse;
}

const MemberRow = ({ userData }: Props) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const dispatch = useDispatch();

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const userAvatar = useUserAvatarColor(userData.username);
  const isBot = userData.username.includes('advisor');

  const handlePress = () => {
    setSelectedUserId(pre => (pre === userData.userId ? null : userData.userId));
  };

  const goToUserWall = (isFromKis: boolean) => () => {
    !isFromKis && dispatch(getUserContestSubAccountFromSearch({ followingUserId: userData.userId }));
    navigate({
      key: ScreenNames.UserWall,
      params: {
        userData,
        isFromSearch: true,
        isFromKis,
      },
    });
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={userData.userId === selectedUserId ? styles.selectedMemberContainer : styles.memberContainer}
      key={userData.userId}
    >
      <View style={styles.topPartContainer}>
        <View style={{ ...styles.avatarImg, backgroundColor: userAvatar ?? config.avatarColors[0] }}>
          {isBot ? (
            <BotUser width={scaleSize(40)} height={scaleSize(40)} />
          ) : (
            <Text allowFontScaling={false} style={styles.avatarImgText}>
              {generateNameAbbreviations(userData.username)}
            </Text>
          )}
        </View>
        <View style={styles.usernameContainer}>
          <Text style={styles.name} allowFontScaling={false}>
            {userData.fullname}
          </Text>
          <Text style={styles.username} allowFontScaling={false}>
            @{userData.username}
          </Text>
        </View>
      </View>
      {userData.userId === selectedUserId && (
        <Animated.View style={styles.groupBtn} entering={FadeInUp.duration(200)}>
          <TouchableOpacity onPress={goToUserWall(true)} style={styles.viewAccBtnContainer}>
            <Text style={styles.textViewAccBtn}>{t('View Kis Account')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goToUserWall(false)} style={styles.viewAccBtnContainer}>
            <Text style={styles.textViewAccBtn}>{t('View Paave Account')}</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </TouchableOpacity>
  );
};

export default memo(MemberRow);
