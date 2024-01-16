import { StyleSheet } from 'react-native';
import { lightColors } from 'styles';

export const CommonBoardStyles = StyleSheet.create({
  stockInfoGroup: {
    flex: 1.5,
    flexDirection: 'row',
  },
  bidAskGroup: {
    flex: 3,
    flexDirection: 'row',
  },
  matchingInfoGroup: {
    flex: 2,
    flexDirection: 'row',
  },
  symbolCode: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lightColors.LIGHTBGTab,
    margin: 0.5,
  },
  stockPrice: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: lightColors.LIGHTBGTab,
    margin: 0.5,
    paddingHorizontal: 2,
  },
  bidAskPrice: {
    flex: 6,
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: lightColors.LIGHTTitleTable,
    margin: 0.5,
    paddingHorizontal: 2,
  },
  bidAskVolume: {
    flex: 7,
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: lightColors.LIGHTTitleTable,
    margin: 0.5,
    paddingHorizontal: 2,
  },
  matchingInfo: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: lightColors.LIGHTBGTab,
    margin: 0.5,
    paddingHorizontal: 2,
  },
  matchingVol: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: lightColors.LIGHTBGTab,
    margin: 0.5,
    paddingHorizontal: 2,
  },
});
