import { lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
  },
  tabSelectorContainer: {
    height: 44,
    paddingHorizontal: 8,
  },
  backgroundList: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
  },
  selectedContainer: {
    marginHorizontal: 0,
    paddingHorizontal: 0,
  },
  unSelectedContainer: {
    marginHorizontal: 0,
    paddingHorizontal: 0,
  },
});
