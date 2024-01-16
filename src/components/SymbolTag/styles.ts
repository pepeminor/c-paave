import {} from 'styles';
import { getStylesHook } from 'hooks/useStyles';
import { Platform } from 'react-native';

export default getStylesHook({
  // symbolTag component style
  // symbolTagContainer: {
  //   width: (375),
  //   height: (54),
  //   paddingHorizontal: (8),
  //   paddingVertical: (5),
  //   borderBottomWidth: 1,
  //   borderBottomColor: Colors.BORDER
  // },
  // leftIcon: {
  //   width: (32),
  // },
  // middleContainer: {
  //   width: (252),
  //   height: (44),
  //   flexDirection: 'row',
  //   paddingHorizontal: (5),
  // },
  // infoContainer: {
  //   width: (122),
  //   justifyContent: 'center'
  // },
  // stockCode: {
  //   color: Colors.LIGHTTextBigTitle,
  //   fontSize: (14),
  //   fontWeight: '700',
  //   paddingBottom: (3),
  // },
  // stockName: {
  //   color: Colors.LIGHTTextDisable,
  //   fontSize: (10),
  // },
  // priceContainer: {
  //   width: (118),
  //   alignItems: 'flex-end',
  //   justifyContent: 'center'
  // },
  // closePrice: {
  //   fontSize: (16),
  //   fontWeight: '500',
  //   paddingBottom: (3),
  // },
  // rateChange: {
  //   fontSize: (14),
  //   fontWeight: '500',
  // },
  // changeGapPrice: {
  //   fontSize: (14),
  //   fontWeight: '500',
  //   width: (45),
  //   textAlign: 'right',
  // },
  // lineChart: {
  //   width: (60),
  //   height: (44),
  // },
  // deleteContainer: {
  //   backgroundColor: Colors.LIGHTButtonRed,
  //   width: (65),
  // },
  skeletonLayout1: {
    width: 105,
    height: 30,
  },
  skeletonLayout: {
    width: 65,
    height: 20,
    marginTop: 5,
  },
  skeletonLayout2: {
    width: 50,
    height: 20,
    marginTop: 4,
    marginRight: 10,
    marginLeft: 4,
  },
  skeletonLayout3: {
    width: 30,
    height: 20,
    marginTop: 4,
  },
  sessionPriceContainer: {
    marginRight: 4,
    fontSize: 14,
    marginTop: Platform.OS === 'ios' ? 4 : -1,
  },
  iconContainerIOS: { marginTop: -1, marginBottom: 2 },
  iconContainerAndroid: { marginTop: -4, marginBottom: 2 },
});
