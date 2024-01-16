import { getStylesHook } from 'hooks/useStyles';
import { lightColors, textStyles } from 'styles';

export const useStyles = getStylesHook({
  container: {
    width: '100%',
    height: 60,
    backgroundColor: lightColors.WHITE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  smallContainer: {
    height: 50,
  },
  selectorContainer: {
    flex: 85,
    height: '100%',
    borderColor: lightColors.BORDER2,
    borderWidth: 1,
    borderRadius: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  currentValue: {
    ...textStyles.fontSize16,
    ...textStyles.roboto400,
  },
  fullScreenBtn: {
    flex: 15,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    paddingTop: 20,
    paddingBottom: 8,
    paddingHorizontal: 36,
  },
  itemsContainer: {
    height: '70%',
    width: '100%',
    marginBottom: 15,
  },
  priceBoardType: {
    ...textStyles.fontSize20,
    ...textStyles.roboto700,
    marginLeft: -8,
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
  itemText: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
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
  landscapeHeaderContainer: {
    flex: 100,
    marginRight: -32,
    paddingLeft: 32,
  },
  landscapeHeader: {
    ...textStyles.fontSize20,
    ...textStyles.roboto700,
    width: '40%',
    borderBottomColor: lightColors.BlueNewColor,
    borderBottomWidth: 5,
  },
});
