import { Platform } from 'react-native';
import globalStyles, { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  borderLeft: {
    borderLeftColor: Colors.BORDER,
    borderLeftWidth: 1,
  },
  leftArea: {
    flex: 40,
  },
  quoteTextContainer: {
    height: 32,
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
  },
  optionContainerSelected: {
    backgroundColor: Colors.WHITE,
  },
  selectedText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.DARK_GREEN,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  unselectedText: {
    fontSize: 14,
    color: Colors.LIGHTTextTitle,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  selectedTextSell: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.LIGHTRed,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  screenOptionPlaceHolder: {
    height: 15,
    marginHorizontal: 8,
    borderRadius: 10,
    marginBottom: 11,
  },
  typeFormPlaceHolderContainer: {
    marginHorizontal: 8,
    marginBottom: 10,
    borderRadius: 10,
    height: 38,
  },
  eachPriceInput: {
    ...globalStyles.fillWidth,
    paddingBottom: 10,
    paddingHorizontal: 8,
  },
  marginBottomn: {
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  typeFormPlaceHolderContainer2: {
    borderRadius: 10,
    height: 38,
    ...globalStyles.fillWidth,
  },
  rateContainerPlaceHolder: {
    ...globalStyles.alignCenter,
    ...globalStyles.flexDirectionRow,
    ...globalStyles.fillWidth,
    paddingTop: 3,
  },
  rateThemeIconPlaceHolderContainer: {
    height: 26,
    borderRadius: 6,
    ...globalStyles.container,
    ...globalStyles.overflowHidden,
  },
  width5: {
    width: 5,
  },
  datePickerContainer: {
    paddingBottom: 8,
    paddingHorizontal: 8,
  },
  datePickerContainer2: {
    paddingHorizontal: 8,
  },
  executeButtonContainer: {
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  backgroundColorBuy: {
    backgroundColor: Colors.DARKButtonGreen,
  },
  backgroundColorSell: {
    backgroundColor: Colors.LIGHTButtonRed,
  },
  executeButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.WHITE,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  executeButton: {
    height: 44,
    borderRadius: 10,
  },
  optionContainer: {
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    padding: 4,
  },
  screenOption: {
    ...globalStyles.flexDirectionRow,
    marginHorizontal: 8,
    backgroundColor: Colors.LIGHTBGTab,
    borderRadius: 10,
    padding: 4,
    justifyContent: 'space-between',
  },
  quoteText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.LIGHTTextBigTitle,
    paddingLeft: 8,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  arrowRight: {
    paddingRight: 8,
  },
  rightArea: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 8,
    minHeight: 350,
    ...globalStyles.borderTop1,
    zIndex: 5,
  },
  formInfo: {
    ...globalStyles.flexDirectionRow,
    ...globalStyles.alignCenter,
    marginHorizontal: 8,
    marginBottom: 3,
  },
  formInfoLabel: {
    color: Colors.LIGHTTextTitle,
    fontSize: 12,
    marginRight: 5,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  formInfoValue: {
    fontSize: 14,
    color: Colors.LIGHTTextContent,
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Medium',
    fontStyle: 'normal',
    marginRight: 5,
    textAlign: 'right',
    flex: 1,
  },
  labelPlaceHolderContainer: {
    height: 16,
    width: 73,
  },
  formInfo2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    marginBottom: 8,
  },
  selectorContainer: {
    height: 30,
  },
  formItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  iconContainer: {
    width: 16,
    height: 16,
    marginTop: 1,
  },
  containerPrice: {
    paddingVertical: 4,
    paddingHorizontal: 4,
    marginLeft: 0,
  },
  containerRowPrice: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.LIGHTBGTab,
    borderRadius: 8,
    justifyContent: 'center',
  },
  containerItemPrice: {
    flex: 1,
    paddingHorizontal: 2,
  },
  textPrice: {
    fontSize: 12,
    color: Colors.LIGHTTextTitle,
  },
  containerInputPrice: { flexDirection: 'row', marginBottom: 4, paddingHorizontal: 4, justifyContent: 'space-between' },
});
