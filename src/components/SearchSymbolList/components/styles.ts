import { lightColors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';
import { Platform } from 'react-native';

export const useStyles = getStylesHook({
  symbolItemContainer: {
    height: 72,
    paddingLeft: 16,
    paddingRight: 18,
    borderBottomColor: lightColors.BORDER,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameContainer: {
    flex: 1,
    marginRight: 17,
    marginLeft: 4,
  },
  stockCodeText: {
    fontWeight: 'bold',
    color: lightColors.LIGHTTextBigTitle,
    fontSize: 16,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  fullNameText: {
    fontSize: 10,
    color: lightColors.LIGHTTextDisable,
    marginTop: 3,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    width: 150,
  },
  heartContainer: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginHorizontal: -20,
  },
  logoContainer: {
    borderRadius: 99,
    overflow: 'hidden',
  },
  noDataFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  number: {
    ...textStyles.dinOt400,
    ...textStyles.fontSize14,
  },
  priceText: {
    textAlign: 'right',
    alignContent: 'flex-end',
    ...textStyles.dinOt400,
    ...textStyles.fontSize16,
    marginTop: Platform.OS === 'ios' ? 3 : -4,
  },
  priceContainer: {
    flex: 1,
    height: 38,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 1 : 3,
  },
});
