import { getStylesHook } from 'hooks/useStyles';
import globalStyles, { textStyles } from 'styles';
import { lightColors } from 'styles';

export default getStylesHook({
  container: {
    paddingBottom: 40,
  },

  grabber: {
    ...globalStyles.centered,
    marginTop: 8,
  },

  // Header
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 17,
    borderBottomWidth: 1,
    borderColor: lightColors.BORDER,
    paddingHorizontal: 16,
  },
  headerTitleText: {
    ...textStyles.fontSize16,
    ...textStyles.roboto700,
    color: lightColors.LIGHTTextTitle,
  },
  headerCloseBtn: {
    ...globalStyles.centered,
    height: 24,
    width: 24,
  },

  // Content
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  contentIndicatorBtn: {
    ...globalStyles.centered,
    flex: 1,
    height: 28,
    borderRadius: 12,
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
    marginRight: 5,
  },
  lineContainer: {
    paddingVertical: 8,
    paddingHorizontal: 23,
    overflow: 'hidden',
  },
});
