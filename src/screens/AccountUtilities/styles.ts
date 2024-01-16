import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  rowData: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 44,
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
  },
  rowDataText: {
    fontWeight: '700',
    fontSize: 14,
    color: Colors.LIGHTTextBigTitle,
  },
});