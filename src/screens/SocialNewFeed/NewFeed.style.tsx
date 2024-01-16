import { lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  createPostBtn: {
    position: 'absolute',
    width: 58,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 8,
    right: 8,
    borderRadius: 100,
    backgroundColor: lightColors.BlueNewColor,
  },
  createPostBtnText: {
    fontSize: 24,
    lineHeight: 28,
    color: lightColors.WHITE,
  },
});
