import { getStylesHook } from 'hooks/useStyles';
import globalStyles, { Colors } from 'styles';

export default getStylesHook({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  modalContentContainer: {
    paddingHorizontal: 16,
    paddingTop: 30,
    width: '100%',
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
  },
  leaderBoardJoinContainer: {
    ...globalStyles.centered,
    backgroundColor: Colors.BlueNewColor,
    width: 343,
    height: 40,
    borderRadius: 10,
    marginBottom: 26,
  },
  leaderBoardJoinText: {
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.WHITE,
    fontSize: 16,
  },
  leaderBoardJoinContent: {
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.LIGHTTextContent,
    fontSize: 16,
    lineHeight: 22,
    paddingVertical: 4,
  },
  leaderBoardJoinContent2: {
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.BlueNewColor,
    fontSize: 16,
    lineHeight: 22,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.BORDER,
  },
  paddingLeft2: {
    paddingLeft: 2,
  },
  paddingLeft12: {
    paddingLeft: 12,
  },
  dot: {
    lineHeight: 22,
  },
  paddingBottom25: {
    paddingBottom: 25,
  },
  paddingBottom8: {
    paddingBottom: 8,
  },
  paddingTop8: {
    paddingTop: 8,
  },
});
