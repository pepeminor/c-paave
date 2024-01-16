import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  rateText: {
    fontSize: 12,
    color: Colors.LIGHTTextTitle,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  rateThemeIconContainer: {
    height: 20,
    backgroundColor: Colors.LIGHTBGTab,
    borderRadius: 6,
  },
  width5: {
    width: 5,
  },
  rateContainer: {
    paddingTop: 3,
  },
});
