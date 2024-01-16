import { lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  grayLine: {
    width: '100%',
    height: 8,
    backgroundColor: lightColors.BORDER,
  },
  titleTable: {
    fontSize: 16,
    color: lightColors.LIGHTText,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: 24,
  },
  titleTable2: {
    fontSize: 12,
    color: lightColors.LIGHTText,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: 24,
  },
  noDataText: {
    marginTop: 10,
    fontSize: 14,
    color: lightColors.LIGHTTextContent,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  noDataTextContainer: {
    width: 375,
    height: 162,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
});
