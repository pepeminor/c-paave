import { getStylesHook } from 'hooks/useStyles';
import globalStyles, { Colors } from 'styles';

export default getStylesHook({
  button: {
    ...globalStyles.centered,
    marginTop: 16,
    height: 44,
    backgroundColor: Colors.Yellow4,
    borderRadius: 10,
  },

  buttonGradientStyle: {
    ...globalStyles.centered,
    ...globalStyles.container2,
    borderRadius: 10,
  },

  submitText: {
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontStyle: 'normal',
    color: Colors.WHITE,
  },

  containerStyle: {
    flex: 1,
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },

  ThankYouContainer: {
    ...globalStyles.centered,
    marginTop: 28,
    height: 261,
  },

  thankYouContainerShadow: {
    position: 'absolute',
    borderRadius: 100,
    width: 161,
    height: 161,
    paddingHorizontal: 28,
    opacity: 0.6,
  },

  thankYouBackgroundDarkBlue: {
    backgroundColor: Colors.Blue6,
  },

  thankYouBackgroundLightBlue: {
    backgroundColor: Colors.Blue7,
  },

  thankYouImgContainer: {
    backgroundColor: Colors.WHITE,
    borderRadius: 100,
    width: 161,
    height: 161,
    paddingHorizontal: 28,
  },

  thankYouText: {
    color: Colors.Yellow5,
    fontSize: 24,
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontStyle: 'normal',
    textAlign: 'center',
  },

  thankYouTextDes2: {
    color: Colors.WHITE,
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontStyle: 'normal',
    textAlign: 'center',
  },

  thankYoutextDes2: {
    marginTop: 15,
    color: Colors.WHITE,
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontStyle: 'normal',
    textAlign: 'center',
  },
});
