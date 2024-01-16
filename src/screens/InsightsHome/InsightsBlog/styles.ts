import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

const titleColor = Colors.LIGHTTextBigTitle;
const contentColor = Colors.LIGHTTextContent;

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    // height: (740),
    marginTop: 8,
    paddingVertical: 8,
  },

  // BLOCK TITLE
  blockTitleContainer: {
    height: 44,
    marginHorizontal: 16,
  },
  btnSeeAll: {
    width: 66,
    height: 18,
  },
  seeAllTitle: {
    fontSize: 14,
    color: titleColor,
    fontWeight: '700',
  },
  blockTitleText: {
    fontSize: 18,
    fontWeight: '700',
    color: titleColor,
  },

  // BLOCK NEWS
  blockNewsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
    paddingVertical: 8,
  },
  blockNewsAvatar: {
    height: 211,
    marginHorizontal: 16,
    backgroundColor: Colors.Bid,
  },
  blockNewsTitleContainer: {
    height: 53,
    paddingHorizontal: 16,
  },
  blockNewsUpDateContainer: {
    height: 32,
    paddingHorizontal: 16,
  },
  blockNewsDescContainer: {
    height: 60,
    paddingHorizontal: 16,
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
  newsActionShare: {
    marginLeft: 4,
  },
  newsActionValue: {
    fontSize: 14,
    color: Colors.LIGHTTextDisable,
  },

  blockNewsTitleText: {
    fontSize: 16,
    fontWeight: '700',
    color: titleColor,
  },

  blockNewsContentText: {
    fontSize: 14,
    color: contentColor,
  },

  // BLOCK NEWS LIST
  blockNewsListContainer: {
    height: 268,
  },
  itemIndexStyle: {
    marginHorizontal: 16,
  },
  cardNewsList: {
    width: 214,
    height: 236,
    marginRight: 8,
  },
  CardNewsListAvatar: {
    height: 130,
  },
  CardNewsListTitle: {
    fontSize: 14,
    marginTop: 10,
  },
  blockNewsListUpDateContainer: {
    paddingVertical: 8,
  },
  blockNewsListUpDateText: {
    fontSize: 12,
    color: Colors.LIGHTTextDisable,
    marginLeft: 8,
  },
});
