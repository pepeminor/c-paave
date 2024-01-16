import { lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export const useStyles = getStylesHook({
  container: {
    position: 'absolute',
    width: 40,
    height: 40,
    margin: 8,
    backgroundColor: lightColors.BlueNewColor,
    borderRadius: 20,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
