import { lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';
import { IS_IOS } from 'constants/main';

export const useStyles = getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 88,
  },
  cameraIcon: {
    position: 'absolute',
    width: 88,
    height: 88,
    borderRadius: 88,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: lightColors.BACKGROUND_MODAL3,
  },
  cameraIconPicked: {
    position: 'absolute',
    width: 88,
    height: 88,
    borderRadius: 88,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    paddingHorizontal: 16,
  },
  input: {
    marginTop: 4,
    paddingHorizontal: 10,
    paddingVertical: IS_IOS ? 12 : 8,
    borderRadius: 10,
    backgroundColor: lightColors.LIGHTTitleTable,
    borderColor: lightColors.LIGHTBackground,
    borderWidth: 1,
  },
  inputFocused: {
    marginTop: 4,
    paddingHorizontal: 10,
    paddingVertical: IS_IOS ? 12 : 9,
    borderRadius: 10,
    backgroundColor: lightColors.LIGHTTitleTable,
    borderColor: lightColors.BlueNewColor,
    borderWidth: 1,
  },
  saveBtn: {
    margin: 16,
    marginBottom: 32,
  },
});
