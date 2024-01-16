import React from 'react';
import { View } from 'react-native';
import { useBottomPostLogic } from './BottomPost.logic';
import useStyles from './BottomPost.style';
import { IProps } from './BottomPost.type';
import withMemo from 'HOC/withMemo';
import { scaleSize } from 'styles';
import Icon from 'components/Icon';
import { TEXT_TYPE } from 'components/PaaveText/type';
import PaaveText from 'components/PaaveText';
import ButtonPreventDoubleClick from 'components/ButtonPreventDoubleClick';
import { isNotNil } from 'ramda-adjunct';

const BottomPost = (props: IProps) => {
  const { handlers } = useBottomPostLogic(props);
  const { styles, dynamicColors } = useStyles();
  const { typeText = TEXT_TYPE.REGULAR_14, sizeIcon = scaleSize(16), showNumber = true, reblogsCount } = props;
  // const isShowShare = !props.isLimitSocial;
  const showShare = isNotNil(reblogsCount);
  return (
    <View style={[styles.container, props.containerStyle]}>
      <ButtonPreventDoubleClick
        style={[styles.containerItem, props.containerItemStyle]}
        onPress={handlers.onFavouritesPost}
      >
        <Icon
          name={props.isFavourited ? 'like' : 'like-outline'}
          color={dynamicColors.TextDescription}
          size={sizeIcon}
        />
        {showNumber && props.favouritesCount > 0 && (
          <PaaveText type={typeText} color={dynamicColors.TextDescription} style={styles.text}>
            {props.favouritesCount}
          </PaaveText>
        )}
      </ButtonPreventDoubleClick>

      <ButtonPreventDoubleClick
        style={[styles.containerItem, props.containerItemStyle]}
        onPress={handlers.onPressComment}
      >
        <Icon name={'message'} color={dynamicColors.TextDescription} size={sizeIcon} />
        {showNumber && props.repliesCount > 0 && (
          <PaaveText type={typeText} color={dynamicColors.TextDescription} style={styles.text}>
            {props.repliesCount}
          </PaaveText>
        )}
      </ButtonPreventDoubleClick>

      {showShare && (
        <ButtonPreventDoubleClick style={styles.containerItem} onPress={handlers.onPressReblog}>
          {/* <Icon name={'repeat'} color={dynamicColors.TextDescription} size={sizeIcon} />
        <PaaveText type={typeText} color={dynamicColors.TextDescription} style={styles.text}>
          {props.reblogsCount}
        </PaaveText> */}
        </ButtonPreventDoubleClick>
      )}
    </View>
  );
};

export default withMemo(BottomPost);
