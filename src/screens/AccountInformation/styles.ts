import globalStyles, { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  headRowData: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  bigTitle: {
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 18,
    color: Colors.LIGHTTextBigTitle,
  },

  // section 1
  container1: {
    height: 184,
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    marginTop: 16,
    backgroundColor: 'red',
    height: 120,
    width: 120,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.LIGHTTextContent,
    marginTop: 10,
    fontFamily: 'Roboto',
  },

  // section 2
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  editText: {
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontSize: 14,
    color: Colors.BlueNewColor,
    paddingRight: 10,
  },
  editIcon: {
    height: 16,
    width: 16,
  },

  // section 3 & 5
  smallTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'Roboto',
    color: Colors.LIGHTTextBigTitle,
  },
  outLineRightIcon: {
    height: 16,
    width: 16,
  },
  smallText: {
    fontWeight: '400',
    fontSize: 14,
    fontFamily: 'Roboto',
    color: Colors.BlueNewColor,
    paddingRight: 8,
  },
  borderBottom: {
    paddingHorizontal: 16,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
  },

  // section 4
  container4: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  text4: {
    fontWeight: '400',
    fontSize: 14,
    fontFamily: 'Roboto',
    color: Colors.LIGHTTextContent,
    width: 251,
    marginTop: 2,
  },

  // Modal

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
  modalEditUsernameContainer: {
    height: 364,
    borderRadius: 21,
    width: 343,
  },
  modalEditFullNameContainer: {
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
    height: 44,
    borderRadius: 10,
    marginHorizontal: 16,
  },
  executeFormButton2: {
    backgroundColor: Colors.LIGHTBackground,
    width: '100%',
    height: 44,
    borderRadius: 10,
  },
  executeFormButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.WHITE,
  },
  cancelExecuteFormButton2: {
    backgroundColor: Colors.LIGHTBackground,
    height: 44,
    borderRadius: 10,
  },
  executeFormButtonText2: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: Colors.WHITE,
  },
  cancelExecuteFormButtonText2: {
    fontSize: 16,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    color: Colors.LIGHTTextContent,
  },
  executeFormButtonTextDisable: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.LIGHTTextDisable,
  },
  modalTitleText: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.BlueNewColor,
  },

  //
  rowData: {
    paddingHorizontal: 16,
    paddingVertical: 13,
    maxHeight: 44,
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
  },
  rowDataText: {
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'Roboto',
    color: Colors.LIGHTTextBigTitle,
  },
  rowDataValue: {
    fontWeight: '400',
    fontSize: 14,
    fontFamily: 'Roboto',
    color: Colors.LIGHTTextContent,
    alignItems: 'flex-end',
    lineHeight: 18,
  },

  // opacity background
  opacityBackground: {
    backgroundColor: Colors.BACKGROUND_MODAL2,
  },
  editMarginBottom: {
    marginTop: 16,
  },

  // OTP
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
  disabledButton: {
    backgroundColor: Colors.LIGHTBackground,
  },
  disabledButtonText: {
    color: Colors.LIGHTTextDisable,
  },
  email: {
    color: Colors.BlueNewColor,
    fontWeight: 'bold',
  },

  //
  PersonalContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleAccount: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.LIGHTText,
  },
  textDeleteAccount: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.LIGHTButtonRed,
    paddingLeft: 8,
  },
  TextInfo: {
    width: 220,
    alignItems: 'flex-end',
  },
  valueAccount: {
    fontWeight: '400',
    fontSize: 14,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.LIGHTTextContent,
    lineHeight: 18,
    width: 220,
    textAlign: 'right',
  },
  textSeeMore: {
    fontSize: 14,
    color: Colors.LIGHTText,
    lineHeight: 16,
    fontFamily: 'Roboto',
    fontStyle: 'italic',
    fontWeight: '400',
    paddingVertical: 8,
    marginLeft: 12,
  },
  textLinkKis: {
    fontSize: 14,
    color: Colors.BlueNewColor,
    lineHeight: 16,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    paddingVertical: 8,
    textDecorationLine: 'underline',
    marginLeft: 12,
  },
  editContainerAccount: {
    marginLeft: 14,
    height: 20,
    width: 20,
  },
  // EDIT MODAL

  containerTextUserName: {
    width: 325,
    height: 106,
    justifyContent: 'center',
  },

  validateExItemContainer: {
    marginBottom: 5,
  },
  normalText: {
    color: Colors.LIGHTTextContent,
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Roboto',
  },
  otpTextError: {
    marginBottom: 20,
    textAlign: 'center',
    color: Colors.LIGHTRed,
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  textBelowContainer: {
    width: 311,
    height: 86,
    marginVertical: 20,
    alignItems: 'center',
  },
  paddingLeft8: {
    paddingLeft: 8,
  },
  avatarImg: {
    ...globalStyles.centered,
    height: 104,
    width: 104,
    borderRadius: 100,
    borderColor: Colors.WHITE,
    borderWidth: 10,
  },
  avatarImgText: {
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.WHITE,
    fontSize: 40,
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.LIGHTTextContent,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    // lineHeight: (22),
    marginTop: 12,
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 375,
    height: 184,
  },
  lineHeader: {
    width: 375,
    height: 8,
    backgroundColor: Colors.BORDER,
  },
  avatarBorder: {
    ...globalStyles.centered,
    height: 115,
    width: 115,
    borderRadius: 100,
  },
  noDataCon: {
    paddingHorizontal: 16,
    paddingVertical: 13,
    width: 375,
    height: 44,
    alignItems: 'center',
  },
  noDataText: {
    width: 343,
    height: 18,
    fontSize: 14,
    color: Colors.LIGHTTextDisable,
  },
  btnText: {
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.WHITE,
    fontSize: 16,
  },
  btnInfo: {
    fontWeight: 'normal',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.BLACK,
    fontSize: 12,
    textAlign: 'center',
    paddingTop: 8,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
});
