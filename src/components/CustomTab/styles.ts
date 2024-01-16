import globalStyles, { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  optionContainerButton: {
    borderRadius: 10,
  },
  headerContainer: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  screenOptionButton: {
    backgroundColor: Colors.LIGHTBGTab,
    borderRadius: 10,
    paddingHorizontal: 3,
    paddingVertical: 3,
  },
  screenOptionUnderline: {
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 3,
    paddingVertical: 3,
  },
  optionContainerSelectedButton: {
    // paddingHorizontal: (5),
    backgroundColor: Colors.WHITE,
  },
  selectedTitleButton: {
    color: Colors.BlueNewColor,
    fontWeight: '700',
  },
  optionContainerSelectedUnderline: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.BlueNewColor,
  },
  selectedTitleUnderline: {
    color: Colors.BlueNewColor,
    fontWeight: '700',
  },
  emptyBlock: {
    height: 10,
  },
  headerBtn: {
    ...globalStyles.flexDirectionRow,
    ...globalStyles.centered,
    ...globalStyles.container,
    borderRadius: 10,
  },
  headerUnderline: {
    ...globalStyles.centered,
    ...globalStyles.container,
  },
});
