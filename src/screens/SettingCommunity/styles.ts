import { lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export const useStyles = getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
  },
  settingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    paddingHorizontal: 16,
    borderBottomColor: lightColors.BORDER,
    borderBottomWidth: 1,
  },
  settingItemText: {
    flex: 1,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: lightColors.LIGHTText,
    fontSize: 14,
  },
});
