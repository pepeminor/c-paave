import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  modalContainer: {
    paddingHorizontal: 16,
    backgroundColor: Colors.BACKGROUND_MODAL2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitleCon: {
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
    justifyContent: 'center',
  },
  modalEditUsernameContainer: {
    backgroundColor: Colors.WHITE,
    height: 364,
    borderRadius: 21,
    width: 343,
  },
  wlNameText: {
    color: Colors.LIGHTTextTitle,
    marginBottom: 5,
    fontSize: 14,
    fontFamily: 'Roboto',
  },
  modalContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  textInputContainerStyle: {
    backgroundColor: Colors.LIGHTTitleTable,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.LIGHTBackground,
    paddingLeft: 10,
    paddingRight: 10,
  },
  wholeContainerStyle: {
    marginBottom: 17,
  },
  textInputStyle: {
    height: 44,
    width: 260,
    fontSize: 14,
    fontFamily: 'Roboto',
  },
  marginBottom: {
    marginBottom: 10,
  },
  executeFormButton: {
    backgroundColor: Colors.BlueNewColor,
    width: '100%',
    height: 44,
    borderRadius: 10,
  },
  executeFormButtonDisable: {
    backgroundColor: Colors.LIGHTBackground,
  },
  executeFormButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.WHITE,
  },
  executeFormButtonTextDisable: {
    color: Colors.LIGHTTextDisable,
  },
  cancelExecuteFormButton2: {
    backgroundColor: Colors.LIGHTBackground,
    height: 44,
    borderRadius: 10,
  },
  cancelExecuteFormButtonText2: {
    fontSize: 16,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    color: Colors.LIGHTTextContent,
  },

  modalTitleText: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.BlueNewColor,
  },
  containerTextUserName: {
    width: 325,
    height: 106,
    justifyContent: 'center',
  },
  validateExItemContainer: {
    marginBottom: 5,
  },
  normalText: {
    color: Colors.LIGHTTextContent,
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Roboto',
  },
});
