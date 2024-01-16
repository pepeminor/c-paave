import { lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  containerType: {
    flex: 4,
    justifyContent: 'center',
  },
  dot: {
    marginRight: 4,
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: lightColors.LIGHTGRAY,
  },
  dotSelected: {
    backgroundColor: lightColors.BlueNewColor,
  },
  containerDot: { marginTop: 4, flexDirection: 'row' },
  containerValue: { flexDirection: 'row', flex: 2, justifyContent: 'space-between' },
  textType: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  textTitle: {
    flex: 1,
    textAlign: 'right',
    fontSize: 14,
    fontWeight: 'bold',
  },
  textTitleSell: {
    flex: 1,
    textAlign: 'right',
    color: lightColors.LIGHTRed2,
    fontSize: 14,
    fontWeight: 'bold',
  },
  textTitleBuy: {
    flex: 1,
    color: lightColors.DARK_GREEN,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
