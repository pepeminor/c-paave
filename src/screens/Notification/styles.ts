import { lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
  },
  textNotificationContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 24,
  },
  textNotification: {
    color: lightColors.LIGHTTextDisable,
  },
  selectedContainer: {
    marginHorizontal: 0,
  },
  unSelectedContainer: {
    flex: 0,
    marginHorizontal: 0,
    paddingHorizontal: 16,
  },
  unSelectedText: {
    color: lightColors.LIGHTTextTitle,
  },
  actionBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 8,
    marginBottom: 16,
  },
  actionBtn: {
    flex: 1,
    marginHorizontal: 8,
  },
});
