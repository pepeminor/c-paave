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
    marginBottom: 16,
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
  changeContainer: {
    paddingHorizontal: 8,
    marginVertical: 8,
    flexDirection: 'row',
    height: 8,
  },
  advancersBlock: {
    borderRadius: 10,
    backgroundColor: lightColors.DARK_GREEN,
    marginHorizontal: 1,
  },
  unchangedBlock: {
    borderRadius: 10,
    backgroundColor: lightColors.LIGHTYellow,
    marginHorizontal: 1,
  },
  declinersBlock: {
    borderRadius: 10,
    backgroundColor: lightColors.LIGHTRed,
    marginHorizontal: 1,
  },
  changeTextContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  advancersText: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
    color: lightColors.LIGHTText,
  },
  unchangedText: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
    color: lightColors.LIGHTText,
    flex: 1,
    textAlign: 'center',
  },
  declinersText: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
    color: lightColors.LIGHTText,
  },
});
