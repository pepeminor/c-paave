import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  headerContainer: {
    height: 44,
  },
  headerTitle: {
    fontSize: 12,
    color: Colors.LIGHTTextDisable,
    lineHeight: 16,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
  },
  boldText: {
    fontWeight: 'bold',
  },
  spaceStyle: {
    height: 10,
    backgroundColor: Colors.LIGHTBackground,
  },
  SkeletonStyle: {
    height: 80,
  },
  textDetail: {
    fontSize: 12,
    color: Colors.LIGHTTextDisable,
    lineHeight: 16,
    fontFamily: 'Roboto',
    fontStyle: 'italic',
    fontWeight: '400',
  },
  padding16: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  noDataCon: {
    width: 375,
    height: 162,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },

  noDataText: {
    fontFamily: 'Roboto',
    marginTop: 16,
    fontSize: 16,
    color: Colors.LIGHTTextContent,
    textAlign: 'center',
  },
});
