import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  modalContainer: {
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
    overflow: 'hidden',
    marginTop: 48,
  },
  modalBackground: {
    backgroundColor: Colors.BACKGROUND_MODAL2,
    flex: 1,
  },
  containerStyle: {
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
  },

  modalTitle: {
    backgroundColor: Colors.WHITE,
    height: 70,
    paddingTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
  },
  filterText: {
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 22,
    color: Colors.BlueNewColor,
    marginLeft: 16,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  closeModalTextList: {
    marginRight: 16,
  },
  textWrapExpand: {
    paddingHorizontal: 16,
    paddingTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  normalText: {
    fontSize: 16,
    lineHeight: 22,
    color: Colors.LIGHTTextContent,
    paddingBottom: 10,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  normalTextExpand: {
    fontSize: 16,
    lineHeight: 22,
    color: Colors.LIGHTTextContent,
    paddingBottom: 10,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  blueLightText: {
    color: Colors.BlueNewColor,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  blueBoldText: {
    color: Colors.BlueNewColor,
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 24,
    paddingBottom: 10,
  },
  titleStyle: {
    fontSize: 14,
    lineHeight: 18,
    color: Colors.LIGHTTextContent,
    fontWeight: '700',
  },
  titleStyleHighlight: {
    fontSize: 14,
    lineHeight: 18,
    color: Colors.BlueNewColor,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  titleContainer: {
    paddingRight: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  titleContainerExpand: {
    paddingRight: 16,
    paddingVertical: 10,
  },
  bullet: {
    width: 5,
  },
  addPaddingLeft: {
    paddingLeft: 9,
  },

  learnMoreContainer: {
    paddingLeft: 16,
    paddingVertical: 10,
    marginBottom: 30,
  },
  blueBold14: {
    color: Colors.BlueNewColor,
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 18,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  normalTextTitle: {
    color: Colors.BLACK,
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 18,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  marginBottom8: {
    marginBottom: 8,
  },
  fontSizeText: {
    fontSize: 16,
  },
  marginRight2: {
    marginRight: 2,
  },
  tableContainer: {
    backgroundColor: Colors.BlueNewColor,
    width: 90,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableContainer1: {
    backgroundColor: Colors.LIGHTTitleTable,
    width: 90,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableText: {
    color: Colors.WHITE,
    fontWeight: 'bold',
    fontSize: 12,
    fontFamily: 'Roboto',
    lineHeight: 16,
  },
  tableText1: {
    color: Colors.LIGHTText,
    fontWeight: 'bold',
    fontSize: 12,
    fontFamily: 'Roboto',
    lineHeight: 16,
  },
  tableItemText: {
    color: Colors.LIGHTText,
    fontWeight: '400',
    fontSize: 12,
    fontFamily: 'Roboto',
    lineHeight: 16,
  },
  tableItem1: {
    width: 90,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableItem2: {
    width: 90,
    height: 88,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableWrapper: {
    width: 375,
    paddingHorizontal: 2,
  },
  itemContainer1: {
    width: 90,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer2: {
    width: 92,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginRight: 2,
  },
  itemContainer3: {
    width: 92,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginRight: 2,
  },
  itemContainer4: {
    width: 280,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginRight: 2,
  },
  itemContainer5: {
    width: 282,
    height: 88,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginRight: 2,
  },
  backgroundItem1: {
    backgroundColor: Colors.LIGHTTitleTable,
  },
  backgroundItem2: {
    backgroundColor: Colors.Yellow1,
  },
  backgroundItem3: {
    backgroundColor: Colors.Green2,
  },
  backgroundItem4: {
    backgroundColor: Colors.LIGHTBackground,
  },
  backgroundItem5: {
    backgroundColor: Colors.Pink,
  },
  marginTop4: {
    marginTop: 4,
  },
  marginTop12: {
    marginTop: 12,
  },
  marginTop10: {
    marginTop: -10,
  },
  marginTop14: {
    marginTop: -14,
  },
  padding16: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  paddingHorizontal16: {
    paddingHorizontal: 16,
  },
  paddingVertical8: {
    paddingVertical: 8,
  },
  paddingBottom8: {
    paddingBottom: 8,
  },
  noteText: {
    color: Colors.BLACK,
    fontWeight: '400',
    fontSize: 14,
    fontFamily: 'Roboto',
    lineHeight: 16,
    fontStyle: 'italic',
  },
  normalTextTitle2: {
    color: Colors.LIGHTText,
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'Roboto',
    lineHeight: 18,
    fontStyle: 'normal',
  },
  normalTextContent: {
    color: Colors.BLACK,
    fontWeight: '400',
    fontSize: 14,
    fontFamily: 'Roboto',
    lineHeight: 18,
    fontStyle: 'normal',
  },
});
