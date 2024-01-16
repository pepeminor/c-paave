import globalStyles, { lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    height: 331,
    justifyContent: 'flex-end',
  },
  containerVNIndex: {
    ...globalStyles.flexDirectionRow,
    height: 44,
  },

  noChartDataContainer: {
    width: '100%',
    paddingBottom: 40,
    justifyContent: 'center',
    backgroundColor: lightColors.LIGHTTitleTable,
    alignItems: 'center',
  },
  noChartData: {
    width: 250,
    height: 76,
    marginTop: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noChartDataText: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    textAlign: 'center',
  },
  noChartDataTextBlue: {
    color: lightColors.BlueNewColor,
  },
  buttonLineChart: {
    ...globalStyles.centered,
    marginRight: 10,
    width: 34,
    height: 34,
    borderRadius: 6,
    backgroundColor: lightColors.LIGHTBGTab,
  },
  containerTypeChart: {
    ...globalStyles.flexDirectionRow,
    ...globalStyles.container,
    ...globalStyles.justifyEnd,
    marginRight: 10,
  },
  chartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartContainerEmpty: {
    height: 287,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
