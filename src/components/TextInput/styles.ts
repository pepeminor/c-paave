import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  marginHorizontal: {
    marginHorizontal: 8,
  },
  errorContent: {
    color: Colors.LIGHTRed,
    fontSize: 12,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  defaultInputStyle: {
    color: Colors.BLACK,
  },
});
