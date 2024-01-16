import globalStyles, { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  modalBackground: {
    ...globalStyles.container,
    ...globalStyles.centered,
    ...globalStyles.flexDirectionRow,
    backgroundColor: Colors.BACKGROUND_MODAL,
  },
  modalOKButtonText: {
    fontWeight: '700',
    fontSize: 16,
    color: Colors.WHITE,
  },
  modalOKButton: {
    backgroundColor: Colors.BlueNewColor,
    marginHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalNoNetworkText: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
    color: Colors.LIGHTTextTitle,
    paddingTop: 10,
    marginTop: 10,
  },

  checkYourNetworkText: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    color: Colors.LIGHTTextContent,
    padding: 10,
  },

  modalContentContainer: {
    backgroundColor: Colors.WHITE,
    alignItems: 'stretch',
    borderRadius: 21,
    justifyContent: 'center',
  },
  containerImage: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 26,
  },
});
