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
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundColorDeepBlue: {
    flex: 1,
    backgroundColor: Colors.DeepBlueColor,
  },
  langPicker: {
    color: Colors.WHITE,
    fontSize: 14,
  },
  signUpForm: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginHorizontal: 16,
    marginTop: 28,
    backgroundColor: localColors.white10,
    borderRadius: 20,
  },
  optionalSwitchStateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    paddingVertical: 13,
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
  // PAAVE-675
  footerContainer: {
    justifyContent: 'flex-end',
    paddingBottom: 15,
  },
  footerText: {
    fontSize: 12,
  },
  footerText2: {
    color: Colors.BlueNewColor,
  },
  footerText3: {
    marginHorizontal: 5,
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
  optionalExecuteFormText: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 12,
    color: Colors.WHITE,
  },
  optionalExecuteFormContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    // marginHorizontal: (16),
    paddingTop: 10,
  },
  modalBackground: {
    flex: 1,
    // backgroundColor: Colors.BACKGROUND_MODAL,
    justifyContent: 'center',
    alignItems: 'center',
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
  contentModalUserExist: {
    textAlign: 'center',
  },
  paaveLogo: {
    width: 177,
    height: 82,
  },
});
