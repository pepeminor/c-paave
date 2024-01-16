import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  marginDateContainer: {
    marginTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 8,
    borderColor: Colors.BORDER,
  },
  dateContainer: {
    marginHorizontal: 16,
  },
  marginRight16: {
    marginRight: 16,
  },
  tableContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableHeaderContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.LIGHTTitleTable,
  },
  cellBorder: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: Colors.LIGHTBackground,
  },
  cellBorderLast: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: Colors.LIGHTBackground,
  },
  tableHeaderText: {
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 18,
    color: Colors.LIGHTTextDisable,
    textAlign: 'center',
    paddingHorizontal: 5,
    paddingVertical: 13,
  },
  tableCellText: {
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    color: Colors.LIGHTTextContent,
    paddingHorizontal: 4,
    paddingVertical: 10,
  },
  row12: {
    width: 94,
  },
  row3: {
    width: 75,
  },
  row4: {
    width: 107,
  },
  tableRowContainer: {
    flexDirection: 'row',
    height: 38,
  },
  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
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
});
