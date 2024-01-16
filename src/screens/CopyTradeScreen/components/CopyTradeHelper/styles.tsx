import { Platform, Dimensions } from 'react-native';
import { lightColors as Colors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  mr16: {
    marginRight: 16,
  },
  pl16: {
    paddingLeft: 16,
    marginRight: 16,
  },
  pt8: {
    paddingTop: 8,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  modalContainer: {
    position: 'relative',
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 24 : 0,
    height: Dimensions.get('window').height * 0.8,
  },
  modalTopPadding: {
    paddingTop: 34,
  },
  closeBtn: {
    zIndex: 4,
    padding: 12,
    height: 24,
    width: 24,
    position: 'absolute',
    top: 0,
    right: 24,
  },
  submitBtn: {
    backgroundColor: Colors.BlueNewColor,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 13,
    marginHorizontal: 16,
    marginVertical: 16,
  },
  submitBtnText: {
    ...textStyles.fontSize14,
    ...textStyles.roboto700,
    color: Colors.WHITE,
    paddingRight: 16,
  },
  submitBtnFake: {
    backgroundColor: Colors.BlueNewColor,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 12,
    marginHorizontal: 8,
    marginTop: 18,
    marginBottom: 8,
  },
  image: {
    marginHorizontal: 16,
  },
  image2: {
    marginTop: 9,
    width: 343,
    height: 325,
  },
  normalText: {
    ...textStyles.fontSize16,
    ...textStyles.roboto400,
    marginTop: 10,
  },
  noteText: {
    ...textStyles.fontSize16,
    ...textStyles.roboto700,
    color: Colors.LIGHTRed,
    marginTop: 10,
  },
});
