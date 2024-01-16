import { getStylesHook } from 'hooks';
import { Platform } from 'react-native';
import { lightColors, textStyles } from 'styles';

export const useStyles = getStylesHook({
  container: {
    flexDirection: 'row',
    paddingVertical: 4,
    borderColor: lightColors.BORDER,
    borderBottomWidth: 1,
  },
  logoCode: {
    overflow: 'hidden',
    borderRadius: 99,
  },
  firstCol: {
    width: 172,
    flexDirection: 'row',
    paddingLeft: 4,
    alignItems: 'center',
  },
  nameContainer: {
    width: 130,
  },
  symbolInfo: {
    marginLeft: 4,
  },
  secondCol: {
    width: 110,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingRight: 4,
    paddingVertical: 2,
  },
  priceText: {
    ...textStyles.dinOt400,
  },
  changeValueContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerChange: {
    marginLeft: 20,
  },
  containerTradingVolume: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 4,
  },
  containerTradingVolumeText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  volumeText: {
    textAlign: 'right',
    alignContent: 'flex-end',
    ...textStyles.dinOt400,
    ...textStyles.fontSize12,
    marginTop: Platform.OS === 'ios' ? 3 : -4,
  },
  valueText: {
    textAlign: 'right',
    alignContent: 'flex-end',
    ...textStyles.dinOt500,
    ...textStyles.fontSize12,
    marginTop: Platform.OS === 'ios' ? 3 : -4,
  },
});
