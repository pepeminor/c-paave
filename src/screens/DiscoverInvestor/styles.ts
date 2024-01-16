import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  investor: {
    height: 87,
    borderBottomWidth: 1,
    borderColor: Colors.BORDER,
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: Colors.WHITE,
  },
  leaderboard: {
    height: 36,
  },
  investorInfo: {
    width: 229,
  },
  rank: {
    paddingHorizontal: 8,
  },
  rankIcon: {
    width: 22,
    height: 22,
    backgroundColor: Colors.LIGHTBackground,
    borderRadius: 11,
    alignSelf: 'center',
  },
  rankIconText: {
    color: Colors.LIGHTTextTitle,
    fontSize: 14,
  },
  increaseText: {
    color: Colors.DARK_GREEN,
    fontSize: 10,
    lineHeight: 12,
    marginLeft: 2,
    marginTop: 1,
  },
  name: {},
  nameTextContainer: {
    alignSelf: 'center',
    height: 36,
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 14,
    color: Colors.LIGHTTextBigTitle,
    fontWeight: '700',
    paddingLeft: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    backgroundColor: Colors.LIGHTBackground,
    borderRadius: 18,
  },
  chart: {
    width: 139,
    height: 36,
    // backgroundColor: 'red',
    marginTop: 5,
  },
  follow: {
    height: 30,
    marginTop: 5,
  },
  follower: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    width: 165,
    backgroundColor: Colors.LIGHTBackground,
    borderRadius: 8,
    alignSelf: 'center',
  },
  followNumber: {
    fontSize: 14,
    color: Colors.BlueNewColor,
    lineHeight: 18,
    fontWeight: '700',
    marginRight: 5,
  },
  followNumberDays: {
    color: Colors.LIGHTTextDisable,
    fontWeight: '400',
    marginLeft: 5,
  },
  followTitle: {
    fontSize: 12,
    color: Colors.LIGHTTextTitle,
    lineHeight: 16,
    fontWeight: '700',
  },
  return: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    width: 165,
    backgroundColor: Colors.LIGHTBackground,
    borderRadius: 8,
    alignSelf: 'center',
    position: 'absolute',
    right: 0,
  },
  returnIcon: { paddingRight: 10 },
  right: {
    position: 'absolute',
    right: 0,
    alignSelf: 'center',
  },
  returnValue: {
    color: Colors.DARK_GREEN,
    lineHeight: 18,
  },
  returnValueContainer: {
    marginRight: 5,
  },
});
