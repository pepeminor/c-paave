import globalStyles, { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  modalBackground: {
    ...globalStyles.container,
    ...globalStyles.flexDirectionRow,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: Colors.BACKGROUND_MODAL2,
  },
  containerStyle: {
    ...globalStyles.container,
    position: 'relative',
    backgroundColor: Colors.WHITE,
    marginTop: 24,
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
    width: '100%',
    paddingBottom: 30,
    height: 690,
  },

  modalTitle: {
    ...globalStyles.flexDirectionRow,
    ...globalStyles.alignCenter,
    backgroundColor: Colors.WHITE,
    // height: (64),
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
    borderBottomColor: Colors.BORDER,
  },
  filterText: {
    ...globalStyles.container,
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 22,
    color: Colors.BlueNewColor,
    marginLeft: 16,
    marginRight: 54,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  closeModalTextList: {
    position: 'absolute',
    top: 0,
    right: 18,
  },

  textWrap: {
    paddingHorizontal: 16,
    paddingTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  textWrapExpand: {
    ...globalStyles.container,
    paddingHorizontal: 16,
    // paddingTop: scaleSize(8),
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
    lineHeight: 18,
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
    fontSize: 18,
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
  imgBeta: {
    marginLeft: 80,
    marginBottom: 12,
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
});
