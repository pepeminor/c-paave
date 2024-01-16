import { lightColors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
    paddingBottom: 48,
  },
  basedOnText: {
    ...textStyles.fontSize12,
    ...textStyles.roboto400,
    color: lightColors.LIGHTTextDisable,
    marginTop: 8,
    marginBottom: 8,
    marginHorizontal: 16,
  },
});
