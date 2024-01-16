import { getStylesHook } from 'hooks/useStyles';
import { lightColors, textStyles } from 'styles';

export default getStylesHook({
  container: {
    borderColor: lightColors.BORDER,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    backgroundColor: lightColors.LIGHTTitleTable,
  },
  headerText: {
    ...textStyles.fontSize12,
    ...textStyles.roboto700,
    color: lightColors.LIGHTTextDisable,
    textAlign: 'center',
  },
  headerCell: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: lightColors.LIGHTTitleTable,
    borderColor: lightColors.BORDER,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    paddingHorizontal: 4,
  },
  frozenColumn: {
    zIndex: 1,
  },
});
