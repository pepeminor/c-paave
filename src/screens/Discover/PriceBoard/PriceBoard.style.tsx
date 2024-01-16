import { lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
  },
  priceBoardContainer: {
    flex: 1,
  },
  priceBoardHeaderRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
  },
  priceBoardRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    borderBottomColor: lightColors.BORDER,
    borderBottomWidth: 1,
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
  priceBoardCellCenter: {
    alignItems: 'center',
    padding: 1,
  },
  priceBoardCellRight: {
    alignItems: 'flex-end',
    padding: 1,
  },
  loader: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
