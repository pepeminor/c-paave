import config from 'config';
import { Platform } from 'react-native';
import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    backgroundColor: Colors.WHITE,
  },
  logoContainer: {
    borderRadius: 99,
  },
  symbolTagContainer: {
    width: 375,
    height: config.watchListItemHeight,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  middleContainer: {
    flex: 1,
    height: 44,
    flexDirection: 'row',
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  infoContainer: {
    width: 100,
  },
  stockCode: {
    color: Colors.LIGHTTextBigTitle,
    fontSize: 14,
    fontWeight: '700',
    marginTop: -5,
    marginLeft: 4,
  },
  stockName: {
    color: Colors.LIGHTTextDisable,
    fontSize: 10,
    marginLeft: 4,
  },
  priceContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  closePrice: {
    fontSize: 16,
    fontWeight: '500',
    // paddingBottom: (3),
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Medium',
  },
  rateChange: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Medium',
  },
  changeGapPrice: {
    fontSize: 14,
    fontWeight: '500',
    width: 45,
    textAlign: 'right',
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Medium',
  },
  deleteContainer: {
    backgroundColor: Colors.LIGHTButtonRed,
    width: 65,
  },
});
