import { Platform } from 'react-native';
import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    height: 154,
  },
  quoteItemContainer: {
    flex: 1,
    borderTopColor: Colors.BORDER,
    borderTopWidth: 1,
  },
  quoteItemContainer2: {
    height: '16.67%',
    borderTopColor: Colors.BORDER,
    borderTopWidth: 1,
  },
  timePlaceHolderContainer: {
    height: 14,
    width: 30,
  },
  timeContainer: {
    width: 35,
  },
  price1PlaceHolderContainer: {
    height: 14,
    width: 41,
  },
  borderLeft1: {
    borderLeftColor: Colors.BORDER,
    borderLeftWidth: 1,
  },
  borderRight1: {
    borderRightColor: Colors.BORDER,
    borderRightWidth: 1,
  },
  borderBottom1: {
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
  },
  timeText: {
    color: Colors.BLACK,
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Medium',
    fontStyle: 'normal',
    fontWeight: '500',
  },
  priceText: {
    color: Colors.BLACK,
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Medium',
    fontStyle: 'normal',
    fontWeight: '500',
  },
  noDataCon: {
    // width: (150),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  noDataText: {
    marginTop: 8,
    fontSize: 12,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    color: Colors.LIGHTTextContent,
  },
  padding10: {
    paddingHorizontal: 10,
  },
});
