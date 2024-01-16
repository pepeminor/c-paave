import { lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
  },
  containerItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomColor: lightColors.BORDER,
    borderBottomWidth: 1,
  },
});
