import React, { memo, useEffect, useRef, useState } from 'react';
import { LayoutChangeEvent, Platform, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import { RadioButton, Text } from 'react-native-paper';
import { navigate } from 'utils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTranslation } from 'react-i18next';

// components & screens
import TextInputComponent from 'components/TextInput';
import HeaderScreen from 'components/HeaderScreen';
import ScreenNames from 'screens/RootNavigation/ScreenNames';

// styles
import useStyles from './styles';
import globalStyles, { lightColors as Colors } from 'styles';

enum DELETE_REASON {
  None = `None`,
  TroubleGettingStarted = `Trouble getting started`,
  OtherPlatform = `I'm switching to other platform`,
  NotUseful = `I don't feel it useful for me`,
  SomethingElse = `Something else`,
}

const DeleteAccountReason = (props: StackScreenProps<'DeleteAccountReason'>) => {
  const [value, _setValue] = useState<DELETE_REASON>(DELETE_REASON.None);
  const [description, setDescription] = React.useState<string>('');
  const [screenHeight, setScreenHeight] = useState<number | null>(null);

  const { t } = useTranslation();

  const { styles } = useStyles();
  const DELETE_ACCOUNT_REASON_ROW = [globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.marginSpace];

  const DELETE_ACCOUNT_REASON_BUTTON_STYLES = [globalStyles.centered, styles.executeFormButton];

  const DELETE_ACCOUNT_REASON_TEXT_INPUT_CONTAINER = [globalStyles.container, styles.textInputContainerStyle];
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (inputRef.current != null) inputRef.current.clear();
  }, [value]);

  const onChangeText = (value: string) => {
    setDescription(value);
  };

  const setValue = (newValue: string) => {
    _setValue(newValue as DELETE_REASON);
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  const onNextScreen = () => {
    navigate({
      key: ScreenNames.DeleteAccount,
      params: {
        reason: value === DELETE_REASON.SomethingElse ? description : value,
      },
    });
  };

  const getScreenHeight = (event: LayoutChangeEvent) => {
    if (screenHeight != null) {
      return;
    }
    const { height } = event.nativeEvent.layout;
    setScreenHeight(height - (Platform.OS === 'android' ? 0 : 20));
  };

  const renderContent = (screenHeight2: number | null) => (
    <View style={[screenHeight2 == null ? globalStyles.container : styles.heightContain]}>
      <View style={[globalStyles.container, styles.textContainer]}>
        <Text style={styles.textTitle}>{t('Why are you deleting your account')}?</Text>
        <RadioButton.Group onValueChange={setValue} value={value}>
          <View style={DELETE_ACCOUNT_REASON_ROW}>
            <RadioButton.Android value={DELETE_REASON.TroubleGettingStarted} color={Colors.BlueNewColor} />
            <View>
              <Text
                style={[styles.textOption, value === DELETE_REASON.TroubleGettingStarted ? styles.blueText : undefined]}
              >
                {t(DELETE_REASON.TroubleGettingStarted)}
              </Text>
              {/* tạm ẩn}
              {/* {value === DELETE_REASON.TroubleGettingStarted ? (
                <TouchableOpacity>
                  <Text style={[styles.marginTop8, styles.textSelected]}>{t('Articles on helping solve this')}</Text>
                </TouchableOpacity>
              ) : (
                <></>
              )} */}
            </View>
          </View>
          <View style={DELETE_ACCOUNT_REASON_ROW}>
            <RadioButton.Android value={DELETE_REASON.OtherPlatform} color={Colors.BlueNewColor} />
            <Text style={[styles.textOption, value === DELETE_REASON.OtherPlatform ? styles.blueText : undefined]}>
              {t(DELETE_REASON.OtherPlatform)}
            </Text>
          </View>
          <View style={DELETE_ACCOUNT_REASON_ROW}>
            <RadioButton.Android value={DELETE_REASON.NotUseful} color={Colors.BlueNewColor} />
            <Text style={[styles.textOption, value === DELETE_REASON.NotUseful ? styles.blueText : undefined]}>
              {t(DELETE_REASON.NotUseful)}
            </Text>
          </View>
          <View style={DELETE_ACCOUNT_REASON_ROW}>
            <RadioButton.Android value={DELETE_REASON.SomethingElse} color={Colors.BlueNewColor} />
            <Text style={[styles.textOption, value === DELETE_REASON.SomethingElse ? styles.blueText : undefined]}>
              {t(DELETE_REASON.SomethingElse)}
            </Text>
          </View>
          {value === DELETE_REASON.SomethingElse && (
            <TextInputComponent
              value={description}
              onChangeText={onChangeText}
              wholeContainerStyle={styles.wholeContainerStyle}
              textInputContainerStyle={DELETE_ACCOUNT_REASON_TEXT_INPUT_CONTAINER}
              textInputStyle={styles.textInputStyle}
              multiline
              textAlignVertical="top"
              placeholderTextColor={Colors.LIGHTTextDisable}
              placeholder="We'd love to know why you want to delete your account, so we can improve the app and support our community. Please provide as much detail as possible."
              autoFocus={true}
              ref1={inputRef}
            />
          )}
        </RadioButton.Group>
      </View>
      <TouchableOpacity
        style={[
          DELETE_ACCOUNT_REASON_BUTTON_STYLES,
          value === DELETE_REASON.None ||
          (value === DELETE_REASON.SomethingElse && (description.length < 1 || description.match(/^\s*$/)))
            ? styles.executeFormDisableButton
            : styles.executeFormEnableButton,
        ]}
        onPress={onNextScreen}
        disabled={
          value === DELETE_REASON.None ||
          (value === DELETE_REASON.SomethingElse && (description.length < 1 || description.match(/^\s*$/)))
            ? true
            : false
        }
      >
        <Text style={styles.executeFormButtonText}>{t('Continue')}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderScreenAndroid = (screenHeight2: number | null) => (
    <ScrollView keyboardDismissMode={'interactive'}>{renderContent(screenHeight2)}</ScrollView>
  );

  const renderScreenIOS = (screenHeight2: number | null) => (
    <KeyboardAwareScrollView keyboardDismissMode={'interactive'} keyboardShouldPersistTaps="handled">
      {renderContent(screenHeight2)}
    </KeyboardAwareScrollView>
  );

  return (
    <View style={styles.container} onLayout={getScreenHeight}>
      <HeaderScreen leftButtonIcon={true} goBackAction={goBack} headerTitle={'Delete Account'} />
      {Platform.OS === 'android' ? renderScreenAndroid(screenHeight) : renderScreenIOS(screenHeight)}
    </View>
  );
};

export default memo(DeleteAccountReason);
