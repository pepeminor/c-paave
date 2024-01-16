import { Lang } from 'constants/enum';
import { IAction } from 'interfaces/common';
import {
  AutoTradeAgreementFile,
  AutoTradePopupFile,
  BannerFile,
  ContestFile,
  FeatureConfigurationFile,
  HolidayFile,
  TKisInfoModal,
} from 'interfaces/File';
import { SUCCESS } from 'reduxs/action-type-utils';
import { FEATURE_CONFIGURATION, GET_KIS_INFO_MODAL } from 'reduxs/actions';
import {
  GET_AUTO_TRADE_AGREEMENT,
  GET_AUTO_TRADE_POPUP,
  GET_BANNER_LIST,
  GET_BOT_DATA,
  GET_CONTEST_LIST,
  GET_HOLIDAY_LIST,
  GET_CURRENT_TIME,
} from 'reduxs/actions';

export type HolidaysState = {
  holidays: Array<{ start: Date; end: Date }>;
};

export function Holidays(state: HolidaysState = { holidays: [] }, action: IAction<HolidayFile>): HolidaysState {
  switch (action.type) {
    case SUCCESS(GET_HOLIDAY_LIST): {
      if (action.payload == null) return state;
      const newData = action.payload.map(holiday => ({
        start: new Date(holiday.startDate),
        end: new Date(holiday.endDate),
      }));
      return {
        ...state,
        holidays: [...state.holidays, ...newData],
      };
    }
    default:
      return state;
  }
}

export function Contests(state: ContestFile | null = null, action: IAction<null>): ContestFile | null {
  switch (action.type) {
    case SUCCESS(GET_CONTEST_LIST): {
      return action.payload;
    }
    default:
      return state;
  }
}

export function KisInfoModal(state: TKisInfoModal | null = null, action: IAction<null>): TKisInfoModal | null {
  switch (action.type) {
    case SUCCESS(GET_KIS_INFO_MODAL): {
      return action.payload;
    }
    default:
      return state;
  }
}

export function Banners(state: BannerFile | null = null, action: IAction<BannerFile | null>): BannerFile | null {
  switch (action.type) {
    case SUCCESS(GET_BANNER_LIST): {
      return action.payload;
    }
    default:
      return state;
  }
}

export function CurrentTime(state = '', action: IAction<string>) {
  switch (action.type) {
    case SUCCESS(GET_CURRENT_TIME): {
      return action.payload;
    }
    default:
      return state;
  }
}

type BotDataState = {
  [id: number]: IBotData;
};

export type IBotData = {
  userId: number;
  username: string;
  fullname: string;
  bio: string;
} & {
  [l in Lang]: {
    fullname: string;
    bio: string;
  };
};

/**
 * @deprecated Use state.Advisor.map instead
 */
export function BotData(state: BotDataState = {}, action: IAction<BotDataState>): BotDataState {
  switch (action.type) {
    case SUCCESS(GET_BOT_DATA): {
      return action.payload;
    }
    default:
      return state;
  }
}

export function AutoTradeAgreement(
  state: AutoTradeAgreementFile | null = null,
  action: IAction<AutoTradeAgreementFile>
): AutoTradeAgreementFile | null {
  switch (action.type) {
    case SUCCESS(GET_AUTO_TRADE_AGREEMENT): {
      return action.payload;
    }
    default:
      return state;
  }
}

export function AutoTradePopup(
  state: AutoTradePopupFile | null = null,
  action: IAction<AutoTradePopupFile>
): AutoTradePopupFile | null {
  switch (action.type) {
    case SUCCESS(GET_AUTO_TRADE_POPUP): {
      return action.payload;
    }
    default:
      return state;
  }
}

export function FeatureConfiguration(
  state: FeatureConfigurationFile | null = null,
  action: IAction<FeatureConfigurationFile>
): FeatureConfigurationFile | null {
  switch (action.type) {
    case SUCCESS(FEATURE_CONFIGURATION):
      return action.payload;
    default:
      return state;
  }
}
