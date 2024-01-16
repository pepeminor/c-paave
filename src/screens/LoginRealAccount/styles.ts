import { Platform } from 'react-native';
import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  logoContainer: {
    marginTop: 16,
    marginBottom: 20,
  },
  marginBottom: {
    marginBottom: 10,
  },
  optionalSwitchStateContainer: {
    paddingTop: 20,
  },
  optionalSwitchStateText: {
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.LIGHTTextContent,
    marginRight: 5,
    fontSize: 14,
  },
  optionalSwitchState: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.BlueNewColor,
  },
  marginTop17: {
    marginTop: 17,
  },
  marginBottom10: {
    marginBottom: 10,
  },
  marginBottom16: {
    marginBottom: 16,
  },
  executeFormButton3: {
    backgroundColor: Colors.BlueNewColor,
    width: '100%',
    height: 44,
    borderRadius: 10,
  },
  executeFormButton2: {
    backgroundColor: Colors.LIGHTBackground,
    width: '100%',
    height: 44,
    borderRadius: 10,
  },
  modalBackground: {
    backgroundColor: Colors.BACKGROUND_MODAL2,
    paddingHorizontal: 16,
  },
  modalContainer: {
    backgroundColor: Colors.WHITE,
    borderRadius: 21,
    // height: (338),
    width: 343,
    paddingHorizontal: 16,
    marginBottom: Platform.OS === 'ios' ? 50 : 0,
  },
  modalTitleContainer: {
    height: 52,
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
  },
  modalTitleText: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: 24,
    textAlign: 'center',
    color: Colors.BlueNewColor,
  },
  textTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.LIGHTTextTitle,
    textAlign: 'center',
  },
  logoTitle: {
    marginTop: 22,
    width: 134,
    height: 50,
  },
  textCancel: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.BlueNewColor,
  },
  //TEXT_INPUT

  wholeContainerStyle: {
    marginHorizontal: 16,
    marginTop: 15,
  },
  labelTextStyle: {
    color: Colors.LIGHTTextTitle,
    marginBottom: 5,
    fontSize: 14,
  },
  textInputContainerStyle: {
    backgroundColor: Colors.LIGHTTitleTable,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.LIGHTBackground,
  },
  textInputContainerStyleError: {
    backgroundColor: Colors.red01,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.Ask1,
  },
  textInputStyle: {
    fontSize: 14,
    height: '100%',
    paddingLeft: 10,
  },
  eyeIconStyle: {
    marginHorizontal: 16,
  },

  //BUTTON
  executeFormButton: {
    backgroundColor: Colors.BlueNewColor,
    height: 44,
    marginTop: 20,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  disabledButton: {
    backgroundColor: Colors.LIGHTBackground,
  },
  executeFormButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.WHITE,
  },
  executeFormButtonTextDisable: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.LIGHTTextDisable,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  cancelExecuteFormButton2: {
    backgroundColor: Colors.LIGHTBackground,
    height: 44,
    borderRadius: 10,
  },
  cancelExecuteFormButtonText2: {
    fontSize: 16,
    color: Colors.LIGHTTextContent,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  disabledButtonText: {
    color: Colors.LIGHTTextDisable,
  },
});
