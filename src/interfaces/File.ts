import { I18nData } from './localization';

export type StoredFile<T> = {
  ETag: string;
  data: T;
};

// Holiday File
export type HolidayFile = {
  year: number;
  eventHoliday: string;
  startDate: string; // "2023-01-02"
  endDate: string;
}[];

// Contest File
export type ContestFile = {
  modal: {
    show: boolean;
    linkedContest: number;
    data: I18nData<ContestModal>;
  };
  contests: ContestItem[];
  subMenu: ContestSubMenu;
};

// Kis Leaderboard Modal
export type TKisInfoModal = {
  modal: {
    show: boolean;
    linkedContest?: number;
    data: I18nData<ContestModal>;
  };
};

export type ContestSubMenu = {
  name: subMenuName[];
  showSwitchBoard: boolean;
  show: boolean;
  contestId: string;
  requireJoin: boolean;
  startAt: string;
  endAt: string;
  joinable: string;
  lastJoinable: string;
  contestPeriod: {
    Week: string;
  };
  checkEnddate: string;
  notifyContestShow: boolean;
  FAQ: {
    en: subMenuFAQ[];
    vi: subMenuFAQ[];
  };
};

export type subMenuName = {
  tab: string;
};

export type subMenuFAQ = {
  index?: number;
  question: string;
  answer: string;
};

export type ContestModal = {
  header: string;
  title: string;
  subTitle: string;
  prize: {
    first?: string;
    second?: string;
    third?: string;
  };
  sections: {
    title: string;
    content: ContestContent;
  }[];
};

export type ContestItem = {
  name: string;
  position: number;
  status: 'Upcoming' | 'Happen now' | 'Ended';
  startDate: string;
  endDate: string;
  prize: string;
  description: I18nData<ContestDescription>;
  result: ContestResultItem[];
  [s: string]: unknown;
};

export type BannerFile = {
  bannersVi: BannerListItem[];
  bannersEn: BannerListItem[];
  scrollTime: number;
  bannerTitleVi: string;
  bannerTitleEn: string;
};

export type BannerListItem = {
  image: string;
  order: number;
  link?: string;
  isBannerEkycKis?: boolean;
  screenName?: string;
  params?: { [s: string]: unknown };
  period: { startDate: string; endDate: string };
};

export type ContestResultItem = {
  title: string;
  closeContent?: string;
  showResult: boolean;
  data: ContestResultItemData[];
};

export type ContestResultItemData = {
  userId: string;
  rank: number;
  fullName: string;
  username: string;
  prize: string;
  returnRate: number;
  subAccount: string;
  rankingChanged: number;
};

export type ContestContent = string | ContestContent[];

export type ContestDescription = {
  title: string;
  content: ContestContent;
  detailUrl?: string;
  descriptionParts: {
    title: string;
    content: ContestContent;
  }[];
};

// Bot name file
export interface I18nBotData
  extends I18nData<{
    fullname: string;
    bio: string;
  }> {
  username: string;
  userId: number;
}

// Auto Trade Agreement File
export type AutoTradeAgreementFile = I18nData<AgreementSection[]>;

export type AgreementSection = {
  title: string;
  content: AgreementSectionContent;
};

type AgreementSectionContent = string | AgreementSectionContent[];

// Auto Trade Popup Image/ Content
export type AutoTradePopup = {
  image: Array<string>;
  content: AutoTradePopupContent[];
};
export type AutoTradePopupContent = string | AutoTradePopupContent[];
export type AutoTradePopupFile = {
  advisor: I18nData<AutoTradePopup>;
  aiRating: I18nData<AutoTradePopup>;
};

// Advisor Survey File
export type SurveyAnswer = {
  answer: string;
  mark: number;
};

export type SurveyQuestion = {
  question: string;
  answers: SurveyAnswer[];
};

export type AdvisorSurvey = {
  RiskTaking: SurveyQuestion[];
  InvestmentKnowledge: SurveyQuestion[];
};

export type AdvisorSurveyFile = {
  survey: I18nData<AdvisorSurvey>;
  ranking: {
    RiskTaking: number[];
    InvestmentKnowledge: number[];
  };
  botCategory: {
    low: string[];
    medium: string[];
    high: string[];
  };
};

// Feature Configurations File
export type FeatureName = 'AdvisorCopyTrade' | 'Theme';

export type FeatureConfigurationFile = {
  [s in FeatureName]: FeatureConfiguration;
};

export type FeatureConfiguration = {
  enabled: boolean;
  [s: string]: unknown;
};
