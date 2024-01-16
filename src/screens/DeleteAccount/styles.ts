import { Platform } from 'react-native';
import { isPlatformIOs, lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  heightContain: {
    height: isPlatformIOs ? 700 : 735,
  },
  textContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  textTitle: {
    fontSize: 16,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 22,
    color: Colors.LIGHTText,
  },
  textContent: {
    fontSize: 14,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 18,
    color: Colors.LIGHTTextContent,
  },
  marginTop10: {
    marginTop: 10,
  },
  paddingLeft8: {
    paddingLeft: 8,
  },
  marginTop2: {
    marginTop: 2,
  },
  marginLeft8: {
    marginLeft: 8,
  },
  textInputStyle: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: 14,
  },
  textInputContainerStyle: {
    backgroundColor: Colors.LIGHTTitleTable,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.LIGHTBackground,
    paddingLeft: 10,
    paddingRight: 17,
    height: 44,
  },
  wholeContainerStyle: {
    height: 44,
    width: 343,
    marginTop: 10,
  },
  executeFormButton: {
    backgroundColor: Colors.RedColorLogo,
    height: 44,
    marginBottom: Platform.OS === 'ios' ? 12 : 20,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  executeFormButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.WHITE,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: 22,
  },
  executeFormEnableButton: {
    opacity: 1,
  },
  executeFormDisableButton: {
    opacity: 0.5,
  },
  marginTop16: {
    marginTop: 16,
  },
  iconStyle: {
    marginHorizontal: 14,
  },
  wholeContainerVerticalStyle: {
    marginTop: 15,
  },
  dotContent: {
    lineHeight: 36,
    color: Colors.BLACK,
  },
});
