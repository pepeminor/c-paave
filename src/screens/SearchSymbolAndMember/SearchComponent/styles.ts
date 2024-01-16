import { lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  doneText: {
    fontWeight: '700',
    color: lightColors.WHITE,
    marginRight: 8,
    fontSize: 14,
  },
  iconStyle: {
    marginRight: 10,
  },
  textInputStyle: {
    fontSize: 12,
    color: lightColors.LIGHTTextContent,
    width: 180,
  },
  headerTitleContainer: {
    paddingLeft: 14,
    paddingRight: 19,
  },
  wholeContainerStyle: {
    height: 36,
    width: 249,
  },
  headerLightStyle: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  textInputContainerIOS: {
    paddingVertical: 0,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: lightColors.LIGHTBackground,
    backgroundColor: lightColors.LIGHTTitleTable,
    flexDirection: 'row',
    alignItems: 'center',
    height: 36,
  },
  textInputContainer: {
    paddingVertical: 0,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: lightColors.LIGHTBackground,
    backgroundColor: lightColors.LIGHTTitleTable,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  disableText: {
    opacity: 0.5,
  },
  enableText: {
    opacity: 1,
  },
  // add header right text
  rightHeaderText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: lightColors.WHITE,
  },
  // opacity disable right text
  rightHeaderTextDisable: {
    fontSize: 14,
    lineHeight: 18,
    // fontWeight: '700',
    color: lightColors.LIGHTTextDisable,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  sizeTouchpad: {
    paddingVertical: 20,
    paddingLeft: 14,
  },
  paddinngHorizontal: {
    paddingRight: 16,
    paddingLeft: 4,
  },
});
