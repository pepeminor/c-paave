import { Dimensions, Platform } from 'react-native';
import { lightColors as Colors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

const { height: SCREEN_HEIGHT } = Dimensions.get('screen');

export const localColors = {
  white10: Colors.white10,
  white15: Colors.white15,
  DARKTextTitle: Colors.DARKTextTitle,
  DARKTextBigTitle: Colors.DARKTextBigTitle,
};

export default getStylesHook({
  logoContainer: {
    paddingTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundColorDeepBlue: {
    backgroundColor: Colors.DeepBlueColor,
  },
  langPicker: {
    color: Colors.WHITE,
    fontSize: 14,
  },
  signUpForm: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 30,
    marginHorizontal: 16,
    marginTop: 28,
    backgroundColor: localColors.white10,
    borderRadius: 20,
  },
  formDeco: {
    height: 10,
    backgroundColor: localColors.white15,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    marginHorizontal: 40,
  },
  optionContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
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
  executeFormButtonTextDisable: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.LIGHTTextDisable,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
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
  },
  modalTitle: {
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  modalTitleText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.BlueNewColor,
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
  modalTitleText2: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: 24,
    textAlign: 'center',
    color: Colors.BlueNewColor,
  },
  optionSelected: {
    backgroundColor: localColors.white10,
  },
  option: {
    paddingRight: 11,
    paddingLeft: 3,
    paddingVertical: 3,
    borderRadius: 13,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  modalBackground: {
    backgroundColor: Colors.BACKGROUND_MODAL,
    paddingHorizontal: 16,
  },
  modalBackground2: {
    backgroundColor: Colors.BACKGROUND_MODAL2,
  },
  optionText: {
    fontSize: 14,
    color: Colors.WHITE,
  },
  executeFormButtonText2: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.WHITE,
  },
  optionalSwitchStateContainer: {
    marginTop: 16,
    paddingVertical: 13,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  optionalSwitchStateText: {
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.WHITE,
    marginRight: 5,
    fontSize: 14,
  },
  optionalSwitchState: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.SecondColorsLogo,
  },
  modalContentContainer: {
    backgroundColor: Colors.WHITE,
    alignItems: 'stretch',
    borderRadius: 21,
    width: '100%',
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
  marginRight10: {
    marginRight: 10,
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

  // PAAVE-752
  optionalExecuteFormText: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 12,
    color: Colors.WHITE,
  },

  // PAAVE-675
  optionalExecuteFormContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    // marginHorizontal: (16),
    paddingTop: 10,
  },
  optionalExecuteFormLeftItem: {
    height: 44,
    paddingRight: 4,
  },
  optionalExecuteFormItemText: {
    fontSize: 14,
    marginLeft: 6,
    fontWeight: '400',
    color: Colors.LIGHTTextTitle,
  },
  optionalExecuteFormMidItem: {
    height: 44,
    paddingHorizontal: 2,
  },
  optionalExecuteFormMidItem2: {
    height: 44,
    paddingLeft: 2,
  },
  optionalExecuteFormRightItem: {
    height: 44,
    paddingLeft: 4,
  },
  shadow: {
    borderRadius: 10,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,

    elevation: 5,
    backgroundColor: Colors.WHITE,
  },
  buttonSocial: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: Colors.WHITE,
    padding: 12,
    marginRight: 12,
  },
  bgImageStyle: {
    width: '100%',
    height: SCREEN_HEIGHT,
    position: 'absolute',
  },
  versionContainer: {
    position: 'absolute',
    bottom: 16,
    width: '100%',
    alignItems: 'center',
    zIndex: Platform.OS === 'ios' ? 0 : -1,
  },
  versionText: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
    fontSize: 13,
    color: Colors.WHITE,
  },
});
