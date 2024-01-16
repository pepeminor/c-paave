import React, { memo } from 'react';
import { LayoutChangeEvent, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StackScreenProps } from 'screens/RootNavigation';
import TextInputComponent from 'components/TextInput';
import { putUserBio } from 'reduxs/global-actions';
import { IState } from 'reduxs/global-reducers';
import HeaderScreen from 'components/HeaderScreen';
import globalStyles, { scaleSize } from 'styles';
import useStyles from './styles';
import { IGetAccountInfo } from 'interfaces/user';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { useTranslation } from 'react-i18next';
import config from '../../config/index';
// import { KEYPRESS } from 'constants/enum';
import { ILoadingReducer } from 'interfaces/reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// const MAX_LINE = 4;

// Don't remove
// interface IFormatText {
//   nextRenders: boolean;
//   keypress: string | null;
//   disableTyping: boolean;
//   heightList: number[];
//   selection: {
//     start: number;
//     end: number;
//   };
// }

const UserIntroduction = (props: StackScreenProps<'UserIntroduction'>) => {
  const dispatch = useDispatch();
  const { styles } = useStyles();
  const getAccountInfo: ILoadingReducer<IGetAccountInfo | null> = useSelector(
    (state: IState) => state.getUserAccountInfo
  );
  const [introText, setIntroText] = React.useState<string>(getAccountInfo.data != null ? getAccountInfo.data.bio : '');
  const [heightInput, setHeightInput] = React.useState<number>(90);
  const [screenHeight, setScreenHeight] = React.useState<number | null>(null);
  const { t } = useTranslation();

  const onConfirm = () => {
    let bio = introText;
    const notSpaceOnlyIdx = bio.match(/[\S]/);
    if (!notSpaceOnlyIdx) {
      bio = '';
    } else {
      const charIdx = bio.search(notSpaceOnlyIdx[0]);
      bio = bio.slice(charIdx, bio.length);
      const lastSpaceStr = bio.match(/[\S][\s]+$/);

      if (lastSpaceStr != null) {
        bio = bio.slice(0, bio.search(lastSpaceStr[0]) + 1);
      }
    }

    dispatch(
      putUserBio({ bio }, undefined, {
        key: ScreenNames.UserInfo,
      })
    );
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  const onIntroTextChange = (value: string) => {
    // Don't remove
    // if (value.split(/\r\n|\r|\n/).length <= MAX_LINE) {
    //   setIntroText(value);
    // }
    setIntroText(value);
  };

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> DON'T REMOVE <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  // const handleInput = React.useRef<IFormatText>({
  //   nextRenders: false,
  //   keypress: null,
  //   disableTyping: false,
  //   heightList: [],
  //   selection: {
  //     start: 0,
  //     end: 0,
  //   },
  // });

  // const onKeyPress = ({ nativeEvent }: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
  //   handleInput.current.keypress = nativeEvent.key.match(/Enter|Backspace/) ? nativeEvent.key : null;
  // };

  // const onIntroTextChange = (value: string) => {
  //   let { keypress, disableTyping, heightList } = handleInput.current;
  //   const isBackspace = keypress === KEYPRESS.BACKSPACE;
  //   const isFitLine = value.split(/\r\n|\r|\n/).length <= MAX_LINES && heightList.length < MAX_LINES;
  //   const isFitTyping = keypress !== KEYPRESS.ENTER && !disableTyping;
  //   if (isBackspace || isFitLine || isFitTyping) {
  //     setIntroText(value);
  //     isBackspace && (handleInput.current.disableTyping = false);
  //   }
  // };

  // const onSelectionChange = (e: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
  //   const { start, end } = e.nativeEvent.selection;
  //   handleInput.current.selection.start = start;
  //   handleInput.current.selection.end = end;
  // };

  // const onLayoutChange = async (e: LayoutChangeEvent) => {
  //   const currentHeight = e.nativeEvent.layout.height;
  //   let { nextRenders, keypress, disableTyping, heightList, selection } = handleInput.current;
  //   if (nextRenders) {
  //     if (
  //       heightList.length >= MAX_LINES &&
  //       currentHeight > heightList.slice(-1)[0] &&
  //       !disableTyping &&
  //       !introText.slice(-1).match(/\r\n|\r|\n/) &&
  //       !keypress?.match(/Enter|Backspace/)
  //     ) {
  //       setIntroText(prev => {
  //         return selection.start === selection.end && selection.start === prev.length
  //           ? prev.slice(0, prev.length - 1)
  //           : prev.slice(0, selection.start) + prev.slice(selection.end + 1, prev.length);
  //       });
  //     }

  //     const equalHeightIdx = heightList.findIndex(item => item === currentHeight);
  //     if (heightList.length < MAX_LINES && equalHeightIdx === -1) {
  //       const biggerHeightIdx = heightList.findIndex(el => el > currentHeight);
  //       heightList.splice(biggerHeightIdx !== -1 ? biggerHeightIdx : heightList.length, 0, currentHeight);
  //     } else if (equalHeightIdx !== -1) {
  //       heightList.splice(equalHeightIdx + 1);
  //     }
  //     disableTyping = heightList.length === MAX_LINES && currentHeight > heightList.slice(-1)[0];
  //   } else {
  //     nextRenders = true;
  //     heightList.push(currentHeight);
  //   }

  //   handleInput.current = {
  //     keypress: null,
  //     nextRenders,
  //     disableTyping,
  //     heightList,
  //     selection,
  //   };
  // };

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> DON'T REMOVE <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  const getScreenHeight = (event: LayoutChangeEvent) => {
    if (screenHeight != null) {
      return;
    }
    const { height } = event.nativeEvent.layout;
    setScreenHeight(height - (Platform.OS === 'android' ? 0 : 20));
  };

  const renderContent = (screenHeight2: number | null) => (
    <View style={[screenHeight2 == null ? globalStyles.container : { height: screenHeight2 }]}>
      <View style={globalStyles.container}>
        <View
          style={[
            styles.textInputContainer,
            {
              height: heightInput <= scaleSize(90) ? scaleSize(90) : scaleSize(heightInput),
            },
          ]}
        >
          <TextInputComponent
            value={introText}
            onChangeText={onIntroTextChange}
            wholeContainerStyle={globalStyles.container2}
            textInputContainerStyle={[globalStyles.container, styles.textInputContainerStyle]}
            textInputStyle={styles.textInputStyle}
            multiline
            textAlignVertical="top"
            placeholder="Hi, I am"
            autoFocus={true}
            maxLength={config.maxCharOfUserIntro}
            onContentSizeChange={event => {
              setHeightInput(event.nativeEvent.contentSize.height);
            }}
            // onLayout={onLayoutChange}
            // onKeyPress={onKeyPress}
            // onSelectionChange={onSelectionChange}
          />
        </View>
        <Text style={styles.introTextLengthStyle}>{`${introText.length}/${config.maxCharOfUserIntro}`}</Text>
        {/* <View style={[globalStyles.centered, globalStyles.alignCenter, styles.actionGroup]}>
        <TouchableOpacity style={[globalStyles.centered, styles.confirmButton]} onPress={onConfirm}>
          <Text allowFontScaling={false} style={styles.confirmText}>
            {t('Save')}
          </Text>
        </TouchableOpacity>
      </View> */}
      </View>
    </View>
  );

  const renderScreenAndroid = (screenHeight2: number | null) => (
    <ScrollView keyboardDismissMode={'interactive'} keyboardShouldPersistTaps="handled">
      {renderContent(screenHeight2)}
    </ScrollView>
  );

  const renderScreenIOS = (screenHeight2: number | null) => (
    <KeyboardAwareScrollView keyboardDismissMode={'interactive'} keyboardShouldPersistTaps="handled">
      {renderContent(screenHeight2)}
    </KeyboardAwareScrollView>
  );

  return (
    <View style={styles.container} onLayout={getScreenHeight}>
      <HeaderScreen
        leftButtonIcon={true}
        goBackAction={goBack}
        headerTitle={'User Introduction'}
        rightButtonListIcon={[
          <TouchableOpacity onPress={onConfirm}>
            <Text allowFontScaling={false} style={styles.confirmText}>
              {t('Save')}
            </Text>
          </TouchableOpacity>,
        ]}
      />
      {Platform.OS === 'android' ? renderScreenAndroid(screenHeight) : renderScreenIOS(screenHeight)}
    </View>
  );
};

export default memo(UserIntroduction);
