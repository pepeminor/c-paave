import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  alignItemEnd: {
    alignItems: 'flex-end',
  },
  borderRight: {
    borderRightWidth: 1,
    borderRightColor: Colors.BORDER,
  },
  sheetDataHeaderBackground: {
    backgroundColor: Colors.LIGHTTitleTable,
  },
  headerTitleSingleStringText: {
    fontWeight: '700',
    fontSize: 12,
    color: Colors.LIGHTTextDisable,
    marginRight: 14,
  },
  stockCode: {
    marginLeft: 10,
    fontWeight: '700',
    color: Colors.LIGHTTextContent,
  },
  quantity: {
    fontWeight: '600',
    color: Colors.LIGHTTextContent,
  },
  paddingRight: {
    paddingRight: 6,
  },
});
