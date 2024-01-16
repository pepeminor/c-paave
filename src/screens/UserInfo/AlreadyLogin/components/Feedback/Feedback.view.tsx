import React from 'react';
import { View, TextInput } from 'react-native';
import { useFeedbackLogic } from './Feedback.logic';
import useStyles from './Feedback.style';
import { IProps } from './Feedback.type';
import withMemo from 'HOC/withMemo';
import PaaveText from 'components/PaaveText';
import { TEXT_TYPE } from 'components/PaaveText/type';
import PaaveButton from 'components/PaaveButton';
import { BUTTON_TYPE } from 'components/PaaveButton/type';
import { useTranslation } from 'react-i18next';
import ModalBottom from 'components/ModalBottom';
import VeryGood from 'assets/icon/VeryGood.svg';
import ItemFunctionComponent from './components/ItemFunction.component';
import { AMPLITUDE_EVENT } from 'interfaces/Amplitude';
import { useAppSelector } from 'hooks/useAppSelector';
import { IS_ANDROID } from 'constants/main';
import { insertObjectIf } from 'utils';
import StarVote from './components/StarVote';
const DEFAULT_LEN = 1000;

const Feedback = (props: IProps) => {
  const { handlers, refs, state } = useFeedbackLogic(props);
  const { pointValue, listFunctionSelectedRef, ModalError } = refs;
  const { styles, dynamicColors } = useStyles();
  const { t } = useTranslation();
  const keyboardHeight = useAppSelector(state => state.keyboardHeight);

  return (
    <View style={styles.containerFeedback}>
      <View style={styles.containerFeedback2}>
        <PaaveText style={styles.textFeedback} type={TEXT_TYPE.BOLD_14} color={dynamicColors.BlueNewColor}>
          {t('how_was_your_experience')}
        </PaaveText>
        <StarVote pointValue={pointValue} />

        <PaaveButton
          onPress={handlers.onConfirmFeedback}
          style={styles.buttonConfirm}
          type={BUTTON_TYPE.SOLID}
          color={dynamicColors.BlueNewColor}
        >
          {t('Confirm')}
        </PaaveButton>
      </View>

      {ModalError.current && (
        <ModalError.current
          onCloseModal={handlers.onHideModalError}
          isVisible={state.modalErrorVisible}
          title={'feedback.already.submit.error.title'}
          subTitle={'feedback.already.submit.error.subTitle'}
          confirmText={'Continue'}
        />
      )}

      {state.modalVisible && (
        <ModalBottom setVisible={handlers.setVisibleModal} visible={state.modalVisible} showCloseButton={false}>
          <View style={[styles.container, insertObjectIf(IS_ANDROID && keyboardHeight > 0, { paddingBottom: 256 })]}>
            <View style={styles.stickHeader} />
            <View style={pointValue.current >= 8 ? styles.containerTitle : styles.containerTitle2}>
              <PaaveText style={styles.textFeedback} type={TEXT_TYPE.BOLD_14} color={dynamicColors.BlueNewColor}>
                {pointValue.current >= 8 ? t('support_us_on_appstore') : t('title_feedback')}
              </PaaveText>
              {pointValue.current >= 8 && <VeryGood style={styles.statusImageImg} />}
            </View>
            {pointValue.current >= 8 && (
              <PaaveText style={styles.textSubTitle} type={TEXT_TYPE.REGULAR_14} color={dynamicColors.BlueNewColor}>
                {t('subtitle_feedback')}
              </PaaveText>
            )}

            {pointValue.current < 8 && (
              <View>
                <View style={styles.containerContentWrap}>
                  <ItemFunctionComponent
                    listFunctionSelectedRef={listFunctionSelectedRef}
                    item={{ event: AMPLITUDE_EVENT.IMPROVED_PORTFOLIO, name: 'Portfolio', icon: 'portfolio-2' }}
                  />
                  <ItemFunctionComponent
                    listFunctionSelectedRef={listFunctionSelectedRef}
                    item={{ event: AMPLITUDE_EVENT.IMPROVED_DISCOVER, name: 'Discover', icon: 'discover' }}
                  />
                  <ItemFunctionComponent
                    listFunctionSelectedRef={listFunctionSelectedRef}
                    item={{ event: AMPLITUDE_EVENT.IMPROVED_TRADING, name: 'Trading', icon: 'trading' }}
                  />
                </View>
                <View style={styles.containerContentWrap}>
                  <ItemFunctionComponent
                    listFunctionSelectedRef={listFunctionSelectedRef}
                    item={{ event: AMPLITUDE_EVENT.IMPROVED_AI_INSIGHT, name: 'ai_insight', icon: 'notice' }}
                  />
                  <ItemFunctionComponent
                    listFunctionSelectedRef={listFunctionSelectedRef}
                    item={{ event: AMPLITUDE_EVENT.IMPROVED_LEADER_BOARD, name: 'Leaderboard', icon: 'trophy' }}
                  />
                  <ItemFunctionComponent
                    listFunctionSelectedRef={listFunctionSelectedRef}
                    item={{
                      event: AMPLITUDE_EVENT.IMPROVED_STOCK_INFO,
                      name: 'stock_info',
                      icon: 'market-chart-candle',
                    }}
                  />
                </View>
                <View style={styles.containerContentWrap}>
                  <ItemFunctionComponent
                    listFunctionSelectedRef={listFunctionSelectedRef}
                    item={{
                      event: AMPLITUDE_EVENT.IMPROVED_TRANSACTIONS,
                      name: 'Transactions',
                      icon: 'internal-transfer',
                    }}
                  />
                  <ItemFunctionComponent
                    listFunctionSelectedRef={listFunctionSelectedRef}
                    item={{ event: AMPLITUDE_EVENT.IMPROVED_OTHERS, name: 'Others', icon: 'utilities' }}
                  />
                  <ItemFunctionComponent listFunctionSelectedRef={listFunctionSelectedRef} />
                </View>

                <TextInput
                  editable
                  multiline
                  maxLength={DEFAULT_LEN}
                  onChangeText={handlers.onChangeText}
                  style={styles.textInput}
                  placeholder={t('share_with_us_your_thoughts_here')}
                  placeholderTextColor={dynamicColors.LIGHTTextTitle}
                  textAlignVertical="top"
                />

                {state.errorMsg && (
                  <PaaveText type={TEXT_TYPE.REGULAR_12} color={dynamicColors.RedColorLogo} style={styles.errorText}>
                    {t('error_feedback')}
                  </PaaveText>
                )}
              </View>
            )}

            <PaaveButton
              onPress={handlers.onRatingApp}
              style={styles.buttonRatingApp}
              type={BUTTON_TYPE.SOLID}
              color={dynamicColors.BlueNewColor}
            >
              {pointValue.current >= 8 ? t('Absolutely') + '!' : t('Confirm')}
            </PaaveButton>

            <PaaveButton
              onPress={handlers.onCancel}
              style={styles.buttonCancel}
              type={BUTTON_TYPE.SOLID}
              color={dynamicColors.LIGHTBGTab}
              textColor={dynamicColors.BACKGROUND_MODAL3}
            >
              {t('Cancel')}
            </PaaveButton>
          </View>
        </ModalBottom>
      )}
    </View>
  );
};

export default withMemo(Feedback);
