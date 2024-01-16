import { getStylesHook } from 'hooks/useStyles';
import { lightColors, textStyles } from 'styles';

export const useStyles = getStylesHook({
  headerContainer: {
    backgroundColor: lightColors.WHITE,
  },
  smolBorder: {
    height: 5,
    width: '50%',
    borderRadius: 2,
    backgroundColor: lightColors.BORDER,
  },
  containerContent: {
    width: '100%',
  },
  containerRow: {
    flex: 1,
    flexDirection: 'row',
  },
  unselectedText: {
    ...textStyles.roboto700,
  },
});
