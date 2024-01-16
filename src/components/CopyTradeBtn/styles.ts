import { getStylesHook } from 'hooks/useStyles';
import { lightColors as Colors, textStyles } from 'styles';

export default getStylesHook({
  copyTradeBtnContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 8,
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignItems: 'center',
    overflow: 'hidden',
  },
  copyTradeBtnWrapper: {
    width: '100%',
    justifyContent: 'flex-end',
    backgroundColor: Colors.BlueNewColor,
    borderRadius: 10,
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  copyTradeBtnWrapperSubscribed: {
    backgroundColor: Colors.DARK_GREEN,
  },
  copyTradeBtn: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  copyTradeBtnText: {
    ...textStyles.fontSize14,
    ...textStyles.roboto700,
    color: Colors.WHITE,
    paddingRight: 8,
  },
  copyTradeMoreOptionBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    position: 'absolute',
    right: -12,
    transform: [{ rotate: '-90deg' }],
  },
  copyTradeMoreOptionContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  optionContainer: {
    flex: 1,
    backgroundColor: Colors.LIGHTBackground,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  optionText: {
    ...textStyles.fontSize14,
    ...textStyles.roboto700,
    color: Colors.BlueNewColor,
    textAlign: 'center',
  },
  showMoreBtn: {
    transform: [{ scaleX: 1.5 }],
  },

  modalSpace: {
    paddingHorizontal: 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContentContainer: {
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    alignItems: 'stretch',
  },
  modalHeader: {
    ...textStyles.fontSize18,
    ...textStyles.roboto700,
    color: Colors.BlueNewColor,
    textAlign: 'center',
  },
  modalUnSubText: {
    ...textStyles.fontSize16,
    ...textStyles.roboto400,
    color: Colors.BLACK,
    textAlign: 'center',
    marginVertical: 8,
  },
  paaveLogo: {
    width: 177,
    height: 82,
  },
  modalBtn: {
    padding: 12,
    borderRadius: 6,
    marginTop: 12,
    borderColor: Colors.BORDER,
    borderWidth: 1,
  },
  btnPrimary: {
    backgroundColor: Colors.BlueNewColor,
  },
  textPrimary: {
    color: Colors.WHITE,
  },
  modalBackground: {
    backgroundColor: Colors.ModalBackgroundColor,
  },
  ml16: {
    marginLeft: 16,
  },
  infoButton: {
    position: 'absolute',
    left: 0,
  },
});
