import { Platform } from 'react-native';
import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  border: {
    borderBottomColor: Colors.BORDER2,
    borderBottomWidth: 5,
  },
  tabBiewTabBar: {
    height: 44,
  },
  changeRateText: {
    fontSize: 14,
  },
  marginHorizontal8: {
    marginHorizontal: 8,
  },
  borderSelected: {
    borderBottomWidth: 3,
    borderBottomColor: Colors.BlueNewColor,
  },
  textSelected: {
    fontWeight: '700',
    color: Colors.BlueNewColor,
    fontSize: 14,
  },
  textUnselected: {
    fontSize: 14,
    color: Colors.LIGHTTextTitle,
  },
  newsEachItemContainer: {
    height: 96,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  newsEachItemImageContainer: {
    width: 114,
    marginRight: 15,
  },
  newsEachItemContentTitleText: {
    fontWeight: '700',
    color: Colors.LIGHTTextBigTitle,
    fontSize: 14,
  },
  newsEachItemContentTimeContainer: {
    marginTop: 8,
  },
  newsEachItemContentTimeText: {
    fontSize: 12,
    color: Colors.LIGHTTextDisable,
    marginLeft: 8,
  },
  date: {
    color: Colors.LIGHTTextContent,
    fontSize: 14,
  },
  paddingRight: {
    paddingRight: 6,
  },
  border1: {
    borderRightColor: Colors.BORDER,
    borderRightWidth: 1,
  },
  screenOptionContainer: {
    height: 60,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  // rankNumberText: {
  //   color: Colors.LIGHTTextTitle,
  // },
  screenOption: {
    height: 44,
    backgroundColor: Colors.LIGHTBGTab,
    borderRadius: 10,
    paddingHorizontal: 3,
    paddingVertical: 3,
  },
  optionContainerSelected: {
    backgroundColor: Colors.WHITE,
  },
  optionContainer: {
    borderRadius: 10,
  },
  selectedText: {
    fontWeight: '700',
    color: Colors.BlueNewColor,
    fontSize: 14,
  },
  unselectedText: {
    fontSize: 14,
    color: Colors.LIGHTTextTitle,
  },
  itemImage: {
    marginTop: 10,
    height: 32,
    width: 32,
    marginRight: 5,
    marginLeft: 8,
  },
  stockCodeText: {
    fontWeight: '700',
    color: Colors.LIGHTTextBigTitle,
    fontSize: 14,
  },
  fullNameText: {
    marginTop: 3,
    marginRight: 8,
    fontSize: 10,
    color: Colors.LIGHTTextDisable,
  },
  numberText: {
    fontSize: 16,
  },
  sheetDataHeaderBackground: {
    backgroundColor: Colors.LIGHTTitleTable,
  },
  newsEachItemContentTitleText2: {
    fontWeight: '700',
    color: Colors.LIGHTTextDisable,
    textAlign: 'center',
    fontSize: 14,
  },
  newsEachItemContentTitleText3: {
    fontSize: 12,
    color: Colors.LIGHTTextDisable,
    textAlign: 'center',
  },
  quantity: {
    fontSize: 14,
    color: Colors.LIGHTTextContent,
    width: 65,
    textAlign: 'right',
  },
  marginLeft14: {
    marginLeft: 16,
  },
  iconStyle: {
    marginHorizontal: 5,
  },

  chartInfoContainer: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  chartInfoTradingContainer: {
    width: 209,
  },
  textColorGreen: {
    color: Colors.DARK_GREEN,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  textColorPurple: {
    color: Colors.LIGHTPurple,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  textColorYellow: {
    color: Colors.LIGHTYellow,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  textColorRed: {
    color: Colors.LIGHTRed,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  textColorTeal: {
    color: Colors.LIGHTTeal,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  infoLeftNumberContentContainer: {
    width: 88,
  },
  infoLeftNumberTitle: {
    fontSize: 24,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Medium',
    fontStyle: 'normal',
    fontWeight: '500',
  },
  infoLeftNumberContent1: {
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  infoLeftNumberContent2: {
    fontSize: 14,
    width: 47,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  infoRightLabel: {
    color: Colors.LIGHTTextTitle,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  infoRightContent: {
    color: Colors.LIGHTTextContent,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  infoRightNumberContainer65: {
    width: 65,
  },
  infoRightNumberContainer30: {
    width: 30,
  },
  chartContainer: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  chartStickContainer: {
    height: 206,
  },
  filterButton: {
    flex: 1,
    height: 28,
    marginRight: 5,
    backgroundColor: Colors.LIGHTBGTab,
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 12,
  },
  marginRight0: {
    marginRight: 0,
  },
  activeItem: {
    backgroundColor: Colors.BlueNewColor,
  },
  textWhite: {
    color: Colors.WHITE,
  },
  actionContainer: {
    paddingVertical: 8,
  },
  skeletonStyle: {
    height: 36,
    marginBottom: 1,
  },
  containerCode: {
    marginLeft: 4,
  },
  containerLogo: {
    marginLeft: 7,
  },
  logoContainer: {
    borderRadius: 99,
  },
  increaseIconStyle6: {
    marginHorizontal: 6,
  },
  increaseIconStyle4: {
    marginHorizontal: 4,
  },

  /* SKELETON STYLE */
  skeC: {
    width: 80,
    height: 25,
    borderRadius: 5,
  },
  skeCh: {
    width: 40,
    height: 20,
    borderRadius: 5,
  },
  skeRa: {
    width: 40,
    height: 20,
    borderRadius: 5,
  },
  skeVo: {
    width: 120,
    height: 20,
    borderRadius: 5,
  },
  skeVa: {
    width: 120,
    height: 20,
    borderRadius: 5,
  },
  skeUp: {
    width: 40,
    height: 20,
    marginRight: 2,
    borderRadius: 5,
  },
  skeCe: {
    width: 25,
    height: 20,
    borderRadius: 5,
  },
  skeUc: {
    width: 25,
    height: 20,
    borderRadius: 5,
  },
  skeDw: {
    width: 35,
    height: 20,
    borderRadius: 5,
  },
  skeFl: {
    width: 25,
    height: 20,
    borderRadius: 5,
  },
  marginBottom2: {
    marginBottom: 2,
    borderRadius: 5,
  },
});
