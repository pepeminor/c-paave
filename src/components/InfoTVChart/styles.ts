import { getStylesHook } from 'hooks/useStyles';
import globalStyles, { lightColors as Colors } from 'styles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  chartOptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5.5,
    marginVertical: 8,
  },
  chartOptionButton: {
    ...globalStyles.centered,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.WHITE,
    height: 27,
    borderRadius: 14,
    borderColor: Colors.BlueNewColor,
    borderWidth: 1.5,
  },
  marginRight3: {
    marginRight: 10,
  },
  buttonText: {
    color: Colors.BlueNewColor,
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 2,
  },
  chartTypeButtonText: {
    color: Colors.LIGHTTextTitle,
    fontSize: 12,
    fontWeight: '400',
    marginLeft: 8,
  },

  // Modal
  hiddenCloseButton: {
    display: 'none',
  },
  underlayStyle: {
    backgroundColor: Colors.BACKGROUND_MODAL3,
  },
});
