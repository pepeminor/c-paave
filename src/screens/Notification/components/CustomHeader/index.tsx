import { View, Image, Text } from 'react-native';
import React, { memo, useCallback } from 'react';
import { useStyles } from './styles';
import HeaderScreen from 'components/HeaderScreen';
import { TouchableOpacity } from 'react-native';
import { scaleSize } from 'styles';
import { IS_IOS } from 'constants/main';
import { useTranslation } from 'react-i18next';
import ListSuccess from 'assets/icon/ListSuccess.svg';
import { NotificationActions } from 'reduxs';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'hooks';
import { IAccountNotificationListResponse } from 'interfaces/notification';

type CustomHeaderProps = {
  data: IAccountNotificationListResponse[];
  goBack?(): void;
};

const HeaderButtonHitSlop = { top: 10, bottom: 10, left: 10, right: 10 };

export const CustomHeader = memo(({ data, goBack }: CustomHeaderProps) => {
  const { styles, isDarkMode } = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const mode = useAppSelector(state => state.Notification.mode);
  const isDeleteAll = useAppSelector(state => state.Notification.deletingList.length === data.length);

  const changeToSelectingMode = useCallback(() => {
    dispatch(NotificationActions.setMode('DELETE'));
  }, []);

  const onCancel = useCallback(() => {
    dispatch(NotificationActions.setMode('DEFAULT'));
  }, []);

  const selectAll = useCallback(() => {
    dispatch(NotificationActions.updateDeletingList(data.map(item => item.id)));
  }, [data]);

  const unSelectAll = useCallback(() => {
    dispatch(NotificationActions.updateDeletingList([]));
  }, []);

  if (mode !== 'DEFAULT') {
    return (
      <View style={styles.container}>
        {IS_IOS ? (
          <Image
            source={
              isDarkMode
                ? require('assets/component/HeaderDarkIOS.png')
                : require('assets/component/HeaderLightIOS.png')
            }
            style={styles.imgBackground}
          />
        ) : (
          <Image
            source={
              isDarkMode
                ? require('assets/component/HeaderDarkAndroid.png')
                : require('assets/component/HeaderLightAndroid.png')
            }
            style={styles.imgBackground}
          />
        )}
        <View style={styles.contentContainer}>
          {mode === 'DELETE' && !isDeleteAll && (
            <TouchableOpacity style={styles.textBtnContainer} onPress={selectAll}>
              <Text allowFontScaling={false} style={styles.textBtnText}>
                {t('Select all')}
              </Text>
            </TouchableOpacity>
          )}
          {mode === 'DELETE' && isDeleteAll && (
            <TouchableOpacity style={styles.textBtnContainer} onPress={unSelectAll}>
              <Text allowFontScaling={false} style={styles.textBtnText}>
                {t('Deselect all')}
              </Text>
            </TouchableOpacity>
          )}
          {/* {mode === 'SEARCH' && (
              <TextInput
                defaultValue={''}
                clearTextIcon
                blurOnSubmit
                returnKeyType={'search'}
                returnKeyLabel={t('Search')}
                onChangeText={debouncedOnChangeSearchValue}
                wholeContainerStyle={globalStyles.container}
                placeholder={'Search'}
                textInputContainerStyle={styles.textInputContainer}
                icon={<Search height={scaleSize(16)} width={scaleSize(16)} style={styles.iconStyle} />}
                textInputStyle={styles.textInputStyle}
              />
            )} */}
          <TouchableOpacity style={styles.textBtnContainer} onPress={onCancel}>
            <Text allowFontScaling={false} style={styles.textBtnText}>
              {t('Cancel')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <HeaderScreen
      leftButtonIcon={true}
      goBackAction={goBack}
      headerTitle={'Notifications'}
      rightButtonListIcon={[
        <TouchableOpacity
          style={styles.iconBtnContainer}
          onPress={changeToSelectingMode}
          key={'1'}
          hitSlop={HeaderButtonHitSlop}
        >
          <ListSuccess width={scaleSize(24)} height={scaleSize(24)} />
        </TouchableOpacity>,
      ]}
    />
  );
});
