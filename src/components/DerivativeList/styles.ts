import { getStylesHook } from 'hooks/useStyles';
import { Platform } from 'react-native';
import globalStyles, { Colors } from 'styles';

export default getStylesHook({
  container: {
    ...globalStyles.borderBottom1,
    flexDirection: 'row',
  },

  col1: {
    width: 107,
    height: 54,
    paddingLeft: 3,
    ...globalStyles.flexDirectionRow,
    ...globalStyles.centered,
    ...globalStyles.borderRight1,
  },

  col2: {
    ...globalStyles.flexDirectionCol,
    ...globalStyles.borderRight1,
    width: 80,
    height: 54,
    marginLeft: 1,
  },

  col4: {
    ...globalStyles.flexDirectionCol,
    width: 108,
    height: 54,
    marginLeft: 1,
    paddingRight: 8,
  },

  col3: {
    ...globalStyles.borderRight1,
    ...globalStyles.flexDirectionCol,
    width: 80,
    height: 54,
    marginLeft: 1,
  },

  stockCodeTxtSmall: {
    marginTop: 2,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.LIGHTTextContent,
    fontSize: 11,
  },

  stockCodeTxt: {
    // marginLeft: (2),
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.LIGHTTextContent,
    fontSize: 14,
  },

  btnSellSymbol: {
    backgroundColor: Colors.LIGHTButtonRed,
    height: 22,
    width: 40,
    paddingTop: 2,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: Colors.LIGHTButtonRed,
  },

  btnDisable: {
    opacity: 0.5,
  },
  btnEnable: {
    opacity: 1,
  },

  alignItemEnd: {
    alignItems: 'flex-end',
  },

  paddingRight: {
    paddingRight: 6,
  },

  quantity: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Medium',
    fontStyle: 'normal',
    color: Colors.LIGHTTextContent,
  },
  quantity2: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontStyle: 'normal',
    color: Colors.LIGHTTextContent,
  },

  textSellSymbol: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: 16,
    color: Colors.WHITE,
    textAlign: 'center',
  },

  commonWrap: {
    ...globalStyles.container,
    ...globalStyles.fillWidth,
    ...globalStyles.justifyCenter,
    alignItems: 'flex-end',
    paddingRight: 6,
  },
});
