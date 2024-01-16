import { Platform } from 'react-native';
import globalStyles, { lightColors as Colors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    position: 'relative',
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 24 : 16,
  },
  header: {
    height: 56,
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerText: {
    marginRight: 14,
    fontWeight: '700',
    fontFamily: 'Roboto',
    color: Colors.BlueNewColor,
  },
  closeBtn: {
    height: 24,
    width: 24,
  },
  contentContainer: {
    marginHorizontal: 16,
  },
  contentTitle: {
    ...textStyles.roboto500,
    ...textStyles.fontSize24,
    marginVertical: 9,
    color: Colors.MainBlue,
    textAlign: 'center',
  },
  prizeContainer: {
    marginHorizontal: -3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trophyImage: {
    width: 142,
    height: 137,
  },
  prizePool: {
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  prizeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 187,
  },
  ordinalBox: {
    width: 52,
    height: 28,
    borderRadius: 4,
    marginRight: 10,
    marginVertical: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorYellow: {
    ...textStyles.roboto700,
    ...textStyles.fontSize18,
    color: Colors.LIGHTYellow,
  },
  textPeriod: {
    ...textStyles.roboto700,
    ...textStyles.fontSize18,
    color: Colors.MainBlue,
    paddingTop: 19,
  },
  textWeek1: {
    color: Colors.BlueNewColor,
  },
  textWeek2: {
    paddingLeft: 10,
  },
  weekRow: {
    flexDirection: 'row',
    paddingTop: 5,
  },
  executeFormButton: {
    backgroundColor: Colors.BlueNewColor,
    height: 44,
    borderRadius: 10,
    marginTop: 16,
  },
  executeFormButtonText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.WHITE,
  },
  pt8: {
    paddingTop: 8,
  },
  pl16: {
    paddingLeft: 16,
  },
  shiftLeft16: {
    marginLeft: -16,
  },
  currency: {
    ...textStyles.roboto400,
    ...textStyles.fontSize16,
  },
  subtitle: {
    ...textStyles.roboto700,
    ...textStyles.fontSize14,
    ...globalStyles.textAlignCenter,
  },
  prizeItemTxt: {
    ...textStyles.roboto700,
    ...textStyles.fontSize16,
  },
  invisibleBackground: {
    position: 'absolute',
    top: -100,
    width: '100%',
    height: '100%',
    zIndex: -1,
    elevation: -1,
  },
});
