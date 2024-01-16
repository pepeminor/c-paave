import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  iDCardContainer: {
    alignSelf: 'center',
    marginVertical: 24,
  },
  marginVertical3: {
    marginVertical: 3,
  },
  kisBankBranchItemContainer: {
    height: 44,
    paddingLeft: 16,
    paddingRight: 139,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  kisBankBranchItemText: {
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 18,
    color: Colors.LIGHTTextContent,
  },
  marginHorizontal10: {
    marginHorizontal: 10,
  },
  textInputContainerStyle: {
    borderRadius: 10,
    backgroundColor: Colors.LIGHTTitleTable,
    borderWidth: 1,
    borderColor: Colors.LIGHTBackground,
  },
  marginHorizontal16: {
    marginHorizontal: 16,
  },
  wholeContainerStyle3: {
    height: 40,
  },
  marginRight16: {
    marginRight: 16,
  },
  headerModalize1: {
    height: 56,
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
  },
  headerModalize3: {
    height: 116,
  },
  headerModalize2: {
    height: 60,
  },
  headerModalize1Text: {
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 22,
    color: Colors.BlueNewColor,
    marginLeft: 16,
  },
  bankNameShortDisplay: {
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 18,
    color: Colors.LIGHTTextContent,
    flex: 1,
  },
  labelTextStyle: {
    color: Colors.LIGHTTextTitle,
    marginBottom: 3,
    fontSize: 14,
    lineHeight: 18,
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontStyle: 'normal',
  },
  bankPickerContainer: {
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.LIGHTBackground,
    backgroundColor: Colors.LIGHTTitleTable,
    paddingHorizontal: 10,
  },
  titleText: {
    fontSize: 24,
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 30,
    color: Colors.LIGHTTextBigTitle,
    marginBottom: 18,
    marginTop: 18,
    marginLeft: 10,
  },
  fieldContainer: {
    minHeight: 40,
    marginHorizontal: 16,
  },
  fieldKeyText: {
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 18,
    color: Colors.LIGHTTextTitle,
    width: 88,
    marginRight: 8,
  },
  fieldValueText: {
    fontSize: 13,
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 16,
    color: Colors.LIGHTTextContent,
    width: 187,
  },
  marginBottom26: {
    marginBottom: 26,
  },
  executeButtonContainer: {
    height: 44,
    paddingHorizontal: 16,
  },
  executeButton: {
    backgroundColor: Colors.BlueNewColor,
    borderRadius: 10,
  },
  executeButtonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontStyle: 'normal',
    lineHeight: 22,
  },
  wholeContainerStyle: {
    height: 30,
    flex: 1,
  },
  textInputContainerStyle2: {
    backgroundColor: Colors.LIGHTTitleTable,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.LIGHTBackground,
  },
  textInputContainerStyleError2: {
    backgroundColor: Colors.red01,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.Ask1,
  },
  textInputStyle: {
    height: '100%',
    fontSize: 14,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 10,
    // color: Colors.BLACK,
  },
  textError: {
    color: Colors.LIGHTRed,
    fontWeight: '400',
    fontSize: 14,
    fontFamily: 'Roboto',
    lineHeight: 18,
    fontStyle: 'italic',
    marginHorizontal: 16,
  },
  height18: {
    height: 18,
  },
  datePickerContainer: {},
});
