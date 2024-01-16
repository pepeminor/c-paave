import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

const titleColor = Colors.LIGHTText;
const contentColor = Colors.LIGHTTextContent;

export default getStylesHook({
  //LIST BLOGS
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  cardNewsList: {
    width: 375,
    height: 88,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  blockNewsListUpDateContainer: {
    marginLeft: 16,
  },
  CardNewsListAvatar: {
    backgroundColor: Colors.Bid,
    height: 76,
    width: 114,
    borderRadius: 8,
  },
  CardNewsListTitle: {
    fontSize: 14,
    fontWeight: '700',
    width: 214,
    height: 55,
    color: Colors.LIGHTText,
    marginLeft: 15,
  },
  dateTime: {
    marginLeft: 16,
  },
  blockNewsListUpDateText: {
    fontSize: 12,
    color: Colors.LIGHTTextDisable,
    marginLeft: 9.33,
  },
  //FlatList

  itemIndexStyle: {
    marginHorizontal: 16,
  },
  //OTHER

  OtherStyle: {
    marginHorizontal: 16,
    height: 44,
    width: 375,
  },
  textOther: {
    fontSize: 24,
    fontWeight: '700',
    color: titleColor,
  },
  //HeaderBLog

  blockNewsContainer: {
    width: 375,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  blockNewsAvatar: {
    height: 211,
    width: 343,
    marginHorizontal: 16,
    backgroundColor: Colors.Bid,
    marginTop: 16,
  },
  blockNewsImage: {
    height: 211,
    width: 343,
    marginHorizontal: 16,
    backgroundColor: Colors.Bid,
  },

  blogNewsAvatar: {
    height: 211,
    width: 343,
    marginHorizontal: 16,
    backgroundColor: Colors.Bid,
    marginVertical: 8,
  },
  blockNewsTitleContainer: {
    height: 53,
    paddingHorizontal: 16,
  },
  blockNewsTitleText: {
    fontSize: 16,
    fontWeight: '700',
    color: titleColor,
  },
  blockNewsUpDateContainer: {
    paddingHorizontal: 16,
  },

  blogUserUpdateContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  DateTime: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.LIGHTTextDisable,
    marginLeft: 9,
  },
  blockNewsDescContainer: {
    paddingHorizontal: 16,
  },
  blogsNewsActionContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  blockNewsContentText: {
    fontSize: 14,
    color: contentColor,
  },
  blockNewsActionContainer: {
    height: 40,
    paddingHorizontal: 16,
  },
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
  //TAG

  favoriteContainer: {
    marginTop: 3,
    flexWrap: 'wrap',
    marginLeft: 20,
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
  //TAG

  textTag: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.LIGHTTextTitle,
  },
});
