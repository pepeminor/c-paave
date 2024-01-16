import { getStylesHook } from 'hooks/useStyles';
import { textStyles } from 'styles';

export default getStylesHook({
  container: {
    height: 40,
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
  },
});
