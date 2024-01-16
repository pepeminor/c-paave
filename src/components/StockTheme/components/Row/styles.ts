import { getStylesHook } from 'hooks/useStyles';
import { lightColors, textStyles } from 'styles';

export const useStyles = getStylesHook({
  container: {
    flexDirection: 'row',
    height: 40,
    borderBottomColor: lightColors.BORDER,
    borderBottomWidth: 1,
  },
  firstCell: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 180,
  },
  rankCircle: {
    width: 24,
    height: 24,
    borderRadius: 10,
    backgroundColor: lightColors.LIGHTBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  rankNumber: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
    color: lightColors.LIGHTTextTitle,
  },
  themeName: {
    ...textStyles.fontSize13,
    ...textStyles.roboto700,
    flex: 1,
    color: lightColors.LIGHTTextBigTitle,
    marginLeft: 4,
  },
  secondCell: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 90,
    paddingRight: 8,
  },
  rateText: {
    ...textStyles.fontSize13,
    ...textStyles.dinOt400,
    textAlign: 'right',
  },
  iconStyle: {
    marginLeft: 8,
  },
  thirdCell: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  thirdCellChild: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  stockStonk: {
    ...textStyles.fontSize12,
    ...textStyles.dinOt400,
    color: lightColors.DARK_GREEN,
    padding: 2,
  },
  stockUnchanged: {
    ...textStyles.fontSize12,
    ...textStyles.dinOt400,
    color: lightColors.LIGHTYellow,
    padding: 2,
  },
  stockStink: {
    ...textStyles.fontSize12,
    ...textStyles.dinOt400,
    color: lightColors.LIGHTRed,
    padding: 2,
  },
});
