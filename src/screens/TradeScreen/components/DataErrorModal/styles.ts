import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  modalBackground2: {
    backgroundColor: Colors.BACKGROUND_MODAL,
    paddingHorizontal: 16,
  },
  modalTitle2: {
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
    paddingHorizontal: 16,
  },
  modalTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.BlueNewColor,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  paddingHorizontal16: {
    paddingHorizontal: 16,
  },
  marginBottom: {
    marginBottom: 10,
  },
  executeFormButtonText2: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.WHITE,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  marginTop17: {
    marginTop: 17,
  },
  modalContentContainer2: {
    backgroundColor: Colors.WHITE,
    alignItems: 'stretch',
    borderRadius: 21,
    width: '100%',
    paddingBottom: 16,
  },
  executeModalEachItem2: {
    height: 44,
    paddingHorizontal: 16,
  },
  executeLabelText: {
    fontWeight: 'bold',
    color: Colors.LIGHTTextBigTitle,
    textAlign: 'left',
    fontSize: 14,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  executeFormButton2: {
    backgroundColor: Colors.BlueNewColor,
    height: 44,
    borderRadius: 10,
  },
});
