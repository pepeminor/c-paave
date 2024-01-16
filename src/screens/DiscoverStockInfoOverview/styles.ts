import { Platform } from 'react-native';
import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingBottom: 8,
  },
  discoverStockContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.WHITE,
  },
  touchableOpacityContainer: {
    flex: 1,
    height: '100%',
  },
  stockInfoContainer2: {
    height: 86,
  },
  stockInfo: {
    marginBottom: 8,
    borderRadius: 13,
  },
  stockChart: {
    height: 252,
    paddingHorizontal: 8,
  },
  stockCodeText: {
    fontWeight: '700',
    fontSize: 18,
    color: Colors.WHITE,
  },
  marketTexT: {
    fontWeight: '700',
    fontSize: 12,
    color: Colors.WHITE,
  },
  grayLine: {
    width: '100%',
    height: 8,
    backgroundColor: Colors.BORDER,
  },
  title: {
    flex: 1,
    fontWeight: '700',
    paddingHorizontal: 16,
    fontSize: 18,
  },
  seeMore: {
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
  },
  investorSeeAllText: {
    color: Colors.BlueNewColor,
    fontSize: 14,
    lineHeight: 18,
    marginRight: 8,
  },
  avatar: {
    height: 100,
  },
  stockInfoContainer: {
    height: 143,
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.WHITE,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 11,
    borderRadius: 10,
    flex: 1,
  },
  buttonSell: {
    marginRight: 10,
    backgroundColor: Colors.LIGHTButtonRed,
  },
  buttonBuy: {
    backgroundColor: Colors.DARKButtonGreen,
  },
  buttonDisable: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.WHITE,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
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
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.BlueNewColor,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  cancelContainer: {
    right: 0,
  },
  cancelText: {
    fontSize: 16,
    color: Colors.LIGHTRed,
    marginRight: 16,
  },
  listWatchListContainer: {
    height: 400,
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
    fontWeight: 'bold',
    color: Colors.WHITE,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  executeFormButtonTextDisable: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.LIGHTTextDisable,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  executeFormButton2: {
    backgroundColor: Colors.LIGHTBackground,
    width: '100%',
    height: 44,
    borderRadius: 10,
  },
  executeFormButtonText2: {
    fontSize: 16,
    color: Colors.BlueNewColor,
    marginLeft: 10,
  },
  IConQuestion: {
    marginLeft: 3,
  },
  rowDataTextBranch: {
    fontWeight: 'bold',
    fontSize: 14,
    color: Colors.LIGHTTextBigTitle,
    width: 343,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  rowData: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  rowDataTextAdd: {
    fontWeight: '400',
    fontSize: 12,
    color: Colors.LIGHTTextContent,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  listOverviewContainer: {
    height: 600,
  },
  iconClose: {
    marginRight: 16,
  },
  filterTextOver: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.BlueNewColor,
    marginLeft: 16,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  // modal create watchlist
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
    fontWeight: 'bold',
    color: Colors.BlueNewColor,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
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
    paddingRight: 10,
  },
  textInputStyle: {
    height: 44,
    width: 260,
    fontSize: 14,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
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
  marginBottom15: {
    marginBottom: 15,
  },
  marginPrice: {
    marginTop: 60,
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

  symbolTagContainer: {
    flex: 1,
    padding: 0,
  },
  leftIcon: {
    marginLeft: 8,
  },
  middleContainer: {
    flexDirection: 'column',
    paddingLeft: 8,
    paddingTop: 8,
    flex: 1,
  },
  infoContainer: {
    // width: (2),
    width: '100%',
    paddingRight: 15,
    height: 18 * 2,
    justifyContent: 'center',
  },
  stockName: {
    color: Colors.LIGHTTextBigTitle,
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 15,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: 18,
    width: 218,
  },
  priceContainer: {
    flexDirection: 'row',
  },
  closePrice: {
    fontSize: 26,
    fontWeight: '400',
    paddingRight: 15,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontStyle: 'normal',
  },
  rateChange: {
    fontSize: 14,
    fontWeight: '400',
    // paddingLeft: (5),
    paddingTop: Platform.OS === 'android' ? -3 : 0,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontStyle: 'normal',
  },
  changeGapPrice: {
    fontSize: 14,
    fontWeight: '400',
    paddingRight: 5,
    paddingTop: Platform.OS === 'android' ? -3 : 0,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontStyle: 'normal',
  },

  // chart candle section
  chartContainer: {
    height: 206,
  },
  chartFilter: {
    height: 44,
    flexDirection: 'row',
    paddingHorizontal: 5.5,
    paddingVertical: 8,
  },
  filterButton: {
    flex: 1,
    height: 28,
    marginRight: 5,
    backgroundColor: Colors.LIGHTBGTab,
    borderRadius: 6,
  },
  buttonTextFilter: {
    fontSize: 12,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  marginRight0: {
    marginRight: 0,
  },
  activeItem: {
    backgroundColor: Colors.BlueNewColor,
  },
  textWhite: {
    color: Colors.WHITE,
  },
  logoContainer: {
    borderRadius: 99,
  },
  scoreContainer: {
    height: 26,
    width: 42,
    borderWidth: 2,
    borderColor: Colors.LIGHTButtonRed,
    borderRadius: 8,
    marginRight: 6,
  },
  score: {
    color: Colors.LIGHTButtonRed,
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  scoreContainerPlaceHolder: {
    height: 26,
    width: 55,
    borderRadius: 8,
  },
  askScoreIcon: {
    alignSelf: 'flex-start',
    marginTop: 3,
  },
  marginRight12: {
    marginRight: 12,
  },
  paddingTop10: {
    paddingTop: 10,
  },
  paddingRight12: {
    paddingRight: 12,
  },
  marginTop4: {
    marginTop: -4,
  },

  btnDisable: {
    opacity: 0.5,
  },
  btnEnable: {
    opacity: 1,
  },
  labelTextWatchlist: {
    fontSize: 14,
    color: Colors.LIGHTTextContent,
    textAlign: 'left',
    width: 265,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  textPrice: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 12,
    color: Colors.LIGHTTextTitle,
  },
  price4: {
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Medium',
    fontStyle: 'normal',
    fontWeight: '700',
    marginLeft: 5,
    lineHeight: 14,
  },
  cText: {
    color: Colors.LIGHTPurple,
  },
  fText: {
    color: Colors.LIGHTTeal,
  },
  rText: {
    color: Colors.LIGHTYellow,
  },
  paddingBottom13: {
    paddingBottom: 13,
  },
  paddingHorizontal8: {
    paddingHorizontal: 4,
  },
  tabSelectorContainer: {
    marginTop: 8,
    marginBottom: 4,
    paddingHorizontal: -4,
    marginHorizontal: 0,
    borderRadius: 12,
  },
  unselectedText: {
    fontWeight: '700',
  },
  tabUnselectedItem: {
    paddingVertical: 8,
    marginHorizontal: 4,
    paddingHorizontal: 4,
  },
});
