import { lightColors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
  },
  tabBar: {
    backgroundColor: lightColors.Transparent,
  },
  tab: {
    padding: 0,
  },
  indicator: {
    display: 'none',
  },
  optionContainer: {
    width: 156,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionContainerSelected: {
    borderBottomWidth: 3,
    borderBottomColor: lightColors.BlueNewColor,
  },
  text: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
  },
  selectedText: {
    ...textStyles.roboto700,
    color: lightColors.BlueNewColor,
  },
});
