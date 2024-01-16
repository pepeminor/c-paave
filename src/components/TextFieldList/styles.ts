import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  textFiled: {
    width: 195,
    height: 36,
    marginLeft: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.LIGHTBackground,
    backgroundColor: Colors.LIGHTTitleTable,
    justifyContent: 'space-between',
  },
  filedText: {
    color: Colors.BLACK,
    fontSize: 14,
    fontWeight: '400',
    marginStart: 10,
  },
  IconDownStyle: {
    alignItems: 'flex-end',
    marginRight: 10,
  },
});
