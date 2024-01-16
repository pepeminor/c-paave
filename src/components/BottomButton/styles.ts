import { getStylesHook } from 'hooks/useStyles';
import { Colors } from 'styles';

export default getStylesHook({
  defaultStyle: {
    paddingVertical: 24,
    backgroundColor: Colors.WHITE,
  },
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
