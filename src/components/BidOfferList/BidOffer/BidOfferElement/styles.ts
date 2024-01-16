import { Platform } from 'react-native';
import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
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
  textLeft: {
    fontSize: 14,
    color: Colors.LIGHTTextContent,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontStyle: 'normal',
    fontWeight: '400',
  },
});
