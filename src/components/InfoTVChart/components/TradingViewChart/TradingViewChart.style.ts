import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
  },
  webviewStyle: {
    flex: 1,
    overflow: 'hidden',
    opacity: 0.99,
  },
  disableInteractBlock: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
