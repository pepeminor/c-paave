import { lightColors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export const useStyles = getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
  },
  loadingText: {
    textAlign: 'center',
    color: lightColors.LIGHTTextDisable,
  },
  noMemberFound: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 64,
  },
  noMemberFoundText: {
    textAlign: 'center',
  },
  memberContainer: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: lightColors.BORDER,
    backgroundColor: lightColors.WHITE,
  },
  selectedMemberContainer: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: lightColors.BORDER,
    backgroundColor: lightColors.LIGHTBackground,
  },
  topPartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarImg: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    borderRadius: 40,
    position: 'relative',
  },
  avatarImgText: {
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: lightColors.WHITE,
    fontSize: 17,
  },
  usernameContainer: {
    marginLeft: 8,
  },
  name: {
    ...textStyles.fontSize14,
    ...textStyles.roboto700,
    color: lightColors.BLACK,
  },
  username: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
    color: lightColors.LIGHTTextTitle,
  },
  groupBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 4,
  },
  textViewAccBtn: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
    color: lightColors.WHITE,
  },
  viewAccBtnContainer: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    backgroundColor: lightColors.BlueNewColor,
    borderRadius: 6,
  },
});
