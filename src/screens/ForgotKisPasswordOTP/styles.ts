import { lightColors as Colors } from 'styles';
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
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.LIGHTTextContent,
  },
  logoContainer: {
    marginTop: 16,
    marginBottom: 30,
  },
  conditionsContainer: {
    backgroundColor: Colors.LIGHTTitleTable,
    margin: 16,
    padding: 16,
    borderRadius: 10,
  },
  conditionsText: {
    color: Colors.LIGHTTextContent,
  },
  codeFieldRoot: {
    marginHorizontal: 90,
  },
  cell: {
    width: 36,
    // height: (46),
    // lineHeight: (46),
    paddingVertical: 15,
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
  contentDown: {
    fontSize: 16,
    color: Colors.LIGHTTextContent,
    marginBottom: 3,
  },
  textResend: {
    fontSize: 16,
    fontFamily: 'Roboto',
    textAlign: 'center',
    color: Colors.LIGHTTextContent,
  },
  timer: {
    color: Colors.LIGHTRed,
    fontSize: 14,
    fontFamily: 'Roboto',
  },
  touchable: {
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontSize: 16,
    color: Colors.BlueNewColor,
  },
  executeFormButton: {
    backgroundColor: Colors.BlueNewColor,
    height: 44,
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
  textBelowContainer: {
    width: 375,
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
