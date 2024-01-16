import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: Colors.WHITE,
    paddingTop: 2,
    elevation: 5,
  },
  modalStyle: {
    bottom: 0,
    left: 0,
    right: 0,
  },
});
