import { Platform } from 'react-native';
import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    backgroundColor: Colors.WHITE,
  },
  TitleContainer: {
    height: 24,
    width: 343,
    marginTop: 16,
    marginLeft: 16,
  },
  TitleTextContainer: {
    height: 24,
    width: 343,
    marginTop: 32,
    marginLeft: 16,
  },
  TitleTextContainer2: {
    height: 90,
    width: 343,
    marginTop: 16,
    marginLeft: 16,
  },
  TitleText: {
    fontWeight: '700',
    fontSize: 18,
    color: Colors.LIGHTTextTitle,
  },
  TitleTextTrading: {
    fontWeight: '700',
    fontSize: 14,
    color: Colors.LIGHTTextTitle,
  },
  boxTradingReal: {
    marginLeft: 16,
    height: 54,
    width: 343,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.88,
    elevation: 5,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    marginBottom: 5,
  },
  connectButton: {
    height: 38,
    width: 92,
    marginLeft: 40,
  },
  textButton: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.BlueNewColor,
  },
  textConnected: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '400',
    color: Colors.DARK_GREEN,
  },
  textDisconnect: {
    marginLeft: 15,
    fontSize: 12,
    fontWeight: '400',
    color: Colors.LIGHTTextDisable,
  },
  connectContainer: {
    marginLeft: 50,
  },

  //MODAL
  modalBackground: {
    // backgroundColor: Colors.BACKGROUND_MODAL,
    paddingHorizontal: 16,
    backgroundColor: Colors.ModalBackgroundColor,
  },

  modalContentContainer: {
    backgroundColor: Colors.WHITE,
    alignItems: 'stretch',
    borderRadius: 21,
    width: '100%',
    paddingHorizontal: 16,
  },

  modalTitle: {
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },

  modalTitleText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.BlueNewColor,
  },
  editMarginBottom: {
    marginTop: 16,
  },
  modalActionGroup: {
    height: 130,
  },
  modalConfirmButton: {
    backgroundColor: Colors.BlueNewColor,
    height: 44,
    borderRadius: 10,
    marginBottom: 10,
  },
  executeFormButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.WHITE,
  },
  modalCancelButton: {
    backgroundColor: Colors.LIGHTBackground,
    height: 44,
    borderRadius: 10,
    marginBottom: 10,
  },
  cancelFormButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.LIGHTTextContent,
  },
  textDisconnectAccoun: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '400',
    color: Colors.LIGHTTextContent,
  },
  textDisconnectAccountContainer: {
    width: 311,
  },
  textDisconnectAccount: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.LIGHTTextContent,
  },
  border: {
    height: 1,
    width: '100%',
    backgroundColor: Colors.BORDER,
  },
  containerCheckbox: {
    marginTop: 20,
  },
  executeFormButton: {
    backgroundColor: Colors.BlueNewColor,
    height: 44,
    marginBottom: Platform.OS === 'ios' ? 12 : 20,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  executeFormEnableButton: {
    opacity: 1,
  },
  executeFormDisableButton: {
    opacity: 0.5,
  },
});
