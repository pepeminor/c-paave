import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

/* 
  (44),
  (16),
*/

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    justifyContent: 'center',
    height: 154,
  },
  containerTitle: {
    height: 38,
    marginHorizontal: 16,
  },
  containerContent: {
    height: 92,
    marginTop: 8,
    marginHorizontal: 16,
  },
  TextTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.LIGHTTextBigTitle,
  },
  ViewVideo: {
    width: 135,
    height: 76,
    backgroundColor: Colors.Ask,
  },
  TextContentVideo: {
    width: 198,
    fontSize: 14,
    fontWeight: '700',
    color: Colors.LIGHTTextBigTitle,
  },
});
