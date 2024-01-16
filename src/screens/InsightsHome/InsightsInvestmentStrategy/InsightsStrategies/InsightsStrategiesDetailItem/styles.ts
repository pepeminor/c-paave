import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  marginText: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 10,
    lineHeight: 22,
  },
  followedButton: {
    height: 44,
    width: 343,
    backgroundColor: Colors.LIGHTBGTab,
    borderRadius: 8,
    paddingLeft: 10,
  },
  followButtonContainer: {
    marginHorizontal: 16,
  },
  followButton: {
    height: 44,
    width: 343,
    backgroundColor: Colors.BlueNewColor,
    borderRadius: 8,
    paddingLeft: 10,
  },
  followIcon: {
    marginRight: 10,
  },
  followText: {
    color: Colors.WHITE,
    fontSize: 14,
  },
  followedText: {
    color: Colors.LIGHTTextTitle,
    fontSize: 14,
  },
  border: {
    backgroundColor: Colors.BORDER2,
    height: 8,
  },
  marginTop70: {
    marginTop: 70,
  },
  textTradingHistory: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
    color: Colors.LIGHTText,
  },
  marginLeft16: {
    marginLeft: 16,
  },
  paddingTop8: {
    paddingTop: 8,
  },
  marginVertical10: {
    marginVertical: 10,
  },
  screenOption: {
    marginTop: 10,
    marginHorizontal: 16,
    height: 44,
    backgroundColor: Colors.LIGHTBGTab,
    borderRadius: 10,
    paddingHorizontal: 3,
    paddingVertical: 3,
  },
  optionContainer: {
    borderRadius: 7,
  },
  optionContainerSelected: {
    backgroundColor: Colors.WHITE,
  },
  selectedText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.BlueNewColor,
    lineHeight: 18,
  },
  unselectedText: {
    fontSize: 14,
    color: Colors.LIGHTTextTitle,
  },
  PieChart: {
    height: 240,
    marginTop: 18,
  },
  ViewTable: {
    flex: 1,
  },
  heightData: {
    backgroundColor: Colors.WHITE,
    maxHeight: 338,
  },
  heightDataAndroid: {
    backgroundColor: Colors.WHITE,
    maxHeight: 350,
  },
  text: {
    color: Colors.LIGHTTextContent,
    fontSize: 14,
  },
  border1: {
    borderRightColor: Colors.BORDER,
    borderRightWidth: 1,
  },
  paddingRight: {
    paddingRight: 6,
  },
  quantity: {
    fontSize: 14,
    color: Colors.DARK_GREEN,
  },
  extendButtonArea: {
    height: 34,
    backgroundColor: Colors.LIGHTTitleTable,
    paddingHorizontal: 16,
  },
  extendedButtonArea: {
    height: 34,
    backgroundColor: Colors.LIGHTTitleTable,
    paddingHorizontal: 16,
    marginTop: -100,
  },
  extendText: {
    color: Colors.LIGHTTextBigTitle,
    marginRight: 12,
    fontSize: 16,
    fontWeight: '700',
  },
  rotateIcon: {
    transform: [{ rotate: '270deg' }],
  },
  collapseIcon: {
    transform: [{ rotate: '90deg' }],
  },
  itemText: {
    color: Colors.LIGHTTextContent,
    fontSize: 14,
    paddingHorizontal: 16,
  },
  extendBtn: {
    backgroundColor: Colors.WHITE,
    paddingVertical: 16,
  },
});
