import { lightColors as Colors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  titleText: {
    ...textStyles.fontSize18,
    ...textStyles.roboto700,
    color: Colors.LIGHTTextBigTitle,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  summaryContainer: {
    marginLeft: 5,
  },
  summaryTextTitle: {
    ...textStyles.fontSize14,
    ...textStyles.roboto700,
    lineHeight: 18,
    color: Colors.LIGHTTextTitle,
    paddingTop: 8,
    paddingHorizontal: 5,
  },
  summaryText: {
    ...textStyles.fontSize14,
    lineHeight: 18,
    color: Colors.LIGHTTextContent,
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  headerCell: {
    flex: 1,
    height: 34,
    borderBottomColor: Colors.LIGHTBackground,
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  headerText: {
    ...textStyles.fontSize14,
    ...textStyles.roboto700,
    color: Colors.LIGHTTextTitle,
    paddingHorizontal: 8,
    textAlign: 'center',
  },
  headerDateText: {
    ...textStyles.fontSize14,
    ...textStyles.roboto700,
    color: Colors.BlueNewColor,
    paddingHorizontal: 8,
    textAlign: 'left',
  },
  cell: {
    flex: 1,
    height: 34,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  firstCell: {
    ...textStyles.fontSize14,
    ...textStyles.roboto700,
    color: Colors.LIGHTTextTitle,
  },
  numberCell: {
    ...textStyles.fontSize14,
    ...textStyles.dinOt500,
    textAlign: 'right',
  },
  subTitleContainer: {
    width: 180, // alternative flex: 1
    paddingHorizontal: 8,
    paddingTop: 12,
    justifyContent: 'center',
  },
  subTitleText: {
    ...textStyles.fontSize12,
    ...textStyles.roboto400,
    color: Colors.LIGHTTextBigTitle,
    textAlign: 'center',
    paddingBottom: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  tabSelector: {
    width: 166,
    height: 38,
  },
  textRed: {
    color: Colors.LIGHTRed,
  },
  textGreen: {
    color: Colors.DARK_GREEN,
  },
  pt12: {
    paddingTop: 12,
  },
});
