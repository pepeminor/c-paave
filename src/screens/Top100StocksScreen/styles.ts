import { getStylesHook } from 'hooks/useStyles';
import { lightColors } from 'styles';

export const useStyles = getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
    paddingBottom: 16,
  },
  selectorContainer: {
    flexDirection: 'row',
    marginHorizontal: 4,
    marginVertical: 16,
  },
});
