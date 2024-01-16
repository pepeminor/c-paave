import { lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: lightColors.BORDER,
  },
  title: {
    marginLeft: 8,
  },
  containerList: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-between',
  },
});
