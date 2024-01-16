import { IS_IOS } from 'constants/main';
import { getStylesHook } from 'hooks/useStyles';
import { lightColors, textStyles, width } from 'styles';

export const useStyles = getStylesHook({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: lightColors.BORDER,
    borderBottomWidth: 1,
    _width: width,
    paddingVertical: 2,
  },
  col1: {
    backgroundColor: lightColors.WHITE,
    zIndex: 1,
    width: 55,
  },
  col2: {
    backgroundColor: lightColors.WHITE,
    zIndex: 1,
    width: 60,
    borderColor: lightColors.BORDER,
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    justifyContent: 'center',
  },

  col3: {
    width: 70,
    borderColor: lightColors.BORDER,
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    paddingRight: 8,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  text: {
    ...textStyles.fontSize14,
    ...textStyles.roboto700,
    color: lightColors.LIGHTTextBigTitle,
    textAlign: 'center',
  },
  number: {
    ...textStyles.fontSize14,
    ...textStyles.dinOt400,
    color: lightColors.LIGHTTextContent,
  },
  numberPL: {
    ...textStyles.fontSize12,
    ...textStyles.dinOt400,
    color: lightColors.LIGHTTextContent,
  },
  col4: {
    width: 100,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingTop: IS_IOS ? 1 : 3,
    paddingHorizontal: 5,
    borderColor: lightColors.BORDER,
    borderRightWidth: 0.5,
  },
  col5: {
    width: 90,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    borderColor: lightColors.BORDER,
    borderRightWidth: 0.5,
    paddingHorizontal: 8,
  },
  priceText: {
    textAlign: 'right',
    alignContent: 'flex-end',
    ...textStyles.fontSize14,
    ...textStyles.dinOt400,
    marginTop: IS_IOS ? 3 : -4,
  },
  containerPL: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textTradingValue: {
    ...textStyles.fontSize12,
    ...textStyles.dinOt500,
    textAlign: 'right',
    paddingRight: 5,
    color: lightColors.BLACK,
  },
  textTradingVolume: {
    ...textStyles.fontSize12,
    ...textStyles.dinOt400,
    textAlign: 'right',
    paddingRight: 5,
    color: lightColors.BLACK,
    marginTop: 5,
  },
});
