import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  extendButtonArea: {
    height: 34,
    backgroundColor: Colors.LIGHTTitleTable,
  },
  extendText: {
    color: Colors.LIGHTTextBigTitle,
    marginRight: 12,
    fontSize: 14,
  },
  content: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
});
