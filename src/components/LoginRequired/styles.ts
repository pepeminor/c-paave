import globalStyles, { lightColors as Colors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    backgroundColor: Colors.WHITE,
    position: 'absolute',
    borderColor: Colors.BORDER,
    borderWidth: 1,
    zIndex: 2,
  },
  btnAction: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  avaActionRegister: {
    backgroundColor: Colors.LIGHTBackground,
    margin: 16,
  },
  avaActionLogin: {
    backgroundColor: Colors.BlueNewColor,
    margin: 16,
  },
  avaAction: {
    // ...globalStyles.container,
    ...globalStyles.centered,
    height: 44,
    borderRadius: 10,
  },
  avaActionRegisterText: {
    ...textStyles.fontSize16,
    ...textStyles.roboto400,
    color: Colors.BlueNewColor,
    width: 140,
    textAlign: 'center',
  },
  avaActionLoginText: {
    ...textStyles.fontSize16,
    ...textStyles.roboto400,
    color: Colors.WHITE,
    width: 140,
    textAlign: 'center',
  },
  infoText: {
    ...textStyles.fontSize16,
    ...textStyles.roboto400,
    color: Colors.BLACK,
    textAlign: 'center',
  },
  modalContainer: {
    width: 343,
    height: 350,
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    ...globalStyles.padding16,
  },
  modalBackground: {
    backgroundColor: Colors.BACKGROUND_MODAL2,
  },
  headerText: {
    ...textStyles.fontSize24,
    ...textStyles.roboto700,
    color: Colors.BlueNewColor,
    textAlign: 'center',
    paddingVertical: 16,
  },
  paaveLogo: {
    width: 177,
    height: 82,
  },
  m0: {
    margin: 0,
  },
  registerText: {
    ...textStyles.fontSize16,
    ...textStyles.roboto700,
    color: Colors.BlueNewColor,
  },
});
