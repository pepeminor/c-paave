import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  headerTitleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 18,
  },
  titleBorderContainer: {
    backgroundColor: Colors.WHITE,
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
    borderRadius: 5,
  },
  titleBorder: {
    paddingHorizontal: 7,
    paddingVertical: 1,
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.BlueNewColor,
  },
  smallTitle: {
    marginHorizontal: 3,
    color: Colors.WHITE,
    fontSize: 12,
    width: 118,
    textAlign: 'center',
  },
  rowData: {
    paddingHorizontal: 16,
    paddingVertical: 13,
    maxHeight: 44,
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
  },
  rowData1: {
    paddingHorizontal: 16,
    paddingVertical: 13,
    maxHeight: 44,
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
    borderTopColor: Colors.BORDER,
    borderTopWidth: 1,
  },
  rowDataNoBorder: {
    paddingHorizontal: 16,
    paddingVertical: 13,
    maxHeight: 44,
  },
  rowDataText: {
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 14,
    color: Colors.LIGHTTextBigTitle,
    lineHeight: 16,
  },
  rowDataNumber: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    color: Colors.LIGHTTextContent,
    alignItems: 'flex-end',
  },
  skeletonContainer: {
    width: 150,
    height: 20,
  },
  border: {
    width: '100%',
    height: 8,
    backgroundColor: Colors.LIGHTBackground,
    marginVertical: 8,
  },
  marginTop10: {
    marginTop: 10,
  },
  marginHorizontal8: {
    marginHorizontal: 8,
  },
  titleStyleHighlight: {
    fontSize: 16,
    lineHeight: 22,
    color: Colors.LIGHTTextTitle,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  titleContainer: {
    paddingRight: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  titleContainerExpand: {
    paddingRight: 16,
    paddingVertical: 10,
  },
  titleStyle: {
    fontSize: 14,
    lineHeight: 18,
    color: Colors.LIGHTText,
    fontWeight: '700',
  },
  borderTop: {
    borderTopWidth: 1,
  },
  borderBottom: {
    borderBottomWidth: 1,
  },
  tableContent1: {
    width: 142,
    height: 38,
    borderWidth: 1,
    borderColor: Colors.BORDER,
    borderTopWidth: 0,
    paddingLeft: 8,
  },
  tableContent2: {
    width: 116,
    height: 38,
    borderWidth: 1,
    borderColor: Colors.BORDER,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  tableContent3: {
    width: 232,
    height: 38,
  },
  tableText: {
    fontSize: 14,
    lineHeight: 18,
    color: Colors.LIGHTTextDisable,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
});
