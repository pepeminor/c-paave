import globalStyles, { lightColors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
  },
  headerTitleContainer: {
    paddingLeft: 14,
    paddingRight: 19,
  },
  doneText: {
    fontWeight: '700',
    color: lightColors.WHITE,
    marginRight: 8,
    fontSize: 14,
  },
  fontSize14: {
    fontSize: 14,
  },
  wholeContainerStyle: {
    marginBottom: 17,
  },
  iconStyle: {
    marginLeft: 8,
    marginRight: 14,
  },
  symbolItemContainer: {
    height: 48,
    paddingLeft: 16,
    paddingRight: 18,
    borderBottomColor: lightColors.BORDER,
    borderBottomWidth: 1,
  },
  symbolItemContainer2: {
    height: 44,
    paddingLeft: 16,
    borderBottomColor: lightColors.BORDER,
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
    color: lightColors.LIGHTTextBigTitle,
  },
  fullNameText: {
    fontSize: 10,
    color: lightColors.LIGHTTextDisable,
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
    borderBottomColor: lightColors.BORDER,
    borderBottomWidth: 1,
  },
  recentViewText: {
    fontWeight: '700',
    fontSize: 16,
    color: lightColors.LIGHTTextBigTitle,
  },
  recentViewTopContainer: {
    alignItems: 'flex-end',
  },
  deleteAllText: {
    fontSize: 12,
    color: lightColors.LIGHTRed,
    marginRight: 10,
  },
  recentViewItemContainer: {
    height: 34,
    width: 63,
    borderRadius: 8,
    backgroundColor: lightColors.LIGHTBackground,
    marginBottom: 8,
  },
  recentViewItemText: {
    color: lightColors.LIGHTTextBigTitle,
  },
  topInfo: {
    height: 14,
  },
  filterText: {
    fontWeight: '700',
    fontSize: 18,
    color: lightColors.BlueNewColor,
  },
  cancelText: {
    fontSize: 16,
    color: lightColors.LIGHTRed,
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
    backgroundColor: lightColors.BlueNewColor,
    width: '100%',
    height: 44,
    borderRadius: 10,
  },
  executeFormButton2: {
    backgroundColor: lightColors.LIGHTBackground,
    width: '100%',
    height: 44,
    borderRadius: 10,
  },
  listWatchListContainer: {
    height: 400,
  },
  watchListItemContainer: {
    ...globalStyles.flexDirectionRow,
    ...globalStyles.alignCenter,
    height: 44,
    borderBottomWidth: 1,
    borderBottomColor: lightColors.BORDER,
    paddingHorizontal: 16,
    backgroundColor: lightColors.WHITE,
  },
  editContainer: {
    backgroundColor: lightColors.LIGHTTextDisable,
    borderRightColor: lightColors.WHITE,
    borderRightWidth: 1,
    width: 65,
  },
  deleteContainer: {
    backgroundColor: lightColors.LIGHTButtonRed,
    width: 65,
  },
  disableDeleteContainer: {
    opacity: 0.5,
  },

  modalBackground: {
    backgroundColor: lightColors.BACKGROUND_MODAL2,
    paddingHorizontal: 16,
  },
  modalContentContainer: {
    // alignItems: 'stretch',
    backgroundColor: lightColors.WHITE,
    borderRadius: 21,
    width: '100%',
  },
  modalTitle: {
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: lightColors.BORDER,
  },
  modalTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: lightColors.BlueNewColor,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  modalContent: {
    paddingVertical: 16,
  },
  marginBottom: {
    marginBottom: 10,
  },
  cancelExecuteFormButton2: {
    backgroundColor: lightColors.LIGHTBackground,
    height: 44,
    borderRadius: 10,
  },
  executeFormButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: lightColors.WHITE,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  executeFormButtonText2: {
    fontSize: 16,
    fontWeight: '700',
    color: lightColors.WHITE,
  },
  cancelExecuteFormButtonText2: {
    fontSize: 16,
    color: lightColors.LIGHTTextContent,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  cancelExecuteFormButtonText22: {
    fontSize: 16,
    color: lightColors.LIGHTTextContent,
    marginBottom: 17,
  },
  doText2: {
    fontSize: 14,
    color: lightColors.LIGHTTextTitle,
    marginBottom: 5,
  },
  textInputContainerStyle: {
    backgroundColor: lightColors.LIGHTTitleTable,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: lightColors.LIGHTBackground,
    paddingLeft: 10,
    paddingRight: 10,
  },
  // issue fix bug 698
  textInputStyle: {
    height: 44,
    width: 260,
    fontSize: 14,
  },
  textInputContainerStyleError: {
    backgroundColor: lightColors.red01,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: lightColors.Ask1,
    paddingLeft: 10,
    paddingRight: 17,
  },

  //
  paddingBottomText: {
    paddingBottom: 12,
  },
  textLimit: {
    color: lightColors.LIGHTTextDisable,
    fontSize: 12,
    lineHeight: 16,
    marginRight: -8,
  },
  wlNameText: {
    color: lightColors.LIGHTTextTitle,
    marginBottom: 5,
    fontSize: 14,
  },
  executeFormButtonTextDisable: {
    fontSize: 16,
    fontWeight: 'bold',
    color: lightColors.LIGHTTextDisable,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  iconContainer: {
    paddingHorizontal: 30,
    marginRight: -16,
    paddingVertical: 12,
  },
  watchlistNameText: {
    ...globalStyles.container,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: lightColors.LIGHTTextContent,
  },
  removeIconContainer: {
    ...globalStyles.centered,
    marginRight: 4,
    paddingLeft: 4,
    paddingRight: 8,
    paddingVertical: 12,
  },
  emptyIconContainer: {
    ...globalStyles.centered,
    marginRight: 4,
    paddingLeft: 4,
    paddingRight: 8,
    paddingVertical: 12,
    opacity: 0,
  },
  editIconContainer: {
    ...globalStyles.centered,
    height: 50,
    padding: 16,
  },
  defaultWatchlistNote: {
    paddingHorizontal: 16,
    paddingTop: 8,
    borderBottomColor: lightColors.BORDER,
    borderBottomWidth: 1,
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
  },
  radioContainer: {
    padding: 8,
  },
});
