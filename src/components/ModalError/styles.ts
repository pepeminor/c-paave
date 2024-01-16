import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  modalBackground: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_MODAL2,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContentContainer: {
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
    borderRadius: 21,
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  containerContent: {
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 16,
    borderRadius: 21,
  },
  modalTitle: {
    textAlign: 'center',
  },
  subTitle: {
    marginTop: 16,
    textAlign: 'center',
  },
  modalContent: {
    paddingVertical: 16,
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
    borderRadius: 10,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    paddingVertical: 12,
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
});
