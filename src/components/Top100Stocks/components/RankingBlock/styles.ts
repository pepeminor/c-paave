import { getStylesHook } from 'hooks/useStyles';
import { lightColors, textStyles } from 'styles';

export const useStyles = getStylesHook({
  container: {
    paddingVertical: 4,
    borderColor: lightColors.BORDER,
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    alignItems: 'center',
    backgroundColor: lightColors.WHITE,
    zIndex: 1,
  },
  subContainer: {
    width: 32,
    height: 32,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundRank1: {
    backgroundColor: lightColors.OrangePeel,
  },
  backgroundRank2: {
    backgroundColor: lightColors.NavyBlue,
  },
  backgroundRank3: {
    backgroundColor: lightColors.CaribbeanGreen,
  },
  backgroundRank4: {
    backgroundColor: lightColors.LIGHTBackground,
  },
  text: {
    ...textStyles.fontSize12,
    ...textStyles.roboto400,
    color: lightColors.WHITE,
  },
  textInverse: {
    ...textStyles.fontSize12,
    ...textStyles.roboto400,
    color: lightColors.BLACK,
  },

  // Icon
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  block1: {
    width: 2.25,
    height: 6,
    backgroundColor: lightColors.WHITE,
  },
  block2: {
    width: 2.25,
    height: 9,
    marginLeft: 1.12,
    backgroundColor: lightColors.WHITE,
  },
  block3: {
    width: 2.25,
    height: 4.5,
    marginLeft: 1.12,
    backgroundColor: lightColors.WHITE,
  },
  block1Inverse: {
    width: 2.25,
    height: 6,
    backgroundColor: lightColors.LIGHTIconDisable,
  },
  block2Inverse: {
    width: 2.25,
    height: 9,
    marginLeft: 1.12,
    backgroundColor: lightColors.LIGHTIconDisable,
  },
  block3Inverse: {
    width: 2.25,
    height: 4.5,
    marginLeft: 1.12,
    backgroundColor: lightColors.LIGHTIconDisable,
  },
});
