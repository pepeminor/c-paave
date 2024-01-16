import globalStyles, { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';
import { Platform } from 'react-native';
export default getStylesHook({
  paddingVertical10: {
    paddingVertical: 10,
  },

  arrowRight: {
    paddingRight: 8,
  },

  seeAllText: {
    color: Colors.BlueNewColor,
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 8,
  },

  quoteTextContainer: {
    height: 32,
    paddingVertical: 5,
  },

  quoteText1: {
    fontWeight: 'bold',
    fontSize: 14,
    color: Colors.LIGHTTextBigTitle,
    paddingLeft: 8,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },

  quoteText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.LIGHTTextBigTitle,
    paddingLeft: 8,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },

  grayLine: {
    width: '100%',
    height: 8,
    backgroundColor: Colors.BORDER,
  },

  hotSeeAllStockText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.BlueNewColor,
    marginRight: 10,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },

  tickByTickText: {
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
    paddingVertical: 5,
  },

  quoteBlockContainer: {
    ...globalStyles.flexDirectionRow,
    marginTop: 8,
  },

  quoteContainer: {
    flex: 45, // %
  },

  volumeAnalysisContainer: {
    marginLeft: 10,
    flex: 55, // %
  },

  quoteListContainer: {
    ...globalStyles.flexDirectionRow,
    marginTop: 8,
  },

  /* CHART */
  rowContainer: {
    ...globalStyles.flexDirectionRow,
    ...globalStyles.justifyCenter,
    height: 32,
  },

  priceColumn: {
    ...globalStyles.justifyCenter,
    flex: 25, // %
  },

  stackedBarChartColumn: {
    ...globalStyles.justifyCenter,
    flex: 50, // %
  },

  PercentColumn: {
    ...globalStyles.justifyCenter,
    ...globalStyles.alignEnd,
    // alignItems: 'flex-end',
    flex: 25, // %
  },

  stackedBarChartContainer: {
    borderRadius: 5,
    height: 12,
  },

  textStyle: {
    ...globalStyles.noData,
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Medium',
    fontStyle: 'normal',
    fontWeight: '500',
  },

  marginTop0: {
    marginTop: 0,
  },
});
