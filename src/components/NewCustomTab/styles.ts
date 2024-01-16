import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  screenOption: {
    backgroundColor: Colors.LIGHTBGTab,
    borderRadius: 10,
    paddingHorizontal: 3,
    paddingVertical: 3,
  },
  optionContainerSelected: {
    backgroundColor: Colors.WHITE,
  },
  optionContainer: {
    borderRadius: 7,
  },
  selectedText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.BlueNewColor,
  },
  unselectedText: {
    fontSize: 14,
    color: Colors.LIGHTTextTitle,
  },
  selectedTextSell: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.LIGHTRed,
  },
});
