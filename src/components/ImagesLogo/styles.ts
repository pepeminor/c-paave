import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  imageContainer: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.BORDER,
    overflow: 'hidden',
  },
});
