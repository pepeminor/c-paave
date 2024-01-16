import { lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
  },
  container: {
    backgroundColor: lightColors.WHITE,
    width: '100%',
    height: '100%',
  },
  priceBoardContainer: {
    flex: 1,
    marginHorizontal: 8,
    marginBottom: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden',
  },
});
