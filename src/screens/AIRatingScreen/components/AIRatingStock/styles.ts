import globalStyles, { lightColors as Colors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';
import { Platform } from 'react-native';

export default getStylesHook({
  container: {
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 13,
    marginBottom: 8,
    marginHorizontal: 8,

    shadowColor: Platform.OS === 'android' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.55,
    shadowRadius: 14.78,

    elevation: 22,
  },

  topContainer: {
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    overflow: 'hidden',
    borderRadius: 100,
    borderColor: Colors.LIGHTBackground,
    borderWidth: 2,
  },
  stockCode: {
    ...textStyles.fontSize16,
    ...textStyles.roboto700,
  },
  rankContainer: {
    backgroundColor: Colors.LIGHTBackground,
    width: 24,
    height: 24,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankContainerBig: {
    width: 36,
  },
  rankText: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
    color: Colors.BlueNewColor,
    textAlign: 'center',
  },
  rankChangeText: {
    ...textStyles.fontSize12,
    ...textStyles.roboto400,
  },
  performanceText: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
    paddingLeft: 8,
    width: 110,
  },

  bottomContainer: {
    ...globalStyles.borderTop1,
    paddingTop: 4,
    flexDirection: 'row',
  },
  scoreTitle: {
    ...textStyles.fontSize12,
    ...textStyles.roboto700,
    color: Colors.LIGHTTextTitle,
    textAlign: 'center',
  },
  scoreValue: {
    ...textStyles.fontSize14,
    ...textStyles.dinOt500,
    textAlign: 'center',
  },

  pl18: {
    paddingLeft: 18,
  },
  ph8: {
    paddingHorizontal: 8,
  },
});
