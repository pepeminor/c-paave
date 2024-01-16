import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  stockInfoTitleContainer: {
    height: 44,
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  marginBottom8: {
    marginBottom: 8,
  },
  investmentText: {
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.LIGHTTextBigTitle,
    flex: 1,
    textAlignVertical: 'center',
    alignSelf: 'center',
  },
  containerSeeMore: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  viewDetailText: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  reportText: {
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.BlueNewColor,
    marginRight: 9,
    fontSize: 14,
  },
  executeFormButton: {
    backgroundColor: Colors.BlueNewColor,
    height: 44,
    borderRadius: 10,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  executeFormButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.WHITE,
  },
  heightTableLoginRequired: {
    height: 300,
  },
});
