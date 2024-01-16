import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  newsEachItemContainer: {
    height: 96,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  newsEachItemImageContainer: {
    width: 114,
    marginRight: 15,
  },
  newsEachItemContentTitleText: {
    fontWeight: 'bold',
    color: Colors.LIGHTTextBigTitle,
    fontSize: 14,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  newsEachItemContentTimeContainer: {
    marginTop: 8,
  },
  newsEachItemContentTimeText: {
    fontSize: 12,
    color: Colors.LIGHTTextDisable,
    marginLeft: 8,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
  },
});
