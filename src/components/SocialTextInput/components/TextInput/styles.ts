import { lightColors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export const useStyles = getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 16,
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
  },
});
