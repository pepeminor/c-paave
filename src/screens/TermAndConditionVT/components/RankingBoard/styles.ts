import globalStyles, { lightColors as Colors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  tableHeaderContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.LIGHTTitleTable,
    height: 46,
  },
  colorUp: {
    color: Colors.DARK_GREEN,
  },
  cellBorder: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: Colors.LIGHTBackground,
  },
  tableHeaderText: {
    ...textStyles.fontSize12,
    ...textStyles.roboto700,
    color: Colors.LIGHTTextDisable,
    textAlign: 'center',
    paddingVertical: 15,
  },
  row1: {
    width: 54,
  },
  row2: {
    width: 155,
  },
  row3: {
    width: 74,
  },
  row4: {
    width: 90,
  },
  tableRowContainer: {
    flexDirection: 'row',
    height: 48,
  },
  tableCellText: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  pl5: {
    paddingLeft: 5,
  },
  pb22: {
    paddingBottom: 22,
  },
  pr12: {
    ...textStyles.dinOt400,
    paddingRight: 12,
  },
  absoluteView: {
    position: 'absolute',
    top: 80,
    left: 40,
    bottom: 1,
    right: -16,
    backgroundColor: Colors.WHITE,
    paddingVertical: 16,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  waitingNote: {
    ...textStyles.fontSize14,
    ...textStyles.roboto700,
    color: Colors.BlueNewColor,
  },
  title: {
    ...textStyles.roboto700,
    ...textStyles.fontSize16,
    ...globalStyles.alignSelfStart,
    paddingBottom: 11,
  },
  rankingBoardContainer: {
    paddingBottom: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
