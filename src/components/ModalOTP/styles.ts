import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  modalBackground: {
    paddingHorizontal: 16,
  },
  modalContentContainer: {
    backgroundColor: Colors.WHITE,
    borderRadius: 21,
    width: '100%',
    paddingVertical: 16,
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
    fontWeight: '700',
    color: Colors.WHITE,
  },
  cancelExecuteFormButtonText2: {
    fontSize: 16,
    color: Colors.LIGHTTextContent,
  },
  marginBottom: {
    marginBottom: 10,
  },
  disabledButton: {
    backgroundColor: Colors.LIGHTBackground,
  },
  disabledButtonText: {
    color: Colors.LIGHTTextDisable,
  },
  errorExitStyle: {
    marginTop: -10,
  },
  errorExitContentStyle: {
    color: Colors.LIGHTRed,
    fontSize: 12,
  },
});
