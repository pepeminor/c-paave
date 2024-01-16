import { getStylesHook } from 'hooks/useStyles';
import { Platform } from 'react-native';

export const useStyles = getStylesHook({
  container: {
    flex: 1,
    marginTop: 16,
  },
  tabContainer: {
    marginHorizontal: 8,
  },
  stockListContainer: {
    paddingBottom: Platform.OS === 'ios' ? 32 : 0,
  },
});
