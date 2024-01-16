import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export const localColors = {
  white10: Colors.white10,
  white15: Colors.white15,
  DARKTextTitle: Colors.DARKTextTitle,
  DARKTextBigTitle: Colors.DARKTextBigTitle,
};

export default getStylesHook({
  wholeContainerVerticalStyle: {
    marginTop: 15,
  },
  containerBackground: {
    backgroundColor: Colors.WHITE,
    width: 343,
  },
  labelTextStyle: {
    color: localColors.DARKTextTitle,
    marginBottom: 5,
    fontSize: 14,
  },
  biometricIconInModal: {
    marginVertical: 17,
  },
  modalContentContainer: {
    justifyContent: 'center',
    alignItems: 'stretch',
    borderRadius: 21,
    backgroundColor: Colors.WHITE,
    width: 343,
    // width: '100%',
  },
  modalOKButtonText: {
    fontWeight: '700',
    fontSize: 16,
    color: Colors.WHITE,
  },
  modalOKButton: {
    backgroundColor: Colors.BlueNewColor,
    height: 44,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContentText: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.LIGHTTextContent,
    marginHorizontal: 16,
    marginBottom: 33,
  },
  modalTitle: {
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitleText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.BlueNewColor,
  },
  textInputContainerStyle: {
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: localColors.white10,
  },
  textInputContainerStyleError: {
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.Ask1,
  },
  iconStyle: {
    marginHorizontal: 14,
  },
  textInputStyle: {
    flex: 1,
    width: 216,
    height: '100%',
    fontSize: 14,
    paddingTop: 0,
    paddingBottom: 0,
    color: localColors.DARKTextBigTitle,
  },
  eyeIconStyle: {
    marginHorizontal: 16,
  },
  rememberMeSection: {
    flexDirection: 'row',
    marginTop: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  forgotText: {
    top: -1,
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.SecondColorsLogo,
  },
  executeForm: {
    flex: 1,
    paddingRight: 14,
  },
  executeFormContainerLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 23,
  },
  WhiteText: {
    alignSelf: 'center',
    color: Colors.WHITE,
    fontSize: 14,
  },
  loadingTextStyle: {
    paddingVertical: 32,
    color: Colors.SecondColorsLogo,
    fontFamily: 'Roboto',
    fontSize: 14,
    textAlign: 'center',
  },
  dummyBlock: {
    height: 128,
    width: 128,
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.BACKGROUND_MODAL2,
  },
  modalErrorBioBackground: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.BACKGROUND_MODAL2,
  },
});
