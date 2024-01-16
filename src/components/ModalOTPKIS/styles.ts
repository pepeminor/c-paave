import { Platform } from 'react-native';
import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  modalContentContainer: {
    width: '100%',
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.LIGHTBackground,
  },
  executeFormButton: {
    backgroundColor: Colors.BlueNewColor,
    marginHorizontal: 16,
    height: 44,
    borderRadius: 10,
  },
  executeFormButton2: {
    backgroundColor: Colors.BlueNewColor,
    height: 44,
    borderRadius: 10,
  },
  cancelExecuteFormButton2: {
    backgroundColor: Colors.LIGHTBackground,
    height: 44,
    borderRadius: 10,
  },
  executeFormButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.WHITE,
  },
  executeFormButtonText2: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.WHITE,
  },
  cancelExecuteFormButtonText2: {
    fontSize: 16,
    color: Colors.LIGHTTextContent,
  },
  marginBottom: {
    marginBottom: 10,
  },
  enableButton: {
    backgroundColor: Colors.BlueNewColor,
  },
  enableButtonResendOTP: {
    opacity: 1,
  },
  disableButtonResendOTP: {
    opacity: 0.5,
  },
  enableButtonText: {
    color: Colors.WHITE,
  },
  disabledButton: {
    backgroundColor: Colors.LIGHTBackground,
  },
  disabledButtonText: {
    color: Colors.LIGHTTextDisable,
  },
  errorExitStyle: {
    marginTop: -10,
  },
  errorExitContentStyle: {
    color: Colors.LIGHTRed,
    fontSize: 12,
  },
  titleOTP: {
    textAlign: 'center',
    color: Colors.BlueNewColor,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 24,
    fontStyle: 'normal',
  },
  textInputContainerStyle: {
    backgroundColor: Colors.LIGHTTitleTable,
    height: 38,
    width: 151,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.LIGHTBackground,
  },
  wholeContainerStyle: {
    height: 38,
  },
  textInputStyle: {
    marginHorizontal: 10,
    fontWeight: 'bold',
    fontSize: 12,
    color: Colors.LIGHTTextTitle,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  executeModalEachItem: {
    height: 44,
    marginBottom: 6,
  },
  executeModalEachItemError: {
    height: 44,
    marginBottom: 26,
  },
  executeLabelText: {
    fontWeight: 'bold',
    color: Colors.LIGHTTextBigTitle,
    textAlign: 'left',
    fontSize: 14,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    width: 151,
    marginRight: 9,
  },
  numberSideInputStyle: {
    height: 38,
    width: 38,
    backgroundColor: Colors.LIGHTBackground,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.LIGHTBackground,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  paddingHorizontal16: {
    paddingHorizontal: 16,
  },
  textOption: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: 18,
    color: Colors.BLACK,
  },
  paddingLeft8: {
    paddingLeft: 8,
  },
  marginLeft8: {
    marginLeft: -8,
  },
  dropdown: {
    backgroundColor: Colors.LIGHTBackground,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  itemDropdown: {
    paddingVertical: 17,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItemDropdown: {
    fontWeight: '400',
    color: Colors.BLACK,
    fontSize: 14,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: 18,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  dropDownContainer: {
    height: 38,
    width: 87.5,
  },
  textSendOTP: {
    fontWeight: 'bold',
    color: Colors.MainBlue,
    textAlign: 'left',
    fontSize: 14,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: 16,
  },
  placeholderStyle: {
    fontWeight: '400',
    color: Colors.BLACK,
    fontSize: 14,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: 18,
  },
  marginTop12: {
    marginTop: 12,
  },
  marginBottom12: {
    marginBottom: 12,
  },
  marginBottom24: {
    marginBottom: 24,
  },
  paddingTop24: {
    paddingTop: 24,
  },
  border: {
    height: 2,
    width: '100%',
    backgroundColor: Colors.LIGHTBackground,
    marginTop: 10,
  },
  textResend: {
    marginTop: 3,
    fontSize: 14,
    fontFamily: 'Roboto',
    textAlign: 'center',
    color: Colors.LIGHTTextContent,
    lineHeight: 20,
  },
  timer: {
    color: Colors.BlueNewColor,
    fontSize: 14,
    fontFamily: 'Roboto',
    lineHeight: 18,
    fontStyle: 'normal',
    fontWeight: 'bold',
  },
  touchable: {
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Roboto',
    marginTop: 3,
    color: Colors.BlueNewColor,
    textAlign: 'center',
  },
  numberSideInputText: {
    fontFamily: 'Roboto',
    fontSize: 14,
    lineHeight: 18,
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: Colors.LIGHTText,
  },
  textInputContainerStyleError: {
    backgroundColor: Colors.red01,
    height: Platform.OS === 'android' ? 44 : 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.Ask1,
  },
  errorContent: {
    paddingTop: 5,
    color: Colors.LIGHTRed,
    fontSize: 12,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    width: 150,
    textAlign: 'right',
  },

  radioButtonContainer: {
    width: 320,
    marginBottom: 1,
    marginTop: Platform.OS === 'android' ? 5 : 1,
    justifyContent: 'space-around',
  },

  // tooltip
  tooltipContainer: {
    marginTop: -2,
    width: 200,
  },
  tooltip: {
    backgroundColor: Colors.BlueNewColor,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 13,
  },
  tooltipContent: {
    color: Colors.WHITE,
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: 16,
  },
});
