import { TVChartType } from 'constants/enum';
import { LANG } from 'global';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

export enum FilterChart {
  ONE_DAY = '1 D',
  ONE_WEEK = '1 W',
  ONE_MONTH = '1 M',
  THREE_MONTH = '3 M',
  SIX_MONTH = '6 M',
  ONE_YEAR = '1 Y',
}

export enum ResolutionChart {
  ONE_MINUTE = '1',
  FIVE_MINUTE = '5',
  FIFTEEN_MINUTE = '15',
  THIRTY_MINUTE = '30',
  ONE_HOUR = '60',
  ONE_DAY = '1D',
  ONE_WEEK = '1W',
}

export enum TimeframeChart {
  ONE_DAY = '1D',
  ONE_WEEK = '1W',
  ONE_MONTH = '1M',
  THREE_MONTH = '3M',
  SIX_MONTH = '6M',
  TWELVE_MONTH = '12M',
}

export enum OtherButtonValue {
  REFRESH = 'REFRESH',
  ZOOMIN = 'ZOOMIN',
}

export interface OtherButton {
  icon: React.FC<SvgProps>;
  value: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export interface TVChartFilter {
  name: string;
  value: FilterChart;
  timeframe: string;
  resolution: string;
  style?: StyleProp<ViewStyle>;
  fromCalculator: [number, number];
}

export type IOptionType = 'ADD' | 'REMOVE' | 'SET_DATE_RANGE';

export interface IChartOptions {
  type: IOptionType;
  studyName: string;
  entityId?: string;
}

export interface IInfoTVChartProps {
  s: string;
  lang: LANG;
  defaultSelected: FilterChart;
  buttonList?: (OtherButton | TVChartFilter)[];
  containerStyle?: StyleProp<ViewStyle>;
  tvContainerStyle?: StyleProp<ViewStyle>;
  btnContainerStyle?: StyleProp<ViewStyle>;
  btnStyle?: StyleProp<ViewStyle>;
  selectedBtnStyle?: StyleProp<ViewStyle>;
  btnLabelStyle?: StyleProp<TextStyle>;
  selectedBtnLabelStyle?: StyleProp<TextStyle>;
  enableChartSetting?: boolean;

  modifyDefaultButtonList?: (defaultBtnList: (OtherButton | TVChartFilter)[]) => (OtherButton | TVChartFilter)[];
}

export interface IResolution {
  label: string;
  value: string;
}

export interface IInfoTVChartState {
  filterSelect: TVChartFilter;
  chartOptions: IChartOptions[];
  tradingViewRefreshVersion: number;
  chartType: TVChartType;
  indicatorModalVisible: boolean;
  resolutionDropdownVisible: boolean;
  resolution: IResolution;
  componentContainerHeight: number;
  enabledInteract: boolean;
}
