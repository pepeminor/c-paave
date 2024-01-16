import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  containerContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  modalBackground: {
    backgroundColor: Colors.BACKGROUND_MODAL,
    paddingHorizontal: 16,
  },
  errorTextModal: {
    marginTop: 24,
    marginBottom: 34,
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 22,
    color: Colors.LIGHTTextContent,
    marginHorizontal: 20,
  },
  executeButtonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontStyle: 'normal',
    lineHeight: 22,
  },
  executeButton: {
    backgroundColor: Colors.BlueNewColor,
    borderRadius: 10,
  },
  executeButtonContainer: {
    height: 44,
    paddingHorizontal: 20,
  },
  modalContentContainer: {
    // alignItems: 'stretch',
    backgroundColor: Colors.WHITE,
    borderRadius: 21,
    width: '100%',
    paddingTop: 10,
    paddingBottom: 20,
  },
  titleText: {
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 18,
    color: Colors.Gray2,
    marginBottom: 32,
    marginTop: 34,
  },
  investorButtonContainer: {
    height: 50,
    paddingLeft: 16,
    width: '100%',
    borderRadius: 10,
  },
  investorText: {
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 18,
    color: Colors.Gray2,
  },
  shadow: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,

    elevation: 5,
    backgroundColor: Colors.WHITE,
  },
  marginBottom: {
    marginBottom: 20,
  },
});
