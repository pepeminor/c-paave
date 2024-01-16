import React, { useEffect } from 'react';
import withMemo from 'HOC/withMemo';
import { scaleSize } from 'styles';
import { View, LayoutAnimation, Linking, Image } from 'react-native';
import TouchableScale from 'components/TouchableScale';
import { getPreviewData } from './utils';
import useStyles from './styles';
import PaaveText from 'components/PaaveText';
import { TEXT_TYPE } from 'components/PaaveText/type';
import { isNilOrEmpty } from 'ramda-adjunct';
import Icon from 'components/Icon';
import { useAppSelector } from 'hooks';
import { SocialPostActions, SocialPostSelectors } from 'reduxs';
import { useDispatch } from 'react-redux';

interface IProps {
  linkPreview: string;
  requestTimeout?: number;
  enableAnimation?: boolean;
  postId: string;
}

const LinkPreview = (props: IProps) => {
  const { styles, dynamicColors } = useStyles();
  const dataPreviewLink = useAppSelector(SocialPostSelectors.selectPreviewLink(props.postId));
  const dispatch = useDispatch();

  const { linkPreview, requestTimeout = 5000, enableAnimation = true } = props;

  useEffect(() => {
    const fetchData = async () => {
      const newData = await getPreviewData(linkPreview, requestTimeout);
      // No need to cover LayoutAnimation
      /* istanbul ignore next */
      if (enableAnimation) {
        LayoutAnimation.easeInEaseOut();
      }
      dispatch(SocialPostActions.insertPreviewLink({ postId: props.postId, previewData: newData }));
    };

    if (isNilOrEmpty(dataPreviewLink)) {
      fetchData();
    }
  }, [linkPreview]);

  const handlePress = () => dataPreviewLink?.link && Linking.openURL(dataPreviewLink.link);

  if (isNilOrEmpty(dataPreviewLink?.image)) {
    return (
      <TouchableScale style={styles.containerRow} minScale={0.98} onPress={handlePress}>
        <View style={styles.containerLeft}>
          <Icon name={'library-books'} size={scaleSize(20)} color={dynamicColors.LIGHTTextTitle} />
        </View>
        <View style={styles.containerRight}>
          <PaaveText type={TEXT_TYPE.REGULAR_14} color={dynamicColors.LIGHTTextContent}>
            {dataPreviewLink?.title ?? ''}
          </PaaveText>

          <PaaveText type={TEXT_TYPE.REGULAR_12} color={dynamicColors.LIGHTTextBigTitle}>
            {dataPreviewLink?.link ?? ''}
          </PaaveText>
        </View>
      </TouchableScale>
    );
  }
  return (
    <TouchableScale style={styles.container} minScale={0.98} onPress={handlePress}>
      <Image source={{ uri: dataPreviewLink?.image?.url }} style={styles.image} />

      <PaaveText type={TEXT_TYPE.REGULAR_14} style={styles.textTitle} color={dynamicColors.LIGHTTextContent}>
        {dataPreviewLink?.title ?? ''}
      </PaaveText>

      <PaaveText type={TEXT_TYPE.REGULAR_12} style={styles.textDescription} color={dynamicColors.LIGHTTextBigTitle}>
        {dataPreviewLink?.link ?? ''}
      </PaaveText>
    </TouchableScale>
  );
};

export default withMemo(LinkPreview);
