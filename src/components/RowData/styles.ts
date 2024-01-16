import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 15,
  },
  title: {
    color: Colors.LIGHTTextBigTitle,
    fontSize: 14,
  },
  iconContainer: {
    alignItems: 'flex-end',
  },
  icon: {
    height: 24,
    width: 24,
  },
});
