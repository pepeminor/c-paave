import { lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: lightColors.BORDER,
    borderBottomWidth: 1,
  },
  notificationText: {
    color: lightColors.LIGHTText,
    fontWeight: '700',
    marginBottom: 2,
    fontSize: 14,
  },
  notificationText2: {
    fontSize: 14,
    color: lightColors.LIGHTTextContent,
    flexWrap: 'wrap',
  },
  switchContainer: {
    paddingLeft: 57,
  },
});
