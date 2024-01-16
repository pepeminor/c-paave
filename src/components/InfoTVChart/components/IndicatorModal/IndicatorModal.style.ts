import { getStylesHook } from 'hooks/useStyles';
import globalStyles, { scaleSize, textStyles, lightColors } from 'styles';

export default getStylesHook({
  container: {
    paddingBottom: scaleSize(40),
  },

  grabber: {
    ...globalStyles.centered,
    marginTop: scaleSize(8),
  },

  // Header
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: scaleSize(17),
    borderBottomWidth: 1,
    borderColor: lightColors.BORDER,
    paddingHorizontal: scaleSize(16),
  },
  headerTitleText: {
    ...textStyles.fontSize16,
    ...textStyles.roboto700,
    color: lightColors.LIGHTTextTitle,
  },
  headerCloseBtn: {
    ...globalStyles.centered,
    height: scaleSize(24),
    width: scaleSize(24),
  },

  // Content
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: scaleSize(8),
    paddingHorizontal: scaleSize(16),
  },
  contentIndicatorBtn: {
    ...globalStyles.centered,
    flex: 1,
    height: scaleSize(28),
    borderRadius: scaleSize(12),
    backgroundColor: lightColors.LIGHTBackground,
    borderWidth: 1,
    borderColor: lightColors.BORDER,
  },

  contentIndicatorBtnActive: {
    backgroundColor: lightColors.BlueNewColor,
  },

  contentIndicatorText: {
    ...textStyles.fontSize12,
    ...textStyles.roboto400,
  },
  contentIndicatorTextActive: {
    color: lightColors.WHITE,
  },
  marginRight5: {
    marginRight: scaleSize(5),
  },
  lineContainer: {
    paddingVertical: scaleSize(8),
    paddingHorizontal: scaleSize(23),
    overflow: 'hidden',
  },
});
