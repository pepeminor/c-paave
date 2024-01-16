import { lightColors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
  },
  wholeContainerStyle: {
    marginHorizontal: 16,
  },
  labelTextStyle: {
    color: lightColors.LIGHTTextTitle,
    marginBottom: 5,
    fontSize: 14,
    fontWeight: '400',
    marginTop: 30,
  },
  textInputContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: lightColors.LIGHTTitleTable,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: lightColors.LIGHTBackground,
  },
  textInputContainerStyleError: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: lightColors.Ask1,
  },
  textInputStyle: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    marginLeft: 10,
  },
  eyeIconStyle: {
    marginHorizontal: 16,
  },
  executeFormContainer: {
    alignItems: 'center',
    marginHorizontal: 16,
    paddingTop: 16,
  },
  executeFormButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lightColors.BlueNewColor,
    width: '100%',
    height: 44,
    borderRadius: 10,
  },
  executeFormDisableButton: {
    opacity: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lightColors.BlueNewColor,
    width: '100%',
    height: 44,
    borderRadius: 10,
  },
  executeErrorFormButton: {
    backgroundColor: lightColors.LIGHTBackground,
    width: '100%',
    height: 44,
    borderRadius: 10,
  },
  executeFormButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: lightColors.WHITE,
  },
  executeErrorFormButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: lightColors.LIGHTTextDisable,
  },
  executeFormTitle: {
    backgroundColor: lightColors.LIGHTTitleTable,
    width: '100%',
    height: 104,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  validateExItemContainer: {
    marginBottom: 5,
    marginHorizontal: 16,
    flexDirection: 'row',
  },
  executeFormTitleText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: lightColors.LIGHTTextContent,
  },

  // Modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: lightColors.ModalBackgroundColor,
    paddingHorizontal: 16,
  },
  modalContentContainer: {
    backgroundColor: lightColors.WHITE,
    borderRadius: 10,
    padding: 16,
    paddingBottom: 24,
  },
  modalTitle: {
    ...textStyles.fontSize16,
    ...textStyles.roboto700,
    color: lightColors.BlueNewColor,
    textAlign: 'center',
    paddingVertical: 16,
  },
  modalContent: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
    color: lightColors.LIGHTTextContent,
    textAlign: 'center',
    paddingBottom: 40,
  },
  changePasswordNote: {
    ...textStyles.fontSize14,
    ...textStyles.roboto700,
    color: lightColors.BlueNewColor,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
