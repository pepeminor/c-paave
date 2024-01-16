import React, { memo, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { StackScreenProps } from 'screens/RootNavigation';
// import HeaderScreen from 'components/HeaderScreen';
import { Animated, Easing, Text, TouchableWithoutFeedback, View } from 'react-native';
import globalStyles, { lightColors } from 'styles';
import LoadingKIS from 'assets/icon/loading-kis.svg';
import Modal from 'components/Modal';
import useStyles from './styles';
import WebView from 'react-native-webview';
import { useTranslation } from 'react-i18next';
import { track } from '@amplitude/analytics-react-native';
import { AMPLITUDE_EVENT } from 'interfaces/Amplitude';
import { useSelector } from 'react-redux';
import { IState } from 'reduxs/global-reducers';

const BlogWeb = (props: StackScreenProps<'BlogWeb'>) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const offset = useRef(new Animated.Value(0)).current;
  const selectedAccount = useSelector((state: IState) => state.selectedAccount);
  const [loading, setLoading] = useState<boolean>(false);

  useLayoutEffect(() => {
    track(AMPLITUDE_EVENT.BlogTab, {
      selectedAccount: selectedAccount?.selectedSubAccount?.accountName ?? 'NON_LOGIN',
    });
    props.navigation.setOptions({
      header: () => null, // hide header until already social feature
      // <HeaderScreen headerTitle={''} subAccountVisible={false} disableVirtualAccount={true} />,
    });
  }, [props.navigation]);

  const loopAnimation = Animated.loop(
    Animated.timing(offset, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
    { resetBeforeIteration: true }
  );

  const showLoading = () => {
    setLoading(true);
    loopAnimation.reset();
    loopAnimation.start();
  };

  useEffect(() => {
    showLoading();
  }, []);

  return (
    <>
      <WebView onLoadStart={() => setLoading(false)} source={{ uri: `https://blog.paave.io` }} />
      <Modal
        visible={loading}
        childrenContent={
          <TouchableWithoutFeedback>
            <View style={[globalStyles.container, { backgroundColor: lightColors.WHITE }, globalStyles.centered]}>
              <Animated.View
                style={{
                  transform: [
                    {
                      rotateZ: offset.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg'],
                      }),
                    },
                  ],
                }}
              >
                <LoadingKIS />
              </Animated.View>
              <Text style={styles.loadingTextStyle}>{t(`Block Quote`)}</Text>
              <Text style={styles.loadingTextStyle1}>_{t(`Author`)}_</Text>
              <View style={styles.dummyBlock} />
            </View>
          </TouchableWithoutFeedback>
        }
      />
    </>
  );
};

export default memo(BlogWeb);
