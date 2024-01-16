import { Image, ImageErrorEventData, ImageSourcePropType, NativeSyntheticEvent, View } from 'react-native';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { scaleSize } from 'styles';
import useStyles from './styles';

export interface IImagesLogoProps {
  readonly codeLogo: string;
  readonly logoSize: number;
  readonly logoStyle: Element;
}

const ImagesLogo = ({ codeLogo, logoSize, logoStyle }: IImagesLogoProps) => {
  const [valid, setValid] = useState<boolean>(true);

  const { styles } = useStyles();

  const handleError = useCallback(({ nativeEvent }: NativeSyntheticEvent<ImageErrorEventData>) => {
    if (nativeEvent.error) {
      setValid(false);
    }
  }, []);

  const sourceImage = useMemo<ImageSourcePropType>(() => {
    return {
      uri: `https://paave-mobile-resource.s3.ap-southeast-1.amazonaws.com/symbol-logo/70-70-png/${codeLogo}.png`,
    };
  }, [codeLogo]);

  return (
    <View
      style={
        !valid
          ? [
              styles.imageContainer,
              {
                height: scaleSize(logoSize),
                width: scaleSize(logoSize),
              },
            ]
          : undefined
      }
    >
      <Image
        onError={handleError}
        source={sourceImage}
        resizeMode="contain"
        style={logoStyle}
        height={scaleSize(logoSize)}
        width={scaleSize(logoSize)}
      />
    </View>
  );
};

export default memo(ImagesLogo);
