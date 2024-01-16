import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  // issue fix bug 698
  textInputStyle: {
    height: 44,
    width: 260,
    fontSize: 14,
  },
  watchListWholeContainer: {
    backgroundColor: Colors.WHITE,
    paddingTop: 8,
    paddingBottom: 20,
  },
  watchListOptionPicker: {
    height: 56,
    paddingLeft: 16,
    paddingRight: 22,
  },
  symbolheaderChartStyle: {
    height: 30,
    width: 67,
    padding: 0,
  },
  chartSymbolHeaderPlaceHolderContainer: {
    width: 67,
    height: 30,
    marginLeft: 10,
  },
  watchListText: {
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 24,
    color: Colors.LIGHTTextBigTitle,
    width: 90,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  arrowIconContainer: {
    marginLeft: 12,
  },
  watchNoListContainer: {
    paddingTop: 16,
    marginHorizontal: 16,
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
    marginLeft: 10,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  cancelExecuteFormButton2: {
    backgroundColor: Colors.LIGHTBackground,
    height: 44,
    borderRadius: 10,
  },
  executeFormButtonText2: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.WHITE,
  },
  cancelExecuteFormButtonText2: {
    fontSize: 16,
    color: Colors.LIGHTTextContent,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  modalBackground: {
    paddingHorizontal: 16,
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: Colors.BACKGROUND_MODAL2,
  },
  modalContentContainer: {
    backgroundColor: Colors.WHITE,
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
  modalTitle: {
    height: 56,
    marginTop: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
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
    paddingRight: 10,
  },
  wholeContainerStyle: {
    marginBottom: 17,
  },
  marginBottom: {
    marginBottom: 10,
  },
  filterText: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 22,
    color: Colors.BlueNewColor,
    marginLeft: 16,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  filterItemContainer: {
    paddingHorizontal: 16,
    height: 54,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  filterTextValueSelected: {
    color: Colors.BlueNewColor,
  },
  filterTextValueUnselected: {
    color: Colors.LIGHTTextContent,
  },
  lightTextTitle: {
    color: Colors.LIGHTTextTitle,
  },
  filterTextValue: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  closeModalTextList: {
    marginRight: 16,
  },

  // position absolute text in TextInput
  textLimit: {
    color: Colors.LIGHTTextDisable,
    fontSize: 12,
    lineHeight: 16,
    marginRight: -8,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },

  // WatchList update
  createWatchListButtonContainer: {
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: 60,
    marginBottom: 8,
  },
  createWatchListButton: {
    backgroundColor: Colors.LIGHTBackground,
    paddingVertical: 11,
  },
  createWatchListButtonText: {
    color: Colors.BlueNewColor,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '400',
    textAlign: 'center',
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
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },

  // symbolTag component style
  symbolTagContainer: {
    width: 375,
    height: 54,
    // paddingHorizontal: (8),
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  leftIcon: {
    // width: (32),
  },
  middleContainer: {
    flex: 1,
    height: 44,
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  infoContainer: {
    width: 122,
    justifyContent: 'center',
  },
  stockCode: {
    color: Colors.LIGHTTextBigTitle,
    fontSize: 14,
    fontWeight: '700',
    paddingBottom: 3,
    marginLeft: 4,
  },
  stockName: {
    color: Colors.LIGHTTextDisable,
    fontSize: 10,
    marginLeft: 4,
  },
  priceContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  closePrice: {
    fontSize: 16,
    fontWeight: '500',
    paddingBottom: 3,
  },
  rateChange: {
    fontSize: 14,
    fontWeight: '500',
  },
  changeGapPrice: {
    fontSize: 14,
    fontWeight: '500',
    width: 45,
    textAlign: 'right',
  },
  lineChart: {
    width: 60,
    height: 44,
  },
  deleteContainer: {
    backgroundColor: Colors.LIGHTButtonRed,
    width: 65,
  },
  background: {
    backgroundColor: Colors.WHITE,
  },

  // bonus delete symbol modal
  doText2: {
    fontSize: 14,
    color: Colors.LIGHTTextTitle,
    marginBottom: 5,
  },
  paddingBottomText: {
    paddingBottom: 12,
  },
  modalBackgroundSymbol: {
    paddingHorizontal: 16,
  },
  modalContentContainerSymbol: {
    borderRadius: 21,
    width: 343,
  },
  modalTitleSymbol: {
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  executeFormButtonTextDisable: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.LIGHTTextDisable,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  chartContainer: {
    marginLeft: 40,
  },
  logoContainer: {
    borderRadius: 99,
  },

  // Layout Skeleton
  labelPlaceHolderContainer1: {
    height: 40,
    width: 135,
  },
  labelPlaceHolderContainer2: {
    height: 16,
    width: 100,
  },
  labelPlaceHolderContainer3: {
    height: 40,
    width: 60,
  },
  labelPlaceHolderContainer4: {
    height: 40,
    width: 60,
  },
  marginHorizontal: {
    marginHorizontal: 2,
  },
  borderSkeleton: {
    width: '100%',
    height: 1,
    marginTop: 6,
    color: Colors.BORDER,
  },
  marginTop8: {
    marginTop: 8,
  },

  // margin for modal Watchlist
  marginTop60: {
    marginTop: 60,
  },
  marginTop80: {
    marginTop: 80,
  },
});
