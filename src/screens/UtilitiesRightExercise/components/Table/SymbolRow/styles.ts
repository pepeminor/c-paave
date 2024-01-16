import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: Colors.BORDER2,
  },
  title: {
    color: Colors.LIGHTTextTitle,
    fontSize: 14,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  value: {
    color: Colors.LIGHTTextContent,
    fontSize: 14,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
  },
});
