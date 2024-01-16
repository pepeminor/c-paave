import { getStylesHook } from 'hooks/useStyles';
import { lightColors } from 'styles';

export const useStyles = getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
  },
  contentContainer: {
    paddingBottom: 24,
  },
});
