import React, { useCallback } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { scaleSize, lightColors } from 'styles';
import BellIcon from 'assets/icon/BellIcon.svg';
import IconSearch from 'assets/icon/IconSearch.svg';
import { useAppSelector } from 'hooks/useAppSelector';
import { ACCOUNT_TYPE } from 'global';
import { getStylesHook } from 'hooks/useStyles';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { navigate } from 'utils';
import withMemo from 'HOC/withMemo';

const HeaderButtonHitSlop = { top: 10, bottom: 10, left: 10, right: 10 };

const HeaderRightIcons = () => {
  const numberOfUnreadNotification = useAppSelector(state => state.numberOfUnreadNotification);
  const selectedAccount = useAppSelector(state => state.selectedAccount);
  const { styles } = useStyles();

  const goToSearchSymbolAndMember = useCallback(() => {
    navigate({
      key: ScreenNames.SearchSymbolAndMember,
    });
  }, []);

  const goToNotification = () => {
    navigate({ key: ScreenNames.Notification });
  };

  return (
    <>
      <TouchableOpacity onPress={goToSearchSymbolAndMember} hitSlop={HeaderButtonHitSlop}>
        <IconSearch width={scaleSize(24)} height={scaleSize(24)} />
      </TouchableOpacity>
      {selectedAccount.type !== ACCOUNT_TYPE.DEMO && (
        <TouchableOpacity onPress={goToNotification} style={styles.headerIconRight} hitSlop={HeaderButtonHitSlop}>
          <BellIcon height={scaleSize(24)} width={scaleSize(24)} />
          {numberOfUnreadNotification.data != null ? (
            numberOfUnreadNotification.data.countedUnread === 0 ? (
              <View />
            ) : (
              <View
                style={[
                  styles.notificationContainer,
                  numberOfUnreadNotification.data.countedUnread > 9 ? styles.containerIcon1 : styles.containerIcon2,
                ]}
              >
                {numberOfUnreadNotification.data.countedUnread < 100 ? (
                  <Text style={styles.textNotification}>{numberOfUnreadNotification.data?.countedUnread}</Text>
                ) : (
                  <Text style={[styles.textNotification, styles.textNotificationMax]}>99+</Text>
                )}
              </View>
            )
          ) : null}
        </TouchableOpacity>
      )}
    </>
  );
};

const useStyles = getStylesHook({
  headerIconRight: {
    position: 'relative',
    paddingVertical: 4,
    paddingHorizontal: 4,
    paddingLeft: 8,
  },
  notificationContainer: {
    position: 'absolute',
    top: 0,
    left: 15,
    backgroundColor: lightColors.RedColorLogo,
    borderRadius: 10,
  },
  containerIcon1: {
    width: 19,
    height: 14,
  },
  containerIcon2: {
    width: 14,
    height: 14,
    right: 10,
  },
  textNotification: {
    fontSize: 10,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    textAlign: 'center',
    lineHeight: 13,
    color: lightColors.WHITE,
    paddingBottom: 3,
  },
  textNotificationMax: {
    paddingLeft: 1,
  },
});

export default withMemo(HeaderRightIcons);
