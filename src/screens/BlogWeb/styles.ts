import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  loadingTextStyle: {
    paddingVertical: 32,
    color: Colors.BLACK,
    fontFamily: 'Roboto',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '700',
  },
  loadingTextStyle1: {
    color: Colors.Blue1,
    fontFamily: 'Roboto',
    fontSize: 16,
    textAlign: 'center',
  },
  dummyBlock: {
    height: 128,
    width: 128,
  },
});
