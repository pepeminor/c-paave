import { lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export const useStyles = getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
  },
  containerContent: {
    paddingBottom: 24,
    paddingTop: 4,
  },
  titleLatestNews: {
    marginTop: 16,
    marginLeft: 16,
  },
});
