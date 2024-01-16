import globalStyles, { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  paddingVertical10: {
    paddingVertical: 10,
  },

  quoteTextContainer: {
    height: 44,
    // borderBottomColor: Colors.BORDER,
    // borderBottomWidth: 1,
    paddingVertical: 10,
  },
  quoteText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.LIGHTTextBigTitle,
    paddingLeft: 8,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  quoteText1: {
    fontWeight: 'bold',
    fontSize: 14,
    color: Colors.LIGHTTextBigTitle,
    paddingLeft: 8,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  arrowRight: {
    paddingRight: 8,
  },
  seeAllText: {
    color: Colors.BlueNewColor,
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 8,
  },
  grayLine: {
    width: '100%',
    height: 8,
    backgroundColor: Colors.BORDER,
  },
  hotSeeAllStockText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.BlueNewColor,
    marginRight: 10,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  tickByTickText: {
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
    paddingVertical: 5,
  },

  indexContainer: {
    ...globalStyles.container,
    ...globalStyles.flexDirectionRow,
    ...globalStyles.justifySpaceAround,
    height: 60,
  },

  hideIndexContainer: {
    display: 'none',
  },

  indexTitleText: {
    fontSize: 12,
    color: Colors.BlueNewColor,
    lineHeight: 18,
    fontWeight: 'bold',
  },
});
