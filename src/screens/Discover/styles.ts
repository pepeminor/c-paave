import { Platform } from 'react-native';
import { lightColors as Colors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  containerHeader: {
    flex: 1,
  },
  containerHeaderTabMarket: {
    height: 635,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  tabContentStyle: {
    width: '100%',
  },
  indicesText: {
    marginLeft: 16,
    color: Colors.LIGHTTextBigTitle,
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  indexItemRate1: {
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  signInButton: {
    height: 44,
    backgroundColor: Colors.BlueNewColor,
    borderRadius: 10,
  },
  signInText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  watchListNonLoginContainer: {
    height: 126,
    paddingVertical: 16,
  },
  requireSignInText: {
    color: Colors.LIGHTTextBigTitle,
    fontSize: 14,
    marginBottom: 8,
    alignSelf: 'center',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  watchListNonLoginContainer2: {
    marginHorizontal: 16,
    height: 44,
    backgroundColor: Colors.BlueNewColor,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbolHeaderChartStyle: {
    height: 56,
    width: 120,
    padding: 0,
  },
  symbolheaderChartName: {
    height: 24,
    width: 54,
  },
  textInputStyle: {
    fontSize: 16,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  indexItemPrice2: {
    ...textStyles.fontSize12,
    ...textStyles.dinOt400,
  },
  indexItemPrice3: {
    opacity: 0.5,
    fontSize: 24,
    marginBottom: 1,
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Medium',
    fontStyle: 'normal',
  },
  indexChartListEachItem: {
    width: 136,
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 8,
    paddingLeft: 12,
    overflow: 'hidden',

    borderColor: Colors.BORDER,
    borderWidth: 1,
  },
  shadow: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,

    elevation: 5,
    backgroundColor: Colors.WHITE,
  },
  listIndexChartContainer: {
    backgroundColor: Colors.WHITE,
  },
  border: {
    borderBottomColor: Colors.BORDER2,
    borderBottomWidth: 5,
  },
  border1: {
    borderTopColor: Colors.BORDER,
    borderTopWidth: 1,
  },
  itemIndexStyle: {
    paddingVertical: 4,
  },
  indexItemName: {
    color: Colors.BLACK,
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    paddingTop: 8,
  },
  indexChartItemContainer: {
    height: 60,
    marginTop: 10,
    marginBottom: 15,
  },
  indexItemPrice1: {
    fontSize: 24,
    marginBottom: 1,
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Medium',
    fontStyle: 'normal',
  },
  indexRateArea: {
    marginBottom: 10,
  },
  middleArrow: {
    marginHorizontal: 7,
  },
  watchListWholeContainer: {
    paddingTop: 8,
  },
  watchListOptionPicker: {
    flexDirection: 'row',
    height: 56,
    paddingLeft: 16,
    paddingRight: 20,
    alignItems: 'center',
  },
  newsOptionPicker: {
    height: 44,
    paddingLeft: 16,
    paddingRight: 20,
  },
  watchListText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.LIGHTTextBigTitle,
    width: 90,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  arrowIconContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginLeft: 24,
    flex: 1,
  },
  arrowTouchContainer: {
    height: 24,
    width: 24,
  },
  arrowIconContainer2: {
    justifyContent: 'flex-end',
  },
  watchNoListContainer: {
    paddingTop: 24,
    paddingBottom: 32,
  },
  noWLText: {
    fontSize: 14,
    color: Colors.LIGHTTextBigTitle,
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  executeFormButton: {
    backgroundColor: Colors.BlueNewColor,
    marginHorizontal: 16,
    height: 44,
    borderRadius: 10,
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
  executeFormButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    _color: Colors.WHITE,
    marginLeft: 10,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
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
  modalTitle: {
    height: 56,
    marginTop: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  modalTitleText: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
    color: Colors.BlueNewColor,
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
  wholeContainerStyle: {
    marginBottom: 17,
  },
  marginBottom: {
    marginBottom: 10,
  },
  readMoreNewsText: {
    fontWeight: '700',
    color: Colors.BlueNewColor,
    marginRight: 9,
    fontSize: 14,
  },
  newsEachItemContainer: {
    height: 96,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  newsEachItemImageContainer: {
    width: 114,
    marginRight: 15,
  },
  newsEachItemContentTitleText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.LIGHTTextBigTitle,
  },
  newsEachItemContentTimeContainer: {
    marginTop: 8,
  },
  newsEachItemContentTimeText: {
    fontSize: 12,
    color: Colors.LIGHTTextDisable,
    marginLeft: 8,
  },
  hotStockTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 20,
    height: 44,
  },
  hotStockText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.LIGHTTextBigTitle,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  hotSeeAllStockContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  hotSeeAllStockText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.BlueNewColor,
    marginRight: 10,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  screenOption: {
    height: 44,
    borderRadius: 10,
    paddingHorizontal: 3,
    paddingVertical: 3,
    marginBottom: 8,
  },
  marginTopAndroid: {
    marginTop: -10,
  },
  marginTopIos: {
    marginTop: -16,
  },
  marginTopOptionAndroid: {
    marginTop: -10,
  },
  marginTopOptionios: {
    marginTop: -16,
  },
  paddingHorizontal10: {
    paddingHorizontal: 10,
  },
  backgroundScreenOption: {
    backgroundColor: Colors.LIGHTBGTab,
  },
  optionContainerSelected: {
    backgroundColor: Colors.WHITE,
  },
  optionContainerSelected1: {
    borderBottomColor: Colors.BlueNewColor,
    borderBottomWidth: 4,
  },
  optionContainer: {
    borderRadius: 10,
  },
  selectedText: {
    fontWeight: 'bold',
    color: Colors.BlueNewColor,
    fontSize: 14,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  selectedDateText: {
    color: Colors.WHITE,
    fontSize: 14,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
  },

  unselectedText: {
    color: Colors.LIGHTTextTitle,
    fontSize: 14,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  hotStockItemContainer: {
    height: 54,
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
    paddingHorizontal: 8,
  },
  popularThemeItemContainer: {
    height: 40,
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
    paddingHorizontal: 16,
  },
  hotStockImageItemContainer: {
    height: 35,
    width: 35,
    marginTop: 4,
    marginRight: 3.5,
  },
  hotStocknameItemContainer: {
    paddingTop: 5,
    width: 118,
  },
  hotStockInfoContainer: {
    alignItems: 'flex-end',
  },
  hotStockInfoContainer2: {
    width: 100,
    alignItems: 'flex-end',
  },
  hotStockStockCodeText: {
    color: Colors.LIGHTTextBigTitle,
    fontWeight: '700',
    fontSize: 14,
  },
  hotStockFullNameContainer: {
    justifyContent: 'flex-end',
    paddingBottom: 5,
  },
  hotStockFullNameText: {
    fontSize: 10,
    color: Colors.LIGHTTextDisable,
  },
  hotStockInfoPrice3: {
    fontSize: 16,
    color: Colors.LIGHTTextContent,
  },
  hotStockInfoPrice1: {
    fontSize: 16,
    color: Colors.DARK_GREEN,
  },
  hotStockInfoPrice2: {
    color: Colors.DARK_GREEN,
    fontSize: 14,
  },
  iconStyle: {
    marginHorizontal: 5,
  },
  popularThemeWholeContainer: {
    height: 340,
    paddingBottom: 24,
    paddingTop: 8,
  },
  popularThemeNumberContainer: {
    backgroundColor: Colors.LIGHTBackground,
    width: 24,
    height: 24,
    borderRadius: 15,
    marginRight: 21,
  },
  popularThemeNumberText: {
    color: Colors.LIGHTTextTitle,
    fontSize: 14,
  },
  popularThemeIconContainer: {
    width: 20,
    height: 20,
    marginRight: 13,
  },
  popularThemeNameText: {
    fontWeight: 'bold',
    color: Colors.LIGHTTextBigTitle,
    fontSize: 14,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  popularThemeRateText: {
    fontSize: 16,
    marginLeft: 16,
  },
  textFiled: {
    width: 195,
    height: 36,
    marginLeft: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.LIGHTBackground,
    backgroundColor: Colors.LIGHTTitleTable,
  },
  filedText: {
    fontSize: 14,
    fontWeight: '400',
    marginStart: 10,
    width: 125,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  IconDownStyle: {
    marginRight: 16,
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
  filterTextValue: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
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
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
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
    fontFamily: 'Roboto',
    fontStyle: 'normal',
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
    height: 267,
    borderRadius: 21,
    width: 343,
  },
  quantity: {
    fontSize: 16,
    color: Colors.LIGHTTextContent,
    width: 40,
    textAlign: 'right',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  marginLeft14: {
    marginLeft: 14,
  },

  // symbolTag component style
  symbolTagContainer: {
    width: 375,
    height: 50,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  leftIcon: {
    width: 32,
  },
  middleContainer: {
    flex: 1,
    height: 44,
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  middleContainer2: {
    height: 44,
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  infoContainer: {
    width: 122,
    justifyContent: 'center',
  },
  infoContainer1: {
    width: 129,
    justifyContent: 'center',
  },
  stockCode: {
    color: Colors.LIGHTTextBigTitle,
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    marginTop: -5,
    paddingBottom: 5,
  },
  stockName: {
    color: Colors.LIGHTTextDisable,
    fontSize: 10,
  },
  priceContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  priceContainer1: {
    width: 100,
    alignItems: 'flex-end',
    justifyContent: 'center',
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  priceContainer2: {
    width: 70,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 120,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  priceContainer3: {
    width: 50,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 30,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  closePrice: {
    fontSize: 16,
    fontWeight: '500',
    paddingBottom: 3,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Medium',
    fontStyle: 'normal',
  },
  rateChange: {
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Medium',
    fontStyle: 'normal',
    fontWeight: '500',
  },
  changeGapPrice: {
    fontSize: 14,
    fontWeight: '500',
    width: 45,
    textAlign: 'right',
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Medium',
    fontStyle: 'normal',
  },
  rateChange1: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontStyle: 'normal',
    paddingTop: Platform.OS === 'ios' ? 2 : 0,
  },
  changeGapPrice1: {
    fontSize: 12,
    fontWeight: '400',
    width: 45,
    textAlign: 'right',
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontStyle: 'normal',
    paddingTop: Platform.OS === 'ios' ? 2 : 0,
  },
  lineChart: {
    width: 60,
    height: 44,
  },
  deleteContainer: {
    backgroundColor: Colors.LIGHTButtonRed,
    width: 65,
  },

  // Hot Stock
  optionButtonContainer: {
    height: 50,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginLeft: -10,
    width: 230,
  },
  optionDateSelected: {
    backgroundColor: Colors.BlueNewColor,
  },
  containerValue: {
    width: 134,
    borderRadius: 10,
    height: 35,
    paddingHorizontal: 1,
    paddingVertical: 1,
    marginHorizontal: 8,
    marginTop: 8,
  },
  marginHorizontal2: {
    marginHorizontal: 2,
  },
  marginTop: {
    marginTop: -10,
  },
  paddingRight: {
    paddingRight: 6,
  },
  alignItemEnd: {
    alignItems: 'flex-end',
  },
  stockCode1: {
    marginLeft: 10,
    fontWeight: 'bold',
    color: Colors.LIGHTTextContent,
    fontSize: 14,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  quantity2: {
    fontSize: 14,
    color: Colors.LIGHTTextContent,
  },
  quantity1: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.LIGHTTextContent,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  quantity3: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  marginTop8: {
    marginTop: 8,
  },
  widthContainer: {
    width: 40,
    alignItems: 'flex-end',
    paddingRight: 3,
  },
  widthContainer2: {
    width: 50,
    alignItems: 'flex-end',
  },
  paddingTop: {
    paddingTop: 10,
  },
  paddingBottom: {
    paddingBottom: 10,
  },
  textRight: {
    textAlign: 'right',
    paddingRight: 5,
  },
  tableContainer: {
    flex: 1,
    marginTop: 16,
  },
  tableHeaderContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.LIGHTTitleTable,
  },
  tableHeaderText: {
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 18,
    color: Colors.LIGHTTextDisable,
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  tableHeaderText2: {
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 18,
    color: Colors.LIGHTTextDisable,
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  col1: {
    width: 172,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: Colors.LIGHTBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  col2: {
    width: 100,
    marginLeft: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: Colors.LIGHTBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  col3: {
    width: 100,
    marginLeft: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: Colors.LIGHTBackground,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
  },
  col3Cell: {
    width: '100%',
    paddingVertical: 5,
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
  },
  col2Cell: {
    width: '100%',
    paddingVertical: 5,
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
  },
  cellBorderLast: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: Colors.LIGHTBackground,
  },
  cellBorder: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: Colors.LIGHTBackground,
  },
  paddingTop8: {
    paddingTop: 8,
  },
  containerHotStock: {
    flex: 1,
    minHeight: 240,
  },
  textTotal: {
    color: Colors.BLACK,
    fontWeight: '500',
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Medium',
    fontStyle: 'normal',
    width: '100%',
  },
  closePrice1: {
    fontSize: 12,
    fontWeight: '500',
    paddingBottom: 3,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Medium',
  },
  marginLeft4: {
    marginLeft: 4,
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
  logoContainer: {
    borderRadius: 99,
  },
  alignItemStart: {
    alignItems: 'flex-start',
  },
  indexChartSkeleton: {
    height: 150,
  },
  marginBottom20: {
    marginBottom: 20,
  },

  skeC: {
    width: 30,
    height: 20,
    marginBottom: 4,
  },
  skeCh: {
    height: 30,
    marginRight: 4,
  },
  skeRa: {
    width: 30,
    height: 15,
  },

  // margin for modal Watchlist
  marginTop60: {
    marginTop: 60,
  },
  marginTop80: {
    marginTop: 80,
  },
  hotStockNote: {
    paddingHorizontal: 8,
    paddingBottom: 8,
    justifyContent: 'center',
  },
  hotStockNoteText: {
    fontSize: 12,
    color: Colors.LIGHTTextDisable,
    fontFamily: 'Roboto',
    fontStyle: 'italic',
    lineHeight: 18,
  },
  headerIconLeft: {
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  headerIconRight: {
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  smolBorder: {
    height: 5,
    width: '50%',
    borderRadius: 2,
    backgroundColor: Colors.BORDER,
  },
  indicesDeco: {
    height: '100%',
    width: 10,
    position: 'absolute',
    right: 0,
    opacity: 0.8,
  },
  seeAll: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.BlueNewColor,
    marginRight: 10,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  containerFieldList: {
    width: 140,
  },
  containerFooter: { minHeight: 500 },
});
