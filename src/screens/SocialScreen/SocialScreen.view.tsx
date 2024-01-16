import React, { memo, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TAB, routes, useSocialScreenLogic } from './SocialScreen.logic';
import useStyles from './SocialScreen.style';
import { IProps } from './SocialScreen.type';
import withMemo from 'HOC/withMemo';
import LeaderBoard from 'screens/LeaderBoard';
import TabView from 'components/TabView';
import { useTranslation } from 'react-i18next';
import NewFeed from 'screens/SocialNewFeed';
import { insertObjectIf } from 'utils';
import { scaleSize } from 'styles';
import Icon, { IconName } from 'components/Icon';
import { ItemRoutes } from 'components/TabView/TabView.type';
import { useDispatch } from 'react-redux';
import { SocialPostActions } from 'reduxs';
import ModalBottom from 'components/ModalBottom';
import { TEXT_TYPE } from 'components/PaaveText/type';
import PaaveText from 'components/PaaveText';
import PaaveButton from 'components/PaaveButton';
import { BUTTON_TYPE } from 'components/PaaveButton/type';
import { HeaderLeaderBoardScreen } from 'screens/LeaderBoard/components/Index';

const SocialScreen = (props: IProps) => {
  const { state, handlers, tabViewRef } = useSocialScreenLogic(props);
  const { styles, dynamicColors } = useStyles();
  const { t } = useTranslation();
  const renderScene = useCallback(({ route }: { route: { key: string } }) => {
    if (route.key === TAB.LEADER_BOARD) {
      return <LeaderBoard leaderBoardTab={true} />;
    }

    return <NewFeed />;
  }, []);

  useEffect(() => {
    if (props.route.params?.socialTab?.tab === 'Leaderboard') {
      tabViewRef.current?.setTab(1);
    }
  }, [props.route.params?.socialTab]);

  const renderLabel = useCallback(
    ({ route, focused }: { route: ItemRoutes; focused: boolean }) => {
      return (
        <View style={styles.optionContainer}>
          <Icon name={route.icon as IconName} size={scaleSize(16)} color={dynamicColors.BlueNewColor} />
          <Text style={[styles.text, insertObjectIf(focused, styles.selectedText)]}>{t(route.title)}</Text>
        </View>
      );
    },
    [t]
  );

  return (
    <View style={styles.container}>
      <HeaderLeaderBoardScreen isFocusedLeaderBoard={state.index === 1} titleHeader="Social" />

      <TabView
        onChangeIndex={handlers.onSetIndex}
        routes={routes}
        ref={tabViewRef}
        renderScene={renderScene}
        renderLabel={renderLabel}
        lazy={true}
        swipeEnabled={false}
        indicatorStyle={styles.indicator}
        tabStyle={styles.tabBar}
      />
      <IconInformation />

      {props.showModal && (
        <ModalBottom visible={props.showModal} setVisible={handlers.onSetVisible} showCloseButton={true}>
          <PaaveText type={TEXT_TYPE.BOLD_18} color={dynamicColors.LIGHTTextBigTitle} style={styles.titleModal}>
            {t('social.newFeed.modal.title')}
          </PaaveText>
          <View style={styles.line} />
          <PaaveText
            type={TEXT_TYPE.REGULAR_14}
            color={dynamicColors.LIGHTTextBigTitle}
            style={styles.descriptionModal}
          >
            {t('social.newFeed.modal.description')}
          </PaaveText>
          <PaaveButton
            onPress={handlers.onCloseModal}
            style={styles.buttonModal}
            type={BUTTON_TYPE.SOLID}
            textColor={dynamicColors.LIGHTTextContent}
          >
            {t('social.newFeed.modal.dismiss')}
          </PaaveButton>
        </ModalBottom>
      )}
    </View>
  );
};

const IconInformation = memo(() => {
  const { styles, dynamicColors } = useStyles();
  const dispatch = useDispatch();

  const onPress = useCallback(() => {
    dispatch(SocialPostActions.updateShowModalIntroduce(true));
  }, []);

  return (
    <TouchableOpacity onPress={onPress} style={styles.containerButton}>
      <Icon name={'info'} size={scaleSize(14)} color={dynamicColors.Yellow2} />
    </TouchableOpacity>
  );
});

export default withMemo(SocialScreen);
