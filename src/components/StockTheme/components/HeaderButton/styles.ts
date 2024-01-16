import { getStylesHook } from 'hooks/useStyles';
import { lightColors, textStyles } from 'styles';

export const useStyles = getStylesHook({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...textStyles.fontSize14,
    ...textStyles.roboto700,
    color: lightColors.LIGHTTextDisable,
  },
  iconContainer: {
    position: 'absolute',
    right: -4,
  },
  shiftDown4: {
    marginBottom: -4,
  },
  shiftUp4: {
    marginTop: -4,
  },
});
