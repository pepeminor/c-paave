import { Platform } from 'react-native';
import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  wrap: {
    marginBottom: -8,
  },
  alignItemEnd: {
    alignItems: 'flex-end',
  },
  borderRight: {
    borderRightWidth: 1,
    borderRightColor: Colors.BORDER,
  },
  sheetDataHeaderBackground: {
    backgroundColor: Colors.LIGHTTitleTable,
  },
  headerTitleSingleStringText: {
    fontWeight: '700',
    fontSize: 12,
    color: Colors.LIGHTTextDisable,
  },
  stockCode: {
    marginLeft: 10,
    fontWeight: '700',
    color: Colors.LIGHTTextContent,
    fontSize: 14,
  },
  quantity: {
    fontSize: 14,
    color: Colors.LIGHTTextContent,
    fontWeight: '500',
  },
  quantity2: {
    fontSize: 14,
    color: Colors.LIGHTTextContent,
  },
  paddingRight: {
    paddingRight: 6,
  },
  marginRight: {
    marginRight: 30,
  },
  iconStyle: {
    marginRight: 6,
  },
  labelPlaceHolderContainer1: {
    height: 40,
    width: 106,
  },
  labelPlaceHolderContainer2: {
    height: 16,
    width: 80,
  },
  labelPlaceHolderContainer3: {
    height: 16,
    width: 80,
  },
  labelPlaceHolderContainer4: {
    height: 16,
    width: 110,
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
  btnSellSymbol: {
    backgroundColor: Colors.LIGHTButtonRed,
    height: 22,
    width: 40,
    paddingTop: 2,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: Colors.LIGHTButtonRed,
  },
  textSellSymbol: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.WHITE,
    textAlign: 'center',
  },
  marginRight20: {
    marginLeft: 20,
  },
  border1: {
    borderRightColor: Colors.BORDER,
    borderRightWidth: 1,
  },
  symbolCode: {
    color: Colors.LIGHTTextContent,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18,
    marginLeft: 10,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  textDate: {
    color: Colors.LIGHTTextContent,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    textAlign: 'center',
  },
  textPrice: {
    color: Colors.LIGHTTextContent,
    fontSize: 14,
    lineHeight: 18,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Medium',
    fontWeight: '500',
    fontStyle: 'normal',
  },
  textPrice1: {
    color: Colors.LIGHTTextContent,
    fontSize: 14,
    lineHeight: 18,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontWeight: '400',
    fontStyle: 'normal',
  },
  paddingRightS: {
    paddingRight: 6,
    alignItems: 'flex-end',
  },
  marginHorizontal6: {
    paddingVertical: 10,
  },
  loadingText: {
    textAlign: 'center',
    color: Colors.LIGHTTextDisable,
  },
  noDataCon: {
    width: 375,
    height: 162,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.LIGHTTextContent,
    textAlign: 'center',
  },
  sheetContainer: {
    maxHeight: 469,
    paddingBottom: 36,
  },
  dateTimeContainer: {
    marginTop: 8,
    marginBottom: 10,
  },
  fromDate: {
    marginHorizontal: 16,
  },
  toDate: {
    marginRight: 16,
  },
  logoContainer: {
    borderRadius: 99,
    marginLeft: 5,
  },
  col1: {
    width: 96,
    height: 40,
    paddingLeft: 3,
    paddingVertical: 4,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: Colors.BORDER,
  },
  col2: {
    width: 96,
    height: 40,
    paddingVertical: 4,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: Colors.BORDER,
  },
  col3: {
    width: 80,
    height: 40,
    paddingVertical: 4,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: Colors.BORDER,
  },
  col4: {
    width: 108,
    height: 40,
    paddingRight: 8,
    paddingVertical: 4,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: Colors.BORDER,
  },
  headerText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.LIGHTTextDisable,
    marginHorizontal: 15,
  },
  filterContainer: {
    height: 101,
  },
  fromDateContainer: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  toDateContainer: {
    paddingLeft: 8,
    paddingRight: 16,
  },
  searchInput: {
    marginHorizontal: 16,
    marginBottom: 11,
  },
});
