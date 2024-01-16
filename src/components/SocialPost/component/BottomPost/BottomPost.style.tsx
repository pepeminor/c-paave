import { getStylesHook } from 'hooks/useStyles';
export default getStylesHook({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginLeft: 4,
  },
  iconShare: {
    position: 'absolute',
    right: 0,
  },
});
