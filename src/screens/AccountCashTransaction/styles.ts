import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    backgroundColor: Colors.WHITE,
    flex: 1,
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
