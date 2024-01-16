import { getStylesHook } from 'hooks/useStyles';
import { lightColors, textStyles } from 'styles';

export const useStyles = getStylesHook({
  container: {
    minHeight: 580,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  headerText: {
    ...textStyles.fontSize18,
    ...textStyles.roboto700,
    color: lightColors.LIGHTTextBigTitle,
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  seeAllBtnText: {
    ...textStyles.fontSize14,
    ...textStyles.roboto700,
    color: lightColors.BlueNewColor,
    paddingRight: 8,
  },
  basedOnText: {
    ...textStyles.fontSize13,
    ...textStyles.roboto400,
    color: lightColors.LIGHTTextDisable,
    marginTop: 8,
    marginBottom: 8,
    marginHorizontal: 8,
  },
});
