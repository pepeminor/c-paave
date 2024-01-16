import globalStyles, { lightColors, width } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
  },
  headerIconLeft: {
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  containerInputAccessory: {
    ...globalStyles.flexDirectionRow,
    ...globalStyles.alignCenter,
    ...globalStyles.positionAbsolute,
    alignSelf: 'flex-end',
    backgroundColor: lightColors.WHITE,
    height: 44,
    _width: width,
    paddingHorizontal: 16,
    zIndex: 10,
    bottom: 0,
  },
  inputAccessoriesText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: lightColors.LIGHTTextTitle,
    marginRight: 8,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  containerItemAccessory: {
    ...globalStyles.container,
    ...globalStyles.fillHeight,
    ...globalStyles.flexDirectionRow,
    ...globalStyles.alignCenter,
  },
  width12: {
    width: 12,
  },
  iconHideKeyboard: {
    ...globalStyles.centered,
    paddingLeft: 8,
    height: 32,
    width: 32,
    borderLeftColor: lightColors.LIGHTIconDisable,
    borderLeftWidth: 1,
    borderRadius: 0,
    backgroundColor: lightColors.Transparent,
  },
});
