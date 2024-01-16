import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  filterButton: {
    flex: 1,
    height: 28,
    marginRight: 5,
    backgroundColor: Colors.LIGHTBGTab,
    borderRadius: 6,
  },
  marginRight0: {
    marginRight: 0,
  },
  stockChart: {
    height: 305,
    paddingHorizontal: 8,
  },
  chartContainer: {
    height: 206,
  },
  chartFilter: {
    height: 44,
    flexDirection: 'row',
    paddingHorizontal: 5.5,
    paddingVertical: 8,
  },
  activeItem: {
    backgroundColor: Colors.BlueNewColor,
  },
  buttonTextFilter: {
    fontSize: 12,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  textWhite: {
    color: Colors.WHITE,
  },
});
