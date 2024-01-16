import { lightColors as Colors, width } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  containerChartPie: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartContainerHeight: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 215,
    height: 215,
  },
  rightContainerHeight: {
    width: width - 215,
    height: 229,
    zIndex: -1,
    elevation: -1,
  },
  rightContainerWidth: {
    width: 136,
    height: 229,
    zIndex: -1,
    elevation: -1,
  },
  noteContainerHeight: {
    width: 136,
    height: 183,
  },
  noteContainerWidth: {
    width: 136,
    height: 183,
  },
  noteRowContainer: {
    flexDirection: 'row',
    height: 26,
    alignItems: 'center',
  },
  circleStyle: {
    width: 16,
    height: 16,
    marginVertical: 4,
    marginRight: 5,
    borderRadius: 50,
  },
  paginationContainerHeight: {
    width: 77,
    height: 26,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  paginationContainerWidth: {
    width: 77,
    height: 26,
    paddingTop: 26,
    flexDirection: 'row',
    alignItems: 'center',
  },
  paginationText: {
    paddingHorizontal: 5,
    fontSize: 12,
    color: Colors.LIGHTTextBigTitle,
  },
  chartTooltip: {
    maxWidth: 150,
    flexDirection: 'row',
    position: 'absolute',
    padding: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 5,
    backgroundColor: Colors.WHITE,
  },
  chartTooltipTitle: {
    color: Colors.LIGHTTextBigTitle,
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  chartTooltipValue: {
    color: Colors.LIGHTTextBigTitle,
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  customFontSizeHeight: {
    fontSize: 9,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    width: width - 250,
  },
  customFontSizeWidth: {
    fontSize: 9,
    width: 115,
  },
});
