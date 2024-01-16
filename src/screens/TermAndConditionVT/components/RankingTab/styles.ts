import { textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  contentContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  pl8: {
    paddingLeft: 8,
  },
  listItem: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
  },
  pb22: {
    paddingBottom: 22,
  },
});
