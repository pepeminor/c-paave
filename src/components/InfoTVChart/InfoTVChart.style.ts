import { getStylesHook } from 'hooks/useStyles';
import { StyleSheet } from 'react-native';
import { lightColors as Colors, scaleSize } from 'styles';

const rootStyles = StyleSheet.create({
  chartOptionButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.WHITE,
    height: scaleSize(27),
    borderRadius: scaleSize(14),
    borderColor: Colors.BlueNewColor,
    borderWidth: scaleSize(1.5),
  },
});

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  chartOptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaleSize(5.5),
    marginVertical: scaleSize(8),
  },
  chartOptionButton: rootStyles.chartOptionButton,
  chartOptionButtonMargin: {
    ...rootStyles.chartOptionButton,
    marginRight: scaleSize(10),
  },
  chartOptionButtonMarginZoomEnabled: {
    ...rootStyles.chartOptionButton,
    marginRight: scaleSize(10),
    backgroundColor: Colors.BlueNewColor,
  },
  buttonText: {
    color: Colors.BlueNewColor,
    fontSize: scaleSize(12),
    fontWeight: '500',
    marginLeft: scaleSize(2),
  },
  buttonTextZoomEnabled: {
    color: Colors.WHITE,
    fontSize: scaleSize(12),
    fontWeight: '500',
    marginLeft: scaleSize(2),
  },
  chartTypeButtonText: {
    color: Colors.LIGHTTextTitle,
    fontSize: scaleSize(12),
    fontWeight: '400',
    marginLeft: scaleSize(8),
  },

  // Modal
  hiddenCloseButton: {
    display: 'none',
  },
  underlayStyle: {
    backgroundColor: Colors.BACKGROUND_MODAL3,
  },

  // Dropdown
  borderRadius15: {
    borderRadius: scaleSize(15),
  },
  iconStyle: {
    marginTop: scaleSize(3),
  },
});
