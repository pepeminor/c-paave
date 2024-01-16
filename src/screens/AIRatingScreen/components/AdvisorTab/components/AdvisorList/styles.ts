import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  searchContainer: {
    marginHorizontal: 8,
    flex: 2,
  },
  filterContainer: {
    marginLeft: 0,
    marginRight: 8,
    flex: 1,
  },
  topContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  contentContainer: {},
});
