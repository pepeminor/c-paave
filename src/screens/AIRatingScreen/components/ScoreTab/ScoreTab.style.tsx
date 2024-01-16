import { lightColors as Colors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';
import { Platform } from 'react-native';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    marginTop: 8,
  },
  flatListContainer: {
    paddingBottom: 72,
  },
  styleSection: {
    backgroundColor: Colors.WHITE,
    borderBottomWidth: 8,
    borderColor: Colors.BACKGROUND_MODAL,
    width: '100%',
    height: Platform.OS === 'android' ? 480 : 490,
  },
  styleSection2: {
    backgroundColor: Colors.WHITE,
  },
  styleSection3: {
    borderBottomWidth: 8,
    borderColor: Colors.BACKGROUND_MODAL,
  },
  // top buttons
  optionButtonContainer: {
    // flexDirection: 'row',
    // height: (50),
    paddingHorizontal: 16,
    paddingVertical: 8,
    // backgroundColor: 'red',
  },
  optionContainerSelected: {
    backgroundColor: Colors.BlueNewColor,
  },
  optionContainer: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 12,
    paddingVertical: 8,
  },
  selectedText: {
    fontSize: 14,
    lineHeight: 18,
    color: Colors.WHITE,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  unselectedText: {
    fontSize: 14,
    color: Colors.LIGHTTextTitle,
    lineHeight: 18,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },

  returnRate: {
    ...textStyles.fontSize24,
    ...textStyles.dinOt500,
    textAlign: 'center',
  },
  returnRateTitle: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
    color: Colors.LIGHTTextTitle,
  },
  returnRateVNIndex: {
    ...textStyles.fontSize24,
    ...textStyles.dinOt500,
    textAlign: 'center',
    color: Colors.LIGHTRed,
  },
  returnRateAIRating: {
    ...textStyles.fontSize24,
    ...textStyles.dinOt500,
    textAlign: 'center',
    color: Colors.DARK_GREEN,
  },
  containerReturnRate: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  // Chart
  chartContainer: {
    height: 243,
    marginTop: 9,
  },

  // Text
  textSection1: {
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 14,
    lineHeight: 18,
    color: Colors.LIGHTTextContent,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },

  // search stock and datePicker
  searchStockAndDate: {
    height: 60,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
  },
  // searching field
  searchContainer: {
    height: 44,
    flex: 1,
  },
  textInputContainer: {
    height: 44,
    paddingVertical: 0,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.LIGHTBackground,
    backgroundColor: Colors.LIGHTTitleTable,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 14,
    color: Colors.LIGHTTextContent,
    width: 116,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  // datePicker
  datePickerContainer: {
    marginLeft: 15,
    marginHorizontal: 15,
  },

  // in and out
  inAndOutContainer: {
    paddingTop: 8,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  rowTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.LIGHTTitleTable,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: Colors.LIGHTBackground,
    borderTopStartRadius: 13,
    borderTopEndRadius: 13,
  },
  rowItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.LIGHTBackground,
    borderBottomStartRadius: 13,
    borderBottomEndRadius: 13,
  },
  leftCell: {
    borderRightWidth: 1,
    borderColor: Colors.LIGHTBackground,
  },
  textTitle: {
    textAlign: 'center',
    fontSize: 14,
    color: Colors.LIGHTTextDisable,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  textIn: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 18,
    color: Colors.DARK_GREEN,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  textOut: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 18,
    color: Colors.LIGHTRed,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  cellLeft: {
    width: 171,
    paddingVertical: 13,
    paddingHorizontal: 5,
    borderRightWidth: 1,
    borderColor: Colors.LIGHTBackground,
  },
  cell: {
    width: 171,
    paddingVertical: 13,
    paddingHorizontal: 5,
  },
  widthTable: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 130,
    flexWrap: 'wrap',
    marginLeft: 15,
  },
  widthItem: {
    width: 40,
    paddingRight: 2,
  },

  // notice text
  noticeTextContainer: {
    flexDirection: 'row',
  },
  redNotice: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.LIGHTRed,
    paddingLeft: 16,
    paddingTop: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  normalText: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.LIGHTTextContent,
    paddingHorizontal: 16,
    paddingBottom: 8,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'italic',
  },
  widthContent: {
    width: 294,
  },

  chartValueContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 32,
  },
  chartValueItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  chartValueLineRed: {
    width: 30,
    height: 2,
    marginRight: 5,
    backgroundColor: Colors.LIGHTRed2,
  },
  chartValueLineGreen: {
    width: 30,
    height: 2,
    marginRight: 5,
    backgroundColor: Colors.DARK_GREEN,
  },
  noteText: {
    fontSize: 14,
    color: Colors.LIGHTTextContent,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },

  noDataText: {
    marginTop: 10,
    fontSize: 14,
    color: Colors.LIGHTTextContent,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  noDataTextContainer: {
    width: 375,
    height: 162,
    justifyContent: 'center',
    alignItems: 'center',
  },

  heightChart: {
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ph16: {
    paddingHorizontal: 16,
  },
  pt16: {
    paddingTop: 16,
  },
  pr10: {
    paddingRight: 10,
  },
  pl5: {
    paddingLeft: 5,
  },
  pb8: {
    paddingBottom: 8,
  },
  performanceText: {
    ...textStyles.fontSize18,
    ...textStyles.roboto700,
    color: Colors.LIGHTTextBigTitle,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
});
