import { lightColors as Colors } from '../../styles/index';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  btnEnable: {
    width: '92%',
    marginHorizontal: 16,
    backgroundColor: Colors.BlueNewColor,
    paddingVertical: 16,
    paddingHorizontal: '4%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 16,
    marginTop: 8,
  },
  cancelText: {
    fontSize: 14,
    color: Colors.WHITE,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  symbolItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    paddingLeft: 16,
    paddingRight: 18,
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
  },
  logoContainer: {
    overflow: 'hidden',
    borderRadius: 99,
  },
  nameContainer: {
    flex: 1,
    marginRight: 17,
    marginLeft: 4,
  },
  stockCodeText: {
    fontWeight: '700',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.LIGHTTextBigTitle,
    fontSize: 14,
  },
  fullNameText: {
    fontSize: 10,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.LIGHTTextDisable,
    marginTop: 3,
  },
  heartContainer: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginHorizontal: -20,
  },
  recentViewContainer: {
    marginBottom: 13,
    paddingTop: 15,
    paddingHorizontal: 16,
  },
  recentViewText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.LIGHTTextBigTitle,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  deleteAllText: {
    fontSize: 12,
    color: Colors.LIGHTRed,
    marginRight: 1,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  skeletonLayoutRecent: {
    padding: 10,
    height: 87,
  },
  headerTitleContainer: {
    alignItems: 'center',
    paddingLeft: 14,
    paddingRight: 19,
    height: 38,
  },
  wholeContainerStyleIOS: {
    height: 44,
    width: 343,
  },
  iconStyle: {
    marginLeft: 290,
    marginTop: -34,
  },
  textInputSearchStyle: {
    fontSize: 14,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.LIGHTTextContent,
    width: 250,
    marginLeft: 10,
    height: 44,
  },
  textInputContainerIOS: {
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.LIGHTBackground,
    backgroundColor: Colors.LIGHTTitleTable,
    flexDirection: 'row',
    alignItems: 'center',
    height: 36,
  },
  numberSymbolText: {
    fontSize: 14,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.LIGHTTextDisable,
  },
  recentViewContainer2: {
    marginLeft: 16,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    paddingBottom: 2,
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
  },
  recentViewItemContainer: {
    height: 34,
    width: 79.75,
    borderRadius: 8,
    backgroundColor: Colors.LIGHTBackground,
    marginBottom: 8,
    marginRight: 8,
  },
  recentViewItemText: {
    color: Colors.LIGHTTextBigTitle,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  paddingFix: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingVertical: 8,
  },
});
