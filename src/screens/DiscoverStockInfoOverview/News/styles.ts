import globalStyles, { lightColors as Colors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  noData: {
    ...globalStyles.padding16,
    ...textStyles.fontSize16,
    ...textStyles.roboto400,
  },
  abc: {
    height: 250,
  },
  newsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    height: 126,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.BORDER,
  },
  newsImg: {
    width: 114,
    marginRight: 15,
    height: 76,
  },
  newsContent: {
    width: 214,
  },
  contentTitle: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18,
  },
  newsRating: {
    marginTop: 8,
    marginVertical: 4,
    width: 96,
    height: 16,
  },
  uploadDate: {
    color: Colors.LIGHTTextDisable,
    fontSize: 12,
    marginLeft: 10,
  },
  cellStyle: {
    borderRightWidth: 1,
    borderColor: Colors.BORDER,
    paddingLeft: 5,
  },
  centerItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  analysisDate: {
    width: 100,
    height: 38,
    paddingHorizontal: 5,
    paddingVertical: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: Colors.BORDER,
    color: Colors.LIGHTTextContent,
  },
  analysisDetail: {
    height: 38,
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: Colors.BORDER,
    color: Colors.LIGHTTextContent,
  },
  newsEachItemContentTimeContainer: {
    marginTop: 8,
  },
  newsEachItemContentTimeText: {
    fontSize: 12,
    color: Colors.LIGHTTextDisable,
    marginLeft: 8,
  },
  sizeText: {
    fontSize: 14,
  },

  // skeleton layout
  labelPlaceHolderContainer1: {
    height: 40,
    width: 106,
  },
  labelPlaceHolderContainer2: {
    height: 62,
    width: 90,
  },
  labelPlaceHolderContainer3: {
    height: 62,
    width: 76,
  },
  labelPlaceHolderContainer4: {
    height: 62,
    width: 210,
  },
  marginHorizontal: {
    marginHorizontal: 2,
  },
  marginTop8: {
    marginTop: 8,
  },
  marginTop4: {
    marginTop: 4,
  },
  borderSkeleton: {
    width: '100%',
    height: 1,
    marginTop: 6,
    color: Colors.BORDER,
  },
  cellTable: {
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
  },
  containerItem1: {
    width: 96,
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  containerItem2: {
    width: 90,
    paddingHorizontal: 4,
    marginTop: 10,
  },
  containerItem3: {
    width: 210,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  columnHeader: {
    backgroundColor: Colors.LIGHTTitleTable,
    borderRightColor: Colors.BORDER,
    borderRightWidth: 1,
  },
  columnHeader2: {
    width: 80,
    paddingHorizontal: 8,
  },
  textHeader: {
    color: Colors.LIGHTTextDisable,
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 18,
  },
  textItem: {
    color: Colors.BLACK,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
  },
  marginTop10: {
    marginTop: 10,
  },
  marginBottom16: {
    marginBottom: 16,
  },
});
