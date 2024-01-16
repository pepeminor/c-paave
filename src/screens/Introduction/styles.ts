import { lightColors as Colors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  languagePickerContainer: {
    height: 44,
  },
  languagePickerContainerInner: {
    alignItems: 'flex-end',
    paddingRight: 16,
  },
  logoContainer: {
    paddingTop: 16,
  },
  instructionText: {
    color: Colors.LIGHTTextTitle,
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  navigationSection: {
    paddingHorizontal: 16,
  },
  getStartedButton: {
    backgroundColor: Colors.BlueNewColor,
    borderRadius: 10,
    height: 44,
  },
  getStartedButtonText: {
    color: Colors.WHITE,
    fontWeight: '700',
    fontSize: 16,
  },
  wrapButton: {
    paddingTop: 24,
  },
  signUpButtonContainer: {
    paddingRight: 24,
  },
  signUpButton: {
    borderRadius: 10,
    height: 44,
  },
  signUpButtonText: {
    color: Colors.BlueNewColor,
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  signInButtonContainer: {
    paddingLeft: 24,
  },
  signInButton: {
    backgroundColor: Colors.LIGHTBackground,
    borderRadius: 10,
    height: 44,
  },
  signInButtonText: {
    color: Colors.BlueNewColor,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 16,
  },
  mainImage: {
    width: 200,
    height: 360,
    marginBottom: 25,
  },
  nonLoginText: {
    fontSize: 16,
    ...textStyles.roboto400,
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 10,
  },
  borderRadius: {
    borderRadius: 10,
  },
});
