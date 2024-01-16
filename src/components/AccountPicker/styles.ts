import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 18,
  },
  accountTypeContainer: {
    _backgroundColor: Colors.WHITE,
    borderRadius: 5,
  },
  backgroundWhite: {
    backgroundColor: Colors.WHITE,
  },
  backgroundBlack: {
    backgroundColor: Colors.BLACK,
  },
  accountType: {
    paddingHorizontal: 7,
    paddingVertical: 1,
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.BlueNewColor,
  },
  account: {
    marginHorizontal: 3,
    _color: Colors.WHITE,
    fontSize: 12,
    width: 118,
    textAlign: 'center',
  },
  colorWhite: {
    color: Colors.WHITE,
  },
  colorDark: {
    color: Colors.BLACK,
  },
  accountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
