import { lightColors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 5,
    paddingBottom: 8,
  },
  searchContainer: {
    marginHorizontal: 8,
  },
  performanceChartNote: {
    ...textStyles.fontSize12,
    ...textStyles.roboto700,
    color: lightColors.LIGHTTextTitle,
    textAlign: 'center',
    marginLeft: 54,
  },
});
