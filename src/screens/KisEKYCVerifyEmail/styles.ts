import globalStyles, { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  title: {
    fontWeight: '500',
    fontSize: 24,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.LIGHTTextContent,
  },
  content: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.LIGHTTextContent,
    lineHeight: 22,
    textAlign: 'center',
  },
  content1: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.BlueNewColor,
    lineHeight: 24,
  },
  logoContainer: {
    marginTop: 16,
    marginBottom: 30,
  },
  contentContainer: {
    marginBottom: 30,
  },
  wholeContainerStyle: {
    marginHorizontal: 16,
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
    height: '100%',
    paddingLeft: 10,
    fontSize: 14,
  },
  secondTextInput: {
    paddingTop: 15,
  },
  executeFormButton: {
    backgroundColor: Colors.BlueNewColor,
    height: 44,
    marginTop: 20,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  executeFormButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.WHITE,
  },
  disabledButton: {
    backgroundColor: Colors.LIGHTBackground,
  },
  disabledButtonText: {
    color: Colors.LIGHTTextDisable,
  },
  modalBackground: {
    backgroundColor: Colors.BACKGROUND_MODAL2,
    paddingHorizontal: 16,
  },
  executeFormButton2: {
    backgroundColor: Colors.BlueNewColor,
    height: 44,
    borderRadius: 10,
  },
  modalContentContainer: {
    backgroundColor: Colors.WHITE,
    borderRadius: 21,
    width: 343,
    height: 263,
  },
  modalContent: {
    ...globalStyles.centered,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  marginBottom10: {
    marginBottom: 10,
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
  cancelExecuteFormButton2: {
    backgroundColor: Colors.LIGHTBackground,
    height: 44,
    borderRadius: 10,
  },
  marginTop16: {
    marginTop: 16,
  },
  marginTop30: {
    marginTop: 30,
  },
});
