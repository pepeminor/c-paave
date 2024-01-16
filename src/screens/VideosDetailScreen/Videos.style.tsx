import { lightColors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
  },
  containerEmpty: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
    minHeight: 600,
  },
  containerList: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: lightColors.BORDER,
  },
  containerContent: {
    paddingBottom: 32,
  },
  noMarginHorizontal: {
    marginHorizontal: 0,
  },
  textSelected: {
    color: lightColors.BlueNewColor,
  },
  textUnSelected: {
    ...textStyles.fontSize14,
    ...textStyles.roboto700,
    color: lightColors.LIGHTTextDisable,
  },
});
