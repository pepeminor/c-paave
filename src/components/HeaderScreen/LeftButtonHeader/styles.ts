import { scaleSize } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  headerHeightIOS: {
    height: scaleSize(100),
  },
  headerHeightAndroid: {
    height: scaleSize(60),
  },
  blankSpace: {
    height: scaleSize(24),
    width: scaleSize(24),
    opacity: 0,
  },
});
