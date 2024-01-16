import globalStyles, { lightColors as Colors, lightColors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  buttonModal: {
    backgroundColor: Colors.BlueNewColor,
    ...globalStyles.centered,
    height: 44,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonModalText: {
    ...textStyles.fontSize16,
    ...textStyles.roboto700,
    color: Colors.WHITE,
    width: 140,
    textAlign: 'center',
  },
  infoText: {
    ...textStyles.fontSize16,
    ...textStyles.roboto400,
    color: Colors.BLACK,
    textAlign: 'center',
    paddingVertical: 2,
  },
  titleText: {
    ...textStyles.fontSize18,
    ...textStyles.roboto700,
    color: Colors.BlueNewColor,
    textAlign: 'center',
  },
  modalTitle: {
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.BACKGROUND_MODAL2,
  },
  m0: {
    margin: 0,
  },
  containerBackground: {
    backgroundColor: lightColors.WHITE,
    borderRadius: 20,
    justifyContent: 'center',
  },
  paddingContent: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
});
