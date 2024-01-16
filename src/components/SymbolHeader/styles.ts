import { Platform, StyleSheet } from 'react-native';
import globalStyles, { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

const styles2 = StyleSheet.create({
  price4: {
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Medium',
    fontStyle: 'normal',
    fontWeight: 'bold',
  },
  vText: {
    color: Colors.LIGHTTextContent,
  },
  cText: {
    color: Colors.LIGHTPurple,
  },
  fText: {
    color: Colors.LIGHTTeal,
  },
});

export default getStylesHook({
  chartLeft: {
    height: 98,
    marginLeft: 8,
    marginRight: 28,
    paddingTop: 20,
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  symbolHeaderChartStyle: {
    height: 70,
    width: 164,
    right: 20,
    padding: 10,
  },
  chartSymbolHeaderPlaceHolderContainer: {
    width: 154,
    height: 51,
  },
  chartRight: {
    ...globalStyles.container,
    // paddingRight: (8),
    marginTop: 4,
    marginBottom: 8,
  },
  fakeImage: {
    ...globalStyles.fillHeight,
    ...globalStyles.fillWidth,
    borderRadius: 30,
  },
  imageOutContainer: {
    ...globalStyles.flexDirectionRow,
    ...globalStyles.alignCenter,
    width: 179,
    height: 40,
  },
  imageContainer: {
    height: 40,
    width: 40,
    marginRight: 10,
  },
  stockCode: {
    fontSize: 24,
    color: Colors.LIGHTTextBigTitle,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  stockCodeContainer: {
    minWidth: 46,
  },
  marginRight10: {
    marginRight: 10,
  },
  stockCodeContainerPlaceHolder: {
    height: 30,
  },
  scoreContainer: {
    ...globalStyles.centered,
    height: 26,
    width: 42,
    borderWidth: 2,
    borderColor: Colors.LIGHTButtonRed,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 12,
  },
  scoreContainerPlaceHolder: {
    height: 26,
    width: 55,
    borderRadius: 8,
  },
  score: {
    color: Colors.LIGHTButtonRed,
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: Platform.OS === 'ios' ? 24 : 18,
  },
  askScoreIcon: {
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  price1Container: {
    width: 179,
    top: 8,
  },
  price1: {
    fontSize: 24,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontStyle: 'normal',
    fontWeight: 'bold',
  },
  price2InContainer: {
    marginLeft: 8,
    marginRight: 4,
  },
  price2InContainerPlaceHolder: {
    height: 22,
    width: 40,
  },
  price2: {
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontStyle: 'normal',
    fontWeight: 'bold',
  },
  iconStyle: {
    marginRight: 4,
    marginBottom: 3,
  },
  iconStyle1: {
    marginRight: 4,
    // marginBottom: hp(`${getPercentHeight(-2)}%`),
  },
  price3Container: {
    // minWidth: (50),
  },
  price3ContainerPlaceHolder: {
    height: 20,
  },
  price3: {
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  price4: {
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Medium',
    fontStyle: 'normal',
    fontWeight: 'bold',
  },
  volumeText: {
    ...styles2.price4,
    ...styles2.vText,
    ...globalStyles.textAlignCenter,
  },
  ceilingText: {
    ...styles2.price4,
    ...styles2.cText,
    ...globalStyles.textAlignCenter,
  },
  floorText: {
    ...styles2.price4,
    ...styles2.fText,
    ...globalStyles.textAlignCenter,
  },
  marketNameContainerPlaceHolder: {
    width: 61,
    height: 26,
    borderRadius: 8,
  },
  marketNameText: {
    fontWeight: '400',
    fontSize: 12,
    color: Colors.LIGHTTextDisable,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  moreInfoContainer: {
    height: 54,
    backgroundColor: Colors.LIGHTTitleTable,
    borderTopColor: Colors.BORDER2,
    borderBottomColor: Colors.BORDER2,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  moreInfoText1: {
    color: Colors.LIGHTTextBigTitle,
    fontSize: 14,
  },
  moreInfoText2: {
    color: Colors.LIGHTTextContent,
    fontSize: 16,
  },
  chartContainer: {
    ...globalStyles.container,
    hieght: 70,
    width: 164,
    left: -14,
    marginRight: 8,
  },
  logoContainer: {
    ...globalStyles.overflowHidden,
    borderRadius: 99,
  },
  marginLeft7: {
    marginLeft: 7,
  },
  textPrice: {
    ...globalStyles.textAlignCenter,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    color: Colors.LIGHTTextTitle,
  },
  priceContainer: {
    ...globalStyles.flexDirectionRow,
    ...globalStyles.justifySpaceBetween,
    width: 158,
  },
  marginRight44: {
    marginRight: 44,
  },
  marginRight8: {
    marginRight: 8,
  },
  view2: {
    ...globalStyles.flexDirectionRow,
    ...globalStyles.alignEnd,
    marginBottom: 3,
  },
  marginTop4: {
    marginTop: 4,
  },
  symbolHeaderContainer: {
    ...globalStyles.flexDirectionRow,
    paddingBottom: 4,
  },
});
