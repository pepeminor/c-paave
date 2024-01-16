import { getStylesHook } from 'hooks/useStyles';
import { lightColors, textStyles } from 'styles';
import { TAB_SELECTOR_TYPE } from './type';

const useContainerStyles = getStylesHook({
  [TAB_SELECTOR_TYPE.SOLID]: {
    marginVertical: 8,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: lightColors.WHITE,
  },
  [TAB_SELECTOR_TYPE.SOLID_WITH_WRAPPER]: {
    marginTop: 8,
    marginBottom: 8,
    marginHorizontal: 16,
    backgroundColor: lightColors.LIGHTBGTab,
    borderRadius: 10,
    paddingHorizontal: 3,
    paddingVertical: 3,
    flexDirection: 'row',
  },
  [TAB_SELECTOR_TYPE.UNDERLINE]: {
    flexDirection: 'row',
    height: 40,
  },
  [TAB_SELECTOR_TYPE.SOLID_WITH_HIGHLIGHT]: {
    flexDirection: 'row',
    marginVertical: 8,
    paddingHorizontal: 4,
  },
});

const useSelectedContainerStyles = getStylesHook({
  [TAB_SELECTOR_TYPE.SOLID]: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    paddingHorizontal: 8,
    marginHorizontal: 4,
    backgroundColor: lightColors.LIGHTBGTab,
    flexDirection: 'row',
  },
  [TAB_SELECTOR_TYPE.SOLID_WITH_WRAPPER]: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: lightColors.WHITE,
    flexDirection: 'row',
    paddingVertical: 6,
  },
  [TAB_SELECTOR_TYPE.UNDERLINE]: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 16,
    borderBottomWidth: 3,
    borderBottomColor: lightColors.BlueNewColor,
  },
  [TAB_SELECTOR_TYPE.SOLID_WITH_HIGHLIGHT]: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: lightColors.BlueNewColor,
    paddingVertical: 4,
    marginHorizontal: 4,
    borderRadius: 4,
  },
});

const useUnselectedContainerStyles = getStylesHook({
  [TAB_SELECTOR_TYPE.SOLID]: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    paddingHorizontal: 2,
    paddingVertical: 8,
    marginHorizontal: 4,
    flexDirection: 'row',
  },
  [TAB_SELECTOR_TYPE.SOLID_WITH_WRAPPER]: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    paddingVertical: 6,
  },
  [TAB_SELECTOR_TYPE.UNDERLINE]: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 16,
  },
  [TAB_SELECTOR_TYPE.SOLID_WITH_HIGHLIGHT]: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: lightColors.LIGHTBGTab,
    paddingVertical: 4,
    marginHorizontal: 4,
    borderRadius: 4,
  },
});

const useSelectedTextStyles = getStylesHook({
  [TAB_SELECTOR_TYPE.SOLID]: {
    ...textStyles.fontSize14,
    ...textStyles.roboto700,
    color: lightColors.BlueNewColor,
  },
  [TAB_SELECTOR_TYPE.SOLID_WITH_WRAPPER]: {
    ...textStyles.fontSize14,
    ...textStyles.roboto700,
    color: lightColors.BlueNewColor,
    textAlign: 'center',
  },
  [TAB_SELECTOR_TYPE.UNDERLINE]: {
    ...textStyles.fontSize14,
    ...textStyles.roboto700,
    color: lightColors.BlueNewColor,
    textAlign: 'center',
  },
  [TAB_SELECTOR_TYPE.SOLID_WITH_HIGHLIGHT]: {
    ...textStyles.fontSize14,
    ...textStyles.roboto700,
    color: lightColors.WHITE,
  },
});

const useUnselectedTextStyles = getStylesHook({
  [TAB_SELECTOR_TYPE.SOLID]: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
    color: lightColors.LIGHTTextTitle,
  },
  [TAB_SELECTOR_TYPE.SOLID_WITH_WRAPPER]: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
    color: lightColors.LIGHTTextTitle,
    textAlign: 'center',
  },
  [TAB_SELECTOR_TYPE.UNDERLINE]: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
    textAlign: 'center',
  },
  [TAB_SELECTOR_TYPE.SOLID_WITH_HIGHLIGHT]: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
    color: lightColors.LIGHTTextTitle,
  },
});

export const useTabSelectorStyles = (type: TAB_SELECTOR_TYPE) => {
  const { styles: container } = useContainerStyles();
  const { styles: selectedContainer } = useSelectedContainerStyles();
  const { styles: unselectedContainer } = useUnselectedContainerStyles();
  const { styles: selectedText } = useSelectedTextStyles();
  const { styles: unselectedText } = useUnselectedTextStyles();

  return {
    container: container[type],
    selectedContainer: selectedContainer[type],
    unselectedContainer: unselectedContainer[type],
    selectedText: selectedText[type],
    unselectedText: unselectedText[type],
  };
};
