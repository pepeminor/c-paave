import { getStylesHook } from 'hooks/useStyles';
import { lightColors } from 'styles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
    alignItems: 'stretch',
  },
});
