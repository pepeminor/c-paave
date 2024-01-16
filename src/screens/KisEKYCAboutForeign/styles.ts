import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  rowData: {
    paddingRight: 16,
    paddingVertical: 10,
    maxHeight: 44,
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
  },
  titleText: {
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 14,
    color: Colors.LIGHTTextContent,
    lineHeight: 18,
  },
  paddingHorizontal16: {
    paddingHorizontal: 16,
  },
  paddingVeticalTitle: {
    paddingTop: 16,
    paddingBottom: 12,
  },
  paddingVertical16: {
    paddingVertical: 16,
  },
  titleStyleHighlight: {
    fontSize: 14,
    lineHeight: 18,
    color: Colors.BlueNewColor,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  titleStyleHighlight2: {
    fontSize: 14,
    lineHeight: 18,
    color: Colors.MainBlue,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  titleContainer: {
    marginLeft: -16,
    paddingBottom: 16,
  },
  titleContainerExpand: {
    marginLeft: -16,
    paddingBottom: 16,
  },
  textWrapExpand: {
    paddingTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  textContent: {
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 14,
    color: Colors.LIGHTTextContent,
    lineHeight: 16,
  },
  marginLeft16: {
    marginLeft: 16,
  },
  titleBranch: {
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 14,
    color: Colors.LIGHTTextTitle,
    lineHeight: 18,
  },
  paddingTop8: {
    paddingTop: 8,
  },
  paddingTop21: {
    paddingTop: 21,
  },
  paddingVertical8: {
    paddingVertical: 8,
  },
  paddingVertical4: {
    paddingVertical: 4,
  },
  paddingBottom16: {
    paddingBottom: 16,
  },
  line: {
    width: '100%',
    height: 2,
    backgroundColor: Colors.BORDER,
    marginVertical: 16,
  },
  paddingTop3: {
    paddingTop: 3,
  },
  widthTitle: {
    width: '100%',
    paddingVertical: 4,
  },
});
