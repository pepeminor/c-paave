import { getStylesHook } from 'hooks/useStyles';
import { lightColors, textStyles } from 'styles';

export const useStyles = getStylesHook({
  container: {
    marginVertical: 4,
  },
  sectionText: {
    ...textStyles.fontSize18,
    ...textStyles.roboto700,
    paddingLeft: 12,
    paddingVertical: 4,
  },
  rateAndTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: lightColors.BORDER,
    paddingBottom: 4,
    borderBottomWidth: 1,
  },
  rateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 8,
  },
  rateText: {
    ...textStyles.fontSize20,
    ...textStyles.dinOt400,
    paddingLeft: 8,
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
