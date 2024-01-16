import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import globalStyles from 'styles';
import useStyles from './styles';
import FB from 'assets/icon/Facebook.svg';
import HeaderScreen from 'components/HeaderScreen';

const InviteFriends = (props: StackScreenProps<'InviteFriends'>) => {
  const { styles } = useStyles();
  const GoBack = () => {
    props.navigation.goBack();
  };

  const onPressButton = () => {};

  return (
    <View style={styles.container}>
      <HeaderScreen leftButtonIcon={true} goBackAction={GoBack} headerTitle={'Invite Friends'} />
      <View style={styles.containerContent}>
        <View style={styles.sectionContainer}>
          <Text style={styles.textBold}>Invite your friends & receive rewards</Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={[styles.paddingTop, styles.lightText]}>Share your referral link</Text>
          <View style={styles.notificationStock}>
            <Text style={styles.textFiled}>https://www.paave.io?xxxxx</Text>
            <TouchableOpacity style={styles.button} onPress={onPressButton}>
              <Text style={styles.buttonText}>Copy</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={[styles.paddingTop, styles.lightText]}>Share your referral link</Text>
          <View style={styles.notificationStock}>
            <Text style={styles.textFiled}>referralcode</Text>
            <TouchableOpacity style={styles.button} onPress={onPressButton}>
              <Text style={styles.buttonText}>Copy</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.sectionContainer, globalStyles.flexDirectionRow, globalStyles.alignCenter]}>
          <Text style={styles.lightText}>Share this</Text>
          <FB style={styles.sizeIcon} />
        </View>
        <View
          style={[
            styles.sectionContainer,
            globalStyles.flexDirectionRow,
            globalStyles.alignCenter,
            styles.spaceBetween,
          ]}
        >
          <Text style={styles.lightText}>Scan QR Code</Text>
          <View style={styles.codeQR}></View>
        </View>
        <View style={[styles.sectionContainer]}>
          <Text style={styles.textRegular}>
            Once the invited friends joined Paave, both of you and your friends will receive rewards together.{' '}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default memo(InviteFriends);
