import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  rowData: {
    paddingRight: 16,
    paddingVertical: 10,
    maxHeight: 44,
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
  },
  rowDataText: {
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 14,
    color: Colors.LIGHTTextContent,
    lineHeight: 18,
  },
  titleText: {
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 16,
    color: Colors.LIGHTText,
    lineHeight: 22,
  },
  padding16: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});
