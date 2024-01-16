import { lightColors as Colors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  optionPerformanceContainer: {
    height: 56,
    paddingHorizontal: 10,
    paddingVertical: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  performanceText: {
    ...textStyles.fontSize18,
    ...textStyles.roboto700,
    color: Colors.LIGHTTextBigTitle,
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});
