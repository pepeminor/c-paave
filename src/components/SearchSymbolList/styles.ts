import { lightColors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export const useStyles = getStylesHook({
  titleContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: lightColors.WHITE,
  },
  sectionTitle: {
    ...textStyles.fontSize16,
    ...textStyles.roboto700,
    color: lightColors.LIGHTTextBigTitle,
    paddingVertical: 8,
  },
  removeRecentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  deleteAllText: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
    color: lightColors.LIGHTRed,
  },
  deleteAllIcon: {
    width: 18,
    height: 18,
    marginLeft: 8,
  },
});
