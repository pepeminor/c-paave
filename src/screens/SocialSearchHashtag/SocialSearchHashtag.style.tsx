import { lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
  },
  tagInfoContainer: {
    padding: 16,
    backgroundColor: lightColors.LIGHTBGTab,
  },
  moreTagInfo: {
    flexDirection: 'row',
    paddingTop: 12,
  },
  tagInfoItem: {
    alignItems: 'center',
    marginRight: 20,
  },
});
