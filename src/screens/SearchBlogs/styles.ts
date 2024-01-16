import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  // CONTAINER
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  background: {
    backgroundColor: Colors.WHITE,
  },
  screenOption: {
    height: 44,
    borderRadius: 10,
  },
  optionContainer: {
    width: 156,
    marginHorizontal: 16,
  },
  optionContainerSelected: {
    borderBottomWidth: 3,
    borderBottomColor: Colors.BlueNewColor,
  },
  selectedText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.BlueNewColor,
  },
  unselectedText: {
    fontSize: 14,
    color: Colors.LIGHTTextTitle,
  },

  //LIST

  rowData: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  rowDataTextBranch: {
    fontWeight: '700',
    fontSize: 14,
    color: Colors.LIGHTTextBigTitle,
    width: 343,
  },
  rowDataTextAdd: {
    fontWeight: '400',
    fontSize: 12,
    color: Colors.LIGHTTextDisable,
    marginLeft: 9,
  },

  //LIST SYMBOL

  symbolItemContainer: {
    height: 48,
    paddingLeft: 16,
    paddingRight: 18,
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
  },
  symbolItemImage: {
    height: 32,
    width: 32,
    marginRight: 5,
  },
  nameContainer: {
    marginRight: 17,
  },
  stockCodeText: {
    fontWeight: '700',
    color: Colors.LIGHTTextBigTitle,
    fontSize: 14,
    marginLeft: 4,
  },
  fullNameText: {
    fontSize: 10,
    color: Colors.LIGHTTextDisable,
    marginTop: 3,
    marginLeft: 4,
  },

  //MODAL

  modalBackground: {
    backgroundColor: Colors.BACKGROUND_MODAL2,
  },
  modalContentContainer: {
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
    width: '100%',
    paddingBottom: 30,
    marginTop: 48,
  },
  modalTitle: {
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  filterText: {
    fontWeight: '700',
    fontSize: 18,
    color: Colors.BlueNewColor,
  },
  cancelContainer: {
    right: 0,
  },
  cancelText: {
    fontSize: 16,
    color: Colors.LIGHTRed,
    marginRight: 16,
  },
  symbolItemContainer2: {
    height: 44,
    paddingLeft: 16,
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
  },
  label: {
    paddingLeft: 15,
  },
  labelText: {
    fontSize: 14,
    color: Colors.LIGHTTextContent,
    textAlign: 'left',
  },
  executeFormContainer: {
    marginHorizontal: 16,
  },
  executeFormContainer2: {
    marginVertical: 10,
  },
  executeFormButton: {
    backgroundColor: Colors.BlueNewColor,
    width: '100%',
    height: 44,
    borderRadius: 10,
  },
  executeFormButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.WHITE,
  },
  executeFormButtonText2: {
    fontSize: 16,
    color: Colors.BlueNewColor,
    marginLeft: 10,
  },
  executeFormButton3: {
    backgroundColor: Colors.LIGHTBackground,
    width: '100%',
    height: 44,
    borderRadius: 10,
  },

  //ARTICLES

  SeparatorContainer: {
    width: '100%',
    backgroundColor: Colors.LIGHTTitleTable,
  },

  //LIST ARTICLES

  blogUserUpdateContainer: {
    marginTop: 8,
  },

  // MODAL CREATE WATCHLIST
  modalContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  modalWatchlist: {
    paddingHorizontal: 16,
    backgroundColor: Colors.BACKGROUND_MODAL2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCreateWatchListContainer: {
    backgroundColor: Colors.WHITE,
    height: 267,
    borderRadius: 21,
    width: 343,
  },
  modalTitleCreateWatchlist: {
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  modalTitleText: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
    color: Colors.BlueNewColor,
  },
  wholeContainerStyle: {
    marginBottom: 17,
  },
  wlNameText: {
    color: Colors.LIGHTTextTitle,
    marginBottom: 5,
    fontSize: 14,
  },
  textInputContainerStyle: {
    backgroundColor: Colors.LIGHTTitleTable,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.LIGHTBackground,
    paddingLeft: 10,
    paddingRight: 17,
    justifyContent: 'space-between',
  },
  textInputContainerStyleError: {
    justifyContent: 'space-between',
    backgroundColor: Colors.red01,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.Ask1,
    paddingLeft: 10,
    paddingRight: 17,
  },
  textInputStyle: {
    fontSize: 14,
    lineHeight: 18,
  },
  textLimit: {
    color: Colors.LIGHTTextDisable,
    fontSize: 12,
    lineHeight: 16,
    marginRight: -8,
  },
  marginBottom: {
    marginBottom: 10,
  },
  executeFormButton2: {
    backgroundColor: Colors.BlueNewColor,
    height: 44,
    borderRadius: 10,
  },
  cancelExecuteFormButton2: {
    backgroundColor: Colors.LIGHTBackground,
    height: 44,
    borderRadius: 10,
  },
  cancelExecuteFormButtonText2: {
    fontSize: 16,
    color: Colors.LIGHTTextContent,
  },
  logoContainer: {
    marginRight: 3,
    borderRadius: 99,
  },
});
