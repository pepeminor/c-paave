import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  modalBackground: {
    backgroundColor: Colors.BACKGROUND_MODAL2,
    paddingHorizontal: 16,
  },
  modalContentContainer: {
    backgroundColor: Colors.WHITE,
    borderRadius: 21,
    width: '100%',
  },
  modalTitle: {
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  modalTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.BlueNewColor,
  },
  modalContent: {
    backgroundColor: Colors.WHITE,
    borderRadius: 21,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  content: {
    marginBottom: 16,
  },
  wlNameText: {
    color: Colors.LIGHTTextTitle,
    marginBottom: 5,
  },
  executeFormButton: {
    backgroundColor: Colors.BlueNewColor,
    marginHorizontal: 16,
    height: 44,
    borderRadius: 10,
  },
  executeFormButton2: {
    backgroundColor: Colors.BlueNewColor,
    height: 44,
    borderRadius: 10,
  },
  cancelExecuteFormButton2: {
    backgroundColor: Colors.LIGHTBackground,
    height: 44,
    borderRadius: 10,
  },
  executeFormButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.WHITE,
  },
  executeFormButtonText2: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.WHITE,
  },
  cancelExecuteFormButtonText2: {
    fontSize: 16,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    color: Colors.LIGHTTextContent,
  },
  marginBottom: {
    marginBottom: 10,
  },
  marginTop: {
    marginTop: 16,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
