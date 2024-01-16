import globalStyles, { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  modalBackground: {
    ...globalStyles.container,
    backgroundColor: Colors.BACKGROUND_MODAL2,
  },
  modalBackground2: {
    ...globalStyles.container,
    backgroundColor: Colors.Yellow3,
    margin: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    padding: 16,
  },
  containerStyle: {
    ...globalStyles.container,
    backgroundColor: Colors.WHITE,
    marginTop: 48,
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
  },
  modalTitle: {
    ...globalStyles.flexDirectionRow,
    ...globalStyles.alignCenter,
    backgroundColor: Colors.WHITE,
    height: 70,
    paddingTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
  },
  filterText: {
    ...globalStyles.container,
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 22,
    color: Colors.BlueNewColor,
    marginLeft: 16,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  closeModalTextList: {
    marginRight: 16,
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
  paddingHorizontal: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 22,
    color: Colors.Yellow2,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  exampleText: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    color: Colors.BLACK,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  sizeContent: {
    ...globalStyles.flexDirectionRow,
    width: 327,
    paddingTop: 5,
  },
  marginLeft2: {
    marginLeft: -2,
  },
  paddingLeft8: {
    paddingLeft: 8,
  },
  paddingLeft6: {
    paddingLeft: 6,
  },
  widthContent: {
    width: 300,
  },
  modalRow2: {
    ...globalStyles.flexDirectionRow,
    ...globalStyles.flexDirectionRow,
    width: 327,
    paddingTop: 5,
    marginLeft: -2,
  },
});
