import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  boxTradingReal: {
    marginTop: 15,
    marginLeft: 16,
    height: 80,
    width: 164,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.88,
    elevation: 5,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
  },
});
