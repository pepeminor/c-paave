import globalStyles, { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  modalWatchList: {
    ...globalStyles.container,
    ...globalStyles.flexDirectionRow,
    paddingHorizontal: 16,
    backgroundColor: Colors.BACKGROUND_MODAL2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCreateWatchListContainer: {
    ...globalStyles.justifyCenter,
    backgroundColor: Colors.WHITE,
    borderRadius: 21,
    paddingVertical: 16,
  },
  modalTitleCreateWatchList: {
    ...globalStyles.centered,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
    paddingBottom: 16,
  },
  modalTitleText: {
    color: Colors.BlueNewColor,
    textAlign: 'center',
  },
  modalContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  executeFormButton: {
    ...globalStyles.centered,
    backgroundColor: Colors.BlueNewColor,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flex: 1,
    marginHorizontal: 8,
  },
  executeFormButtonText: {
    color: Colors.WHITE,
  },
  cancelExecuteFormButton: {
    ...globalStyles.centered,
    backgroundColor: Colors.LIGHTBackground,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flex: 1,
    marginHorizontal: 8,
  },
  cancelExecuteFormButtonText: {
    color: Colors.LIGHTTextContent,
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
  textInputContainerStyleError: {
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.Ask1,
  },
  wholeContainerStyle: {
    padding: 8,
  },
  textInputStyle: {
    width: 216,
    height: '100%',
    fontSize: 14,
    paddingTop: 0,
    paddingBottom: 0,
  },
  marginBottom: {
    marginBottom: 10,
  },

  executeFormButtonDisable: {
    backgroundColor: Colors.LIGHTBackground,
  },

  executeFormButtonTextDisable: {
    color: Colors.LIGHTTextDisable,
  },
  cancelExecuteFormButton2: {
    justifyContent: 'center',
    alignItems: 'center',
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
  eyeIconStyle: {
    marginHorizontal: 16,
  },
  iconStyle: {
    marginHorizontal: 14,
  },
  wlNameText: {
    color: Colors.DARKTextTitle,
    marginBottom: 5,
    fontSize: 14,
  },
  styleTextError: {
    marginTop: 8,
    color: Colors.LIGHTRed,
    fontSize: 12,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
  },
});
