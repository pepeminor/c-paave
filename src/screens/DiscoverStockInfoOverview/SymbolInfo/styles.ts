import { Platform } from 'react-native';
import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  stockInfoContainer2: {
    height: 86,
    flexDirection: 'row',
  },
  logoContainer: {
    borderRadius: 99,
    overflow: 'hidden',
  },
  symbolTagContainer: {
    flex: 1,
    padding: 0,
  },
  touchableOpacityContainer: {
    flex: 1,
    height: '100%',
  },
  containerRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  containerAiRating: {
    flexDirection: 'row',
    paddingRight: 12,
    paddingTop: 10,
  },
  middleContainer: {
    flexDirection: 'column',
    paddingLeft: 8,
    paddingTop: 8,
    flex: 1,
  },
  infoContainer: {
    // width: (2),
    width: '100%',
    paddingRight: 15,
    height: 18 * 2,
    justifyContent: 'center',
  },
  stockName: {
    color: Colors.LIGHTTextBigTitle,
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 15,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: 18,
    width: 218,
  },
  priceContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  closePrice: {
    fontSize: 24,
    fontWeight: '400',
    top: 2,
    // marginRight: getResponsiveWidth(10),
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontStyle: 'normal',
  },
  rateChange: {
    fontSize: 14,
    fontWeight: '400',
    paddingLeft: 5,
    paddingTop: Platform.OS === 'android' ? -3 : 0,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontStyle: 'normal',
  },
  changeGapPrice: {
    fontSize: 14,
    fontWeight: '400',
    paddingLeft: 5,
    paddingTop: Platform.OS === 'android' ? -3 : 0,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontStyle: 'normal',
  },
  fontSize20: {
    fontSize: Platform.OS === 'ios' ? 20 : 18,
  },
  fontSize12: {
    fontSize: 12,
  },
  spacePrice: {
    marginTop: Platform.OS === 'android' ? -6 : 1,
  },
  paddingTop10: {
    paddingTop: 10,
  },
  paddingRight12: {
    paddingRight: 12,
  },
  paddingHorizontal8: {
    paddingHorizontal: 8,
  },
  scoreContainer: {
    height: 26,
    width: 42,
    borderWidth: 2,
    borderColor: '#EB554C',
    borderRadius: 8,
    marginRight: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  score: {
    color: '#EB554C',
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  askScoreIcon: {
    alignSelf: 'flex-start',
    marginTop: 3,
  },
  price4: {
    fontSize: 13,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Medium',
    fontStyle: 'normal',
    fontWeight: '700',
    marginLeft: 5,
    lineHeight: 14,
  },
  textPrice: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 12,
    color: Colors.LIGHTTextTitle,
  },
  wrapCurrentSymbol: {
    right: 6,
    flexDirection: 'row',
  },
  containerPrice: {
    alignItems: 'center',
    paddingHorizontal: 8,
    flexDirection: 'column',
  },
  textCeiling: {
    textAlign: 'right',
    fontSize: 13,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Medium',
    fontStyle: 'normal',
    fontWeight: '700',
    marginLeft: 5,
    lineHeight: 14,
    color: Colors.LIGHTPurple,
  },
  textRef: {
    textAlign: 'right',
    fontSize: 13,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Medium',
    fontStyle: 'normal',
    fontWeight: '700',
    marginLeft: 5,
    lineHeight: 14,
    color: Colors.LIGHTYellow,
  },
  textFloor: {
    textAlign: 'right',
    fontSize: 13,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Medium',
    fontStyle: 'normal',
    fontWeight: '700',
    marginLeft: 5,
    lineHeight: 14,
    color: Colors.LIGHTTeal,
  },
  textBold: {
    fontWeight: 'bold',
  },
});
