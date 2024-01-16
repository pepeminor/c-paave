import { getStylesHook } from 'hooks';
import { lightColors, textStyles } from 'styles';

export const useStyles = getStylesHook({
  container: {
    padding: 16,
    borderColor: lightColors.BORDER,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleText: {
    ...textStyles.fontSize14,
    ...textStyles.roboto700,
    color: lightColors.LIGHTTextBigTitle,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: lightColors.MainBlue,
  },
  notificationText: {
    ...textStyles.fontSize12,
    ...textStyles.roboto400,
    color: lightColors.LIGHTTextDisable,
    marginBottom: 12,
  },
  timeText: {
    ...textStyles.fontSize12,
    ...textStyles.roboto400,
    color: lightColors.LIGHTTextDisable,
  },
});
