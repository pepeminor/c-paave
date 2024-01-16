import globalStyles, { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    // flex: 1,
    minHeight: 300,
    backgroundColor: Colors.WHITE,
  },
  containerTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  marginBottom8n: {
    ...globalStyles.flexDirectionRow,
    ...globalStyles.fillWidth,
    marginBottom: 8,
  },
  marginRight16n: {
    ...globalStyles.container,
    marginRight: 16,
  },
  marginHorizontal16n: {
    ...globalStyles.container,
    marginHorizontal: 16,
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
  screenOption: {
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 8,
    height: 38,
    width: 325,
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
