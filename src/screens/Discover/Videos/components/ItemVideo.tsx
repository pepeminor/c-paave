import React, { useCallback } from 'react';
import { Image, View } from 'react-native';
import withMemo from 'HOC/withMemo';
import PaaveText from 'components/PaaveText';
import { TEXT_TYPE } from 'components/PaaveText/type';
import { getStylesHook } from 'hooks/useStyles';
import { IVideoItem } from 'reduxs';
import TouchableScale from 'components/TouchableScale';
import ModalWatchVideo from './ModalWatchVideo';
import { lightColors, scaleSize } from 'styles';
import PLayVideo from 'assets/icon/PlayVideo.svg';
import moment from 'moment';

interface IProps {
  item: IVideoItem;
}

const ItemVideo = (props: IProps) => {
  const { styles, dynamicColors } = useStyles();
  const [isVisible, setIsVisible] = React.useState(false);
  const { item } = props;
  const onPress = useCallback(() => {
    setIsVisible(true);
  }, []);
  const onCloseModal = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <TouchableScale style={styles.container} onPress={onPress} minScale={0.95}>
      <Image source={{ uri: item.snippet.thumbnails.medium.url }} style={styles.image} />
      <PaaveText type={TEXT_TYPE.BOLD_14} style={styles.textTitle} color={dynamicColors.BlueNewColor} numberOfLines={3}>
        {item.snippet.title ?? ''}
      </PaaveText>
      <PaaveText style={styles.chanelName} type={TEXT_TYPE.REGULAR_12} color={dynamicColors.LIGHTTextDisable}>
        {`${item.snippet.videoOwnerChannelTitle} - ${moment(item.contentDetails.videoPublishedAt).format(
          'DD/MM/YYYY'
        )}`}
      </PaaveText>
      <View style={styles.containerPlayIcon}>
        <View style={styles.icon}>
          <PLayVideo fill={dynamicColors.Ask} width={scaleSize(48)} height={scaleSize(48)} />
        </View>
      </View>
      {isVisible && (
        <ModalWatchVideo
          isVisible={isVisible}
          onCloseModal={onCloseModal}
          videoId={item.contentDetails.videoId ?? ''}
          title={item.snippet.title}
        />
      )}
    </TouchableScale>
  );
};

const useStyles = getStylesHook({
  container: {
    width: 250,
    marginRight: 16,
  },

  image: {
    width: 250,
    aspectRatio: 16 / 9,
  },

  textTitle: {
    marginTop: 6,
  },
  containerPlayIcon: {
    position: 'absolute',
    width: 250,
    aspectRatio: 16 / 9,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    backgroundColor: lightColors.BACKGROUND_MODAL3,
    borderRadius: 48,
  },
  chanelName: {
    marginTop: 6,
  },
});

export default withMemo(ItemVideo);
