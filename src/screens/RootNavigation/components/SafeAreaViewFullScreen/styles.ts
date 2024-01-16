import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  fullScreen: {
    width: '100%',
    height: '100%',
    zIndex: -1000,
    backgroundColor: Colors.Transparent,
    position: 'absolute',
  },
});
