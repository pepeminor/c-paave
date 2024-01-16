import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
    height: 44,
    paddingLeft: 16,
    paddingRight: 10,
  },
  languageFlag: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  marginRight8: {
    marginRight: 8,
  },
  labelContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  languageLabel: {
    color: Colors.LIGHTTextContent,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
});
