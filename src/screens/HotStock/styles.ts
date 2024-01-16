import { Platform } from 'react-native';
import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  cellBorder: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: Colors.LIGHTBackground,
  },
  row1: {
    width: 140,
    height: 53,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
  },
  row2: {
    width: 104,
    height: 26,
    fontWeight: 'bold',
    paddingRight: 4,
    marginBottom: 4,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  row21: {
    width: 104,
    paddingTop: -10,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
  },
  row3: {
    width: 67,
    height: 60,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
  },
  row4: {
    width: 65,
    height: 60,
    fontWeight: 'bold',
    marginTop: 8,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  cellBorderLast: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: Colors.LIGHTBackground,
  },
  tableHeaderContainer: {
    flexDirection: 'row',
    height: 53,
    backgroundColor: Colors.LIGHTTitleTable,
  },
  tableHeaderText: {
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 18,
    color: Colors.LIGHTTextDisable,
    textAlign: 'center',
    paddingHorizontal: 5,
    paddingVertical: 13,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  tableHeaderText2: {
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 18,
    color: Colors.LIGHTTextDisable,
    textAlign: 'center',
    paddingTop: 8,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  border: {
    borderTopColor: Colors.BORDER,
    borderTopWidth: 1,
  },
  paddingHorizontal10: {
    paddingHorizontal: 10,
  },
  paddingTop8: {
    paddingTop: 8,
  },
  hotStockHeader: {
    paddingVertical: 12,
  },
  hotStockNote: {
    paddingHorizontal: 8,
    justifyContent: 'center',
    marginBottom: Platform.OS === 'ios' ? 24 : 8,
    borderTopColor: Colors.BORDER,
    borderTopWidth: 1,
  },
  hotStockNoteText: {
    fontSize: 12,
    color: Colors.LIGHTTextDisable,
    fontFamily: 'Roboto',
    fontStyle: 'italic',
    lineHeight: 18,
    paddingHorizontal: 16,
  },
});
