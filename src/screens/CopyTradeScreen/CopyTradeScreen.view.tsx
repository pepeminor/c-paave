import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity } from 'react-native';
import globalStyles, { scaleSize } from 'styles';
import { formatNumber } from 'utils';
import { WalkthroughTooltip } from 'components/WalkthroughTooltip';
import QuestionIcon from 'assets/icon/QuestionIconBlue.svg';
import { useCopyTradeScreenLogic } from './CopyTradeScreen.logic';
import useStyles from './CopyTradeScreen.style';
import { CopyTradeConfig, IProps } from './CopyTradeScreen.type';
import OptionSelector from 'components/OptionSelector';
import TextInput from 'components/TextInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CopyTradeCheckbox, { Agreement } from './components/CopyTradeCheckBox.component';
import HeaderScreen from 'components/HeaderScreen';
import CopyTradeHelper from './components/CopyTradeHelper';

const CopyTradeScreen = (props: IProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const { isFormDisabled = false, isEdit = false, followingType, followingFullName } = props.route.params ?? {};
  const { state, handlers, validators, reducerState } = useCopyTradeScreenLogic(props);
  const isSubmitBtnDisabled = Boolean(state.maxCashError || state.pinError || state.isAgreeError);

  return (
    <>
      <HeaderScreen
        leftButtonIcon={true}
        goBackAction={props.navigation.goBack}
        headerTitle={'Auto copy trade'}
        rightButtonListIcon={[<CopyTradeHelper followingType={followingType} />]}
      />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View>
          <View style={styles.sectionTitleContainer}>
            <Text allowFontScaling={false} style={styles.sectionTitle}>
              {t('Auto copy trade AI Rating follow')}:
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text allowFontScaling={false} style={styles.infoText}>
              {t(followingFullName ?? 'Top 5 Stocks')}
            </Text>
          </View>
          {/* <OptionSelector
            listValue={CopyTradeConfig.followingType}
            value={state.followingType}
            setValue={handlers.handleFollowingType}
            modalTitle={t('Following type')}
          /> */}
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionTitleContainer}>
            <Text allowFontScaling={false} style={styles.sectionTitle}>
              {t('Following Option')}
            </Text>
            <WalkthroughTooltip title="Following Option" content="Following Option Description">
              <QuestionIcon />
            </WalkthroughTooltip>
          </View>
          <OptionSelector
            listValue={CopyTradeConfig.followingOption}
            value={state.followingOption}
            setValue={handlers.handleFollowingOption}
            modalTitle={t('Select Following Option')}
            disabled={isFormDisabled}
          />
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionTitleContainer}>
            <Text allowFontScaling={false} style={styles.sectionTitle}>
              {t('Account to copy')}
            </Text>
            <WalkthroughTooltip
              title="Account to copy"
              content="This is the KIS trading account you use to auto copy trade. Currently, Auto Copy Trade Service only supports normal accounts"
            >
              <QuestionIcon />
            </WalkthroughTooltip>
          </View>
          <OptionSelector
            listValue={reducerState.accountMap}
            value={state.copyAccount}
            setValue={handlers.handleCopyAccount}
            modalTitle={t('Select account')}
            disabled={isFormDisabled}
          />
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionTitleContainer}>
            <Text allowFontScaling={false} style={styles.sectionTitle}>
              {t('Available balance')}
            </Text>
            <WalkthroughTooltip
              title="Available balance"
              content="This is the available amount you have in your chosen KIS Normal trading account."
            >
              <QuestionIcon />
            </WalkthroughTooltip>
          </View>
          <View style={styles.infoContainer}>
            <Text allowFontScaling={false} style={styles.infoText}>
              {formatNumber(reducerState.availableBalance) ?? '-'}
            </Text>
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionTitleContainer}>
            <Text allowFontScaling={false} style={styles.sectionTitle}>
              {t('Value to copy')}
            </Text>
            <WalkthroughTooltip
              title="Value to copy"
              content="This is the amount you will use to auto copy trade this AI Rating trading strategy."
            >
              <QuestionIcon />
            </WalkthroughTooltip>
          </View>
          <TextInput
            autoFocus={false}
            value={state.maxCash > 0 ? formatNumber(state.maxCash) : ''}
            onChangeText={handlers.handleMaxCash}
            onBlur={validators.validateMaxCash}
            textInputContainerStyle={[styles.infoContainer, Boolean(state.maxCashError) && styles.infoContainerError]}
            textInputStyle={[styles.textInputStyle, styles.infoText]}
            error={Boolean(state.maxCashError)}
            errorContent={state.maxCashError}
            keyboardType="numeric"
            editable={!isFormDisabled}
          />
          <View style={[globalStyles.justifyEnd, globalStyles.flexDirectionRow, styles.mt5]}>
            <Text allowFontScaling={false} style={styles.minText}>
              {t('MIN')}:{' '}
            </Text>
            <Text allowFontScaling={false} style={styles.minMaxValueText}>
              {formatNumber(CopyTradeConfig.maxCashBoundary.min)} VND
            </Text>
            <Text allowFontScaling={false} style={styles.maxText}>
              {t('MAX')}:{' '}
            </Text>
            <Text allowFontScaling={false} style={styles.minMaxValueText}>
              {formatNumber(CopyTradeConfig.maxCashBoundary.max)} VND
            </Text>
          </View>
        </View>
        {!isFormDisabled && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionTitleContainer}>
              <Text allowFontScaling={false} style={styles.sectionTitle}>
                {t('PIN')}
              </Text>
              <WalkthroughTooltip
                title="PIN"
                content="4 Digit PIN provided by KIS upon registration. Please contact KIS in case you have forgotten your PIN"
              >
                <QuestionIcon />
              </WalkthroughTooltip>
            </View>
            <TextInput
              autoFocus={false}
              value={state.pin}
              onChangeText={handlers.handlePin}
              onBlur={validators.validatePin}
              textInputContainerStyle={[styles.infoContainer, Boolean(state.pinError) && styles.infoContainerError]}
              textAlignVertical="top"
              textAlign="left"
              textInputStyle={[styles.textInputStyle, styles.infoText]}
              error={Boolean(state.pinError)}
              errorContent={state.pinError}
              keyboardType="numeric"
              secureTextEntry={true}
              eyeIconHeight={scaleSize(14)}
              eyeIconWidth={scaleSize(19)}
              editable={!isFormDisabled}
            />
          </View>
        )}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionTitleContainer}>
            <Text allowFontScaling={false} style={styles.sectionTitle}>
              {t('Price')}
            </Text>
          </View>
          <View style={globalStyles.flexDirectionRow}>
            {Object.values(CopyTradeConfig.orderType).map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.infoContainer2,
                  index !== 0 && styles.ml16,
                  item === state.orderType && styles.selectedItemContainer,
                ]}
                onPress={handlers.handleOrderType(item)}
                disabled={isFormDisabled}
              >
                <Text
                  allowFontScaling={false}
                  style={[styles.infoText, item === state.orderType && styles.selectedItemText]}
                >
                  {t(item)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <Text allowFontScaling={false} style={[styles.minMaxValueText, styles.mt8, { fontSize: scaleSize(11) }]}>
          (*){' '}
          {t(
            'The system will scan your Auto Copy Trade subscription/ edit at 08:45 and 14:15 daily. Therefore, please be aware to proceed your decision before the mentioned time!'
          )}
        </Text>
        {!isFormDisabled && !isEdit && (
          <CopyTradeCheckbox
            isChecked={state.isAgree}
            onPress={handlers.handleCheckbox}
            setError={validators.validateAgreement}
            error={state.isAgreeError}
            isDisabled={isFormDisabled}
          />
        )}
        {isFormDisabled && (
          <View style={styles.agreementContainer}>
            <Agreement setError={validators.validateAgreement} />
          </View>
        )}
        {!isFormDisabled && (
          <View style={isSubmitBtnDisabled && styles.submitBtnDisable}>
            <TouchableOpacity disabled={isSubmitBtnDisabled} style={styles.submitBtn} onPress={handlers.submitForm}>
              <Text allowFontScaling={false} style={styles.submitBtnText}>
                {t(isEdit ? 'Confirm' : 'Copy Now')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAwareScrollView>
    </>
  );
};

export default memo(CopyTradeScreen);
