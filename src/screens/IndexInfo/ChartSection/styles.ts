import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  stockChart: {
    height: 310,
    paddingHorizontal: 8,
  },
  chartStickContainer: {
    height: 206,
  },
  chartContainer: {
    height: 206,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  actionContainer: {
    paddingVertical: 8,
  },
  filterButton: {
    flex: 1,
    height: 28,
    marginRight: 5,
    backgroundColor: Colors.LIGHTBGTab,
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 12,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  marginRight0: {
    marginRight: 0,
  },
  activeItem: {
    backgroundColor: Colors.BlueNewColor,
  },
  textWhite: {
    color: Colors.WHITE,
  },
});
