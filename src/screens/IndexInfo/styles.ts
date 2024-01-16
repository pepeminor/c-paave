import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  border: {
    borderBottomColor: Colors.BORDER2,
    borderBottomWidth: 5,
  },
  selectedTab: {
    marginHorizontal: 0,
  },
  unselectedTab: {
    marginHorizontal: 0,
  },
});
