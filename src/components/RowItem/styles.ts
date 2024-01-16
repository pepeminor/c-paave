import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  title: {
    fontFamily: 'Roboto',
    color: Colors.LIGHTTextTitle,
    fontSize: 14,
    lineHeight: 18,
  },
  value: {
    fontFamily: 'Roboto',
    fontSize: 14,
  },
});
