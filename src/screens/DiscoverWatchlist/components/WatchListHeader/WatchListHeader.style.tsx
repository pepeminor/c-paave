import globalStyles, { lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  watchListOptionPicker: {
    ...globalStyles.flexDirectionRow,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingLeft: 16,
    paddingRight: 22,
  },
  watchListText: {
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 24,
    color: lightColors.LIGHTTextBigTitle,
    width: 90,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  arrowIconContainer: {
    marginLeft: 8,
  },
  watchListTextField: {
    width: 180,
  },
});
