import { Platform } from 'react-native';
import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  marginRight16: {
    marginRight: 16,
  },
  marginLeft16: {
    marginLeft: 16,
  },
  marginBottom8: {
    marginBottom: 8,
  },
  marginTop16: {
    marginTop: 16,
  },
  text: {
    color: Colors.LIGHTTextContent,
    fontSize: 14,
    paddingHorizontal: 5,
  },
  textBuy: {
    color: Colors.DARK_GREEN,
    fontSize: 14,
  },
  textSell: {
    color: Colors.LIGHTRed,
    fontSize: 14,
  },
  executeFormButton: {
    backgroundColor: Colors.BlueNewColor,
    height: 44,
    width: 343,
    borderRadius: 10,
  },
  titleContainer: {
    backgroundColor: Colors.WHITE,
  },
  executeFormContainer: {
    // paddingBottom: (24),
    paddingVertical: 18,
  },
  executeFormButtonText: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: '700',
    color: Colors.WHITE,
  },
  executeFormButtonTextDisabled: {
    color: Colors.LIGHTTextTitle,
  },
  opacityBackground: {
    backgroundColor: Colors.BACKGROUND_MODAL2,
  },
  modal: {
    height: 130,
    marginHorizontal: -16,
    marginVertical: -16,
  },
  textModal: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 10,
  },
  border: {
    borderRightColor: Colors.BORDER,
    borderRightWidth: 1,
  },
  btnIsVisible: {
    backgroundColor: Colors.BlueNewColor,
    padding: 3.5,
    borderRadius: 6,
  },
  btn: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.LIGHTTextDisable,
    height: 20,
    width: 20,
  },
  disabledBtn: {
    backgroundColor: Colors.LIGHTBGTab,
  },
  textDinOtLight: {
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontWeight: '400',
  },
  sheetContainer: {
    maxHeight: 570,
    paddingBottom: 36,
  },
  loadingText: {
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    textAlign: 'center',
    color: Colors.LIGHTTextDisable,
  },
  noDataCon: {
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontFamily: 'Roboto',
    marginTop: 16,
    fontSize: 16,
    color: Colors.LIGHTTextContent,
    textAlign: 'center',
  },
});
