import globalStyles, { lightColors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    justifyContent: 'flex-end',
  },
  title: {
    ...textStyles.fontSize20,
    ...textStyles.roboto700,
    color: lightColors.BLACK,
    paddingLeft: 16,
  },
  containerVNIndex: {
    ...globalStyles.flexDirectionRow,
    height: 44,
  },
  buttonLineChart: {
    ...globalStyles.centered,
    marginRight: 10,
    width: 34,
    height: 34,
    borderRadius: 6,
    backgroundColor: lightColors.LIGHTBGTab,
  },
  buttonLineChartSelected: {
    ...globalStyles.centered,
    marginRight: 10,
    width: 34,
    height: 34,
    borderRadius: 6,
    backgroundColor: lightColors.BlueNewColor,
  },
  containerTypeChart: {
    ...globalStyles.flexDirectionRow,
    ...globalStyles.container,
    ...globalStyles.justifyEnd,
    marginRight: 10,
  },
});
