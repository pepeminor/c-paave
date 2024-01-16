import { isPlatformIOs, lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    position: 'relative',
    flex: 1,
  },
  heightContain: {
    height: isPlatformIOs ? 690 : 715,
  },
  textContainer: {
    marginHorizontal: 16,
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
    lineHeight: 22,
    color: Colors.LIGHTTextContent,
  },
  marginTop10: {
    marginTop: 10,
  },
  marginTop: {
    marginTop: 8,
  },
  marginTop6: {
    marginTop: 6,
  },
  textInputStyle: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: 18,
    height: 92,
  },
  textInputContainerStyle: {
    backgroundColor: Colors.LIGHTTitleTable,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.LIGHTBackground,
    paddingLeft: 10,
    paddingRight: 17,
    marginTop: 6,
  },
  wholeContainerStyle: {
    height: 92,
    width: 343,
  },
  textOption: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: 18,
    color: Colors.BLACK,
  },
  textSelected: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: 18,
    color: Colors.BlueNewColor,
    textDecorationLine: 'underline',
  },
  executeFormButton: {
    backgroundColor: Colors.BlueNewColor,
    height: 44,
    // marginBottom: Platform.OS === 'ios' ? (12) : (20),
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
  marginSpace: {
    marginTop: 16,
    marginRight: 44,
  },
  executeFormEnableButton: {
    opacity: 1,
  },
  executeFormDisableButton: {
    opacity: 0.5,
  },
  blueText: {
    color: Colors.BlueNewColor,
    fontWeight: 'bold',
  },
  marginTop16: {
    marginTop: 16,
  },
});
