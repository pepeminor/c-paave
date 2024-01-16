import { lightColors as Colors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  cardContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: Colors.WHITE,

    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  textDarkBlue: {
    ...textStyles.fontSize14,
    ...textStyles.roboto700,
    color: Colors.LIGHTText,
  },
  textMainBlue: {
    color: Colors.MainBlue,
  },
  textDarkGreen: {
    color: Colors.DARK_GREEN,
  },
  textWhite: {
    color: Colors.WHITE,
  },
  height40: {
    height: 44,
  },
  height44: {
    height: 44,
  },
  statusBlock: {
    borderRadius: 5,
    width: 80,
    paddingVertical: 3,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  statusWaitBlock: {
    backgroundColor: Colors.LIGHTYellow,
  },
  statusOkBlock: {
    backgroundColor: Colors.DARK_GREEN,
  },
  statusEndedBlock: {
    backgroundColor: Colors.RedColorLogo,
  },
  itemPrize: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
  },
  date: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
  },
  status: {
    ...textStyles.fontSize12,
    ...textStyles.roboto400,
  },
});
