import { lightColors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export const useStyles = getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
  },
  loadingText: {
    textAlign: 'center',
    color: lightColors.LIGHTTextDisable,
  },
  recommendContainer: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: lightColors.BORDER,
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',

    borderColor: lightColors.BORDER,
    borderWidth: 1,
    borderRadius: 40,
  },
  itemContentContainer: {
    marginLeft: 10,
  },
  hashtag: {
    ...textStyles.fontSize14,
    ...textStyles.roboto700,
    color: lightColors.LIGHTTextContent,
  },
  numberOfCode: {
    ...textStyles.fontSize12,
    ...textStyles.roboto400,
    color: lightColors.LIGHTTextDisable,
  },
  hashtagNote: {
    textAlign: 'center',
  },
  noSearchText: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 64,
  },
});
