import { getStylesHook } from 'hooks/useStyles';
import { lightColors, textStyles } from 'styles';

export default getStylesHook({
  showLoader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: lightColors.BACKGROUND_MODAL2,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    elevation: 1000,
  },
  hideLoader: {
    display: 'none',
    zIndex: -1000,
    elevation: -1000,
  },
  activityIndicator: {
    marginTop: 48,
  },
  loadingText: {
    ...textStyles.fontSize14,
    color: lightColors.WHITE,
    paddingHorizontal: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: lightColors.BACKGROUND_MODAL,
  },
  errorContainer: {
    backgroundColor: lightColors.WHITE,
    width: '80%',
    padding: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    ...textStyles.fontSize14,
    ...textStyles.roboto700,
    textAlign: 'center',
    paddingTop: 8,
  },
});
