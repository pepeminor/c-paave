import { Platform, StyleSheet } from 'react-native';
import globalStyles, { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

const styles2 = StyleSheet.create({
  bidAskTitleContainer: {
    height: 30,
    // width: getResponsiveWidth(168.75),
    paddingHorizontal: 10,
  },
  cfContainer2: {
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
    backgroundColor: Colors.Ask,
    // paddingHorizontal: wp(`${getPercentWidth(8)}%`),
    // paddingTop: hp(`${getPercentHeight(8)}%`),
    // paddingBottom: hp(`${getPercentHeight(9)}%`),
  },
  cfContainer3: {
    backgroundColor: Colors.Bid,
    // paddingHorizontal: wp(`${getPercentWidth(8)}%`),
    // paddingTop: hp(`${getPercentHeight(8)}%`),
    // paddingBottom: hp(`${getPercentHeight(9)}%`),
  },
});

export default getStylesHook({
  container: {
    height: 256,
    width: 168.75,
  },
  container2: {
    height: 300,
    width: 168.75,
  },
  flex6: {
    backgroundColor: Colors.BACKGROUND_MODAL,
    flex: 6,
  },
  cfContainer: {
    flex: 1,
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
    // paddingHorizontal: (8),
    // paddingTop: (8),
    // paddingBottom: (9),
  },
  zIndex1: {
    zIndex: 1,
  },
  paddingLeft5: {
    paddingLeft: 5,
  },
  marginLeft5: {
    marginLeft: 5,
  },
  elementContainer: {
    //globalStyles.container, globalStyles.flexDirectionRow, globalStyles.alignCenter
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
  },
  elementButton: {
    position: 'absolute',
    zIndex: 1,
    paddingHorizontal: 5,
    height: '100%',
    justifyContent: 'center',
  },
  quantityTextContainer: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    alignItems: 'flex-end',
  },
  quantityText: {
    position: 'absolute',
    color: Colors.LIGHTTextContent,
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontStyle: 'normal',
    fontWeight: '400',
    textAlign: 'right',
    right: 5,
  },
  borderTop: {
    borderTopColor: Colors.BORDER,
    borderTopWidth: 1,
  },
  borderBottom: {
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
    backgroundColor: Colors.Ask,
  },
  cConatiner: {
    backgroundColor: Colors.Ask,
  },
  fConatiner: {
    backgroundColor: Colors.caribBean,
  },
  cfText: {
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Medium',
    fontStyle: 'normal',
    fontWeight: '500',
  },
  cfTextPlaceHolder: {
    height: 17,
    width: 45,
  },
  cText: {
    color: Colors.LIGHTPurple,
  },
  fText: {
    color: Colors.LIGHTTeal,
  },
  borderRight: {
    borderRightColor: Colors.BORDER,
    borderRightWidth: 1,
  },
  textLeft: {
    fontSize: 14,
    color: Colors.LIGHTTextContent,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  padding10: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  backgroundBid: {
    backgroundColor: Colors.Bid,
  },
  paddingVertical6: {
    paddingVertical: 6,
  },
  textBid: {
    paddingTop: 2,
    fontSize: 14,
    color: Colors.BLACK,
    fontFamily: 'DINOT',
    fontStyle: 'normal',
    fontWeight: 'bold',
  },
  textOption: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: 18,
    color: Colors.BLACK,
    marginLeft: -6,
  },
  blueText: {
    color: Colors.BlueNewColor,
    fontWeight: 'bold',
  },
  bidAskTitleContainerContainer: {
    ...globalStyles.flexDirectionRow,
    ...globalStyles.justifySpaceBetween,
    ...globalStyles.alignCenter,
    ...styles2.bidAskTitleContainer,
    ...styles2.cfContainer2,
  },
  bidAskTitleContainerContainer2: {
    ...globalStyles.flexDirectionRow,
    ...globalStyles.justifySpaceBetween,
    ...globalStyles.alignCenter,
    ...styles2.bidAskTitleContainer,
    ...styles2.cfContainer3,
  },
});
