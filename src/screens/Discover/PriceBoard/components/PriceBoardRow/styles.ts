import { getStylesHook } from 'hooks/useStyles';
import { lightColors, textStyles } from 'styles';
import { ItemHeight } from '../../PriceBoard.type';

export const useStyles = getStylesHook({
  container: {
    flexDirection: 'row',
    marginHorizontal: 16,
    borderBottomColor: lightColors.BORDER,
    borderBottomWidth: 1,
    height: ItemHeight,
    justifyContent: 'center',
  },
  smolText: {
    ...textStyles.fontSize10,
  },
  firstCell: {
    flex: 30,
    padding: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstCellText: {
    ...textStyles.fontSize14,
    ...textStyles.roboto700,
  },
  secondCell: {
    flex: 20,
    padding: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondCellText: {
    ...textStyles.fontSize12,
    ...textStyles.dinOt400,
  },
  forthCell: {
    flex: 30,
    padding: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  forthCellText: {
    ...textStyles.fontSize12,
    ...textStyles.dinOt500,
  },
});
