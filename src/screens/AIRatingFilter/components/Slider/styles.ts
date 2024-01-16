import { getStylesHook } from 'hooks/useStyles';
import { lightColors, textStyles } from 'styles';

export default getStylesHook({
  barContainer: {
    paddingVertical: 8,
  },
  filledBarContainer: {
    paddingVertical: 8,
    position: 'absolute',
  },
  barStyle: {
    height: 4,
    width: '100%',
    borderRadius: 8,
  },
  indicatorContainer: {
    position: 'absolute',
    left: 10,
    height: 20,
    width: 20,
    borderRadius: 10,
    borderColor: lightColors.BlueNewColor,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorStyle: {
    height: 15,
    width: 15,
    borderRadius: 10,
    backgroundColor: lightColors.BlueNewColor,
    borderColor: lightColors.WHITE,
    borderWidth: 2,
  },
  barMaxMin: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  maxMinText: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
  },
});
