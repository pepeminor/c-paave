import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  columItem: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderWidth: 1,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderColor: Colors.BORDER2,
    height: 51,
    backgroundColor: Colors.WHITE,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
  },
});
