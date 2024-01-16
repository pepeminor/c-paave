import { lightColors as Colors, lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export const useStyles = getStylesHook({
  backgroundModal: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_MODAL2,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    marginTop: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  actionBtn: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  imgContainer: {
    width: '100%',
    height: 336,
    backgroundColor: lightColors.BLACK,
  },
  img: {
    width: '100%',
    height: '100%',
  },
  textInput: {
    padding: 16,
    marginTop: 8,
  },
});
