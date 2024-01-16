import { getStylesHook } from 'hooks/useStyles';
import { lightColors } from 'styles';

export const useStyles = getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
    marginBottom: 14,
    marginTop: 16,
  },
  containerHeader: {
    backgroundColor: lightColors.LIGHTTitleTable,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cellTitle: {
    paddingLeft: 5,
    width: 180,
    height: 38,
    borderRightColor: lightColors.BORDER,
    borderBottomColor: lightColors.BORDER,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cellHeader: {
    paddingRight: 5,
    alignItems: 'center',
    borderRightColor: lightColors.BORDER,
    borderBottomColor: lightColors.BORDER,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    width: 90,
    justifyContent: 'space-evenly',
    height: 44,
    flexDirection: 'row',
  },
  textTitle: {
    fontSize: 14,
    color: lightColors.LIGHTTextDisable,
    lineHeight: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
});
