import globalStyles, { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  inputAccessoriesText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: Colors.LIGHTTextTitle,
    marginRight: 8,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  keyboardSuggestion: {
    ...globalStyles.flexDirectionRow,
    ...globalStyles.alignCenter,
    backgroundColor: Colors.WHITE,
    height: 44,
    paddingHorizontal: 8,
  },
  width12: {
    width: 12,
  },
  paddingLeft16: {
    ...globalStyles.centered,
    paddingLeft: 8,
    height: 32,
    borderLeftColor: Colors.LIGHTIconDisable,
    borderLeftWidth: 1,
  },
});
