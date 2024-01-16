import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  filterButton: {
    width: 53,
    height: 28,
    backgroundColor: Colors.LIGHTBGTab,
    borderRadius: 6,
  },
  filterButtonText: {
    color: Colors.LIGHTTextTitle,
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  filterButtonActive: {
    backgroundColor: Colors.BlueNewColor,
  },
  filterButtonTextActive: {
    color: Colors.WHITE,
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
});
