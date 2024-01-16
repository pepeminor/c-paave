import { lightColors as Colors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';
import { Platform } from 'react-native';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingBottom: Platform.OS === 'ios' ? 128 : 64,
  },
  line: {
    borderTopColor: Colors.BORDER,
    borderTopWidth: 8,
  },
  filterContainer: {
    paddingVertical: 8,
  },
  fromDateContainer: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  toDateContainer: {
    paddingLeft: 8,
    paddingRight: 16,
  },
  noDataCon: {
    width: 375,
    height: 162,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontFamily: 'Roboto',
    marginTop: 16,
    fontSize: 16,
    color: Colors.LIGHTTextContent,
    textAlign: 'center',
  },
  loadingText: {
    textAlign: 'center',
    color: Colors.LIGHTTextDisable,
  },

  title: {
    ...textStyles.fontSize18,
    ...textStyles.roboto700,
    color: Colors.LIGHTTextBigTitle,
    paddingLeft: 16,
    paddingVertical: 8,
  },
  headerTextTable: {
    color: Colors.LIGHTTextDisable,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 16,
    textAlign: 'center',
  },
  borderTable: {
    height: '100%',
    width: 1,
    backgroundColor: Colors.BORDER,
  },
  valueTextTable: {
    fontSize: 14,
    color: Colors.LIGHTTextContent,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    textAlign: 'right',
    lineHeight: 20,
    paddingRight: 8,
  },
  widthValue1: {
    width: 153,
  },
  widthValue2: {
    width: 320,
  },
  widthValue3: {
    width: 76,
  },
  widthValue4: {
    width: 106,
  },
  widthValue5: {
    width: 96,
  },
  widthValue6: {
    width: 120,
  },
  boderRightTable: {
    borderRightColor: Colors.BORDER,
    borderRightWidth: 1,
  },
  sheetContainer: {
    paddingBottom: 45,
  },
  borderTable2: {
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
    width: '100%',
  },
  sumProfitLossContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    marginBottom: 14,
  },
  itemSumProfitLoss: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSumProfitLoss1: {
    color: Colors.LIGHTTextDisable,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  textSumProfitLoss2: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Medium',
    marginTop: 8,
  },
});
