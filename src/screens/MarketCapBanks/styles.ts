import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  colorUp: {
    color: Colors.DARK_GREEN,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  borderRight: {
    borderRightColor: Colors.BORDER,
    borderRightWidth: 1,
  },
  itemImage: {
    marginTop: 11,
    height: 32,
    width: 32,
    marginRight: 5,
    marginLeft: 8,
  },
  stockCodeText: {
    fontWeight: '700',
    color: Colors.LIGHTTextBigTitle,
    fontSize: 14,
  },
  fullNameText: {
    marginTop: 3,
    marginRight: 8,
    fontSize: 10,
    color: Colors.LIGHTTextDisable,
  },
  sheetDataHeaderBackground: {
    backgroundColor: Colors.LIGHTTitleTable,
  },
  newsEachItemContentTitleText2: {
    fontWeight: '700',
    color: Colors.LIGHTTextDisable,
    textAlign: 'center',
    fontSize: 14,
  },
  newsEachItemContentTitleText3: {
    marginRight: 8,
    marginLeft: 10,
  },
  numberText: {
    fontSize: 16,
    color: Colors.LIGHTTextContent,
  },
  paddingRight: {
    paddingRight: 8,
  },
  iconStyle: {
    marginRight: 7,
  },
});
