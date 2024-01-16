import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  executeFormButton: {
    height: 44,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.WHITE,
  },
});
