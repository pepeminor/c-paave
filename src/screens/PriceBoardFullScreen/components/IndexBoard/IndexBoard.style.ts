import { StyleSheet } from 'react-native';
import { lightColors } from 'styles';

export const IndexBoardStyles = StyleSheet.create({
  symbolCode: {
    flex: 0.75,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lightColors.BORDER,
    margin: 0.5,
    padding: 1,
  },
  price: {
    flex: 0.75,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lightColors.LIGHTTitleTable,
    margin: 0.5,
    padding: 1,
  },
  priceChange: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lightColors.LIGHTTitleTable,
    margin: 0.5,
    padding: 1,
  },
  volumeValue: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lightColors.BORDER,
    margin: 0.5,
    padding: 1,
  },
  stocksChanged: {
    flex: 1 / 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lightColors.LIGHTTitleTable,
    margin: 0.5,
    padding: 1,
  },
});
