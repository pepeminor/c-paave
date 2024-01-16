import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useWatchListTypeLogic } from './WatchListType.logic';
import useStyles from './WatchListType.style';
import { IProps, WATCH_LIST_TYPE } from './WatchListType.type';
import withMemo from 'HOC/withMemo';
import { useTranslation } from 'react-i18next';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const WatchListType = (props: IProps) => {
  const { listType } = useWatchListTypeLogic(props);
  const { styles } = useStyles();
  const { t } = useTranslation();

  return (
    <TouchableOpacity style={styles.container} onPress={props.changeType}>
      <View style={styles.containerType}>
        <Animated.Text entering={FadeIn} exiting={FadeOut} style={styles.textType}>
          {t(props.watchListType.name)}
        </Animated.Text>
        <View style={styles.containerDot}>
          {listType.map(item => {
            return (
              <Animated.View
                entering={FadeIn}
                exiting={FadeOut}
                key={item.index}
                style={[styles.dot, props.watchListType.type === item.type && styles.dotSelected]}
              />
            );
          })}
        </View>
      </View>

      <View style={styles.containerValue}>
        {props.watchListType.type === WATCH_LIST_TYPE.PRICE && (
          <Animated.Text entering={FadeIn} exiting={FadeOut} style={styles.textTitle}>
            {t('Last')}
          </Animated.Text>
        )}
        {props.watchListType.type === WATCH_LIST_TYPE.TRADING_VOLUME && (
          <Animated.Text entering={FadeIn} exiting={FadeOut} style={styles.textTitle}>
            {t('Present')}
          </Animated.Text>
        )}
        {props.watchListType.type === WATCH_LIST_TYPE.FOREIGNER_VOLUME && (
          <>
            <Animated.Text entering={FadeIn} exiting={FadeOut} style={styles.textTitleBuy}>
              {t('Buy')}
            </Animated.Text>
            <Animated.Text entering={FadeIn} exiting={FadeOut} style={styles.textTitleSell}>
              {t('Sell')}
            </Animated.Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default withMemo(WatchListType);
