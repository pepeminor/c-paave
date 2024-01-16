import HeaderScreen from 'components/HeaderScreen';
import React, { memo, PropsWithChildren } from 'react';
import { Image, View, StyleProp, ViewStyle } from 'react-native';
import useStyles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type IFeedbackBackgroundProps = {
  isScrollView?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
};

const FeedbackBackground = ({
  isScrollView,
  containerStyle,
  children,
}: PropsWithChildren<IFeedbackBackgroundProps>) => {
  const { styles } = useStyles();

  return (
    <View style={styles.container}>
      <HeaderScreen headerTitle={''} background backgroundStyle={styles.headerContainer} />
      <Image
        source={require('assets/img/FeedbackBG_shadow.png')}
        resizeMode="stretch"
        style={styles.backgroundShadow}
      />
      <Image source={require('assets/img/FeedbackBG.png')} resizeMode="stretch" style={styles.backgroundImg} />
      {isScrollView ? (
        <KeyboardAwareScrollView style={[styles.childrenContainer, containerStyle]}>{children}</KeyboardAwareScrollView>
      ) : (
        <View style={[styles.childrenContainer, containerStyle]}>{children}</View>
      )}
    </View>
  );
};

export default memo(FeedbackBackground);
