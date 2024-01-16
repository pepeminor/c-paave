import globalStyles, { lightColors as Colors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';
import { Platform } from 'react-native';

export default getStylesHook({
  container: {
    ...globalStyles.flexDirectionRow,
    ...globalStyles.alignCenter,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  leftContainer: {
    flex: 1.25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    paddingVertical: 3,
  },
  leftContainerWithChart: {
    flex: 0.6,
  },
  middleContainer: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  containerInfoSymbol: {
    flex: 1,
    marginLeft: 4,
  },
  containerTradingVolume: { flex: 2, justifyContent: 'center', alignItems: 'flex-end' },
  containerTradingVolume2: { width: 100, justifyContent: 'center', alignItems: 'flex-end', paddingRight: 8 },
  containerForeignTradingVolume: { flex: 2, flexDirection: 'row' },
  priceContainer: {
    flex: 1,
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 1 : 3,
  },
  skeletonLayout: {
    width: 65,
    height: 20,
  },
  textSymbolNoAvailable: {
    fontSize: 12,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 12,
    fontFamily: 'Roboto',
    color: Colors.WHITE,
  },
  widthTextSymbolNoAvailable: {
    width: 200,
  },
  chartStyle: {
    height: 40,
    width: 70,
    padding: 0,
  },
  chart: {
    flex: 1,
    alignItems: 'center',
    marginLeft: 10,
  },
  tradingContainer: {
    height: '100%',
    paddingVertical: 5,
    justifyContent: 'space-between',
  },
  textTradingVolume: {
    ...textStyles.fontSize12,
    ...textStyles.dinOt500,
    textAlign: 'right',
    paddingRight: 5,
    color: Colors.BLACK,
    width: 100,
  },
  textTradingValue: {
    ...textStyles.fontSize12,
    ...textStyles.dinOt400,
    textAlign: 'right',
    paddingRight: 5,
    color: Colors.BLACK,
    width: 100,
  },
  logoCode: {
    ...globalStyles.overflowHidden,
    borderRadius: 99,
  },
  priceText: {
    textAlign: 'right',
    alignContent: 'flex-end',
    ...textStyles.dinOt400,
    marginTop: Platform.OS === 'ios' ? 3 : -4,
  },
  priceTextBold: {
    flex: 1,
    textAlign: 'right',
    ...textStyles.dinOt400,
    fontWeight: 'bold',
  },
  stockCode: {
    color: Colors.LIGHTTextBigTitle,
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  stockName: {
    color: Colors.LIGHTTextDisable,
    fontSize: 10,
  },
  number: {
    ...textStyles.dinOt400,
  },

  // tooltip
  tooltipContainer: {
    marginTop: 2,
  },
  tooltip: {
    backgroundColor: Colors.BlueNewColor,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 13,
    marginLeft: 10,
  },
  tooltipContent: {
    color: Colors.WHITE,
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: 16,
    textAlign: 'left',
  },
  spaceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
});
