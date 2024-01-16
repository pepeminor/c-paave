import { View, Image, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import React, { memo } from 'react';
import { useStyles } from './styles';
import { IconWithBackground } from 'components/Icon';
import { scaleSize } from 'styles';
import PaaveText from 'components/PaaveText';
import { TEXT_TYPE } from 'components/PaaveText/type';
import { useDispatch } from 'react-redux';
import { PickedImage, SocialNewPostActions } from 'reduxs';
import { navigate } from 'utils';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { useTranslation } from 'react-i18next';

type Props = {
  showFullSize?: boolean;
  asset: PickedImage;
  containerStyle?: StyleProp<ViewStyle>;
};

export const ImageItem = memo(({ asset, containerStyle, showFullSize }: Props) => {
  const { styles, dynamicColors } = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const removeImage = () => {
    dispatch(SocialNewPostActions.removeImage(asset));
  };

  const addDescription = () => {
    navigate({
      key: ScreenNames.SocialEditImageDescription,
      params: {
        asset,
      },
    });
  };

  return (
    <View style={containerStyle ? containerStyle : showFullSize ? styles.bigImageItem : styles.smallImageItem}>
      <Image source={{ uri: asset.uri }} style={styles.img} resizeMode="contain" />
      <TouchableOpacity style={styles.closeIconContainer} onPress={removeImage}>
        <IconWithBackground
          name="close"
          size={scaleSize(15)}
          iconColor={dynamicColors.WHITE}
          backgroundColor={dynamicColors.BLACK_65}
          containerStyle={styles.closeIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.altContainer} onPress={addDescription}>
        <PaaveText color={dynamicColors.WHITE} type={TEXT_TYPE.BOLD_10}>
          {asset.description != null && asset.description !== '' ? '' : '+'}
          {t('new_post_screen.image_description')}
        </PaaveText>
      </TouchableOpacity>
    </View>
  );
});
