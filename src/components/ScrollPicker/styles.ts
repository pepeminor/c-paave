import { lightColors as Colors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  itemContainer: {
    justifyContent: 'center',
    position: 'relative',
    zIndex: 4,
    height: 50,
  },
  chosenItemText: {
    ...textStyles.fontSize24,
    ...textStyles.roboto400,
    textAlign: 'center',
    color: Colors.BlueNewColor,
  },
  normalItemText: {
    ...textStyles.fontSize18,
    ...textStyles.roboto400,
    textAlign: 'center',
    color: Colors.LIGHTTextDisable,
  },
  centerBar: {
    position: 'absolute',
    width: 311,
    height: 40,
    backgroundColor: Colors.LIGHTBackground,
    alignSelf: 'center',
    zIndex: -1,
    borderRadius: 10,
  },
});
