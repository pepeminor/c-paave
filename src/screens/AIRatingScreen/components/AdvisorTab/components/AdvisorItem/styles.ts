import globalStyles, { lightColors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  advisorContainer: {
    backgroundColor: lightColors.WHITE,
    borderRadius: 10,
    marginBottom: 8,
    marginTop: 4,
    marginHorizontal: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 2.65,
    elevation: 4,
  },
  avatarImg: {
    ...globalStyles.centered,
    marginRight: 16,
    height: 40,
    width: 40,
    borderRadius: 40,
    position: 'relative',
  },

  nameText: {
    ...textStyles.fontSize14,
    ...textStyles.roboto700,
    color: lightColors.BlueNewColor,
    width: '100%',
  },
  usernameText: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
    width: '100%',
  },
  copyingText: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
    color: lightColors.WHITE,
  },

  copyingContainer: {
    ...globalStyles.centered,
    backgroundColor: lightColors.DARKButtonGreen,
    borderRadius: 10,
    paddingHorizontal: 6,
    height: 24,
  },
  cardHeaderContainer: {
    flexDirection: 'row',
    paddingBottom: 8,
    alignItems: 'center',
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 32,
  },
  performanceInfo: {
    width: 110,
  },
  performanceInfoSkeleton: {
    width: 110,
    height: 80,
  },
  performanceInfoRow: {
    flexDirection: 'row',
    paddingTop: 5,
    justifyContent: 'space-between',
    width: '100%',
  },
  periodText: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
    width: 70,
    textAlign: 'left',
  },
  performanceUp: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
    color: lightColors.DARK_GREEN,
  },
  performanceDown: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
    color: lightColors.LIGHTRed,
  },
  performanceContainer: {
    flexDirection: 'row',
    paddingTop: 4,
    paddingBottom: 8,
    borderColor: lightColors.BORDER,
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  viewsAndFollowsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  viewsAndFollows: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  viewsAndFollowsTitle: {
    ...textStyles.fontSize12,
    ...textStyles.roboto700,
    color: lightColors.LIGHTTextTitle,
    marginRight: 15,
    paddingTop: 2,
  },
  viewsAndFollowsValue: {
    ...textStyles.fontSize14,
    ...textStyles.dinOt500,
  },
  followedIcon: {
    width: 25,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
  },
  followContainer: {
    ...globalStyles.centered,
    backgroundColor: lightColors.BlueNewColor,
    borderRadius: 10,
    paddingHorizontal: 8,
    height: 24,
  },
  followText: {
    ...textStyles.fontSize12,
    ...textStyles.roboto400,
    color: lightColors.WHITE,
  },
  followingContainer: {
    ...globalStyles.centered,
    borderColor: lightColors.BlueNewColor,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
    height: 24,
  },
  followingText: {
    ...textStyles.fontSize12,
    ...textStyles.roboto400,
    color: lightColors.BlueNewColor,
  },
  unFollowContainer: {
    ...globalStyles.centered,
    borderRadius: 10,
    paddingHorizontal: 6,
    height: 24,
    borderColor: lightColors.BlueNewColor,
    borderWidth: 1,
  },
  unfollowText: {
    ...textStyles.fontSize12,
    ...textStyles.roboto400,
    color: lightColors.BlueNewColor,
  },
});
