import { Platform } from 'react-native';
import globalStyles, { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    ...globalStyles.justifyCenter,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },

  blockContainer: {
    ...globalStyles.flexDirectionRow,
    backgroundColor: Colors.LIGHTTitleTable,
    borderRadius: 10,
  },

  childBlockContainer: {
    ...globalStyles.container,
    ...globalStyles.centered,
    paddingVertical: 10,
  },

  border: {
    width: 1,
    backgroundColor: Colors.BORDER,
  },

  textTitle: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '300',
    lineHeight: 18,
    marginBottom: 3,
  },
  textTotalMarketValue: {
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Medium',
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    color: Colors.LIGHTTextContent,
  },

  blockTextTotalProfitLostContainer: {
    ...globalStyles.flexDirectionRow,
    ...globalStyles.centered,
  },
  textTotalProfitLossValue: {
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Medium',
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 20,
  },
});
