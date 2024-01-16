import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  titleVideo: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.LIGHTText,
  },
  lineHeightTitle: {
    lineHeight: 18,
  },
  textCalendar: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.LIGHTTextDisable,
  },
  paddingLeft8: {
    paddingLeft: 8,
  },
  sizeImage: {
    height: 76,
    width: 135,
  },
  marginVertical8: {
    marginVertical: 8,
  },
  sizeContent: {
    height: 63,
    width: 198,
  },
});
