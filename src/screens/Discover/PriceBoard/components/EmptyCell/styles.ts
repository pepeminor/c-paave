import { getStylesHook } from 'hooks/useStyles';
import { textStyles } from 'styles';
import { ItemHeight } from '../../PriceBoard.type';

export const useStyles = getStylesHook({
  cell: {
    height: ItemHeight,
    justifyContent: 'center',
  },
  stringText: {
    ...textStyles.fontSize14,
    ...textStyles.roboto700,
  },
});
