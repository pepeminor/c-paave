import { Platform } from 'react-native';
import globalStyles, { lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  infoContainer: {
    ...globalStyles.flexDirectionRow,
    ...globalStyles.justifySpaceBetween,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: lightColors.BORDER,
  },
  indexValueText: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontWeight: '400',
    textAlign: 'center',
  },
  overviewColumn: {
    flex: 1,
    paddingHorizontal: 4,
    paddingVertical: 8,
    // borderColor: Colors.BORDER,
    // borderWidth: 1,
  },
  overviewColumnTitle: {
    fontSize: 14,
    color: lightColors.BlueNewColor,
    lineHeight: 18,
    fontWeight: 'bold',
  },
  overviewColumnValue: {
    fontSize: 14,
    lineHeight: 20,
    color: lightColors.LIGHTTextContent,
    marginTop: 4,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Light',
    fontWeight: '500',
  },
});
