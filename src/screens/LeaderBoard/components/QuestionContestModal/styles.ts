import { getStylesHook } from 'hooks/useStyles';
import { Colors, textStyles } from 'styles';

export default getStylesHook({
  container: {
    paddingTop: 8,
    backgroundColor: Colors.WHITE,
    height: '90%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: 'hidden',
  },
  header: {
    height: 56,
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginTop: -10,
    zIndex: 1,
    backgroundColor: Colors.WHITE,
  },
  headerText: {
    ...textStyles.fontSize16,
    marginRight: 14,
    fontWeight: '700',
    fontFamily: 'Roboto',
    color: Colors.BlueNewColor,
  },
  closeBtn: {
    height: 24,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    marginHorizontal: 16,
  },

  textPeriod: {
    ...textStyles.fontSize16,
    paddingTop: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.LIGHTText,
  },
  supportText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.BLACK,
  },
  supportEmailText: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.BlueNewColor,
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
  pt20: {
    paddingTop: 20,
    paddingBottom: 30,
  },
  pb30: {
    paddingBottom: 30,
  },
  leaderBoardJoinContent2: {
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.BlueNewColor,
    fontSize: 16,
    lineHeight: 22,
  },
});
