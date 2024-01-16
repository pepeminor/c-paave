import { Platform } from 'react-native';
import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  skeletonStyle: {
    height: 36,
    marginBottom: 1,
  },
  border1: {
    borderRightColor: Colors.BORDER,
    borderRightWidth: 1,
  },
  date: {
    color: Colors.LIGHTTextContent,
    fontSize: 14,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  paddingRight: {
    paddingRight: 6,
  },
  quantity: {
    fontSize: 14,
    color: Colors.LIGHTTextContent,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  widthContext: {
    width: 65,
    textAlign: 'right',
  },
  widthContext1: {
    width: 45,
    textAlign: 'right',
  },
  iconStyle: {
    marginHorizontal: 5,
  },
  paddingBottom7: {
    paddingBottom: 7,
  },
});
