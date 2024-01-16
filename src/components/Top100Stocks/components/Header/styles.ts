import { getStylesHook } from 'hooks/useStyles';
import { lightColors, textStyles } from 'styles';

export const useStyles = getStylesHook({
  container: {
    backgroundColor: lightColors.WHITE,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: -16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    ...textStyles.fontSize18,
    ...textStyles.roboto700,
    color: lightColors.LIGHTTextBigTitle,
    flex: 1,
  },
  seeAll: {
    ...textStyles.fontSize14,
    ...textStyles.roboto700,
    color: lightColors.BlueNewColor,
    paddingRight: 8,
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
