import globalStyles, { Colors, lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';
import { Platform } from 'react-native';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
  },
  contentContainer: {
    paddingBottom: 64,
  },
  extendButtonArea: {
    ...globalStyles.centered,
    ...globalStyles.flexDirectionRow,
    height: 34,
    width: 375,
    backgroundColor: lightColors.LIGHTTitleTable,
  },
  extendText: {
    color: lightColors.LIGHTTextBigTitle,
    marginRight: 12,
    fontSize: 14,
  },
  collapseIcon: {
    transform: [{ rotate: '180deg' }],
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
  nameText1: {
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 14,
    color: lightColors.LIGHTTextTitle,
  },
  dataText: {
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontSize: 16,
  },
  infoProfitLoss: {
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontSize: 16,
    color: lightColors.DARK_GREEN,
  },
  infoFollowingUser: {
    ...globalStyles.container,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 5,
    marginBottom: 2,
  },

  followButtonContainer: {
    marginTop: 24,
    marginRight: 16,
    alignItems: 'flex-end',
  },
  followButton: {
    height: 34,
    width: 91,
    backgroundColor: lightColors.BlueNewColor,
    borderRadius: 8,
    paddingLeft: 10,
  },
  followedButton: {
    height: 34,
    width: 107,
    backgroundColor: lightColors.LIGHTBGTab,
    borderRadius: 8,
    paddingLeft: 10,
  },
  followIcon: {
    marginRight: 10,
  },
  followText: {
    color: lightColors.WHITE,
    fontSize: 14,
  },
  followedText: {
    color: lightColors.LIGHTTextTitle,
    fontSize: 14,
  },
  followArea: {
    height: 53,
    backgroundColor: lightColors.LIGHTTitleTable,
  },
  followingText: {
    color: lightColors.LIGHTTextTitle,
    fontSize: 14,
  },
  followingNumberText: {
    fontSize: 16,
    color: lightColors.LIGHTTextContent,
  },
  followingLeft: {
    borderBottomColor: lightColors.BORDER,
    borderBottomWidth: 1,
    borderTopColor: lightColors.BORDER,
    borderTopWidth: 1,
    borderRightColor: lightColors.BORDER,
    borderRightWidth: 1,
  },
  followingRight: {
    borderBottomColor: lightColors.BORDER,
    borderBottomWidth: 1,
    borderTopColor: lightColors.BORDER,
    borderTopWidth: 1,
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
    backgroundColor: lightColors.LIGHTBackground,
  },
  favoriteItemText: {
    color: lightColors.LIGHTTextContent,
    fontSize: 14,
  },

  border: {
    backgroundColor: lightColors.BORDER2,
    height: 5,
  },
  investmentArea: {
    ...globalStyles.alignCenter,
    height: 424,
  },
  lockGold: {
    marginTop: 32,
    marginBottom: 25,
  },
  text1: {
    fontSize: 18,
    fontWeight: '700',
    color: lightColors.LIGHTTextBigTitle,
    marginBottom: 10,
  },
  text2: {
    fontSize: 14,
    color: lightColors.LIGHTTextBigTitle,
  },
  titleContainer: {
    height: 44,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  borderBottomInvestment: {
    borderBottomColor: lightColors.BORDER2,
    borderBottomWidth: 1,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: lightColors.LIGHTTextBigTitle,
  },
  pAOptionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  screenOption: {
    flexDirection: 'row',
    height: 44,
    backgroundColor: lightColors.LIGHTBGTab,
    borderRadius: 10,
    paddingHorizontal: 3,
    paddingVertical: 3,
  },
  optionContainerSelected: {
    backgroundColor: lightColors.WHITE,
  },
  optionContainer: {
    borderRadius: 10,
  },
  selectedText: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: lightColors.BlueNewColor,
  },
  unselectedText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: lightColors.LIGHTTextTitle,
  },
  tabBarIndexContainer: {
    height: 30,
  },
  eachTab: {
    marginHorizontal: 5,
  },
  postItemContainer: {
    height: 144,
    paddingTop: 13,
  },
  userInfoContainer: {
    paddingLeft: 16,
  },
  namePostContainer: {
    paddingTop: 3,
  },
  namePostText: {
    fontWeight: '700',
    color: lightColors.LIGHTTextContent,
    fontSize: 14,
  },
  timePostText: {
    fontSize: 10,
    color: lightColors.LIGHTTextDisable,
  },
  postContentContainer: {
    paddingLeft: 65,
    paddingRight: 80,
    paddingTop: 18,
  },
  postContentText: {
    marginTop: 6,
    marginLeft: 8,
    fontSize: 14,
  },
  likeShareContainer: {
    backgroundColor: lightColors.LIGHTTitleTable,
    paddingLeft: 27,
    paddingRight: 24,
    marginTop: 9,
    borderBottomColor: lightColors.BORDER2,
    borderTopColor: lightColors.BORDER,
    borderBottomWidth: 5,
    borderTopWidth: 1,
  },
  likeNumberText: {
    marginLeft: 13,
    color: lightColors.LIGHTTextDisable,
    fontSize: 14,
  },
  shareContainer: {
    justifyContent: 'flex-end',
  },
  shareNumberText: {
    marginLeft: 12,
    color: lightColors.LIGHTTextDisable,
    fontSize: 14,
  },
  border1: {
    borderRightColor: lightColors.BORDER,
    borderRightWidth: 1,
  },
  noNumber: {
    color: lightColors.LIGHTTextContent,
    fontSize: 14,
    lineHeight: 18,
  },
  NoNumber: {
    color: lightColors.LIGHTTextContent,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18,
  },
  profitNumber: {
    fontWeight: '700',
    color: lightColors.DARK_GREEN,
    fontSize: 14,
  },
  paddingRight: {
    paddingRight: 6,
    alignItems: 'flex-end',
  },
  marginHorizontal6: {
    paddingVertical: 10,
  },
  containerTab: {},

  // Pie chart text
  titleSymbols: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 18,
    color: lightColors.BlueNewColor,
  },
  marginSymbols: {
    marginHorizontal: 16,
    marginBottom: 30,
  },
  symbolContainer: {
    marginRight: 30,
    marginLeft: 10,
    flexWrap: 'wrap',
    width: 258,
    height: 44,
  },
  symbolsItem: {
    width: 36,
    height: 18,
    paddingHorizontal: 20,
  },
  marginAnroid: {
    marginTop: 12,
  },
  marginIos: {
    marginTop: 14,
  },

  leftItemStockCode: {
    paddingLeft: 5,
    paddingRight: 14,
  },
  stockCodeText: {
    fontWeight: '700',
    color: lightColors.LIGHTTextContent,
    fontSize: 14,
  },
  stockCodeCompanyNameText: {
    fontSize: 12,
    color: lightColors.LIGHTTextDisable,
    marginTop: 2,
  },
  alignItemEnd: {
    alignItems: 'flex-end',
  },
  paddingRightS: {
    paddingRight: 11,
  },
  weight: {
    fontSize: 14,
    color: lightColors.LIGHTTextContent,
  },
  weight2: {
    fontSize: 14,
  },
  borderS: {
    borderRightColor: lightColors.BORDER,
    borderRightWidth: 1,
  },

  //
  titleStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: lightColors.LIGHTTextTitle,
    paddingHorizontal: 10,
    paddingVertical: 16,
  },
  titleStyle2: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: lightColors.LIGHTTextTitle,
    marginBottom: 10,
  },

  chartValueContainer: {
    ...globalStyles.flexDirectionRow,
    ...globalStyles.centered,
    height: 32,
  },
  chartValueLine: {
    backgroundColor: lightColors.LIGHTRed2,
    width: 30,
    height: 2,
    marginRight: 5,
  },
  bgGreen: {
    backgroundColor: lightColors.DARK_GREEN,
  },
  noteText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: lightColors.LIGHTTextContent,
  },
  margin16: {
    marginLeft: 16,
    marginTop: -16,
    marginBottom: 16,
  },
  textBio: {
    color: lightColors.LIGHTTextDisable,
  },

  lineChart: {
    height: 243,
  },
  paddingSpace: {
    paddingBottom: 8,
  },
  chartContainer: {
    paddingHorizontal: 9,
  },
  paddingLeft8: {
    paddingLeft: 8,
  },
  extendArea: {
    height: 10,
    width: 375,
  },
  marginTop: { marginBottom: 8 },
  hotStockNoteText: {
    fontSize: 12,
    color: lightColors.LIGHTTextDisable,
    fontFamily: 'Roboto',
    fontStyle: 'italic',
    lineHeight: 18,
    paddingHorizontal: 9,
  },
  grayLine: {
    width: '100%',
    height: 8,
    backgroundColor: Colors.BORDER,
  },
  containerHeaderTitle: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitleText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#FF9C00',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    marginVertical: 16,
  },
  fromDateContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 8,
  },
  toDateContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 8,
    paddingRight: 16,
  },
  noDataCon: {
    width: 375,
    height: 162,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.LIGHTTextContent,
    textAlign: 'center',
  },
  searchInput: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  modalContentContainer: {
    backgroundColor: Colors.WHITE,
    alignItems: 'stretch',
    borderRadius: 21,
    width: 343,
    justifyContent: 'center',
  },
  modalBackButton: {
    backgroundColor: Colors.BlueNewColor,
    height: 44,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOKButtonText: {
    fontWeight: '700',
    fontSize: 16,
    color: Colors.WHITE,
  },
  modalUserOptOut: {
    backgroundColor: Colors.BACKGROUND_MODAL,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  contentModal: {
    padding: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
