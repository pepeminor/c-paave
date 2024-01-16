import { getStylesHook } from 'hooks/useStyles';
import globalStyles, { Colors } from 'styles';

export default getStylesHook({
  container: {
    ...globalStyles.container,
    backgroundColor: Colors.Blue4,
  },

  headerContainer: {
    backgroundColor: 'transparent',
  },

  backgroundImg: {
    position: 'absolute',
    zIndex: -1,
    width: '100%',
  },

  backgroundShadow: {
    position: 'absolute',
    zIndex: -1,
    width: '100%',
  },

  topContainer: {
    height: 375,
    backgroundColor: 'red',
  },

  childrenContainer: {
    flex: 1,
  },
});
