import globalStyles, { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    width: '100%',
  },
  headerContainer: {
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 24,
    marginLeft: 32,
    color: Colors.WHITE,
  },
  secondFilter: {
    marginTop: 5,
    marginHorizontal: 16,
    backgroundColor: Colors.Blue3,
    borderRadius: 10,
    height: 34,
  },
  secondFilter2: {
    marginHorizontal: 16,
    backgroundColor: Colors.Blue3,
    borderRadius: 10,
    height: 34,
  },
  eachItemFilterContainer: {
    height: 28,
    borderRadius: 6,
  },
  eachItemFilterContainerMarginRight: {
    marginRight: 5,
  },
  eachItemFilterContainerSelected: {
    backgroundColor: Colors.WHITE,
    height: 28,
    borderRadius: 6,
    alignItems: 'center',
    marginVertical: 3,
    marginHorizontal: 3,
  },
  eachItemFilterContainerUnselected: {
    backgroundColor: Colors.LIGHTTextBigTitle,
  },
  eachItemFilterText: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  eachItemFilterTextSelected: {
    color: Colors.BlueNewColor,
    fontWeight: 'bold',
  },
  eachItemFilterTextUnselected: {
    color: Colors.WHITE,
  },
  pAOptionContainer: {
    paddingHorizontal: 16,
  },
  btnContestHappen: {
    ...globalStyles.flexDirectionRow,
    ...globalStyles.alignCenter,
    position: 'relative',
    justifyContent: 'space-between',
    backgroundColor: Colors.WHITEBlur,
    marginHorizontal: 16,
    marginBottom: 12,
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexGrow: 0,
  },
  switchWeekContain: {
    ...globalStyles.flexDirectionRow,
    ...globalStyles.alignCenter,
    justifyContent: 'space-between',
    backgroundColor: Colors.WHITEBlur,
    marginBottom: 12,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexGrow: 0,
  },
  wrapSwitchBtn: {
    ...globalStyles.flexDirectionRow,
    ...globalStyles.alignCenter,
  },
  screenOption: {
    paddingHorizontal: 3,
    paddingVertical: 3,
  },
  optionContainerSelected: {
    borderBottomColor: Colors.WHITE,
    borderBottomWidth: 3,
  },
  selectedText: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.WHITE,
  },
  unselectedText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.SecondColorsLogo,
  },
  contestNotificationContainer: {
    marginHorizontal: 16,
    marginBottom: 8,
    backgroundColor: Colors.WHITEBlur,
    borderRadius: 10,
  },
  contestNotificationContainer2: {
    marginBottom: 2,
    marginTop: 4,
    marginHorizontal: 16,
    backgroundColor: Colors.WHITEBlur,
    borderRadius: 10,
  },
  contestText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.WHITE,
  },
  contestIconInfo: {
    borderWidth: 2,
    borderColor: Colors.WHITE,
    borderRadius: 8,
    width: 16,
    height: 16,
    marginRight: 10,
    flexDirection: 'row',
    textAlign: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    fontSize: 11,
    color: Colors.WHITE,
    fontWeight: 'bold',
  },
  noContestText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'italic',
    color: Colors.WHITE,
  },
  paddingLeft16: {
    paddingLeft: 16,
  },
  marginContent: {
    marginLeft: 'auto',
  },
  marginHorizontal16: {
    marginHorizontal: 16,
    marginTop: 32,
  },
  arrowIcon: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  disableArrowIcon: {
    opacity: 0.5,
  },
  enableArrowIcon: {
    opacity: 1,
  },
  marginLeft8: {
    marginLeft: 20,
  },
  mt12: {
    marginTop: 12,
  },
  paddingHorizontal16: {
    paddingHorizontal: 16,
  },
  pb4: {
    paddingBottom: 8,
  },
});
