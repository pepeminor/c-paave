import { getStylesHook } from 'hooks/useStyles';
import { lightColors, textStyles } from 'styles';

export const useStyles = getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
    minHeight: 450,
  },
  selectorContainer: {
    flexDirection: 'row',
    marginHorizontal: 4,
    marginVertical: 16,
  },
  loadingContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 8,
    zIndex: 1,
  },
  headerText: {
    ...textStyles.fontSize12,
    ...textStyles.roboto700,
    color: lightColors.LIGHTTextDisable,
    textAlign: 'center',
  },
});
