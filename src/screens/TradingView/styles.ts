import { getStylesHook } from 'hooks/useStyles';
import { lightColors } from 'styles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
  },
  backButtonIos: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1000,
    bottom: 70,
    right: 20,
    borderRadius: 45 / 2,
    width: 45,
    height: 45,
    backgroundColor: 'gray',
  },
  backButtonAndroid: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1000,
    bottom: 70,
    right: 20,
    borderRadius: 45 / 2,
    width: 45,
    height: 45,
    backgroundColor: 'gray',
  },
});
