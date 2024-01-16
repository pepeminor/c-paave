import { getStylesHook } from 'hooks/useStyles';
import globalStyles, { Colors, textStyles } from 'styles';

export default getStylesHook({
  noDataCon: {
    flex: 1,
    width: 375,
    height: 162,
    justifyContent: 'center',
    alignItems: 'center',
  },

  noDataText: {
    fontFamily: 'Roboto',
    marginTop: 16,
    fontSize: 16,
    color: Colors.LIGHTTextContent,
    textAlign: 'center',
  },

  paddingFlex: {
    paddingBottom: 80,
    flexGrow: 1,
  },
  wrapInfo: {
    ...globalStyles.borderBottom1,
    ...globalStyles.padding16,
    ...globalStyles.flexDirectionRow,
    ...globalStyles.justifySpaceBetween,
    ...globalStyles.container,
  },
  title: {
    ...textStyles.roboto700,
    fontSize: 14,
  },
  content: {
    ...textStyles.roboto400,
    fontSize: 14,
  },
});
