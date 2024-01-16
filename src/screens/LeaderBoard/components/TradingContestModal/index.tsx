import React, { memo, useEffect, useState } from 'react';
import { Image, Platform, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';
import globalStyles, { lightColors as Colors, scaleSize, textStyles } from 'styles';
import Grabber from 'assets/icon/Grabber.svg';
import CloseIcon from 'assets/icon/btn_close.svg';
import LeaderBoardNoDataIcon from 'assets/component/LeaderBoardNoData.svg';
import { navigate } from 'utils/rootNavigation';
import { BaseBottomModalProps } from 'components/BottomModal';
import { useAppSelector } from 'hooks';
import { ContestContent } from 'interfaces/File';
import RenderHTML from 'react-native-render-html';
import { ACCOUNT_TYPE } from 'global';
import { insertObjectIf } from 'utils/common';

const TradingContestModal = ({ closeModal }: BaseBottomModalProps) => {
  const { t } = useTranslation();
  const { styles, dynamicColors } = useStyles();
  const selectedLanguage = useAppSelector(state => state.lang);
  const modalVirtualData = useAppSelector(state => {
    const data = state.contests?.modal.data;
    return data?.[selectedLanguage] ?? data?.en;
  });

  const kisModalInfoData = useAppSelector(state => {
    const data = state.kisInfoModal?.modal.data;
    return data?.[selectedLanguage] ?? data?.en;
  });

  const isLeaderboardAccountSelected = useAppSelector(state => state.leaderboardAccountSelector);

  const [modalData, setModalData] = useState(kisModalInfoData);

  useEffect(() => {
    if (isLeaderboardAccountSelected === ACCOUNT_TYPE.KIS) {
      setModalData(kisModalInfoData);
    } else {
      setModalData(modalVirtualData);
    }
  }, [isLeaderboardAccountSelected, kisModalInfoData, modalVirtualData]);

  const goToTermAndCondition = () => {
    navigate({ key: 'TermAndConditionVT', params: { contestOrder: 0 } });
    closeModal();
  };

  if (modalData == null) return null;

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.invisibleBackground}></View>
      </TouchableWithoutFeedback>
      <ScrollView stickyHeaderIndices={[0]}>
        <View style={globalStyles.centered}>
          <Grabber />
        </View>
        <View style={styles.header}>
          <Text allowFontScaling={false} style={[styles.headerText, textStyles.fontSize16]}>
            {t(modalData.header)}
          </Text>
          <TouchableOpacity style={[styles.closeBtn, globalStyles.centered]} onPress={closeModal}>
            <CloseIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <Text allowFontScaling={false} style={styles.contentTitle}>
            {t(modalData.title)}
          </Text>
          <Text allowFontScaling={false} style={styles.subtitle}>
            {modalData.subTitle}
          </Text>
          <View style={[globalStyles.flexDirectionRow, styles.prizeContainer]}>
            {isLeaderboardAccountSelected === ACCOUNT_TYPE.KIS ? (
              <LeaderBoardNoDataIcon
                width={Platform.OS === 'ios' ? scaleSize(375) : scaleSize(350)}
                height={scaleSize(180)}
                style={globalStyles.alignSelfCenter}
              />
            ) : (
              <View style={styles.trophyImage}>
                <Image source={require('assets/img/DoubleTrophy.png')} style={globalStyles.container2} />
              </View>
            )}
            {/* <LeaderBoardNoDataCupIcon /> */}
            {modalData.prize.first && (
              <View style={styles.prizePool}>
                {modalData.prize.first != null && (
                  <PrizeRow index="1st" value={modalData.prize.first} color={Colors.LIGHTYellow} />
                )}
                {modalData.prize.second != null && (
                  <PrizeRow index="2nd" value={modalData.prize.second} color={dynamicColors.Mischka} />
                )}
                {modalData.prize.third != null && (
                  <PrizeRow index="3rd" value={modalData.prize.third} color={dynamicColors.CreamBrulee} />
                )}
              </View>
            )}
          </View>
          {modalData.sections.map((section, index) => (
            <RenderContestSection key={index} {...section} />
          ))}
          {isLeaderboardAccountSelected !== ACCOUNT_TYPE.KIS && (
            <TouchableOpacity style={[globalStyles.centered, styles.executeFormButton]} onPress={goToTermAndCondition}>
              <Text allowFontScaling={false} style={styles.executeFormButtonText}>
                {t('Get to know more about competition')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default memo(TradingContestModal);

type PrizeRow = {
  index: string;
  value: string;
  color: string;
};

const PrizeRow = memo(({ index, value, color }: PrizeRow) => {
  const { styles } = useStyles();
  return (
    <View style={styles.prizeItem}>
      <View style={[styles.ordinalBox, { backgroundColor: color }]}>
        <Text allowFontScaling={false} style={styles.prizeItemTxt}>
          {index}
        </Text>
      </View>
      <View style={globalStyles.container}>
        <Text allowFontScaling={false} style={styles.colorYellow}>
          {value}
        </Text>
      </View>
      <Text allowFontScaling={false} style={styles.currency}>
        VND
      </Text>
    </View>
  );
});

const RenderSectionContent = memo(({ content }: { content: ContestContent }) => {
  const { styles } = useStyles();
  if (typeof content === 'string') {
    const fontSize = `${scaleSize(14)}px`;
    const lineHeight = `${scaleSize(24)}px`;
    return (
      <>
        <View style={styles.pt8}>
          <RenderHTML
            source={{
              html: `<span style="text-align:'justify'; font-size: ${fontSize}; line-height: ${lineHeight}; font-family: 'Roboto';color: ${Colors.BACKGROUND_MODAL2};">${content}</span>`,
            }}
            contentWidth={scaleSize(375)}
          />
        </View>
      </>
    );
  }
  return (
    <View style={styles.pl16}>
      {content.map((item, index) => (
        <RenderSectionContent content={item} key={index} />
      ))}
    </View>
  );
});

type SectionProps = {
  title: string;
  content: ContestContent;
};

const RenderContestSection = memo(({ title, content }: SectionProps) => {
  const { styles } = useStyles();
  return (
    <>
      {title !== '' && (
        <Text allowFontScaling={false} style={styles.textPeriod}>
          {title}
        </Text>
      )}
      <View style={insertObjectIf(Array.isArray(content), styles.shiftLeft16)}>
        <RenderSectionContent content={content} />
      </View>
    </>
  );
});
