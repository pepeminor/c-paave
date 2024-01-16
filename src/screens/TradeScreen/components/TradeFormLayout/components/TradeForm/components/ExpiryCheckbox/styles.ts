import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    marginBottom: 5,
  },
  dateContainer: {
    flex: 1,
    paddingRight: 10,
  },
  checkbox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
