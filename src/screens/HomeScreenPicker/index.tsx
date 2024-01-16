import React, { memo, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import { useDispatch } from 'react-redux';
import TickLanguage from 'assets/icon/TickLanguage.svg';
import { scaleSize } from 'styles';
import useStyles from './styles';
import HeaderScreen from 'components/HeaderScreen';
import { useTranslation } from 'react-i18next';
import { updateCurrentUserSetting } from 'reduxs/global-actions';
import { HomeScreenOption } from 'global';
import { useAppSelector } from 'hooks/useAppSelector';
import PortfolioSelected from 'assets/icon/PortfolioSelected.svg';
import DiscoverSelected from 'assets/icon/DiscoverSelected.svg';
import GlobalDomain from 'config/globalDomain';

const ScreenIcon: { [key in HomeScreenOption]: React.ReactNode } = {
  Portfolio: <PortfolioSelected height={scaleSize(26)} width={scaleSize(26)} />,
  Discover: <DiscoverSelected height={scaleSize(26)} width={scaleSize(26)} />,
};

const HomeScreenPicker = (props: StackScreenProps<'HomeScreenPicker'>) => {
  const { t } = useTranslation();
  const { styles } = useStyles();

  const dispatch = useDispatch();
  const selectedAccountType = useAppSelector(state => state.selectedAccount.type);
  const homeScreen = useAppSelector(
    state => state.currentUserSetting?.homeScreen ?? GlobalDomain[selectedAccountType].defaultHomeScreenTab
  );

  const onSelectItem = useCallback(
    (item: HomeScreenOption) => () => {
      dispatch(
        updateCurrentUserSetting({
          homeScreen: item,
        })
      );
    },
    []
  );

  return (
    <>
      <View style={styles.container}>
        <HeaderScreen leftButtonIcon={true} goBackAction={props.navigation.goBack} headerTitle={'Home Screen'} />
        {Object.values(HomeScreenOption).map((item, index) => {
          return (
            <TouchableOpacity
              // tslint:disable-next-line: jsx-no-lambda
              onPress={onSelectItem(item)}
              key={index}
              style={styles.itemContainer}
            >
              {homeScreen === item && (
                <TickLanguage height={scaleSize(24)} width={scaleSize(24)} style={styles.marginRight8} />
              )}
              <View style={styles.labelContainer}>
                <Text allowFontScaling={false} style={styles.label}>
                  {t(item)}
                </Text>
              </View>
              {ScreenIcon[item]}
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};

export default memo(HomeScreenPicker);
