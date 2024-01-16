import { lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
  },
  tradeInfoContainer: {
    width: 168.75,
    marginBottom: 5,
  },
});
