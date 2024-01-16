import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';
/* 
  (16),
  (44),
*/

const titleColor = Colors.LIGHTTextBigTitle;

export default getStylesHook({
  container: {
    marginTop: 8,
    backgroundColor: Colors.WHITE,
    height: 336,
  },

  /* BLOCK TITLE */
  blockTitleContainer: {
    height: 44,
    paddingHorizontal: 16,
  },
  blockTitleText: {
    fontSize: 18,
    fontWeight: '700',
    color: titleColor,
    marginRight: 10,
  },
  btnSeeAll: {
    width: 66,
    height: 18,
  },
  seeAllTitle: {
    fontSize: 14,
    color: titleColor,
    fontWeight: '700',
  },

  /* BLOCK DATE RANGE */
  blockDateRangeContainer: {
    height: 60,
    paddingHorizontal: 16,
  },

  /* BLOCK ITEM LIST */
  blockItemListContainer: {
    height: 230,
  },
  flatListStyle: {
    marginVertical: 8,
  },
  gridRowContainer: {
    height: 40,
  },

  /* BLOCK ACTION */
  blockActionContainer: {
    height: 68,
    paddingHorizontal: 16,
  },

  // fix table
  border: {
    borderRightColor: Colors.BORDER,
    borderRightWidth: 1,
  },
  text: {
    color: Colors.LIGHTTextContent,
    fontSize: 14,
  },

  // table
  greenText: {
    color: Colors.DARK_GREEN,
    fontSize: 14,
  },
  redText: {
    color: Colors.LIGHTRed,
    fontSize: 14,
  },
  iconStyle: {
    paddingVertical: 10,
  },
  gapTextStyle: {
    paddingVertical: 4,
  },
});
