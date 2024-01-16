import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  title: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.LIGHTTextContent,
    marginTop: 16,
    marginBottom: 20,
  },
  content: {
    color: Colors.LIGHTTextContent,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    paddingHorizontal: 16,
    fontSize: 14,
    textAlign: 'center',
  },
  description: {
    color: Colors.LIGHTTextContent,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    paddingHorizontal: 16,
    fontSize: 14,
    textAlign: 'center',
  },
  email: {
    color: Colors.BlueNewColor,
    fontWeight: 'bold',
  },
  touchable: {
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontSize: 16,
    color: Colors.BlueNewColor,
  },
  contentUp: {
    marginBottom: 5,
    paddingHorizontal: 16,
  },
  contentDown: {
    fontSize: 16,
    color: Colors.LIGHTTextContent,
    marginBottom: 3,
  },
  contentUp2: {
    marginTop: 20,
  },
  codeFieldRoot: {
    marginHorizontal: 30,
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
  lastText: {
    marginBottom: 20,
  },
  timer: {
    color: Colors.LIGHTRed,
    fontSize: 14,
    fontFamily: 'Roboto',
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
  otpTextError: {
    marginBottom: 20,
    textAlign: 'center',
    color: Colors.LIGHTRed,
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  textBelowContainer: {
    width: 375,
    marginVertical: 20,
    alignItems: 'center',
  },
  textResend: {
    fontSize: 16,
    fontFamily: 'Roboto',
    textAlign: 'center',
    color: Colors.LIGHTTextContent,
  },
  errorCell: {
    borderColor: Colors.LIGHTButtonRed,
  },
});
