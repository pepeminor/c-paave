import React, { memo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  LayoutChangeEvent,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import IconOutlineRightWhite from 'assets/icon/IconOutlineRightWhite.svg';

import HeaderScreen from 'components/HeaderScreen';

/* Style */
import globalStyles from 'styles';
import useStyles from './styles';

import { useTranslation } from 'react-i18next';
import Modal from 'components/Modal';

const fakeData = {
  title: 'Investment or Saving',
  estimatedTime: '2 mins',
  contents: [
    {
      title: 'Pros',
      data: [
        'To put money aside in a savings account with no to very low risk in order to withdraw it whenever we need to in the future. The purpose of saving should be for shorter goals as well as for emergencies. (Example: at least 3-6 months of regular expenses need to be put aside as saving for emergencies. Depending on the type of short term goal that one has, in the case of an imaginary friend, A, he needs a new car next year. If he needs the car by next year, the best option for him to guarantee such a goal is to save where he will incur no loss in his asset.)',
      ],
    },
    {
      title: 'Cons',
      data: ['Zero to very low risk', 'Minimum fee involved with savings accounts and other money instruments.'],
      // Liquidity is always high for money instruments. Involve less calculation and learning. Overall easier to do.`,
    },
  ],
  special: [
    {
      term: 'Liquidity',
      definition:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type",
    },
  ],
};

const ChapterDetail = (props: StackScreenProps<'ChapterDetail'>) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const { chapter } = props.route.params;
  const [screenHeight, setScreenHeight] = useState<number | null>(null);
  const [modalContent, setModalContent] = useState<string>('');

  const getScreenHeight = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    if (screenHeight && screenHeight <= height) {
      setScreenHeight(height);
    }
  };

  const closeModal = () => {
    setModalContent('');
  };

  const renderContentInScroll = () => {
    return (
      <View style={styles.container}>
        <View>
          <Text allowFontScaling={false} style={styles.chapterTitle}>
            {t(fakeData.title)}
          </Text>
          <Text allowFontScaling={false} style={styles.read}>
            {t('Read')}:{' '}
            <Text allowFontScaling={false} style={styles.readTime}>
              {t(fakeData.estimatedTime)}
            </Text>
          </Text>
        </View>
        <View style={styles.image}>
          {/* Image */}
          <Text>Đây là hình</Text>
        </View>
        <View>
          <Text allowFontScaling={false} style={styles.section}>
            {t('The Definitions')}
          </Text>
          {fakeData.contents.map(item => (
            <>
              <Text allowFontScaling={false} style={styles.contentTitle}>
                {item.title}
              </Text>
              {item.data.map(text => (
                <Text allowFontScaling={false} style={styles.content}>
                  {text}
                </Text>
              ))}
              {/* {addTouchableOnKeywords(item.data)} */}
            </>
          ))}
          <Text allowFontScaling={false} style={styles.content}>
            <Text
              onPress={() => {
                setModalContent(
                  `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type`
                );
              }}
              style={styles.keyword}
            >
              Liquidity
            </Text>{' '}
            is always high for money instruments. Involve less calculation and learning. Overall easier to do.
          </Text>
        </View>
        <TouchableOpacity>
          <View style={styles.nextBtnContainer}>
            <Text style={[styles.nextBtnHead, styles.nextBtnText]}>{t('Next')}: </Text>
            <Text style={[styles.nextBtnMid, styles.nextBtnText]}>Saving and everything about it</Text>
            <View style={[styles.nextBtnEnd]}>
              <IconOutlineRightWhite />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={globalStyles.container} onLayout={getScreenHeight}>
      <HeaderScreen
        leftButtonIcon={true}
        goBackAction={props.navigation.goBack}
        headerTitle={t('Chapter', { chapter: chapter })}
        eachIconGap={10}
      />
      {Platform.OS === 'android' ? (
        <ScrollView>{renderContentInScroll()}</ScrollView>
      ) : (
        <KeyboardAwareScrollView>{renderContentInScroll()}</KeyboardAwareScrollView>
      )}

      <Modal
        visible={Boolean(modalContent)}
        childrenContent={
          <TouchableOpacity onPress={closeModal} style={styles.noticeContainer}>
            <TouchableWithoutFeedback>
              <View style={[styles.container, styles.notice]}>
                <Text style={styles.noticeContent}>{modalContent}</Text>
                <TouchableOpacity onPress={closeModal} style={[globalStyles.centered, styles.executeFormButton2]}>
                  <Text allowFontScaling={false} style={styles.executeFormButtonText2}>
                    {t('I got it')}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

export default memo(ChapterDetail);
