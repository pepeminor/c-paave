import { getStylesHook } from 'hooks';
import { lightColors } from 'styles';

export const useStyles = getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.Transparent,
  },
  containerHeader: {
    backgroundColor: lightColors.Transparent,
  },
  containerBottom: {
    backgroundColor: lightColors.BLACK_65,
    paddingBottom: 96,
    paddingTop: 12,
  },
  textDescription: {
    paddingHorizontal: 16,
  },
});
