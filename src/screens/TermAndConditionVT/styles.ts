import { Platform } from 'react-native';
import { lightColors as Colors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  contentContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  paddingBottom: {
    paddingBottom: Platform.OS === 'ios' ? 32 : 28,
  },
  header1: {
    ...textStyles.fontSize14,
    ...textStyles.roboto700,
    color: Colors.LIGHTTextTitle,
  },
  header2: {
    ...textStyles.fontSize16,
    ...textStyles.roboto700,
    color: Colors.MainBlue,
  },
  textSection: {
    ...textStyles.fontSize16,
    ...textStyles.roboto700,
  },
  listItem: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
  },
  pt3: {
    paddingTop: 3,
  },
  pt8: {
    paddingTop: 8,
  },
  pt10: {
    paddingTop: 13,
  },
  pt13: {
    paddingTop: 10,
  },
  pt18: {
    paddingTop: 18,
  },
  pt23: {
    paddingTop: 23,
  },
  pl16: {
    paddingLeft: 16,
  },
  shiftLeft16: {
    marginLeft: -16,
  },
  w230: {
    width: 230,
  },
  redText: {
    ...textStyles.roboto700,
    color: Colors.LIGHTRed,
  },
  dotRow: {
    paddingRight: 16,
    flexDirection: 'row',
  },
  linkText: {
    color: Colors.MainBlue,
    textDecorationLine: 'underline',
    marginBottom: -2,
  },
  formulaLHS: {
    ...textStyles.fontSize14,
    ...textStyles.roboto700,
    color: Colors.LIGHTYellow,
    textAlign: 'center',
    paddingBottom: 10,
  },
  numerator: {
    paddingBottom: 10,
    borderBottomColor: Colors.LIGHTTextDisable,
    borderBottomWidth: 1,
  },
  denominator: {},
  formulaContainer: {
    backgroundColor: Colors.Varden,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 8,
    width: 343,
  },
  goLeaderBoardBtn: {
    backgroundColor: Colors.BlueNewColor,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginTop: 16,
    width: 343,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goLeaderBoardBtnText: {
    ...textStyles.fontSize14,
    ...textStyles.roboto700,
    color: Colors.WHITE,
  },
});
