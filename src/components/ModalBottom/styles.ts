import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  modalContainer: {
    width: '100%',
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
    overflow: 'hidden',
    marginTop: 32,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  background: {
    backgroundColor: Colors.BACKGROUND_MODAL,
  },
  dummyModal: {
    width: '100%',
    height: '100%',
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
});
