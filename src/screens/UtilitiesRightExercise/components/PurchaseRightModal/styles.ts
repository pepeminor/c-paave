import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  editMarginBottom: {
    marginBottom: 5,
  },
  containerFlat: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: 'Roboto',
    color: Colors.LIGHTText,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
  },
  value: {
    fontFamily: 'Roboto',
    fontSize: 14,
  },
  titleSymbol: {
    fontFamily: 'Roboto',
    color: Colors.LIGHTTextContent,
    fontSize: 14,
    fontWeight: '700',
  },
  wholeContainerContentStyle: {
    width: 147,
  },
  textInputRegisterNumberStyle: {
    fontSize: 14,
    height: 38,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.BORDER,
    backgroundColor: Colors.LIGHTTitleTable,
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  modalContainer: {
    backgroundColor: Colors.BACKGROUND_MODAL,
    paddingHorizontal: 16,
  },
  modalContentContainer: {
    backgroundColor: Colors.WHITE,
    marginVertical: 32,
    alignItems: 'stretch',
    borderRadius: 21,
    width: '100%',
  },
  modalTitle: {
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  modalTitleText: {
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: '700',
    color: Colors.BlueNewColor,
  },
  modalActionGroup: {
    height: 130,
    marginHorizontal: 16,
  },
  modalCancelButton: {
    backgroundColor: Colors.LIGHTBackground,
    height: 44,
    borderRadius: 10,
    marginBottom: 10,
  },
  executeFormButtonText: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: '400',
    color: Colors.WHITE,
  },
  cancelFormButtonText: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: '400',
    color: Colors.LIGHTTextContent,
  },

  // // MODAL
  executeFormButton: {
    backgroundColor: Colors.BlueNewColor,
    height: 44,
    borderRadius: 10,
    marginBottom: 10,
  },
  executeFormDisableButton: {
    opacity: 0.5,
  },
  errorTransferQttStyle: {
    borderColor: Colors.LIGHTRed2,
    borderWidth: 1,
    borderRadius: 10,
  },
  pV5: {
    paddingVertical: 5,
  },
  otpContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
