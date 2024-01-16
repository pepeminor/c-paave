import globalStyles, { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  screenOption: {
    ...globalStyles.flexDirectionRow,
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 8,
    height: 38,
    flex: 1,
    backgroundColor: Colors.LIGHTBGTab,
    borderRadius: 10,
    paddingHorizontal: 3,
    paddingVertical: 3,
  },
  optionContainerSelected: {
    backgroundColor: Colors.WHITE,
  },
  optionContainer: {
    borderRadius: 10,
  },
  selectedText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.BlueNewColor,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  unselectedText: {
    fontSize: 14,
    color: Colors.LIGHTTextTitle,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  notebookContainer: {
    paddingRight: 10,
  },
});
