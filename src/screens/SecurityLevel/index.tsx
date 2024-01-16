import React, { memo, useState } from 'react';
import { View, Text } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import useStyles from './styles';
import CheckBox from 'components/CheckBox';
import HeaderScreen from 'components/HeaderScreen';

const SecurityLevel = (props: StackScreenProps<'SecurityLevel'>) => {
  const [button1, setButton1] = useState<boolean>(false);
  const [button2, setButton2] = useState<boolean>(false);
  const [button3, setButton3] = useState<boolean>(false);
  const [button4, setButton4] = useState<boolean>(false);

  const { styles } = useStyles();

  const handleButton1 = () => {
    setButton1(pre => !pre);
  };

  const handleButton2 = () => {
    setButton2(pre => !pre);
  };

  const handleButton3 = () => {
    setButton3(pre => !pre);
  };

  const handleButton4 = () => {
    setButton4(pre => !pre);
  };

  const GoBack = () => {
    props.navigation.goBack();
  };

  return (
    <View style={styles.containerMain}>
      <HeaderScreen leftButtonIcon={true} goBackAction={GoBack} headerTitle={'Security Level'} />
      <View style={styles.container}>
        <Text style={styles.textLine}>Email Verification</Text>
        <CheckBox value={button1} onPress={handleButton1} />
      </View>
      <View style={styles.container}>
        <Text style={styles.textLine}>Mobile Verification</Text>
        <CheckBox value={button2} onPress={handleButton2} />
      </View>
      <View style={styles.container}>
        <Text style={styles.textLine}>Trading Account Verification</Text>
        <CheckBox value={button3} onPress={handleButton3} />
      </View>
      <View style={styles.container}>
        <Text style={styles.textLine}>Google Authentication Register</Text>
        <CheckBox value={button4} onPress={handleButton4} />
      </View>
    </View>
  );
};

export default memo(SecurityLevel);
