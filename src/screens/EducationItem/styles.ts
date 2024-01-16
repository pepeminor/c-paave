import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';
const titleColor = Colors.LIGHTText;
const contentColor = Colors.LIGHTTextContent;

export default getStylesHook({
  //HEADER
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  blockNewsContainer: {
    width: 375,
  },

  //OTHER

  OtherStyle: {
    marginHorizontal: 16,
    height: 44,
    width: 375,
  },
  textOther: {
    fontSize: 16,
    fontWeight: '700',
    color: titleColor,
  },

  blockNewsUpDateContainer: {
    paddingHorizontal: 16,
  },

  DateTime: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.LIGHTTextDisable,
    marginLeft: 9,
  },

  blogUserUpdateContainer: {
    marginTop: 12,
    paddingHorizontal: 16,
  },

  //TITLE

  blockNewsTitleContainer: {
    marginTop: 8,
    paddingHorizontal: 16,
  },
  blockNewsTitleText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.BlueNewColor,
  },

  blogsNewsActionContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  tabLike: {
    paddingHorizontal: 16,

    height: 40,
    marginBottom: 20,
  },
  blockNewsContentText: {
    fontSize: 14,
    color: contentColor,
  },

  //IMAGE

  blockNewsAvatar: {
    height: 211,
    width: 343,
    marginHorizontal: 16,
    backgroundColor: Colors.Bid,
  },

  //LIKE

  newsActionItem: {
    width: 66,
  },
  newsActionLike: {
    marginRight: 4,
  },
  newsActionValue: {
    fontSize: 14,
    color: Colors.LIGHTTextDisable,
  },
  newsActionShare: {
    marginLeft: 4,
  },
});
