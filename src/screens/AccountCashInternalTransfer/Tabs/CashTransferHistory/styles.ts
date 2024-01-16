import globalStyles, { isPlatformIOs, lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  columnText: {
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 14,
  },
  cashTransferHistory: {
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.LIGHTTextBigTitle,
    textTransform: 'capitalize',
  },
  labelIconStyle: {
    width: 24,
    height: 24,
    color: Colors.LIGHTTextDisable,
  },
  dateRangeStyle: {
    marginTop: 8,
    ...globalStyles.flexDirectionRow,
    ...globalStyles.justifySpaceBetween,
    ...globalStyles.alignCenter,
  },
  fromDateStyle: {
    marginRight: 7.5,
    flex: 1,
  },
  toDateStyle: {
    marginLeft: 7.5,
    flex: 1,
  },
  spaceBlock: {
    height: 8,
    backgroundColor: Colors.LIGHTBackground,
  },
  pickerModalStyle: {
    paddingHorizontal: 16,
  },

  // fix text transfer amount
  paddingTextRight: {
    paddingRight: 6,
  },

  transactionHistoryTable: {
    backgroundColor: Colors.WHITE,
    // intertal transfer
    height: 440,
    paddingBottom: isPlatformIOs ? 30 : 50,
  },

  transactionHistoryTableNoData: {
    backgroundColor: Colors.WHITE,
    height: 224,
  },

  flatListHeight: {
    height: 330,
  },

  loadingText: {
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    textAlign: 'center',
    color: Colors.LIGHTTextDisable,
  },
  topInfo: {
    height: 14,
  },
  filterText: {
    fontWeight: '700',
    fontSize: 16,
    color: Colors.BlueNewColor,
    marginLeft: 16,
    flex: 1,
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
  modalBackground: {
    backgroundColor: Colors.BACKGROUND_MODAL2,
    justifyContent: 'flex-end',
    flex: 1,
  },
  modalContentContainer1: {
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
    width: '100%',
    paddingBottom: 30,
    justifyContent: 'center',
  },
  filterTextValueSelected: {
    color: Colors.MainBlue,
  },
  filterTextValueUnselected: {
    color: Colors.LIGHTTextTitle,
  },
  modalTitle: {
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
    alignItems: 'center',
    flexDirection: 'row',
  },
  filterItemContainer: {
    paddingHorizontal: 16,
    height: 54,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
    alignItems: 'center',
    flexDirection: 'row',
  },
  filterTextValueType: {
    fontSize: 16,
  },
  TitleStatus: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 14,
    color: Colors.BlueNewColor,
    marginVertical: 23,
  },
  CustomPickerStatus: {
    marginLeft: 28,
  },
  typeTextInputContainerStyle: {
    width: 250,
    height: 44,
    backgroundColor: Colors.LIGHTTitleTable,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.LIGHTBackground,
    alignItems: 'center',
    flexDirection: 'row',
  },
  colorLightTextContent: {
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.LIGHTTextContent,
    fontSize: 14,
    marginLeft: 10,
  },
  noDataText: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.LIGHTTextContent,
    textAlign: 'center',
  },
  noDataCon: {
    width: 375,
    height: 162,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  rowConfigTable: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowConfigTable1: {
    width: '100%',
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderRightColor: Colors.BORDER,
    borderRightWidth: 1,
  },
  rowConfigTable2: {
    borderRightColor: Colors.BORDER,
    borderRightWidth: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
