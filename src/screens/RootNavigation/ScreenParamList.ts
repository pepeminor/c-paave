import { IAccountNotificationListResponse } from 'interfaces/notification';
import { ILeaderBoardInvestingResponse } from 'interfaces/leaderBoard';
import { OrderBookScreenInitOption } from 'global';
import { TYPE_OPTION_VALUE } from 'screens/CashTransaction';
import { IFakeTradingAccountType } from 'screens/AccountTrading';
import { ContestItem, ContestResultItemData } from 'interfaces/File';
import { TAB } from 'screens/AIRatingScreen/AiRatingScreen.logic';
import { MarketCategoriesLiteral, PriceBoardType } from 'screens/PriceBoardFullScreen/PriceBoardFullScreen.type';
import { SymbolType } from 'constants/enum';
import { FollowingType } from 'screens/CopyTradeScreen/CopyTradeScreen.type';
import { IMediaPCore, PickedImage, ThemePeriod } from 'reduxs';
import Animated from 'react-native-reanimated';
import { MeasureData } from 'hooks/useMedia/useShareMediaLayout.hook';
import { AuthType } from 'constants/AuthType';
import { ScreenTab, SearchedTag } from 'screens/SearchSymbolAndMember/type';

export type ScreenParamList = {
  readonly SignIn: undefined;

  readonly SignUp: undefined;
  readonly Home: undefined;
  readonly HomeTab: {
    readonly tab?: string;
    readonly accessToken?: string;
  };
  readonly Introduction: undefined;
  readonly Devices: undefined;
  readonly SignupOTP: {
    readonly isSignup?: boolean;
    readonly isEKYCVerifyEmail?: boolean;
    readonly email?: string;
    readonly sec?: AuthType;
    readonly flow?: string;
  };
  readonly SignupEnterName: {
    readonly sec?: string;
  };
  readonly SignupCongratulation: undefined;
  readonly SignupFavorite: undefined;
  readonly ForgotPassword: undefined;
  readonly ForgotKisPassword: undefined;
  readonly ForgotKisPasswordOTP: {
    password: string;
    username: string;
    passportID: string;
  };
  readonly KisEkycStep3PersonalInformation: undefined;
  readonly KisEkycStep4ServiceInformation: undefined;
  readonly NewPassword: undefined;
  readonly SearchSymbol: undefined;
  readonly SearchSymbolAndMember:
    | {
        initTab?: ScreenTab;
      }
    | undefined;
  readonly AddSymbolsToWatchlist: undefined;
  readonly Discover: undefined;
  readonly News: undefined;
  readonly HotStock: undefined;
  readonly PopularTheme: undefined;
  readonly LeaderBoard:
    | {
        leaderBoardTab?: boolean;
      }
    | undefined;
  readonly ProfitlossReport: undefined;
  readonly Notification: undefined;
  readonly AIRating: undefined;
  readonly NotificationDetail: IAccountNotificationListResponse;
  readonly UserWall: {
    readonly userData: ILeaderBoardInvestingResponse;
    readonly userDataTopPeopleLastWeek?: ContestResultItemData;
    //  {
    //   readonly userId: number;
    //   readonly fullName: string;
    //   readonly bio: string;
    //   readonly userName: string;
    // };
    readonly defaultSample?: number;
    readonly selectTabLeaderBoard?: boolean;
    readonly isFromSearch?: boolean;
    readonly headerTitle?: string;
    readonly isFromKis?: boolean;
  };
  readonly ManageWatchlist: undefined;
  readonly MarketCapBanks: undefined;
  readonly UserInfo: undefined;
  readonly UserInfoNonLogin: undefined;
  readonly Setting: undefined;
  readonly SettingNotification: undefined;
  readonly SettingCommunity: undefined;
  readonly LanguagePicker: undefined;
  readonly HomeScreenPicker: undefined;
  readonly HelpAndSupport: undefined;
  readonly LiveChat: undefined;
  readonly SessionTimeoutSetting: undefined;
  readonly KisEKYCVerifyEmail: {
    sec: AuthType;
  };
  readonly KisEKYCAboutForeign: undefined;
  readonly KisEKYCAbout: {
    email: string;
    flow: string;
    sec: AuthType;
  };
  readonly KisEKYCFirstStep: {
    email: string;
    flow: string;
    sec: string;
  };
  readonly KisEKYCFinalStep: {
    flow: string;
    sec: AuthType;
  };
  readonly KisEKYCStep1TypeOfInvestor: {
    email: string;
    flow: string;
    sec: string;
  };
  readonly KisEkycStep3EditPersonalInformation: undefined;
  readonly PopularThemeDetail: {
    themeName: string;
    period?: ThemePeriod;
    highlightStockCode?: string;
  };
  readonly Trade: undefined;
  readonly Trade1: {
    readonly isNotRefresh?: boolean;
  };
  readonly OrderBook: {
    initOption: OrderBookScreenInitOption;
  };
  readonly Portfolio: undefined;
  readonly PortfolioInvestment:
    | {
        portfolioFlow?: boolean;
      }
    | undefined;
  readonly Security: undefined;
  readonly AccountOrderHistory: undefined;
  readonly DiscoverInvestor: undefined;
  readonly DiscoverWatchlist: undefined;

  readonly AssetInformationSetting: undefined;
  readonly AssetInformation: undefined;
  readonly AccountInformation: undefined;
  readonly UserIntroduction: undefined;
  readonly TradeQuote: undefined;
  readonly InviteFriends: undefined;
  readonly SecurityLevel: undefined;
  readonly CashInAdvance: undefined;
  readonly AccountTrading: undefined;
  readonly ChangePassword: undefined;
  readonly CreatePassword: undefined;
  readonly ChangePIN: undefined;
  readonly AccountCashTransaction: undefined;
  readonly CashTransaction: {
    CashOption: TYPE_OPTION_VALUE;
    CashOptionTab?: boolean;
  };
  readonly CashStatement: undefined;
  readonly AccountUtilities: undefined;
  readonly UtilitiesRightExercise: undefined;

  readonly OrderConfirmation: undefined;
  readonly InsightHome: undefined;

  readonly StockTransfer: undefined;
  readonly PortfolioNonLogin: undefined;
  readonly InsightsHome: undefined;
  readonly InsightsVideo: undefined;
  readonly InsightStrategies: undefined;
  readonly InsightsStrategiesDetailItem: {
    screenName: string;
  };

  readonly InsightsStrategiesDetail: {
    screenName: string;
  };
  readonly InsightsVideos: undefined;
  readonly InsightsVideosDetail: undefined;
  readonly KisEkycStep4UploadSignature: undefined;
  readonly KisEkycStep4ConfirmOTP: undefined;

  readonly Blog: undefined;
  readonly Blogs: undefined;
  readonly BlogItem: undefined;
  readonly EducationItem: undefined;
  readonly SearchBlogs: undefined;
  readonly TechnicalScore: undefined;
  readonly QualityScore: undefined;
  readonly ValuationScore: undefined;
  readonly AIRatingScreen: {
    aiRatingTab: {
      tab: keyof typeof TAB;
      isOpenRobot: boolean;
    };
  };
  readonly RealTradingSettings: {
    flow: string;
  };
  readonly ConnectTradingAccount: undefined;
  readonly ConnectRealAccount: undefined;
  readonly RealTrading: undefined;
  readonly TradingView: {
    s: string;
  };
  readonly LoginRealAccount: IFakeTradingAccountType & {
    flow: string;
    sec: string;
  };
  readonly AddToWatchlists: {
    nextToStockInfo: boolean;
  };

  readonly ChapterDetail: {
    chapter: string;
  };
  readonly DeleteAccountReason: undefined;
  readonly DeleteAccount: {
    reason: string;
  };
  readonly BlogWeb: {
    language: string;
  };
  readonly Contest:
    | undefined
    | {
        contestOrder?: number;
        contestTab?: 'Description' | 'Ranking';
      };
  readonly TermAndConditionVT: {
    contestItem?: ContestItem;
    contestOrder: number;
    contestTab?: 'Description' | 'Ranking';
  };
  readonly DepositGuideLine: undefined;
  readonly DeleteSymbolsWatchList: undefined;
  readonly CopyTradeScreen: {
    isFormDisabled?: boolean;
    isEdit?: boolean;
    followingType: FollowingType;
    followingUsername?: string;
    followingFullName?: string;
  };
  readonly ThankyouFeedback: undefined;
  readonly PriceBoardSelectorPortrait: {
    subscribeKey: string;
    initValue: MarketCategoriesLiteral;
    priceBoardType: PriceBoardType;
  };
  readonly PriceBoardSelectorLandScape: {
    subscribeKey: string;
    initValue: MarketCategoriesLiteral;
    priceBoardType: PriceBoardType;
  };
  readonly PriceBoardFullScreen: {
    priceBoardType: PriceBoardType;
    selectedList: MarketCategoriesLiteral;
  };
  readonly IntermediateHorizontalScreen: {
    nextScreen: keyof ScreenParamList;
    nextScreenParams?: unknown;
  };
  readonly IntermediateVerticalScreen: {
    nextScreen: keyof ScreenParamList;
    nextScreenParams?: unknown;
  };
  readonly PortfolioDerivatives: undefined;
  readonly SymbolInfoOverview?: {
    symbolType: keyof typeof SymbolType;
  };
  readonly AIRatingFilter: undefined;
  readonly LeaderboardSetting: undefined;
  readonly Top100StocksScreen: undefined;
  readonly ForeignTrading: undefined;
  readonly VideosDetailScreen: undefined;
  readonly PostDetailScreen: {
    postId: string;
    newsId?: number;
  };
  readonly SocialScreen?: {
    socialTab: {
      tab: 'Social' | 'Leaderboard';
    };
  };
  readonly SocialSearchHashtag: {
    data: SearchedTag;
  };
  readonly SocialNewPost: undefined;
  readonly SocialEditImageDescription: {
    asset: PickedImage;
  };
  readonly SocialEditProfiles: undefined;
  readonly MediaViewer: {
    medias: IMediaPCore[];
    initialIndex?: number;
    animationSpec?: Animated.SharedValue<MeasureData>;
    onChangeIndex?(index: number): void;
  };
  readonly LikedScreen: {
    postId: string;
  };
};

export default ScreenParamList;
