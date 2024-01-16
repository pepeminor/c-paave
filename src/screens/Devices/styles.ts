import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  headerTitleContainer: {
    paddingLeft: 14,
    paddingRight: 19,
  },
  doneText: {
    fontWeight: '700',
    color: Colors.WHITE,
    marginRight: 8,
    fontSize: 14,
  },
  fontSize14: {
    fontSize: 14,
  },
  wholeContainerStyle: {
    marginBottom: 17,
  },
  deviceInfo: {
    marginLeft: 15,
  },
  deviceNameText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.LIGHTTextBigTitle,
    marginBottom: 2,
  },
  thisDeviceText: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.LIGHTTextDisable,
    marginRight: 5,
  },
  logoutButton: {
    height: 34,
    width: 74,
    backgroundColor: Colors.LIGHTBGTab,
    borderRadius: 6,
  },
  loggedoutButton: {
    height: 34,
    width: 94,
  },
  logoutButtonText: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.RedColorLogo,
  },
  loggedoutButtonText: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.LIGHTTextDisable,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.LIGHTTextDisable,
  },
  iconStyle: {
    marginLeft: 8,
    marginRight: 14,
  },
  symbolItemContainer: {
    height: 48,
    paddingLeft: 16,
    paddingRight: 18,
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
  },
  symbolItemContainer2: {
    height: 44,
    paddingLeft: 16,
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
  },
  fullNameText: {
    fontSize: 10,
    color: Colors.LIGHTTextDisable,
    marginTop: 3,
  },
  recentViewContainer: {
    marginBottom: 13,
    paddingTop: 15,
    paddingHorizontal: 16,
  },
  recentViewContainer2: {
    paddingHorizontal: 16,
    flexWrap: 'wrap',
    paddingBottom: 2,
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
  },
  recentViewText: {
    fontWeight: '700',
    fontSize: 16,
    color: Colors.LIGHTTextBigTitle,
  },
  recentViewTopContainer: {
    alignItems: 'flex-end',
  },
  deleteAllText: {
    fontSize: 12,
    color: Colors.LIGHTRed,
    marginRight: 10,
  },
  recentViewItemContainer: {
    height: 34,
    width: 63,
    borderRadius: 8,
    backgroundColor: Colors.LIGHTBackground,
    marginBottom: 8,
  },
  recentViewItemText: {
    color: Colors.LIGHTTextBigTitle,
  },
  topInfo: {
    height: 14,
  },
  filterText: {
    fontWeight: '700',
    fontSize: 18,
    color: Colors.BlueNewColor,
  },
  cancelText: {
    fontSize: 16,
    color: Colors.LIGHTRed,
    marginRight: 16,
  },
  cancelContainer: {
    right: 0,
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
  executeFormButton2: {
    backgroundColor: Colors.BlueNewColor,
    height: 44,
    borderRadius: 10,
  },
  listWatchListContainer: {
    height: 400,
  },
  watchListItemConatainer: {
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
    paddingHorizontal: 16,
    backgroundColor: Colors.WHITE,
  },
  editContainer: {
    backgroundColor: Colors.LIGHTTextDisable,
    borderRightColor: Colors.WHITE,
    borderRightWidth: 1,
    width: 65,
  },
  deleteContainer: {
    backgroundColor: Colors.LIGHTButtonRed,
    width: 168,
  },
  deleteDeviceText: {
    color: Colors.WHITE,
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 10,
  },
  modalBackground: {
    backgroundColor: Colors.BACKGROUND_MODAL,
    paddingHorizontal: 16,
  },
  modalContentContainer: {
    // alignItems: 'stretch',
    backgroundColor: Colors.WHITE,
    borderRadius: 21,
    width: '100%',
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
  modalContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  marginBottom: {
    marginBottom: 10,
  },
  cancelExecuteFormButton2: {
    backgroundColor: Colors.LIGHTBackground,
    height: 44,
    borderRadius: 10,
  },
  executeFormButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.WHITE,
    marginLeft: 10,
  },
  executeFormButtonText2: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.WHITE,
  },
  cancelExecuteFormButtonText2: {
    fontSize: 16,
    color: Colors.LIGHTTextContent,
  },
  cancelExecuteFormButtonText22: {
    fontSize: 16,
    color: Colors.LIGHTTextContent,
    marginBottom: 17,
  },
  doText2: {
    fontSize: 14,
    color: Colors.LIGHTTextTitle,
    marginBottom: 5,
  },
  textInputContainerStyle: {
    backgroundColor: Colors.LIGHTTitleTable,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.LIGHTBackground,
    paddingLeft: 10,
    paddingRight: 17,
  },
  textInputStyle: {
    fontSize: 14,
  },
  textInputContainerStyleError: {
    backgroundColor: Colors.red01,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.Ask1,
    paddingLeft: 10,
    paddingRight: 17,
  },
});
