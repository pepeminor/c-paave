import { getStylesHook } from 'hooks/useStyles';
import { lightColors } from 'styles';

export const useStyles = getStylesHook({
  priceBoardHeaderRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    backgroundColor: lightColors.WHITE,
  },
  priceBoardCol1: {
    flex: 30,
  },
  priceBoardCol2: {
    flex: 20,
  },
  priceBoardCol3: {
    flex: 20,
  },
  priceBoardCol4: {
    flex: 30,
  },
});
