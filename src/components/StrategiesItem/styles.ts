import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

const headerTextColor = Colors.LIGHTTextTitle;

export default getStylesHook({
  container: {
    backgroundColor: Colors.WHITE,
    height: 1159,
  },

  /* CHART */
  blockContainer: {
    backgroundColor: Colors.LIGHTBackground,
    height: 1015,
  },
  chartBlock: {
    backgroundColor: Colors.WHITE,
  },
  chartBlockMarginTop: {
    marginTop: 8,
  },
  headerContainer: {
    height: 64,
    paddingHorizontal: 16,
  },
  headerInfo: {
    width: 202,
    height: 52,
  },
  headerTitle: {},
  headerTitleText: {
    fontSize: 16,
    fontWeight: '700',
    color: headerTextColor,
  },
  headerRate: {
    height: 28,
  },
  iconContainer: {
    width: 18,
    height: 18,
  },
  btnFollow: {
    height: 34,
    borderRadius: 8,
    backgroundColor: Colors.BlueNewColor,
    paddingHorizontal: 8,
  },
  btnFollowed: {
    height: 34,
    borderRadius: 8,
    backgroundColor: Colors.LIGHTBGTab,
    paddingHorizontal: 8,
  },
  txtFollow: {
    fontSize: 14,
    color: Colors.WHITE,
    marginLeft: 10,
  },
  txtFollowed: {
    fontSize: 14,
    color: Colors.LIGHTTextTitle,
    marginLeft: 10,
  },

  /* CHART */
  chartContainer: {
    height: 206,
    paddingHorizontal: 8,
  },
  chartPropContainerStyle: {
    height: '100%',
  },
  chartXAxisStyle: {},

  /* Total rate value */
  totalRateValueContainer: {
    height: 63,
    // backgroundColor: Colors.Ask,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.BORDER,
  },
  totalRateValueItem: {
    flex: 1,
  },
  itemBorderRight: {
    borderRightWidth: 1,
    borderColor: Colors.BORDER,
  },
  itemBorderLeft: {
    borderRightWidth: 1,
    borderColor: Colors.BORDER,
  },
  totalItemName: {
    fontSize: 14,
    color: headerTextColor,
  },
  totalItemRate: {
    fontSize: 16,
    color: Colors.LIGHTTextContent,
  },

  /* Action */
  actionContainer: {
    height: 68,
    paddingHorizontal: 16,
  },
  btnAction: {
    height: 44,
    backgroundColor: Colors.LIGHTBackground,
    borderRadius: 10,
  },
  txtAction: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.BlueNewColor,
  },
});
