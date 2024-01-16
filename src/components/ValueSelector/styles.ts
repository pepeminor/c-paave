import { Platform } from 'react-native';
import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  root: {
    // justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.LIGHTBackground,
    // height: (38),
    borderRadius: 10,
    overflow: 'hidden',
  },
  rootFocusing: {
    // justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: Colors.BlueNewColor,
    // height: (39),
    borderRadius: 10,
    overflow: 'hidden',
  },
  errRoot: {
    // justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.LIGHTRed2,
    // width: (171),
    // height: (38),
    borderRadius: 10,
    backgroundColor: Colors.LIGHTRed3,
    overflow: 'hidden',
  },
  buttonLeft: {
    width: 30,
    height: 30,
    backgroundColor: Colors.LIGHTBackground,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonRight: {
    width: 30,
    height: 30,
    backgroundColor: Colors.LIGHTBackground,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  quantity: {
    lineHeight: 14,
    fontSize: 14,
    color: Colors.LIGHTTextContent,
    paddingTop: 0,
    paddingBottom: 0,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  errQuantity: {
    fontSize: 14,
    paddingTop: 0,
    paddingBottom: 0,
    color: Colors.LIGHTRed2,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  errText: {
    color: Colors.LIGHTRed2,
    fontSize: 12,
    fontWeight: '400',
    margin: 3,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  titleStyle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.LIGHTTextTitle,
    marginBottom: 3,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  textInTextInput: {
    paddingHorizontal: 10,
  },
});
