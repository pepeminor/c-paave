import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

const titleColor = Colors.LIGHTTextBigTitle;
const contentColor = Colors.LIGHTTextContent;

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    marginTop: 8,
    paddingVertical: 8,
  },
  containerTitle: {
    height: 44,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  TextTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: titleColor,
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
  videoCard: {
    paddingVertical: 8,
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
  },
  bigVideo: {
    height: 211,
    backgroundColor: Colors.Bid,
  },
  videoCardTitleContainer: {
    marginHorizontal: 16,
    marginTop: 6,
  },
  videoCardTitle: {
    fontSize: 16,
    color: titleColor,
    fontWeight: '700',
  },
  videoCardContentContainer: {
    paddingVertical: 3,
    paddingHorizontal: 16,
  },
  videoCardContent: {
    fontSize: 14,
    color: contentColor,
  },
  videoActionItem: {
    width: 66,
  },
  videoActionContainer: {
    height: 40,
    paddingHorizontal: 16,
  },
  videoActionLike: {
    marginRight: 4,
  },
  videoActionShare: {
    marginLeft: 4,
  },
  newsActionValue: {
    fontSize: 14,
    color: Colors.LIGHTTextDisable,
  },

  /* VIDEO LIST */
  containerVideoList: {
    height: 217,
  },
  itemIndexStyle: {
    marginHorizontal: 16,
  },
  cardVideoList: {
    width: 214,
    height: 185,
    marginRight: 8,
  },
  CardVideoListAvatar: {
    backgroundColor: Colors.LIGHTRed,
    height: 121,
  },
  CardVideoListTitle: {
    fontSize: 14,
    marginTop: 10,
  },
});
