import { getStylesHook } from 'hooks/useStyles';
import { lightColors as Colors } from 'styles';

export default getStylesHook({
  container: {
    width: 71,
    height: 30,
    borderRadius: 30,
    backgroundColor: Colors.BLACK,
  },
  animatedContainer: {
    flex: 1,
    width: 78,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.WHITE,
  },
});
