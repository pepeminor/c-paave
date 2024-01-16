import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  colorUp: {
    backgroundColor: Colors.DARK_GREEN,
  },
  leftItemStockCode: {
    paddingLeft: 5,
    paddingRight: 14,
  },
  stockCodeText: {
    fontWeight: '700',
    color: Colors.LIGHTTextContent,
    fontSize: 14,
  },
  stockCodeCompanyNameText: {
    fontSize: 12,
    color: Colors.LIGHTTextDisable,
    marginTop: 2,
  },
  alignItemEnd: {
    alignItems: 'flex-end',
  },
  paddingRight: {
    paddingRight: 11,
  },
  weight: {
    fontSize: 14,
    color: Colors.LIGHTTextContent,
  },
  weight2: {
    fontSize: 14,
  },
  border: {
    borderRightColor: Colors.BORDER,
    borderRightWidth: 1,
  },
});
