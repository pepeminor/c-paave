import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  RealTradingSettingsContainer: {
    marginHorizontal: 16,
  },
  contentContainer: {
    marginTop: 16,
  },

  executeFormButton: {
    height: 44,
    flex: 1,
    borderRadius: 10,
  },
  executeFormDisableButton: {
    opacity: 0.5,
  },
  doneButton: {
    backgroundColor: Colors.BlueNewColor,
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.WHITE,
  },
  skipButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.BLACK,
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 37,
    paddingHorizontal: 16,
  },
  modalHeader: {
    height: 56,
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginTop: 14,
  },
  closeBtn: {
    height: 24,
    width: 24,
  },
  modalContainer: {
    paddingBottom: 16,
  },
  modalHeaderText: {
    marginRight: 16,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    lineHeight: 24,
    color: Colors.BlueNewColor,
  },
  imgContainer: {
    padding: 16,
    height: 250,
    // height: (215),
  },
  imgStyle: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  note: {
    marginTop: 26,
    fontStyle: 'normal',
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.LIGHTTextDisable,
  },
  email: {
    fontWeight: 'bold',
    color: Colors.BlueNewColor,
  },
  textContainer: {
    marginHorizontal: 16,
  },
  modalContentPoint: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.LIGHTTextContent,
    width: 14,
  },
  modalContent: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.LIGHTTextContent,
    lineHeight: 18,
    width: 329,
  },
});
