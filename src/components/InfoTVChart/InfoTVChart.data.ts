import {
  FilterChart,
  IResolution,
  OtherButton,
  OtherButtonValue,
  ResolutionChart,
  TimeframeChart,
  TVChartFilter,
} from './InfoTVChart.type';
import IconRefresh from 'assets/icon/iconRefresh.svg';
import IconZoomInOutline from 'assets/icon/IconZoomInOutline.svg';
import { calculatorRangeButton } from './InfoTVChart.helper';

export const defaultButtonList: () => (OtherButton | TVChartFilter)[] = () => [
  {
    name: FilterChart.ONE_DAY,
    value: FilterChart.ONE_DAY,
    resolution: ResolutionChart.ONE_MINUTE,
    timeframe: TimeframeChart.ONE_DAY,
    fromCalculator: calculatorRangeButton(TimeframeChart.ONE_DAY),
  },
  {
    name: FilterChart.ONE_MONTH,
    value: FilterChart.ONE_MONTH,
    resolution: ResolutionChart.ONE_DAY,
    timeframe: TimeframeChart.ONE_MONTH,
    fromCalculator: calculatorRangeButton(TimeframeChart.ONE_MONTH),
  },
  {
    name: FilterChart.THREE_MONTH,
    value: FilterChart.THREE_MONTH,
    resolution: ResolutionChart.ONE_DAY,
    timeframe: TimeframeChart.THREE_MONTH,
    fromCalculator: calculatorRangeButton(TimeframeChart.THREE_MONTH),
  },
  {
    name: FilterChart.SIX_MONTH,
    value: FilterChart.SIX_MONTH,
    resolution: ResolutionChart.ONE_DAY,
    timeframe: TimeframeChart.SIX_MONTH,
    fromCalculator: calculatorRangeButton(TimeframeChart.SIX_MONTH),
  },
  {
    name: FilterChart.ONE_YEAR,
    value: FilterChart.ONE_YEAR,
    resolution: ResolutionChart.ONE_DAY,
    timeframe: TimeframeChart.TWELVE_MONTH,
    fromCalculator: calculatorRangeButton(TimeframeChart.TWELVE_MONTH),
  },
  {
    icon: IconRefresh,
    value: OtherButtonValue.REFRESH,
  },
  {
    icon: IconZoomInOutline,
    value: OtherButtonValue.ZOOMIN,
  },
];

export const ResolutionList: IResolution[] = [
  { label: '1 minute', value: ResolutionChart.ONE_MINUTE },
  { label: '1 hour', value: ResolutionChart.ONE_HOUR },
  { label: '1 day', value: ResolutionChart.ONE_DAY },
  { label: '1 week', value: ResolutionChart.ONE_WEEK },
];
