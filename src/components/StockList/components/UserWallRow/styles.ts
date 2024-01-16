import { lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';
import { Platform } from 'react-native';

export default getStylesHook({
  row: {
    flexDirection: 'row',
    borderBottomColor: lightColors.BORDER,
    borderBottomWidth: 1,
  },
  innerCell: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: lightColors.BORDER,
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    paddingVertical: 8,
    width: 80,
  },
  outerCell: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderColor: lightColors.BORDER,
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: 110,
  },
  outerCellPL: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderColor: lightColors.BORDER,
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    paddingVertical: 8,
    width: 108,
  },
  subCell: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 11,
  },
  weight: {
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOTMedium',
    fontStyle: 'normal',
    fontWeight: '500',
    color: lightColors.BLACK,
  },
  weight1: {
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOTLight',
    fontStyle: 'normal',
    color: lightColors.BLACK,
  },
  symbol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logoContainer: {
    borderRadius: 99,
    overflow: 'hidden',
    marginRight: 8,
  },
  stockCodeContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  stockCodeText: {
    fontWeight: 'bold',
    color: lightColors.LIGHTTextContent,
    fontSize: 14,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    textAlignVertical: 'center',
  },

  // tooltip
  tooltipContainer: {
    marginTop: 2,
  },
  tooltip: {
    backgroundColor: lightColors.BlueNewColor,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 13,
    marginLeft: 10,
  },
  toolTipsContentContainer: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  spaceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  textSymbolNoAvailable: {
    fontSize: 12,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: 12,
    fontFamily: 'Roboto',
    color: lightColors.WHITE,
  },
});
