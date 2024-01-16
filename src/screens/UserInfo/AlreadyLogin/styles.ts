import globalStyles, { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  authenContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  virtualAvatar: {
    marginRight: 8,
  },
  tradeWithPaaveText: {
    fontWeight: '700',
    fontSize: 16,
    color: Colors.LIGHTTextContent,
  },
  virtualAvatarContainer: {
    marginBottom: 8,
  },
  signUpButtonContainer: {
    paddingRight: 9,
  },
  signUpButton: {
    borderRadius: 10,
    height: 44,
    backgroundColor: Colors.LIGHTBackground,
  },
  signUpButtonText: {
    color: Colors.BlueNewColor,
    fontWeight: '400',
    fontSize: 16,
  },
  signInButtonContainer: {
    paddingLeft: 9,
  },
  signInButton: {
    backgroundColor: Colors.BlueNewColor,
    borderRadius: 10,
    height: 44,
  },
  signInButtonText: {
    color: Colors.WHITE,
    fontWeight: '700',
    fontSize: 16,
  },
  bannerContainer: {
    height: 126,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  settingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    paddingHorizontal: 16,
  },
  borderBottom1: {
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
  },
  borderBottom5: {
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 5,
  },
  settingItemText: {
    flex: 1,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.LIGHTTextBigTitle,
    marginLeft: 15,
    fontSize: 14,
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.LIGHTTextContent,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    width: 250,
  },
  nameText2: {
    fontSize: 14,
    color: Colors.BlueNewColor,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  basicInfoAreaDefault: {
    paddingTop: 8, // Ẩn Tạm  các phần chưa launch PAAV,
    // marginTop: (-18), // Ẩn Tạm  các phần chưa launch PAAV,
    paddingHorizontal: 16,
    width: 375,
  },
  basicInfoArea: {
    maxHeight: 126,
    overflow: 'hidden',
  },
  extendButtonArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 34,
    width: 375,
    backgroundColor: Colors.LIGHTTitleTable,
  },
  extendArea: {
    height: 10,
    width: 375,
  },
  introText: {
    color: Colors.LIGHTTextContent,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: 22,
    width: 343,
  },
  textNoBio: {
    color: Colors.LIGHTTextTitle,
    marginBottom: 10,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  extendText: {
    color: Colors.LIGHTTextBigTitle,
    marginRight: 12,
    fontSize: 14,
  },
  border: {
    backgroundColor: Colors.BORDER2,
    height: 5,
  },
  userIntroContainer: {
    flexDirection: 'row',
    width: 343,
    height: 18,
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerIconEdit: {
    width: 16,
    height: 16,
  },
  userIntroText: {
    flex: 1,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.LIGHTTextContent,
    fontSize: 14,
  },
  collapseIcon: {
    transform: [{ rotate: '180deg' }],
  },
  modalDescription: {
    fontSize: 16,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    color: Colors.LIGHTTextContent,
  },

  // Skeleton

  SkeletonContainer: {
    marginTop: 21,
    marginLeft: 13,
  },

  SkeletonContainerBio: {},

  SkeletonUser1: {
    height: 16,
    width: 77,
    borderRadius: 10,
  },
  SkeletonUser2: {
    height: 16,
    width: 77,
    borderRadius: 10,
    marginTop: 2,
  },
  SkeletonBio: {
    height: 56,
    width: 343,
    borderRadius: 10,
  },

  // Avatar
  avatarContainer: {
    ...globalStyles.flexDirectionRow,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  avatarImg: {
    ...globalStyles.centered,
    height: 50,
    width: 50,
    borderRadius: 46,
  },
  avatarImgText: {
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.WHITE,
    fontSize: 24,
  },
  avatarTextContainer: {
    marginLeft: 8,
    justifyContent: 'center',
    paddingLeft: 5,
  },
  arrowContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    alignSelf: 'center',
    textAlign: 'right',
  },
});
