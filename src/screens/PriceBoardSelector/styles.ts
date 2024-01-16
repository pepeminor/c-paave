import { getStylesHook } from 'hooks/useStyles';
import { lightColors, textStyles } from 'styles';

export default getStylesHook({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: lightColors.BACKGROUND_MODAL,
  },
  modalContainerPortrait: {
    backgroundColor: lightColors.WHITE,
    width: '100%',
    height: '80%',
    padding: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
  },
  modalContainerLandscape: {
    backgroundColor: lightColors.WHITE,
    width: '100%',
    height: '80%',
    padding: 16,
    paddingHorizontal: 48,
    borderRadius: 16,
  },
  priceBoardType: {
    ...textStyles.fontSize20,
    ...textStyles.roboto700,
    marginLeft: -8,
  },
  itemsContainer: {
    height: '70%',
    width: '100%',
    marginBottom: 15,
  },
  groupText: {
    ...textStyles.fontSize16,
    ...textStyles.roboto700,
    marginVertical: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderBottomColor: lightColors.BlueNewColor,
    borderBottomWidth: 3,
    width: '40%',
  },
  itemContainer: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  borderTop: {
    borderTopColor: lightColors.BORDER,
    borderTopWidth: 0.5,
  },
  borderBottom: {
    borderBottomColor: lightColors.BORDER,
    borderBottomWidth: 0.5,
  },
  itemText: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
  },
});
