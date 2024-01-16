import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  accessoriesViewEachItemContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.LIGHTBGTab,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accessoriesViewEachItemText: {
    fontSize: 14,
    color: Colors.BLACK,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  marginleft6: {
    marginLeft: 5,
  },
});
