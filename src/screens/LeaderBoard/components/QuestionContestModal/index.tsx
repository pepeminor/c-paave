import React, { memo } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';
import { scaleSize } from 'styles';
import CloseIcon from 'assets/icon/btn_close.svg';
import { useAppSelector } from 'hooks';
import { ContestContent, subMenuFAQ } from 'interfaces/File';
import RenderHTML from 'react-native-render-html';
import { LANG } from 'global';
import { goToEmailSupport, navigate } from 'utils';

type QuestionContestModalProps = {
  closeModal: () => void;
};

const RenderSectionContent = memo(({ content }: { content: ContestContent }) => {
  const { styles } = useStyles();
  if (typeof content === 'string') {
    const fontSize = `${scaleSize(14)}px`;
    const lineHeight = `${scaleSize(18)}px`;
    return (
      <>
        <View style={styles.pt8}>
          <RenderHTML
            source={{
              html: `<span style="font-size: ${fontSize}; line-height: ${lineHeight}; font-family: 'Roboto';color: black;">${content}</span>`,
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

const RenderContestSection = memo(({ question, answer, index }: subMenuFAQ) => {
  const { styles } = useStyles();

  return (
    <>
      <Text allowFontScaling={false} style={styles.textPeriod}>
        {index != null && index + 1}. {question}
      </Text>
      <View style={Array.isArray(answer) && styles.shiftLeft16}>
        <RenderSectionContent content={answer} />
      </View>
    </>
  );
});

const QuestionContestModal = ({ closeModal }: QuestionContestModalProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();

  const selectedLanguage = useAppSelector(state => state.lang);
  const subMenuFAQData = useAppSelector(state => {
    const data = state.contests?.subMenu.FAQ;
    return selectedLanguage === LANG.VI ? data?.vi : data?.en;
  });

  const goToTermAndCondition = () => {
    closeModal();
    navigate({
      key: 'TermAndConditionVT',
      params: { contestOrder: 0 },
    });
  };

  if (subMenuFAQData == null) return null;

  return (
    <View style={styles.container}>
      <ScrollView stickyHeaderIndices={[0]}>
        <SafeAreaView>
          <View style={styles.header}>
            <Text allowFontScaling={false} style={styles.headerText}>
              {t('FAQ')}
            </Text>
            <TouchableOpacity style={styles.closeBtn} onPress={closeModal}>
              <CloseIcon />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <View style={styles.contentContainer}>
          {subMenuFAQData.map((item, index) => (
            <RenderContestSection key={index} {...item} index={index} />
          ))}
          <View style={styles.pt20}>
            <Text allowFontScaling={false} style={styles.supportText}>
              {t('For more details about the contest, please refer to')}{' '}
              <Text onPress={goToTermAndCondition} style={styles.leaderBoardJoinContent2}>
                {t('here')}.
              </Text>
              <Text allowFontScaling={false} style={styles.supportText}>
                {t('Or contact us at')}:{' '}
                <Text onPress={goToEmailSupport} allowFontScaling={false} style={styles.supportEmailText}>
                  support@paave.io
                </Text>
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default memo(QuestionContestModal);
