import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  iDCardContainer: {
    alignSelf: 'center',
    marginVertical: 24,
  },
  paddingTop24: {
    paddingTop: 24,
  },
  paddingHorizontal14: {
    paddingHorizontal: 14,
  },
  warningText: {
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 18,
    color: Colors.LIGHTRed,
    textAlign: 'center',
  },
  openAccountText: {
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 18,
    color: Colors.BlueNewColor,
  },
  titleText: {
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 18,
    color: Colors.BLACK,
    alignSelf: 'center',
    marginBottom: 24,
  },
  ruleNumber: {
    color: Colors.WHITE,
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 18,
  },
  ruleText: {
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 18,
    color: Colors.LIGHTTextContent,
    flex: 1,
  },
  titleText2: {
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 18,
    color: Colors.LIGHTTextContent,
    marginBottom: 24,
    marginHorizontal: 51,
    textAlign: 'center',
  },
  ruleContainer: {
    height: 18,
    marginBottom: 24,
    width: 322,
    alignSelf: 'center',
  },
  numberContainer: {
    height: 30,
    width: 30,
    borderRadius: 8,
    backgroundColor: Colors.SecondColorsLogo,
    marginRight: 10,
  },
  executeButtonContainer: {
    height: 44,
    paddingHorizontal: 16,
  },
  executeButton: {
    backgroundColor: Colors.BlueNewColor,
    borderRadius: 10,
  },
  executeButtonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontStyle: 'normal',
    lineHeight: 22,
  },
});
