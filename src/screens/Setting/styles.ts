import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';
import { Platform } from 'react-native';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  settingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    paddingHorizontal: 16,
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
  },
  settingContainer2: {
    height: 76,
    paddingHorizontal: 16,
  },
  borderBottom1: {
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
  },
  settingItemText: {
    flex: 1,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.LIGHTText,
    fontSize: 14,
  },
  notificationText: {
    color: Colors.LIGHTText,
    fontWeight: '700',
    marginBottom: 2,
    fontSize: 14,
  },
  notificationText2: {
    fontSize: 14,
    color: Colors.LIGHTTextContent,
    flexWrap: 'wrap',
  },
  notificationText3: {
    fontSize: 14,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    color: Colors.LIGHTTextContent,
  },
  switchContainer: {
    paddingLeft: 57,
  },
  modalBackground: {
    paddingHorizontal: 16,
  },
  modalBackground2: {
    backgroundColor: Colors.BACKGROUND_MODAL2,
  },
  modalContainer: {
    backgroundColor: Colors.WHITE,
    borderRadius: 21,
    // height: (338),
    width: 343,
    paddingHorizontal: 16,
    marginBottom: Platform.OS === 'ios' ? 50 : 0,
  },
  modalTitleContainer: {
    height: 52,
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
  },
  modalTitleText2: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: 24,
    textAlign: 'center',
    color: Colors.BlueNewColor,
  },
  marginTop17: {
    marginTop: 17,
  },
  marginBottom10: {
    marginBottom: 10,
  },
  marginBottom16: {
    marginBottom: 16,
  },
  executeFormButton3: {
    backgroundColor: Colors.BlueNewColor,
    width: '100%',
    height: 44,
    borderRadius: 10,
  },
  executeFormButton2: {
    backgroundColor: Colors.LIGHTBackground,
    width: '100%',
    height: 44,
    borderRadius: 10,
  },
  cancelExecuteFormButton2: {
    backgroundColor: Colors.LIGHTBackground,
    height: 44,
    borderRadius: 10,
  },
  cancelExecuteFormButtonText2: {
    fontSize: 16,
    color: Colors.LIGHTTextContent,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  executeFormButtonText2: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.WHITE,
  },
  executeFormButtonTextDisable: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.LIGHTTextDisable,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
});
