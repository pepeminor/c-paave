import { getStylesHook } from 'hooks/useStyles';
import globalStyles, { lightColors as Colors } from 'styles';

export default getStylesHook({
  watchListWholeContainer: {
    ...globalStyles.container,
    backgroundColor: Colors.WHITE,
    paddingBottom: 20,
  },

  watchNoListContainer: {
    ...globalStyles.alignCenter,
    ...globalStyles.flexDirectionRow,
    paddingTop: 16,
    marginHorizontal: 16,
  },
  executeFormButton: {
    ...globalStyles.centered,
    ...globalStyles.flexDirectionRow,
    flex: 10,
    backgroundColor: Colors.BlueNewColor,
    height: 44,
    borderRadius: 10,
  },
  removeButton: {
    ...globalStyles.centered,
    ...globalStyles.flexDirectionRow,
    flex: 2,
    marginLeft: 12,
    backgroundColor: Colors.LIGHTButtonRed,
    height: 44,
    borderRadius: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
  executeFormButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.WHITE,
    marginLeft: 10,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.BlueNewColor,
    marginRight: 10,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
});
