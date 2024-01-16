import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(6, 13, 45, 0.5)',
    color: Colors.WHITE,
  },
  insideModal: {
    position: 'relative',
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    paddingVertical: 20,
    marginHorizontal: 18,
  },
  title: {
    textAlign: 'center',
    color: Colors.Blue5,
    fontWeight: 'bold',
    fontSize: 18,
    paddingBottom: 8,
    textTransform: 'uppercase',
    paddingHorizontal: 38,
  },
  text: {
    textAlign: 'center',
    paddingHorizontal: 30,
  },
  buttonContainer: {
    marginHorizontal: 18,
    paddingBottom: 0,
  },
  iconContainer: {
    width: 18,
    height: 18,
  },
  closeButton: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
});
