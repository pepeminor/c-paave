import { lightColors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export const useStyles = getStylesHook({
  container: {
    backgroundColor: lightColors.WHITE,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  chartTitle: {
    ...textStyles.fontSize18,
    ...textStyles.roboto700,
    paddingLeft: 4,
    paddingVertical: 4,
  },
});
