import { getStylesHook } from 'hooks/useStyles';
import { Platform } from 'react-native';
import globalStyles, { Colors } from 'styles';

const BLOCK_SIZE = 50;

export default getStylesHook({
  container: {
    ...globalStyles.container,
    paddingHorizontal: 8,
  },

  noteContainer: {
    marginBottom: 10,
  },

  block: {
    width: BLOCK_SIZE,
    height: BLOCK_SIZE,
    marginRight: 10,
    borderRadius: 3,
  },

  buyBlock: {
    backgroundColor: Colors.LIGHTButtonGreen,
  },

  sellBlock: {
    backgroundColor: Colors.LIGHTButtonRed,
  },

  unknownBlock: {
    backgroundColor: Colors.DARKTextDisable,
  },

  chartContainer: {
    ...globalStyles.container,
  },

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
});
