import { PaaveStyleSheet, getStylesHook } from 'hooks/useStyles';
import { BUTTON_TYPE } from './type';
import { lightColors as Colors } from 'styles';
import { FONT_TEXT } from 'constants/font';

export const useButtonStyles = getStylesHook({
  [BUTTON_TYPE.DEFAULT]: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 12,
  },

  [BUTTON_TYPE.SOLID_SMALL]: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },

  [BUTTON_TYPE.SOLID]: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },

  [BUTTON_TYPE.OUTLINE_SMALL]: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    backgroundColor: Colors.WHITE,
  },

  [BUTTON_TYPE.OUTLINE]: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderWidth: 1,
    backgroundColor: Colors.WHITE,
  },

  [BUTTON_TYPE.ONLY_TEXT_SMALL]: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 0,
  },

  [BUTTON_TYPE.ONLY_TEXT]: {
    paddingHorizontal: 32,
    paddingVertical: 32,
    borderWidth: 0,
  },

  [BUTTON_TYPE.ONLY_ICON]: {
    paddingHorizontal: 32,
    paddingVertical: 32,
    borderWidth: 0,
  },
});

export const textStyles = PaaveStyleSheet.create({
  [BUTTON_TYPE.SOLID_SMALL]: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: FONT_TEXT.BLACK,
  },
  [BUTTON_TYPE.SOLID]: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: FONT_TEXT.BOLD,
  },
  [BUTTON_TYPE.OUTLINE_SMALL]: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: FONT_TEXT.BLACK,
  },
  [BUTTON_TYPE.OUTLINE]: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: FONT_TEXT.BOLD,
  },
  [BUTTON_TYPE.ONLY_TEXT_SMALL]: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: FONT_TEXT.BLACK,
  },
  [BUTTON_TYPE.ONLY_TEXT]: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: FONT_TEXT.BOLD,
  },
  [BUTTON_TYPE.DEFAULT]: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: FONT_TEXT.BLACK,
  },
  [BUTTON_TYPE.ONLY_ICON]: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: FONT_TEXT.BLACK,
  },
});

export const iconStyles = PaaveStyleSheet.create({
  [BUTTON_TYPE.SOLID_SMALL]: {
    width: 14,
  },
  [BUTTON_TYPE.SOLID]: {
    width: 24,
  },
  [BUTTON_TYPE.OUTLINE_SMALL]: {
    width: 14,
  },
  [BUTTON_TYPE.OUTLINE]: {
    width: 16,
  },
  [BUTTON_TYPE.ONLY_TEXT_SMALL]: {
    width: 16,
  },
  [BUTTON_TYPE.ONLY_TEXT]: {
    width: 16,
  },
  [BUTTON_TYPE.DEFAULT]: {
    width: 16,
  },
  [BUTTON_TYPE.ONLY_ICON]: {
    width: 16,
  },
});
