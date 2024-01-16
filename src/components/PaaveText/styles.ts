import { TEXT_TYPE } from './type';
import { FONT_TEXT } from 'constants/font';
import { getStylesHook } from 'hooks/useStyles';

const textStyle = getStylesHook({
  [TEXT_TYPE.BOLD_10]: {
    fontSize: 10,
    lineHeight: 16,
    fontFamily: FONT_TEXT.BOLD,
  },
  [TEXT_TYPE.BOLD_12]: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: FONT_TEXT.BOLD,
  },
  [TEXT_TYPE.BOLD_14]: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: FONT_TEXT.BOLD,
  },
  [TEXT_TYPE.BOLD_16]: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: FONT_TEXT.BOLD,
  },
  [TEXT_TYPE.BOLD_18]: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: FONT_TEXT.BOLD,
  },
  [TEXT_TYPE.BOLD_20]: {
    fontSize: 20,
    lineHeight: 26,
    fontFamily: FONT_TEXT.BOLD,
  },
  [TEXT_TYPE.REGULAR_10]: {
    fontSize: 10,
    lineHeight: 12,
    fontFamily: FONT_TEXT.REGULAR,
  },
  [TEXT_TYPE.REGULAR_12]: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: FONT_TEXT.REGULAR,
  },
  [TEXT_TYPE.REGULAR_14]: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: FONT_TEXT.REGULAR,
  },
  [TEXT_TYPE.REGULAR_16]: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: FONT_TEXT.REGULAR,
  },
  [TEXT_TYPE.REGULAR_18]: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: FONT_TEXT.REGULAR,
  },
  [TEXT_TYPE.REGULAR_24]: {
    fontSize: 24,
    lineHeight: 30,
    fontFamily: FONT_TEXT.REGULAR,
  },
});

export default textStyle;

export { textStyle };
