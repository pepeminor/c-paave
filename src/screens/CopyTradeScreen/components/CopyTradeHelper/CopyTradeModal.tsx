import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import globalStyles, { scaleSize } from 'styles';
import useStyles from './styles';
import Grabber from 'assets/icon/Grabber.svg';
import { BaseBottomModalProps } from 'components/BottomModal';
import Swiper from 'react-native-swiper';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'hooks';
import { AutoTradePopupContent } from 'interfaces/File';
import RenderHTML from 'react-native-render-html';
import { FollowingType } from 'screens/CopyTradeScreen/CopyTradeScreen.type';

type ImageSize = {
  width: number;
  height: number;
};

const getImageAsync = (url: string) => {
  return new Promise(resolve => {
    Image.getSize(
      url,
      (width, height) => {
        resolve({ width: scaleSize(343), height: (scaleSize(343) * height) / width });
      },
      () => resolve({ width: 0, height: 0 })
    );
  }) as Promise<ImageSize>;
};

interface Props extends BaseBottomModalProps {
  followingType: FollowingType;
}

const CopyTradeModal = ({ closeModal, followingType }: Props) => {
  const { t } = useTranslation();
  const { styles } = useStyles();

  const popup = useAppSelector(state => {
    const lang = state.lang;
    const popupData =
      (followingType === 'Advisor' ? state.autoTradePopup?.advisor : state.autoTradePopup?.aiRating) ?? {};
    return popupData[lang] ?? popupData.en ?? popupData.vi ?? popupData.ko;
  });

  const [imageSize, setImagesSize] = useState<ImageSize[]>([]);

  const swiperRef = useRef<Swiper>(null);

  const handleNext = useCallback(() => {
    swiperRef.current?.scrollBy(1);
  }, []);

  useEffect(() => {
    const size =
      popup?.image?.map(async item => {
        if (item === '') {
          return { width: 0, height: 0 };
        }
        return await getImageAsync(item);
      }) ?? [];
    Promise.all(size).then(res => {
      setImagesSize(res);
    });
  }, []);

  return (
    <View style={styles.modalContainer}>
      <View style={globalStyles.centered}>
        <Grabber />
      </View>
      <View style={[globalStyles.container, styles.modalTopPadding]}>
        {popup != null && (
          <Swiper loop={false} showsPagination={false} ref={swiperRef}>
            {popup.content?.map((slide, index) => {
              const [content, btnText] = getSlideText(slide);
              return (
                <View style={globalStyles.container} key={index}>
                  <ScrollView style={globalStyles.container} showsVerticalScrollIndicator={false}>
                    {popup.image?.[index] ? (
                      <Image
                        key={index}
                        source={{
                          uri: popup?.image?.[index],
                        }}
                        style={[
                          styles.image,
                          {
                            width: imageSize[index]?.width,
                            height: imageSize[index]?.height,
                          },
                        ]}
                      />
                    ) : null}
                    <RenderSectionContent content={content} />
                  </ScrollView>
                  {btnText != null && (
                    <TouchableOpacity
                      style={styles.submitBtn}
                      onPress={index === popup?.content?.length - 1 ? closeModal : handleNext}
                    >
                      <Text allowFontScaling={false} style={styles.submitBtnText}>
                        {t(btnText)}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          </Swiper>
        )}
      </View>
    </View>
  );
};

const RenderSectionContent = memo(({ content }: { content: AutoTradePopupContent }) => {
  const { styles } = useStyles();

  if (typeof content === 'string') {
    const fontSize = `${scaleSize(14)}px`;
    const lineHeight = `${scaleSize(18)}px`;
    return (
      <>
        <View style={[styles.pt8]}>
          <RenderHTML
            source={{
              html: `<span style="font-size: ${fontSize}; line-height: ${lineHeight}; font-family: 'Roboto';color: black;text-align: justify;">${content}</span>`,
            }}
            contentWidth={scaleSize(375)}
          />
        </View>
      </>
    );
  }
  return (
    <View style={[styles.pl16]}>
      {content.map((item, index) => (
        <RenderSectionContent content={item} key={index} />
      ))}
    </View>
  );
});

function getSlideText(content: AutoTradePopupContent): [AutoTradePopupContent, string] {
  if (typeof content === 'string') {
    return ['', content];
  }
  return [content.slice(0, -1), content[content.length - 1] as string];
}

export default memo(CopyTradeModal);
