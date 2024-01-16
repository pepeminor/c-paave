import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  textInfo: {
    width: 220,
    alignItems: 'flex-end',
  },
  valueAccount: {
    fontWeight: '400',
    fontSize: 14,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.LIGHTTextContent,
    alignItems: 'flex-end',
    lineHeight: 18,
  },
  editContainerAccount: {
    marginLeft: 14,
    height: 20,
    width: 20,
  },
  editIcon: {
    height: 16,
    width: 16,
  },
});
