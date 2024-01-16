import globalStyles, { lightColors as Colors, lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';
import { Platform } from 'react-native';
import { localColors } from 'screens/SignIn/styles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  logoContainer: {
    paddingTop: 69,
    paddingBottom: 32,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.BlueNewColor,
    alignSelf: 'center',
    marginBottom: 10,
  },
  titleText2: {
    alignSelf: 'center',
    color: Colors.LIGHTTextContent,
    marginBottom: 30,
    fontSize: 18,
  },
  congratulationImage: {
    height: 61,
    width: 295,
    marginTop: -16,
  },
  textTitle: {
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 30,
    color: Colors.LIGHTText,
  },
  textName: {
    fontSize: 40,
    fontWeight: '700',
    lineHeight: 46,
    color: Colors.BlueNewColor,
    marginTop: 30,
  },
  executeFormButton: {
    backgroundColor: Colors.BlueNewColor,
    height: 44,
    marginBottom: 37,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  executeFormButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.WHITE,
  },

  // modal OTP
  containerOTP: {
    ...globalStyles.container,
    ...globalStyles.centered,
    paddingHorizontal: 16,
    backgroundColor: lightColors.BACKGROUND_MODAL2,
  },
  modalContainerOTP: {
    ...globalStyles.overflowHidden,
    backgroundColor: lightColors.WHITE,
    borderRadius: 21,
    width: 343,
    paddingHorizontal: 16,
    marginBottom: Platform.OS === 'ios' ? 50 : 0,
  },
  modalTitleContainer: {
    ...globalStyles.centered,
    height: 52,
    borderBottomColor: lightColors.BORDER,
    borderBottomWidth: 1,
  },

  modalTitleText2: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: 24,
    textAlign: 'center',
    color: lightColors.BlueNewColor,
  },
  containerBody: {
    marginTop: 17,
    marginBottom: 16,
  },
  button: {
    ...globalStyles.centered,
    ...globalStyles.fillWidth,
    marginTop: 17,
    marginBottom: 10,
    height: 44,
    borderRadius: 10,
  },
  enableButton: {
    backgroundColor: lightColors.BlueNewColor,
  },
  disableButton: {
    backgroundColor: lightColors.LIGHTBackground,
  },
  enableText: {
    fontSize: 16,
    fontWeight: '700',
    color: lightColors.WHITE,
  },
  disableText: {
    fontSize: 16,
    fontWeight: '700',
    color: lightColors.LIGHTTextDisable,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  cancelExecuteFormButton: {
    ...globalStyles.centered,
    ...globalStyles.fillWidth,
    backgroundColor: lightColors.LIGHTBackground,
    height: 44,
    borderRadius: 10,
  },
  cancelExecuteFormButtonText: {
    fontSize: 16,
    color: lightColors.LIGHTTextContent,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  iconStyle: {
    marginHorizontal: 14,
  },
  eyeIconStyle: {
    marginHorizontal: 16,
  },

  // modal password
  modalContainer: {
    paddingHorizontal: 16,
    backgroundColor: Colors.BACKGROUND_MODAL2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitleCon: {
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalEditFullNameContainer: {
    backgroundColor: Colors.WHITE,
    borderRadius: 21,
    width: 343,
    justifyContent: 'center',
  },
  wlNameText: {
    color: localColors.DARKTextTitle,
    marginBottom: 5,
    fontSize: 14,
  },
  modalContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  textInputContainerStyle: {
    backgroundColor: Colors.LIGHTTitleTable,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.LIGHTBackground,
    paddingLeft: 10,
    paddingRight: 10,
  },
  textInputContainerStyleError: {
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.Ask1,
  },
  wholeContainerStyle: {
    marginBottom: 17,
  },
  textInputStyle: {
    width: 216,
    height: '100%',
    fontSize: 14,
    paddingTop: 0,
    paddingBottom: 0,
  },
  marginBottom: {
    marginBottom: 10,
  },
  buttonConfirm: {
    marginBottom: 10,
    width: '100%',
  },
  executeFormButtonPassword: {
    backgroundColor: Colors.BlueNewColor,
    width: '100%',
    height: 44,
    borderRadius: 10,
  },
  executeFormButtonDisable: {
    backgroundColor: Colors.LIGHTBackground,
  },
  executeFormButtonTextPassword: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.WHITE,
  },
  executeFormButtonTextDisable: {
    color: Colors.LIGHTTextDisable,
  },
  cancelExecuteFormButton2: {
    backgroundColor: Colors.LIGHTBackground,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelExecuteFormButtonText2: {
    fontSize: 16,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    color: Colors.LIGHTTextContent,
  },
  modalTitleText: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.BlueNewColor,
  },
});
