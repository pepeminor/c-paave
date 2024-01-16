import globalStyles, { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  containerStockListLeader: {
    flex: 1,
  },
  // header
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
  chart: {
    height: 231,
    width: 375,
    left: 8,
  },

  rowData: {
    paddingHorizontal: 16,
    paddingVertical: 13,
    maxHeight: 44,
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
  },
  rowDataText: {
    fontWeight: '700',
    fontSize: 14,
    color: Colors.LIGHTTextBigTitle,
  },
  rowDataNumber: {
    fontWeight: '400',
    fontSize: 14,
    color: Colors.LIGHTTextContent,
    alignItems: 'flex-end',
  },

  // issue 727 nodata
  noDataCon: {
    width: 375,
    height: 162,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataHeight: {
    height: 60,
  },
  noDataText: {
    fontFamily: 'Roboto',
    marginTop: 16,
    fontSize: 16,
    color: Colors.LIGHTTextContent,
    textAlign: 'center',
  },
  pAOptionContainer: {
    flex: 1,
    height: 60,
    ...globalStyles.centered,
    zIndex: 2,
  },
  optionContainer: {
    borderRadius: 10,
    ...globalStyles.centered,
    ...globalStyles.container,
  },
  screenOption: {
    flexDirection: 'row',
    height: 44,
    backgroundColor: Colors.LIGHTBGTab,
    borderRadius: 10,
    paddingHorizontal: 3,
    paddingVertical: 3,
    marginVertical: 12,
    marginHorizontal: 16,
  },
  optionContainerSelected: {
    backgroundColor: Colors.WHITE,
  },
  selectedText: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.BlueNewColor,
  },
  unselectedText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.LIGHTTextTitle,
  },
  marginHorizontal6: {
    paddingVertical: 10,
  },
});
