import { lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
  },
  headerIconLeft: {
    paddingVertical: 4,
    paddingHorizontal: 4,
  },

  bannerContainer: {
    height: 126,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
