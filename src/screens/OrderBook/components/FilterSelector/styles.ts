import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  typePickerContainer: {
    paddingLeft: 10,
    paddingRight: 16,
    borderColor: Colors.BORDER,
    borderWidth: 1,
    borderRadius: 10,
    height: 44,
    backgroundColor: Colors.LIGHTTitleTable,
  },
  marginBottom8: {
    marginBottom: 8,
  },
  marginRight16: {
    marginRight: 16,
  },
  marginLeft16: {
    marginLeft: 16,
  },
  colorLightTextContent: {
    color: Colors.LIGHTTextContent,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  marginX16: {
    marginHorizontal: 16,
  },
  searchInput: {
    marginHorizontal: 16,
  },
});
