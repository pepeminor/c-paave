import globalStyles, { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
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
  line: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.BORDER,
  },
  titleHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.LIGHTText,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: 18,
  },
  valueText: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.LIGHTTextContent,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: 18,
  },
  pt13: {
    paddingTop: 13,
  },
  pdh16: {
    paddingHorizontal: 16,
  },
  sheetContainer: {
    paddingBottom: 45,
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
  valueTextTable1: {
    fontSize: 14,
    color: Colors.LIGHTTextContent,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    textAlign: 'left',
    lineHeight: 20,
  },
  widthValue1: {
    width: 193,
  },
  widthValue2: {
    width: 96,
  },
  widthValue3: {
    width: 120,
  },
  widthValue4: {
    width: 96,
  },
  widthValue5: {
    width: 250,
  },
  widthValue6: {
    width: 50,
  },
  boderRightTable: {
    borderRightColor: Colors.BORDER,
    borderRightWidth: 1,
  },
  borderTable2: {
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
    width: '100%',
  },
  footerContainer: {
    ...globalStyles.flexDirectionRow,
    ...globalStyles.alignCenter,
    ...globalStyles.justifySpaceBetween,
    paddingVertical: 16,
  },
  lineShadow: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.BORDER,
    shadowColor: Colors.BLACK,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation: 2,
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
  pdHorizontal8: {
    paddingHorizontal: 8,
  },
});
