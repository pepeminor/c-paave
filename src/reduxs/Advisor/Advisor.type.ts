import { AdvisorChartData, PeriodicProfitLoss } from 'interfaces/Advisor';
import { I18nData } from 'interfaces/localization';

export type AdvisorState = {
  /**
   * Used for sort user by profit loss
   */
  monthlySorted: number[];
  annualSorted: number[];
  map: {
    [s: number]: AdvisorInfo | undefined;
  };
  profitLoss: {
    [s: number]: PeriodicProfitLoss | undefined;
  };
  chartData: {
    [s: number]: AdvisorChartData | undefined;
  };
  viewsAndFollowers: {
    [s: number]:
      | {
          totalViews?: number;
          totalFollowers?: number;
        }
      | undefined;
  };
  isFollowing: {
    [s: number]: boolean | undefined;
  };
};

export type AdvisorInfo = I18nData<{
  userId: number;
  username: string;
  fullname: string;
  bio: string;
}>;
