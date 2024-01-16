import globalStyles, { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';
import { Platform } from 'react-native';

export default getStylesHook({
  textBlockStyle: {
    ...globalStyles.flexDirectionRow,
    ...globalStyles.justifySpaceBetween,
    ...globalStyles.alignCenter,
    height: 44,
    marginTop: 8,
  },
  textBlockStyle1: {
    ...globalStyles.flexDirectionRow,
    ...globalStyles.justifySpaceBetween,
    ...globalStyles.alignCenter,
    marginTop: 8,
  },
  internalTransferContentBlock: {
    marginHorizontal: 16,
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.LIGHTTextBigTitle,
    // textTransform: 'capitalize',
  },
  contentCashTransfer: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.LIGHTTextBigTitle,
  },
  optionValue: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.LIGHTTextContent,
  },
  labelIconStyle: {
    width: 24,
    height: 24,
    color: Colors.LIGHTTextDisable,
  },
  wholeContainerContentStyle: {
    width: 178,
    height: 44,
  },
  wholeContainerContentStyle2: {
    width: '100%',
    height: 80,
    marginTop: 8,
  },
  textInputContainerContentStyle: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.BORDER,
    backgroundColor: Colors.LIGHTTitleTable,
    paddingHorizontal: 8,
  },
  textInputContainerContentError: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: Colors.LIGHTTitleTable,
    // paddingHorizontal: (8),
    borderColor: Colors.LIGHTRed,
  },
  textAreaBlock: {
    height: 104,
    marginTop: 8,
  },
  contentStyle: {
    marginBottom: 16,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentStyle2: {
    marginBottom: 16,
    marginTop: 8,
    flexDirection: 'column',
  },
  wholeContainerStyle: {
    height: 81,
    marginTop: 5,
  },
  textInputContainerStyle: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.BORDER,
    backgroundColor: Colors.LIGHTTitleTable,
  },
  textInputStyle: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    padding: 8,
    lineHeight: 20,
  },
  executeFormButton: {
    backgroundColor: Colors.BlueNewColor,
    height: 44,
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  executeFormDisableButton: {
    opacity: 0.5,
  },
  executeFormButtonText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.WHITE,
  },
  modalBackground: {
    backgroundColor: Colors.BACKGROUND_MODAL,
    paddingHorizontal: 16,
  },
  cancelFormButtonText: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.LIGHTTextContent,
  },
  modalContentContainer: {
    backgroundColor: Colors.WHITE,
    alignItems: 'stretch',
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
    fontWeight: '700',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.BlueNewColor,
  },
  modalActionGroup: {
    height: 80,
  },
  modalConfirmButton: {
    backgroundColor: Colors.BlueNewColor,
    height: 44,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalCancelButton: {
    backgroundColor: Colors.LIGHTBackground,
    height: 44,
    borderRadius: 10,
    marginBottom: 10,
  },
  paddingHorizontal16: {
    paddingHorizontal: 16,
  },
  marginTop17: {
    marginTop: 17,
  },
  marginBottom: {
    marginBottom: 10,
  },
  executeFormButton2: {
    backgroundColor: Colors.BlueNewColor,
    height: 44,
    borderRadius: 10,
  },
  executeFormButtonText2: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.WHITE,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  cancelExecuteFormButton2: {
    backgroundColor: Colors.LIGHTBackground,
    height: 44,
    borderRadius: 10,
  },
  cancelExecuteFormButtonText2: {
    fontSize: 16,
    color: Colors.LIGHTTextContent,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  internalScreenHeight: {
    position: 'relative',
    height: Platform.OS === 'ios' ? 580 : 595,
  },
  filterItemContainer: {
    paddingHorizontal: 16,
    height: 54,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  filterTextValueType: {
    fontSize: 16,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  topInfo: {
    height: 14,
  },
  filterText: {
    fontWeight: '700',
    fontSize: 16,
    color: Colors.BlueNewColor,
    marginLeft: 16,
  },
  closeType: {
    marginRight: 16,
  },
  BeneficiaryTextInputContainerStyle: {
    width: 178,
    height: 44,
    backgroundColor: Colors.LIGHTTitleTable,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.LIGHTBackground,
    paddingHorizontal: 8,
  },
  modalBackground2: {
    backgroundColor: Colors.BACKGROUND_MODAL2,
  },
  modalContentContainer1: {
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
    width: '100%',
    paddingBottom: 30,
  },
  filterTextValueSelected: {
    color: Colors.MainBlue,
  },
  filterTextValueUnselected: {
    color: Colors.LIGHTTextTitle,
  },
  optionValueContent: {
    width: 170,
    textAlign: 'right',
    fontSize: 14,
    color: Colors.LIGHTTextContent,
  },
  modalNoteContainer: {
    paddingHorizontal: 16,
    height: 54,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalNote: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.LIGHTTextTitle,
  },
});
