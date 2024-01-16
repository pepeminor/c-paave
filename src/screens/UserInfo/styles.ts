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
    fontWeight: '700',
    color: Colors.LIGHTTextBigTitle,
    marginLeft: 15,
    fontSize: 14,
  },
  avaName: {
    height: 82,
  },
  avaContainer: {
    marginTop: 16,
    marginLeft: 16,
    height: 50,
    width: 50,
  },
  avatarContainer: {
    height: 36,
    width: 36,
    marginRight: 13,
  },
  nameContainer: {
    marginTop: 21,
    marginLeft: 13,
  },
  nameText: {
    fontWeight: '700',
    fontSize: 16,
    color: Colors.LIGHTTextContent,
  },
  nameText2: {
    fontSize: 14,
    color: Colors.BlueNewColor,
  },
  followButtonContainer: {
    marginTop: 24,
    marginRight: 16,
    alignItems: 'flex-end',
  },
  followButton: {
    height: 34,
    width: 91,
    backgroundColor: Colors.BlueNewColor,
    borderRadius: 8,
    paddingLeft: 10,
  },
  followIcon: {
    marginRight: 10,
  },
  followText: {
    color: Colors.WHITE,
  },
  followArea: {
    height: 53,
    backgroundColor: Colors.LIGHTTitleTable,
  },
  followingText: {
    color: Colors.LIGHTTextTitle,
    fontSize: 14,
  },
  followingNumberText: {
    fontSize: 16,
    color: Colors.LIGHTTextContent,
  },
  followingLeft: {
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
    borderTopColor: Colors.BORDER,
    borderTopWidth: 1,
    borderRightColor: Colors.BORDER,
    borderRightWidth: 1,
  },
  followingLeft2: {
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
    borderTopColor: Colors.BORDER,
    borderTopWidth: 1,
    borderLeftColor: Colors.BORDER,
    borderLeftWidth: 1,
  },
  followingRight: {
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
    borderTopColor: Colors.BORDER,
    borderTopWidth: 1,
  },
  basicInfoAreaDefault: {
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  basicInfoArea: {
    maxHeight: 174,
    overflow: 'hidden',
  },
  extendButtonArea: {
    height: 34,
    backgroundColor: Colors.LIGHTTitleTable,
  },
  introText: {
    color: Colors.LIGHTTextContent,
    marginBottom: 10,
    fontSize: 14,
  },
  favoriteContainer: {
    marginTop: 3,
    flexWrap: 'wrap',
  },
  favoriteItemContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 5,
    marginRight: 10,
    borderRadius: 8,
    backgroundColor: Colors.LIGHTBackground,
  },
  favoriteItemText: {
    color: Colors.LIGHTTextContent,
    fontSize: 14,
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
    marginBottom: 10,
  },
  userIntroText: {
    fontWeight: '700',
    color: Colors.LIGHTTextContent,
    fontSize: 14,
  },
  addTagArea: {
    width: 105,
    height: 34,
    marginBottom: 7,
  },
  addTagText: {
    color: Colors.BlueNewColor,
    marginLeft: 5,
    fontSize: 14,
  },
  collapseIcon: {
    transform: [{ rotate: '180deg' }],
  },
  feedback: {
    ...globalStyles.centered,
    position: 'absolute',
    bottom: 34,
    right: 22,
  },
  feedbackText: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '700',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.Blue4,
  },
});
