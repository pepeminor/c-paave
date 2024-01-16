import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.LIGHTTextContent,
  },
  content: {
    fontSize: 16,
    color: Colors.LIGHTTextContent,
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
  iconStyle: {
    marginHorizontal: 14,
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
  eyeIconStyle: {
    marginHorizontal: 16,
  },
  executeFormContainer: {
    marginHorizontal: 16,
    paddingTop: 30,
  },
  executeFormTitle: {
    backgroundColor: Colors.LIGHTTitleTable,
    width: '100%',
    height: 114,
    borderRadius: 10,
  },
  executeFormTitleText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.LIGHTTextContent,
  },
  executeFormDisableButton: {
    opacity: 0.5,
  },
  validateExItemContainer: {
    marginBottom: 5,
    marginHorizontal: 16,
  },
});