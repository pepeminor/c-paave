import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';
import globalStyles from 'styles';
import { lightColors } from 'styles/index';
import { Platform } from 'react-native';
import { localColors } from '../SignIn/components/Form/styles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  settingContainer: {
    height: 50,
    paddingHorizontal: 16,
  },
  modalBackground: {
    backgroundColor: Colors.BACKGROUND_MODAL2,
  },
  settingContainer2: {
    // height: (54),
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  borderBottom1: {
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
  },
  settingItemText: {
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.LIGHTTextBigTitle,
    fontSize: 14,
  },
  settingItemText2: {
    fontSize: 14,
    textAlign: 'right',
    color: Colors.LIGHTTextContent,
    marginRight: 8,
    width: 170,
  },
  notificationText: {
    color: Colors.LIGHTTextTitle,
    fontWeight: '700',
    marginBottom: 2,
    fontSize: 14,
  },
  notificationText2: {
    fontSize: 14,
    color: Colors.LIGHTTextContent,
    flexWrap: 'wrap',
  },
  notificationText3: {
    color: Colors.LIGHTTextContent,
  },
  switchContainer: {
    paddingLeft: 30,
  },
  borderBottom5: {
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 5,
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
  },
  modalEditFullNameContainer: {
    backgroundColor: Colors.WHITE,
    borderRadius: 21,
    width: 343,
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

  // modal otp
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

  // modal open setting
  modalBackground2: {
    backgroundColor: Colors.BACKGROUND_MODAL2,
  },
  modalContainerSetting: {
    backgroundColor: Colors.WHITE,
    borderRadius: 21,
    // height: (338),
    width: 343,
  },
  headerModalSetting: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
  },
  headerModalSettingTitle: {
    fontSize: 18,
    color: Colors.BlueNewColor,
    fontWeight: '700',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    textAlign: 'center',
  },
  sectionModalSetting: {
    paddingTop: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textSection: {
    fontSize: 14,
    color: Colors.LIGHTTextContent,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    textAlign: 'center',
  },
  goToSettingButton: {
    marginTop: 17,
    backgroundColor: Colors.BlueNewColor,
    marginHorizontal: 16,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: Colors.LIGHTBackground,
    height: 44,
    borderRadius: 10,
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  executeFormButtonText2: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.WHITE,
  },
});
