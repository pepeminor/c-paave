import { getStylesHook } from 'hooks/useStyles';
import { lightColors, textStyles } from 'styles';

export default getStylesHook({
  screenOption: {
    margin: 8,
  },
  optionContainer: {
    flex: 1,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    height: 28,
    paddingHorizontal: 6,
    margin: 3,
    backgroundColor: lightColors.LIGHTBackground,
  },
  optionContainerSelected: {
    flex: 1,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    height: 28,
    paddingHorizontal: 6,
    margin: 3,
    backgroundColor: lightColors.BlueNewColor,
  },
  text: {
    ...textStyles.fontSize12,
    ...textStyles.roboto400,
    color: lightColors.LIGHTTextTitle,
  },
  selectedText: {
    ...textStyles.fontSize12,
    ...textStyles.roboto700,
    color: lightColors.WHITE,
  },
});
