import { getStylesHook } from 'hooks';
import { lightColors } from 'styles';

export const useStyles = getStylesHook({
  container: {},
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
    paddingLeft: 16,
    paddingRight: 4,
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: lightColors.BORDER,
    paddingVertical: 12,
  },

  checkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: lightColors.BACKGROUND_MODAL,
    marginHorizontal: 16,
  },
  dragIcon: {
    paddingHorizontal: 16,
  },
  textInputStyle: {
    padding: 0,
  },
  newItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: lightColors.BORDER,
    paddingVertical: 12,
    marginRight: 48,
    marginHorizontal: 16,
    marginVertical: 4,
  },
  addOptionIcon: {
    paddingHorizontal: 16,
  },
  endDayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    paddingHorizontal: 16,
  },
  endDayTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  endDayModal: {
    paddingTop: 16,
  },
  pickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: lightColors.BORDER,
    borderBottomWidth: 1,
  },
});
