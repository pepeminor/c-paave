import { Platform } from 'react-native';
import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  modalHeader: {
    height: 56,
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
    alignItems: 'center',
    padding: 16,
  },
  typeText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    lineHeight: 24,
    color: Colors.BlueNewColor,
    paddingHorizontal: 5,
  },
  text: {
    color: Colors.LIGHTTextContent,
    fontSize: 14,
    paddingHorizontal: 5,
  },
  textBuy: {
    color: Colors.DARK_GREEN,
    fontSize: 14,
  },
  textSell: {
    color: Colors.LIGHTRed,
    fontSize: 14,
  },
  border: {
    borderRightColor: Colors.BORDER,
    borderRightWidth: 1,
  },
  textModal: {
    fontSize: 16,
    lineHeight: 22,
    marginTop: 10,
    marginBottom: 10,
  },
  textDinOtLight: {
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontWeight: '400',
  },
  executeFormButton2: {
    backgroundColor: Colors.BlueNewColor,
    height: 44,
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  cancelExecuteFormButton2: {
    backgroundColor: Colors.LIGHTBackground,
    height: 44,
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  executeFormButtonText2: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.WHITE,
  },
  cancelExecuteFormButtonText2: {
    fontSize: 16,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    color: Colors.LIGHTTextContent,
  },
  otpContainer: {
    paddingHorizontal: 16,
  },
});
