import React from 'react';
import { Linking, TextProps, StyleProp, TextStyle } from 'react-native';
import withMemo from 'HOC/withMemo';
import { TEXT_TYPE } from 'components/PaaveText/type';
import { isSymbolExist, navigate, navigateToSymbolInfoOverview } from 'utils';
import TextSeeMore from 'components/TextSeeMore';
import { ParseShape } from 'react-native-parsed-text';
import { AnimateProps } from 'react-native-reanimated';
import { lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';
import { useDispatch, useSelector } from 'react-redux';
import { SocialAccountActions, SocialAccountSelectors, SocialSearchResponse } from 'reduxs';
import ScreenNames from 'screens/RootNavigation/ScreenNames';

export interface IProps extends TextProps, Pick<AnimateProps<TextProps>, 'entering' | 'exiting' | 'layout'> {
  style?: StyleProp<TextStyle>;
  type?: TEXT_TYPE;
  color?: string;
  parse?: ParseShape[];
  lineHeight?: number;
  content: string;
  colorTextSeeMore?: string;
}
const ALPHABET_STRING =
  'a-zA-ZaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵaăâáắấàằầảẳẩãẵẫạặậđeêéếèềẻểẽễẹệiíìỉĩịoôơóốớòồờỏổởõỗỡọộợuưúứùừủửũữụựyýỳỷỹỵAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴ';

export const HASH_TAG_REGEX_STRING = `\\B(\\#[0-9_${ALPHABET_STRING}]+\\b)`;
export const METION_REGEX_STRING = `\\B(\\@[0-9_${ALPHABET_STRING}]+\\b)`;
const TextPost = (props: IProps) => {
  const { styles, dynamicColors } = useStyles();
  const dispatch = useDispatch();
  const { content, ...rest } = props;

  const userJson = useSelector(SocialAccountSelectors.selectUserJson);

  const onGoToStockOverView = (symbol: string) => {
    if (isSymbolExist(symbol)) {
      navigateToSymbolInfoOverview(symbol.toUpperCase(), dispatch);
      return;
    }
    dispatch(
      SocialAccountActions.socialSearch({
        payload: {
          q: symbol,
          type: 'hashtags',
          limit: 1,
          offset: 0,
        },
        callBack: {
          handleSuccess(response: SocialSearchResponse) {
            const tags = response.hashtags;
            if (tags.length > 0) {
              navigate({
                key: ScreenNames.SocialSearchHashtag,
                params: {
                  data: tags[0],
                },
              });
              return;
            }
          },
        },
      })
    );
  };

  return (
    <TextSeeMore
      content={content}
      style={styles.textContent}
      type={TEXT_TYPE.REGULAR_14}
      color={dynamicColors.LIGHTText}
      parse={[
        {
          type: 'url',
          style: styles.textUrl,
          onPress: value => {
            Linking.openURL(value);
          },
          allowFontScaling: false,
        },
        {
          pattern: new RegExp(HASH_TAG_REGEX_STRING),
          style: styles.textUrl,
          onPress: value => {
            onGoToStockOverView(value.replace('#', ''));
          },
        },
        {
          pattern: new RegExp(METION_REGEX_STRING),
          style: styles.textUrl,
          renderText(matchingString) {
            const userName = matchingString.replace('@', '');

            const displayName = userJson?.[userName]?.displayName || userName;
            return `@${displayName}`;
          },
        },
      ]}
      {...rest}
    />
  );
};

const useStyles = getStylesHook({
  textContent: {
    lineHeight: 23,
    marginTop: 8,
    marginHorizontal: 16,
  },

  textUrl: {
    color: lightColors.MainBlue,
  },
});

export default withMemo(TextPost);
