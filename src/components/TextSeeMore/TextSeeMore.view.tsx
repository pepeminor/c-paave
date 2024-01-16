import React from 'react';
import { useTextSeeMoreLogic } from './TextSeeMore.logic';
import useStyles from './TextSeeMore.style';
import { IProps } from './TextSeeMore.type';
import withMemo from 'HOC/withMemo';
import PaaveText from 'components/PaaveText';
import { useTranslation } from 'react-i18next';
import { TEXT_TYPE } from 'components/PaaveText/type';
import { TouchableOpacity, View } from 'react-native';
import { scaleSize } from 'styles';

const HitSlop = {
  top: scaleSize(8),
  bottom: scaleSize(8),
};

const TextSeeMore = (props: IProps) => {
  const { state, handlers } = useTextSeeMoreLogic(props);
  const { styles, dynamicColors } = useStyles();
  const { t } = useTranslation();
  const { content, colorTextSeeMore = dynamicColors.BlueNewColor, parse, style, ...rest } = props;
  const isLongContent = state.textLines > 5;
  return (
    <View>
      {/*Text hidden get layout*/}
      <PaaveText style={styles.textHidden} type={TEXT_TYPE.REGULAR_14} onTextLayout={handlers.onTextLayout}>
        {content}
      </PaaveText>
      <PaaveText
        {...rest}
        style={style}
        parse={parse}
        numberOfLines={isLongContent && !state.showFullText ? 5 : undefined}
        // onPress={isLongContent ? handlers.onShowFullText : props.onPressText}
        suppressHighlighting={true}
      >
        {content}
      </PaaveText>
      {isLongContent && (
        <TouchableOpacity onPress={handlers.onShowFullText} hitSlop={HitSlop}>
          <PaaveText
            style={styles.textSeeMore}
            type={TEXT_TYPE.BOLD_14}
            color={colorTextSeeMore}
            suppressHighlighting={true}
          >
            {t(state.showFullText ? 'see.less' : 'see.more')}
          </PaaveText>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default withMemo(TextSeeMore);
