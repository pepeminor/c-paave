import { getStylesHook } from 'hooks/useStyles';
import { lightColors, textStyles } from 'styles';

export const useStyles = getStylesHook({
  legendsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendText: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
    paddingLeft: 16,
  },
  firstLegend: {
    backgroundColor: lightColors.DARK_GREEN,
    width: 24,
    height: 24,
    borderRadius: 4,
  },
  secondLegend: {
    backgroundColor: lightColors.LIGHTRed,
    width: 24,
    height: 24,
    borderRadius: 4,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    minHeight: 280,
  },
  stockName: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
    width: 40,
    textAlign: 'center',
  },
  buySellValue: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
    textAlign: 'center',
    paddingHorizontal: 4,
  },
  firstColumn: {
    flex: 1,
  },
  firstColumnRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 4,
  },
  secondColumn: {
    flex: 1,
  },
  secondColumnRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 4,
  },
});
