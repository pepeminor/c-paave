import { lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';
import { IS_IOS } from 'constants/main';

export default getStylesHook({
  containerFeedback: {
    flex: 1,
    backgroundColor: lightColors.BORDER,
    padding: 8,
  },
  containerFeedback2: {
    backgroundColor: lightColors.WHITE,
    paddingBottom: 8,
  },
  textFeedback: {
    textAlign: 'center',
    marginTop: 16,
  },
  buttonConfirm: {
    marginVertical: 8,
  },
  container: {
    alignItems: 'center',
    paddingBottom: IS_IOS ? 64 : 16,
  },
  modalHeader: {
    borderBottomColor: lightColors.BORDER,
    borderBottomWidth: 1,
  },
  stickHeader: {
    width: 48,
    height: 5,
    backgroundColor: lightColors.BaliHai,
    marginTop: 8,
    borderRadius: 5,
  },
  statusImageImg: {
    width: 32,
    height: 32,
    marginLeft: 16,
  },
  containerTitle: {
    paddingLeft: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: lightColors.BORDER,
    borderBottomWidth: 1,
    width: '100%',
    paddingBottom: 16,
  },
  containerTitle2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: lightColors.BORDER,
    borderBottomWidth: 1,
    width: '100%',
    paddingBottom: 16,
  },
  textSubTitle: {
    marginTop: 16,
    textAlign: 'center',
  },
  buttonRatingApp: {
    marginVertical: 16,
    width: '90%',
  },
  buttonCancel: {
    width: '90%',
  },
  containerContentWrap: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  textInput: {
    height: 150,
    borderColor: lightColors.BlueNewColor,
    borderWidth: 1,
    marginTop: 16,
    marginHorizontal: 32,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 12,
  },
  errorText: {
    marginTop: 4,
    marginLeft: 20,
  },
});
