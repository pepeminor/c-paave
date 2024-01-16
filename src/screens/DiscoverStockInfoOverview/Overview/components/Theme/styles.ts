import { lightColors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
    paddingVertical: 10,
    paddingBottom: 6,
  },
  skeletonContainer: {
    paddingVertical: 10,
    height: 205,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  basedOnText: {
    ...textStyles.fontSize12,
    ...textStyles.roboto400,
    color: lightColors.LIGHTTextDisable,
    marginHorizontal: 16,
  },
  titleText: {
    ...textStyles.fontSize18,
    ...textStyles.roboto700,
    color: lightColors.LIGHTTextBigTitle,
    paddingHorizontal: 8,
  },
  themeListContentContainer: {
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  themeContainer: {
    backgroundColor: lightColors.WHITE,
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 8,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,

    width: 180,
  },
  themeNameRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  themeName: {
    ...textStyles.fontSize14,
    ...textStyles.roboto700,
    color: lightColors.LIGHTTextBigTitle,
    paddingLeft: 8,
    flex: 1,
  },
  themeRateRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
    flex: 1,
  },
  rateText: {
    ...textStyles.fontSize14,
    ...textStyles.dinOt400,
    paddingLeft: 8,
  },
  tabContainer: {
    height: 40,
  },
});
