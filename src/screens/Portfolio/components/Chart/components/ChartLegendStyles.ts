import { getStylesHook } from 'hooks/useStyles';
import globalStyles, { lightColors } from 'styles';

export const useStyles = getStylesHook({
  chartValueContainer: {
    ...globalStyles.centered,
    ...globalStyles.flexDirectionRow,
    height: 32,
  },
  chartValueVNIndex: {
    width: 30,
    height: 2,
    marginRight: 5,
    backgroundColor: lightColors.LIGHTRed,
  },
  chartValueLineNAV: {
    width: 30,
    height: 2,
    marginRight: 5,
    backgroundColor: lightColors.DARK_GREEN,
  },
  noteText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: lightColors.LIGHTTextContent,
  },
  containerItem: {
    ...globalStyles.container,
    ...globalStyles.flexDirectionRow,
    ...globalStyles.centered,
  },
});
