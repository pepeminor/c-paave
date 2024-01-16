import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

const titleColor = Colors.LIGHTText;
const contentColor = Colors.LIGHTTextContent;

export default getStylesHook({
  // TAB
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  screenOption: {
    height: 44,
    borderRadius: 10,
  },

  optionContainer: {
    width: 156,
    marginHorizontal: 56,
  },

  optionContainerSelected: {
    borderBottomWidth: 3,
    borderBottomColor: Colors.BlueNewColor,
  },

  selectedText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.BlueNewColor,
  },
  unselectedText: {
    fontSize: 14,
    color: Colors.LIGHTTextTitle,
  },

  //
  customTab: {
    marginTop: 10,
  },
  tabViewStyles: {
    height: '100%',
  },
  tabBlock: {
    backgroundColor: Colors.WHITE,
    marginTop: 8,
  },
  DateTime: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.LIGHTTextDisable,
    marginLeft: 9,
  },

  boxContainer: {},

  // BLOCK NEWS
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
  blockNewsTitleContainer: {
    height: 53,
    paddingHorizontal: 16,
  },
  blockNewsUpDateContainer: {
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

  itemIndexStyle: {
    marginHorizontal: 16,
  },

  //LIST BLOGS
  cardNewsList: {
    width: 375,
    height: 98,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
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
  blockNewsListUpDateContainer: {
    marginLeft: 16,
  },
  blockNewsListUpDateText: {
    fontSize: 12,
    color: Colors.LIGHTTextDisable,
    marginLeft: 9.33,
  },
  dateTime: {
    marginLeft: 16,
  },
  //Education

  rowData: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  rowDataTextEducation: {
    fontSize: 14,
    paddingVertical: 10,
    justifyContent: 'space-between',
    width: 311,
    color: Colors.LIGHTTextContent,
  },

  SeparatorContainer: {
    width: '100%',
    backgroundColor: Colors.LIGHTTitleTable,
  },
});
