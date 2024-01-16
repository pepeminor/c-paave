import { Platform } from 'react-native';
import globalStyles, { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';
export default getStylesHook({
  container: {
    marginBottom: 16,
  },

  containerNoData: {
    ...globalStyles.justifyStart,
    ...globalStyles.alignCenter,
    height: 154,
  },

  quoteItemContainer: {
    ...globalStyles.flexDirectionRow,
    flex: 1,
    // paddingHorizontal: (10),
    height: 32,
  },

  quoteItemContainer2: {
    height: '16.67%',
    borderTopColor: Colors.BORDER,
    borderTopWidth: 1,
  },

  timePlaceHolderContainer: {
    height: 14,
    width: 30,
  },

  price1PlaceHolderContainer: {
    height: 14,
    width: 41,
  },

  timeText: {
    ...globalStyles.noData,
    ...globalStyles.textAlignLeft,
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Medium',
    fontStyle: 'normal',
    fontWeight: '500',
  },

  priceText: {
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Medium',
    fontStyle: 'normal',
    fontWeight: '500',
  },

  currentPrice: {
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Medium',
    fontStyle: 'normal',
    fontWeight: '500',
    ...globalStyles.textAlignRight,
  },

  mvQuantity: {
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Medium',
    fontStyle: 'normal',
    fontWeight: '500',
    ...globalStyles.noData,
    ...globalStyles.textAlignRight,
  },

  buySell: {
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Medium',
    fontStyle: 'normal',
    fontWeight: '500',
    textAlign: 'right',
  },

  noDataText: {
    marginTop: 8,
    fontSize: 12,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    color: Colors.LIGHTTextContent,
  },

  padding10: {
    paddingHorizontal: 10,
  },

  marginBottom16: {
    marginBottom: 16,
  },

  stackedBarChartContainer: {
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
    height: 100,
  },

  /* CONTAINER STYLE */
  evenlyContainer: {
    ...globalStyles.centered,
    ...globalStyles.container,
  },

  timeContainer: {
    ...globalStyles.centered,
    flex: 40,
  },

  currentPriceContainer: {
    ...globalStyles.centered,
    flex: 25,
  },

  mvContainer: {
    ...globalStyles.centered,
    flex: 35,
  },

  mbContainer: {
    ...globalStyles.centered,
    flex: 10,
  },
});
