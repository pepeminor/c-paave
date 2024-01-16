import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';
import { IS_IOS } from 'constants/main';

export default getStylesHook({
  contain: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    position: 'relative',
  },
  wrap: {
    flex: 1,
    marginHorizontal: 16,
    paddingVertical: 16,
  },
  containCheckBox: {
    flex: 1,
    flexDirection: 'row',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dotText: {
    flexDirection: 'row',
    paddingBottom: 4,
    fontSize: 14,
    color: Colors.BLACK,
  },
  wrapDotText: {
    paddingLeft: 40,
    paddingTop: 4,
    paddingBottom: 30,
  },
  dotStyle: {
    fontWeight: 'bold',
    paddingRight: 4,
  },
  wrapJoinBy: {
    borderRadius: 8,
    backgroundColor: Colors.WHITE,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 8,
      height: 1.5,
    },
    shadowOpacity: IS_IOS ? 0.16 : 2,
    shadowRadius: 20.0,
    elevation: 4,
    marginLeft: 40,
    marginRight: 2,
    marginTop: -24,
    marginBottom: 8,
  },
  touchJoinText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingRight: (14),
  },
  joinText: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 12,
  },
  touchBorder: {
    borderColor: Colors.BORDER2,
    borderBottomWidth: 1,
  },
  conditionText: {
    color: Colors.Blue5,
    paddingTop: 16,
    paddingBottom: 12,
  },
  contactText: {
    color: Colors.LIGHTButtonRed,
  },
  contactEmail: {
    color: Colors.Blue5,
    fontWeight: 'bold',
  },
  bottomButton: {
    marginHorizontal: 16,
    elevation: 2,
    zIndex: 2,
  },
  goToLeaderboard: {
    color: Colors.Blue5,
    textAlign: 'center',
    textDecorationLine: 'underline',
    position: 'relative',
    elevation: 2,
    zIndex: 2,
  },
  circleShape: {
    width: 14,
    height: 14,
    borderWidth: 1,
    borderRadius: 14,
    marginRight: 10,
    borderColor: Colors.Green2,
  },
  iconCheck: {
    marginRight: 5,
  },
});
