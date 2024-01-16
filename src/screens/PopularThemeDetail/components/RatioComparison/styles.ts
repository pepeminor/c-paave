import { lightColors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export const useStyles = getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
  },
  noteContainer: {
    alignItems: 'center',
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendTextLine: {
    ...textStyles.fontSize12,
    ...textStyles.roboto400,
    color: lightColors.LIGHTRed,
  },
  legendText: {
    ...textStyles.fontSize12,
    ...textStyles.roboto400,
  },
  basedOnText: {
    ...textStyles.fontSize13,
    ...textStyles.roboto400,
    color: lightColors.LIGHTTextDisable,
    marginTop: 8,
    marginBottom: 8,
    marginHorizontal: 16,
  },
});
