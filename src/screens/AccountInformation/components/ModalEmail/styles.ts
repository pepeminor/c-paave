import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    backgroundColor: Colors.WHITE,
  },
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
  },
  modalEditFullNameContainer: {
    backgroundColor: Colors.WHITE,
    height: 267,
    borderRadius: 21,
    width: 343,
  },
  wlNameText: {
    color: Colors.LIGHTTextTitle,
    marginBottom: 5,
    fontSize: 14,
    fontFamily: 'Roboto',
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
  wholeContainerStyle: {
    marginBottom: 17,
  },
  textInputStyle: {
    height: 44,
    width: 260,
    fontSize: 14,
    fontFamily: 'Roboto',
  },
  marginBottom: {
    marginBottom: 10,
  },
  executeFormButton: {
    backgroundColor: Colors.BlueNewColor,
    width: '100%',
    height: 44,
    borderRadius: 10,
  },
  executeFormButtonDisable: {
    backgroundColor: Colors.LIGHTBackground,
  },
  executeFormButtonText: {
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
  opacityBackground: {
    backgroundColor: Colors.BACKGROUND_MODAL2,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Roboto',
    fontWeight: '500',
    color: Colors.LIGHTTextContent,
    marginBottom: 20,
  },
  content: {
    textAlign: 'center',
    color: Colors.LIGHTTextContent,
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
  },
  touchable: {
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Roboto',
    marginTop: 3,
    color: Colors.BlueNewColor,
    textAlign: 'center',
  },
  contentUp: {
    fontSize: 16,
    fontFamily: 'Roboto',
    textAlign: 'center',
    color: Colors.LIGHTTextContent,
  },
  textResend: {
    marginTop: 3,
    fontSize: 16,
    fontFamily: 'Roboto',
    textAlign: 'center',
    color: Colors.LIGHTTextContent,
  },
  codeFieldRoot: {
    marginHorizontal: 10,
  },
  cell: {
    width: 36,
    // height: (46),
    // lineHeight: (46),
    paddingVertical: 11,
    textAlign: 'center',
    fontSize: 18,
    borderWidth: 1,
    borderColor: Colors.AirCraftWhite,
    backgroundColor: Colors.LIGHTTitleTable,
    borderRadius: 8,
    color: Colors.LIGHTTextBigTitle,
  },
  focusCell: {
    borderColor: Colors.BLACK,
  },
  errorCell: {
    borderColor: Colors.LIGHTButtonRed,
  },
  lastText: {
    marginBottom: 20,
    marginTop: 5,
  },
  timer: {
    color: Colors.LIGHTRed,
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  email: {
    color: Colors.BlueNewColor,
    fontWeight: 'bold',
  },
  textBelowContainer: {
    width: 311,
    height: 86,
    marginVertical: 20,
    alignItems: 'center',
  },
  otpTextError: {
    marginBottom: 20,
    textAlign: 'center',
    color: Colors.LIGHTRed,
    fontSize: 16,
    fontFamily: 'Roboto',
  },
});
