import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  iDCardContainer: {
    alignSelf: 'center',
    marginVertical: 24,
  },
  paddingTop24: {
    paddingTop: 24,
  },
  paddingHorizontal14: {
    paddingHorizontal: 14,
  },
  warningText: {
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 18,
    color: Colors.LIGHTRed,
  },
  openAccountText: {
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 18,
    color: Colors.BlueNewColor,
  },
  titleText: {
    fontSize: 18,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 24,
    color: Colors.BLACK,
    alignSelf: 'center',
    marginBottom: 32,
  },
  ruleNumber: {
    color: Colors.WHITE,
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 18,
  },
  ruleText: {
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 18,
    color: Colors.LIGHTTextContent,
    flex: 1,
    marginBottom: 48,
  },
  titleText2: {
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 18,
    color: Colors.LIGHTTextContent,
    marginBottom: 24,
    marginHorizontal: 51,
    textAlign: 'center',
  },
  ruleContainer: {
    height: 18,
    marginBottom: 24,
    width: 322,
    alignSelf: 'center',
  },
  numberContainer: {
    height: 30,
    width: 30,
    borderRadius: 8,
    backgroundColor: Colors.SecondColorsLogo,
    marginRight: 10,
  },
  executeButtonContainer: {
    height: 44,
    paddingHorizontal: 16,
  },
  executeButton: {
    backgroundColor: Colors.BlueNewColor,
    borderRadius: 10,
  },
  executeButtonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontStyle: 'normal',
    lineHeight: 22,
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
    paddingVertical: 16,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 16,
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
    textAlign: 'center',
  },
});