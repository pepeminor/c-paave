import { getStylesHook } from 'hooks/useStyles';
import { Platform } from 'react-native';
import {} from 'styles';

export default getStylesHook({
  container: {
    flex: 1,
  },
  square: {
    position: 'absolute',
    top: '50%',
    right: 0,
    zIndex: 10,
  },
  imageContainer: {
    width: 110,
    height: 88,
  },
  btnClose: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? -5 : -10,
    right: Platform.OS === 'ios' ? -5 : -10,
    padding: 10,
    zIndex: 11,
  },
});
