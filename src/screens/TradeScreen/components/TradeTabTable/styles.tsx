import { lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';
import { IS_IOS } from 'constants/main';

export default getStylesHook({
  noDataCon: {
    marginTop: 20,
    // height: Platform.OS === 'ios' ? getResponsiveHeight(height - 390) : getResponsiveHeight(height - 200),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  noDataText: {
    marginTop: 8,
    fontSize: 12,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    color: lightColors.LIGHTTextContent,
  },
  quantity2: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: IS_IOS ? 'DINOT' : 'DINOT-Light',
    fontStyle: 'normal',
    color: lightColors.LIGHTTextContent,
  },
});
