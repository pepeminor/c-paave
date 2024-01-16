import { lightColors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  itemContainer: {
    height: 54,
    borderBottomWidth: 1,
    borderBottomColor: lightColors.LIGHTTitleTable,
    flexDirection: 'row',
  },
  symbolContainer: {
    width: 170,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 8,
    borderRightWidth: 0.5,
    borderRightColor: lightColors.BORDER,
    backgroundColor: lightColors.WHITE,
    zIndex: 1,
  },
  symbolNameContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 4,
  },
  priceContainer: {
    width: 90,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 8,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: lightColors.BORDER,
  },
  volumeContainer: {
    width: 120,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 8,
    borderLeftWidth: 0.5,
    borderColor: lightColors.BORDER,
  },
  number: {
    ...textStyles.fontSize14,
    ...textStyles.dinOt400,
  },
  logoContainer: {
    borderRadius: 99,
    overflow: 'hidden',
  },
  stockCodeText: {
    fontWeight: 'bold',
    color: lightColors.LIGHTTextBigTitle,
    fontSize: 14,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  fullNameText: {
    marginTop: 3,
    marginRight: 8,
    fontSize: 10,
    color: lightColors.LIGHTTextDisable,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
  },
});
