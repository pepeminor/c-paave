import React, { memo, useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import Send from 'assets/icon/Send.svg';
import TextInputComponent from 'components/TextInput';
import globalStyles, { lightColors as Colors, scaleSize } from 'styles';
import useStyles from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import HeaderScreen from 'components/HeaderScreen';

type IFakeLiveChatType = {
  content: string;
  sender: boolean;
};

const liveChatData: IFakeLiveChatType[] = [
  {
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.1',
    sender: true,
  },
  {
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.2',
    sender: true,
  },
  {
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.3',
    sender: false,
  },
  {
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.4',
    sender: false,
  },
  {
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.4',
    sender: true,
  },
];

const liveChatDataReverse = liveChatData.reverse();

const LiveChat = (props: StackScreenProps<'LiveChat'>) => {
  const [chatText, setChatText] = useState<string>('');

  const { styles } = useStyles();

  const goBack = () => {
    props.navigation.goBack();
  };

  const onChangeChatText = (text: string) => {
    setChatText(text);
  };

  return (
    <KeyboardAvoidingView
      style={globalStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <HeaderScreen leftButtonIcon={true} goBackAction={goBack} headerTitle={'Support'} />
      <View style={styles.container}>
        <ScrollView style={[globalStyles.container, styles.chatView]}>
          {liveChatDataReverse.map((item, index) => {
            return item.sender === true ? (
              <View
                key={index}
                style={[globalStyles.fillWidth, globalStyles.flexDirectionRow, globalStyles.justifyEnd]}
              >
                <View style={[styles.myChatContainer]}>
                  <Text allowFontScaling={false} style={[styles.myChatText]}>
                    {item.content}
                  </Text>
                </View>
                {index === 0 || (index - 1 > -1 && liveChatDataReverse[index - 1].sender !== true) ? (
                  <View style={styles.myAvatarContainer}></View>
                ) : (
                  <View style={styles.myAvatarContainer2}></View>
                )}
              </View>
            ) : (
              <View
                key={index}
                style={[globalStyles.fillWidth, globalStyles.flexDirectionRow, globalStyles.justifyStart]}
              >
                {index === 0 || (index - 1 > -1 && liveChatDataReverse[index - 1].sender !== false) ? (
                  <View style={styles.notMyAvatarContainer}></View>
                ) : (
                  <View style={styles.notMyAvatarContainer2}></View>
                )}
                <View style={[styles.notMyChatContainer]}>
                  <Text allowFontScaling={false} style={[styles.notMyChatText]}>
                    {item.content}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>

        <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.chatInpurtArea]}>
          <TextInputComponent
            value={chatText}
            onChangeText={onChangeChatText}
            wholeContainerStyle={[globalStyles.container]}
            textInputContainerStyle={[globalStyles.justifyCenter, styles.textInputStyle]}
            placeholderTextColor={Colors.LIGHTTextDisable}
            textInputStyle={[globalStyles.container, styles.textInputStyle2]}
          />
          <TouchableOpacity style={styles.marginLeft10}>
            <Send height={scaleSize(24)} width={scaleSize(24)} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default memo(LiveChat);
