import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    backgroundColor: Colors.WHITE,
  },
  modalBackground: {
    backgroundColor: Colors.BACKGROUND_MODAL2,
  },
  topInfo: {
    height: 14,
  },
  modalTitle: {
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  filterText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.BlueNewColor,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  cancelText: {
    fontSize: 14,
    color: Colors.WHITE,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  cancelContainer: {
    marginRight: 20,
  },
  executeFormContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  executeFormButton: {
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
  executeFormButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.WHITE,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  btnDisable: {
    opacity: 0.5,
  },
  btnEnable: {
    opacity: 1,
  },
  executeFormButtonTextDisable: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.LIGHTTextDisable,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  executeFormButtonText2: {
    fontSize: 16,
    color: Colors.BlueNewColor,
    marginLeft: 10,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  label: {
    height: 42,
    width: 70,
    justifyContent: 'center',
  },
  labelText: {
    fontSize: 14,
    color: Colors.LIGHTTextContent,
    textAlign: 'left',
  },
  labelTextWatchlist: {
    fontSize: 14,
    color: Colors.LIGHTTextContent,
    textAlign: 'left',
    width: 235,
  },
  symbolItemContainer2: {
    height: 44,
    paddingHorizontal: 16,
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
    width: 375,
  },
  labelTextStyle: {
    textAlign: 'right',
    paddingRight: 16,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  paddingLeft10: {
    paddingLeft: 10,
  },

  // Modal createWatchlist
  modalWatchlist: {
    paddingHorizontal: 16,
    backgroundColor: Colors.BACKGROUND_MODAL2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitleCreateWatchlist: {
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  modalCreateWatchListContainer: {
    backgroundColor: Colors.WHITE,
    height: 267,
    borderRadius: 21,
    width: 343,
  },

  noSymbolsText: {
    color: Colors.LIGHTTextContent,
    fontSize: 16,
    lineHeight: 22,
    marginTop: 16,
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontStyle: 'normal',
  },
  modalContentContainer: {
    borderTopStartRadius: 21,
    borderTopEndRadius: 21,
    width: 375,
  },
  modalContentContainerList: {
    borderRadius: 21,
    width: 375,
    height: 764,
    marginTop: 60,
  },
  modalTitleText: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: 'bold',
    color: Colors.BlueNewColor,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  modalContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  wholeContainerStyle: {
    marginBottom: 17,
  },
  wlNameText: {
    color: Colors.LIGHTTextTitle,
    marginBottom: 5,
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontStyle: 'normal',
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
  textInputStyle: {
    height: 44,
    width: 260,
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontStyle: 'normal',
  },
  cancelExecuteFormButton2: {
    backgroundColor: Colors.LIGHTBackground,
    height: 44,
    borderRadius: 10,
  },
  cancelExecuteFormButtonText2: {
    fontSize: 16,
    color: Colors.LIGHTTextContent,
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontStyle: 'normal',
  },
  marginBottom: {
    marginBottom: 10,
  },

  // position absolute text in TextInput
  textLimit: {
    color: Colors.LIGHTTextDisable,
    fontSize: 12,
    lineHeight: 16,
    marginRight: -8,
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontStyle: 'normal',
  },

  squareStyle: {
    height: 24,
    width: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelViewTextStyle: {
    height: 18,
    width: 265,
    paddingLeft: 8,
    justifyContent: 'center',
  },
  labelTextNumberOfStock: {
    color: Colors.LIGHTTextDisable,
    textAlign: 'right',
    paddingRight: 15,
    fontSize: 14,
    lineHeight: 18,
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontStyle: 'normal',
  },
});
