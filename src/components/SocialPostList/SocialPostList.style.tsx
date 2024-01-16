import { lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    backgroundColor: lightColors.WHITE,
  },
  scrollToTopBtn: {
    bottom: 50,
    right: 17,
  },
  seeNewPost: {
    top: 50,
    right: 17,
  },
});
