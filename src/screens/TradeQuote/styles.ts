import { Platform } from 'react-native';
import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  bg: {
    backgroundColor: Colors.BLACK,
  },
  columnText: {
    width: 73,
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  colorUp: {
    color: Colors.DARK_GREEN,
  },
  boldText: {
    fontWeight: 'bold',
  },
  buyTextCode: {
    color: Colors.DARK_GREEN,
  },
  sellTextCode: {
    color: Colors.LIGHTRed,
  },
  stockContainer: {
    height: 54,
    marginTop: 8,
  },
  stockImage: {
    marginLeft: 15.47,
    width: 34.13,
    height: 34.13,
    backgroundColor: Colors.BlueNewColor,
  },
  eachItemPlaceholderContainer: {
    height: 30,
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
  },
  timePlaceholderContainer: {
    height: 18,
    width: 80,
  },
  pricePlaceholderContainer: {
    height: 18,
    width: 70,
  },
  stockInfo: {
    marginLeft: 3.4,
    width: 306,
    height: 38,
  },
  stockCode: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
  },
  stockName: {
    fontSize: 12,
    color: Colors.WHITE,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    paddingHorizontal: 40,
  },
  noDataContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataScroll: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noData: {
    width: 250,
    height: 76,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  noDataTextBlue: {
    color: Colors.BlueNewColor,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  noTransCon: {
    width: 375,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTransText: {
    color: Colors.LIGHTTextContent,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
  },
  noDataCon: {
    width: 375,
    height: 71,
  },
  headerCon: {
    flexDirection: 'row',
    width: 375,
    height: 42,
    backgroundColor: Colors.LIGHTTitleTable,
    borderLeftWidth: 1,
    borderLeftColor: Colors.BORDER,
  },
  cellCon: {
    width: 93,
    height: 42,
    borderRightWidth: 1,
    borderRightColor: Colors.BORDER,
    borderTopWidth: 1,
    borderTopColor: Colors.BORDER,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    color: Colors.LIGHTTextDisable,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 12,
  },
  borderRight: {
    borderRightWidth: 1,
    borderRightColor: Colors.BORDER,
  },
});
