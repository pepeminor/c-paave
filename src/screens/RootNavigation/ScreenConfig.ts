/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { StackNavigationOptions, StackScreenProps as ScreenStackProps } from '@react-navigation/stack';
import ScreenNames from './ScreenNames';
import ScreenParamList from './ScreenParamList';

import TradingView from '../TradingView';
/* Sign In / Sign Up */
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import ForgotPassword from '../ForgotPassword';
import ForgotKisPassword from '../ForgotKisPassword';
import ForgotKisPasswordOTP from '../ForgotKisPasswordOTP';
import SignupCongratulation from '../SignupCongratulation';
import SignupEnterName from '../SignupEnterName';
import SignupFavorite from '../SignupFavorite';
import SignupOTP from '../SignupOTP';
import BlogWeb from 'screens/BlogWeb';

/* Search */
import SearchSymbol from 'screens/SearchSymbol';
import SearchSymbolAndMember from 'screens/SearchSymbolAndMember';

/* Trade */
import TradeQuote from 'screens/TradeQuote';

/* Home */
import LanguagePicker from 'screens/LanguagePicker';
import Notification from '../Notification/index';
import HomeTab from '../HomeTab';
import Introduction from '../Introduction';
import LeaderBoard from '../LeaderBoard/index';
import NotificationDetail from '../NotificationDetail/index';
import ProfitlossReport from '../ProfitlossReport/index';
import UserWall from '../UserWall/index';
import PortfolioInvestment from 'screens/PortfolioInvestment';

/* Discover */
import DiscoverWatchlist from 'screens/DiscoverWatchlist';
import DeleteSymbols from 'screens/DiscoverWatchlist/DeleteSymbols';
import DiscoverInvestor from 'screens/DiscoverInvestor';
import HotStock from 'screens/HotStock';
import PopularThemeDetail from 'screens/PopularThemeDetail';
import MarketCapBanks from 'screens/MarketCapBanks';
import PopularTheme from 'screens/PopularTheme';
import ManageWatchlist from 'screens/ManageWatchlist';
import ChangePassword from 'screens/ChangePassword';
import ChangePIN from 'screens/ChangePIN';
import AddToWatchlists from 'screens/AddToWatchlists';
import AddSymbolsToWatchlist from 'screens/AddSymbolsToWatchlist';

/* Account */
import UserInfo from 'screens/UserInfo';
import UserInfoNonLogin from 'screens/UserInfoNonLogin';
import UserIntroduction from 'screens/UserIntroduction';
import AssetInformation from 'screens/AssetInformation';
import AccountOrderHistory from 'screens/AccountOrderHistory';
import OrderBook from 'screens/OrderBook';
import OrderConfirmation from 'screens/OrderConfirmation';
import NewPassword from 'screens/NewPassword';
import Setting from 'screens/Setting';
import SettingNotification from 'screens/SettingNotification';
import Security from 'screens/Security';
import AccountUtilities from 'screens/AccountUtilities';
import UtilitiesRightExercise from 'screens/UtilitiesRightExercise';
import StockTransfer from 'screens/StockTransfer';
import CashTransaction from 'screens/CashTransaction';
import CashStatement from 'screens/CashStatement';
import InviteFriends from 'screens/InviteFriends';
import HelpAndSupport from 'screens/HelpAndSupport';
import LiveChat from 'screens/LiveChat';
import CashInAdvance from 'screens/AccountCashInAdvance';
import AccountInformation from 'screens/AccountInformation';
import AssetInformationSetting from 'screens/AssetInformationSetting';
import AccountTrading from 'screens/AccountTrading';
import AccountCashTransaction from 'screens/AccountCashTransaction';
import Devices from 'screens/Devices';
import SecurityLevel from 'screens/SecurityLevel';
import DeleteAccountReason from 'screens/DeleteAccountReason';
import DeleteAccount from 'screens/DeleteAccount';

/* Insight */
import InsightsHome from 'screens/InsightsHome';
import InsightStrategies from 'screens/InsightsHome/InsightsInvestmentStrategy/InsightsStrategies';
import InsightsStrategiesDetailItem from 'screens/InsightsHome/InsightsInvestmentStrategy/InsightsStrategies/InsightsStrategiesDetailItem';
import InsightStrategiesDetail from 'screens/InsightsHome/InsightsInvestmentStrategy/InsightsStrategies/InsightsStrategiesDetail';
import InsightsVideo from 'screens/InsightsHome/InsightsVideo';
import InsightsVideos from 'screens/InsightsHome/InsightsVideo/InsightsViewVideos';
import InsightsVideosDetail from 'screens/InsightsHome/InsightsVideo/InsightsVideosDetail';

/* Blogs */
import Blogs from 'screens/Blogs';
import BlogItem from 'screens/BlogItem';
import EducationItem from 'screens/EducationItem';
import SearchBlogs from 'screens/SearchBlogs';

// AI rating
// import AIRatingScreen from 'screens/AIRatingScreen';

/* Components */

//TradingAccount
import LoginRealAccount from 'screens/LoginRealAccount';
import RealTradingSettings from 'screens/RealTradingSettings';
import ConnectTradingAccount from 'screens/ConnectTradingAccount';

//AccountReal
import ConnectRealAccount from 'screens/ConnectRealAccount';
import RealTrading from 'screens/RealTrading';
import Discover from 'screens/Discover';

// Learning
import ChapterDetail from 'screens/ChapterDetail';
import SessionTimeoutSetting from 'screens/SessionTimeoutSetting';
import KisEKYCAbout from 'screens/KisEKYCAbout';
import KisEKYCAboutForeign from 'screens/KisEKYCAboutForeign';
import KisEKYCFirstStep from 'screens/KisEKYCFirstStep';
import KisEKYCStep1TypeOfInvestor from 'screens/KisEKYCStep1TypeOfInvestor';
import KisEkycStep3PersonalInformation from 'screens/KisEkycStep3PersonalInformation';
import KisEkycStep3EditPersonalInformation from 'screens/KisEkycStep3EditPersonalInformation';
import KisEkycStep4ServiceInformation from 'screens/KisEkycStep4ServiceInformation';
import KisEkycStep4UploadSignature from 'screens/KisEkycStep4UploadSignature';
import KisEkycStep4ConfirmOTP from 'screens/KisEkycStep4ConfirmOTP';
import KisEKYCFinalStep from 'screens/KisEKYCFinalStep';
import KisEKYCVerifyEmail from 'screens/KisEKYCVerifyEmail';
import { StackScreenProps } from '.';
import Contest from 'screens/Contest';
import TermAndConditionVT from 'screens/TermAndConditionVT';
import DepositGuideLine from 'screens/DepositGuideLine';
import { ConnectedComponent } from 'react-redux';
import AIRatingScreen from 'screens/AIRatingScreen';
import CopyTradeScreen from 'screens/CopyTradeScreen';
import ThankyouFeedback from 'screens/ThankyouFeedback';
import PriceBoardFullScreen from 'screens/PriceBoardFullScreen';
import { VerticalScreen, HorizontalScreen } from 'screens/IntermediateScreen';
import PortfolioDerivatives from 'screens/PortfolioDerivatives';
import PriceBoardSelector from 'screens/PriceBoardSelector';
import SymbolInfoOverview from 'screens/SymbolInfoOverview';
import LeaderboardSetting from 'screens/LeaderboardSetting';
import HomeScreenPicker from 'screens/HomeScreenPicker';
import AIRatingFilter from 'screens/AIRatingFilter';
import CreatePassword from 'screens/CreatePassword';
import Top100StocksScreen from 'screens/Top100StocksScreen';
import TradeScreen from 'screens/TradeScreen';
import News from 'screens/News';
import { ForeignTradingScreen } from 'screens/ForeignTrading';
import VideosDetailScreen from 'screens/VideosDetailScreen';
import SocialPostDetail from 'screens/SocialPostDetail';
import SocialNewPost from 'screens/SocialNewPost';
import MediaViewer from 'screens/MediaViewer';
import { IS_IOS } from 'constants/main';
import SocialEditImageDescription from 'screens/SocialEditImageDescription';
import { SocialSearchHashtag } from 'screens/SocialSearchHashtag';
import LikedScreen from 'screens/LikedScreen';
import SettingCommunity from 'screens/SettingCommunity';
import SocialEditProfiles from 'screens/SocialEditProfiles';

type ScreenProps<S extends ScreenNames> = {
  component:
    | ConnectedComponent<any, any>
    | React.FC<StackScreenProps<S>>
    | React.MemoExoticComponent<(props: StackScreenProps<S>) => JSX.Element>;
  options?: StackNavigationOptions;
  initialParams?: Partial<ScreenStackProps<ScreenParamList, S>['route']['params']>;
};

const StackScreenConfig: { [S in ScreenNames]?: ScreenProps<S> } = {
  Introduction: {
    component: Introduction,
  },
  Discover: {
    component: Discover,
  },
  TradingView: {
    component: TradingView,
  },
  SignupOTP: {
    component: SignupOTP,
  },
  SignupEnterName: {
    component: SignupEnterName,
  },
  SignupFavorite: {
    component: SignupFavorite,
  },
  ForgotPassword: {
    component: ForgotPassword,
  },
  ForgotKisPassword: {
    component: ForgotKisPassword,
  },
  ForgotKisPasswordOTP: {
    component: ForgotKisPasswordOTP,
  },
  NewPassword: {
    component: NewPassword,
  },
  SignupCongratulation: {
    component: SignupCongratulation,
  },
  SignIn: {
    component: SignIn,
    options: {
      title: '',
    },
  },
  SignUp: {
    component: SignUp,
    options: {
      title: '',
    },
  },
  HomeTab: {
    component: HomeTab,
  },
  LeaderBoard: {
    component: LeaderBoard,
  },
  LeaderboardSetting: {
    component: LeaderboardSetting,
  },
  ProfitlossReport: {
    component: ProfitlossReport,
  },
  Notification: {
    component: Notification,
  },
  NotificationDetail: {
    component: NotificationDetail,
  },
  UserWall: {
    component: UserWall,
  },
  SearchSymbol: {
    component: SearchSymbol,
  },
  SearchSymbolAndMember: {
    component: SearchSymbolAndMember,
  },
  News: {
    component: News,
  },
  HotStock: {
    component: HotStock,
  },
  PopularTheme: {
    component: PopularTheme,
  },
  PopularThemeDetail: {
    component: PopularThemeDetail,
    initialParams: {
      themeName: '',
    },
  },
  ManageWatchlist: {
    component: ManageWatchlist,
  },
  MarketCapBanks: {
    component: MarketCapBanks,
  },
  OrderBook: {
    component: OrderBook,
  },
  UserInfo: {
    component: UserInfo,
  },
  UserInfoNonLogin: {
    component: UserInfoNonLogin,
  },
  Setting: {
    component: Setting,
  },
  SettingNotification: {
    component: SettingNotification,
  },
  SettingCommunity: {
    component: SettingCommunity,
  },
  SocialEditProfiles: {
    component: SocialEditProfiles,
  },
  LanguagePicker: {
    component: LanguagePicker,
  },
  HomeScreenPicker: {
    component: HomeScreenPicker,
  },
  HelpAndSupport: {
    component: HelpAndSupport,
  },
  LiveChat: {
    component: LiveChat,
  },
  Security: {
    component: Security,
  },
  AccountOrderHistory: {
    component: AccountOrderHistory,
  },
  AssetInformationSetting: {
    component: AssetInformationSetting,
  },
  AssetInformation: {
    component: AssetInformation,
  },
  AccountInformation: {
    component: AccountInformation,
  },
  UserIntroduction: {
    component: UserIntroduction,
  },
  TradeQuote: {
    component: TradeQuote,
  },
  InviteFriends: {
    component: InviteFriends,
  },
  DiscoverInvestor: {
    component: DiscoverInvestor,
  },
  DiscoverWatchlist: {
    component: DiscoverWatchlist,
  },
  SecurityLevel: {
    component: SecurityLevel,
  },
  ChangePassword: {
    component: ChangePassword,
  },
  CreatePassword: {
    component: CreatePassword,
  },
  ChangePIN: {
    component: ChangePIN,
  },
  PortfolioInvestment: {
    component: PortfolioInvestment,
  },
  AccountTrading: {
    component: AccountTrading,
  },
  CashInAdvance: {
    component: CashInAdvance,
  },
  Devices: {
    component: Devices,
  },
  AccountCashTransaction: {
    component: AccountCashTransaction,
  },
  CashTransaction: {
    component: CashTransaction,
    initialParams: {
      CashOption: 'CASH_BANK',
    },
  },
  CashStatement: {
    component: CashStatement,
  },
  AccountUtilities: {
    component: AccountUtilities,
  },
  UtilitiesRightExercise: {
    component: UtilitiesRightExercise,
  },
  OrderConfirmation: {
    component: OrderConfirmation,
  },
  InsightsHome: {
    component: InsightsHome,
  },
  InsightStrategies: {
    component: InsightStrategies,
  },
  InsightsStrategiesDetailItem: {
    component: InsightsStrategiesDetailItem,
  },
  InsightsStrategiesDetail: {
    component: InsightStrategiesDetail,
  },
  InsightsVideo: {
    component: InsightsVideo,
  },
  InsightsVideos: {
    component: InsightsVideos,
  },
  InsightsVideosDetail: {
    component: InsightsVideosDetail,
  },
  StockTransfer: {
    component: StockTransfer,
  },
  Blogs: {
    component: Blogs,
  },
  BlogItem: {
    component: BlogItem,
  },
  EducationItem: {
    component: EducationItem,
  },
  SearchBlogs: {
    component: SearchBlogs,
  },
  AIRatingScreen: {
    component: AIRatingScreen,
  },
  LoginRealAccount: {
    component: LoginRealAccount,
  },
  RealTradingSettings: {
    component: RealTradingSettings,
  },
  ConnectTradingAccount: {
    component: ConnectTradingAccount,
  },
  ConnectRealAccount: {
    component: ConnectRealAccount,
  },
  RealTrading: {
    component: RealTrading,
  },
  AddToWatchlists: {
    component: AddToWatchlists,
  },
  AddSymbolsToWatchlist: {
    component: AddSymbolsToWatchlist,
  },
  ChapterDetail: {
    component: ChapterDetail,
  },
  DeleteAccountReason: {
    component: DeleteAccountReason,
  },
  DeleteAccount: {
    component: DeleteAccount,
  },
  SessionTimeoutSetting: {
    component: SessionTimeoutSetting,
  },
  KisEKYCAbout: {
    component: KisEKYCAbout,
  },
  KisEKYCAboutForeign: {
    component: KisEKYCAboutForeign,
  },
  KisEKYCFirstStep: {
    component: KisEKYCFirstStep,
  },
  KisEKYCFinalStep: {
    component: KisEKYCFinalStep,
    options: {
      gestureEnabled: false,
    },
  },
  KisEKYCStep1TypeOfInvestor: {
    component: KisEKYCStep1TypeOfInvestor,
  },
  KisEkycStep3PersonalInformation: {
    component: KisEkycStep3PersonalInformation,
  },
  KisEkycStep3EditPersonalInformation: {
    component: KisEkycStep3EditPersonalInformation,
  },
  KisEkycStep4ServiceInformation: {
    component: KisEkycStep4ServiceInformation,
  },
  KisEkycStep4UploadSignature: {
    component: KisEkycStep4UploadSignature,
  },
  KisEkycStep4ConfirmOTP: {
    component: KisEkycStep4ConfirmOTP,
  },
  KisEKYCVerifyEmail: {
    component: KisEKYCVerifyEmail,
  },
  Trade1: {
    component: TradeScreen,
  },
  BlogWeb: {
    component: BlogWeb,
  },
  Contest: {
    component: Contest,
  },
  TermAndConditionVT: {
    component: TermAndConditionVT,
  },
  DepositGuideLine: {
    component: DepositGuideLine,
  },
  DeleteSymbolsWatchList: {
    component: DeleteSymbols,
  },
  CopyTradeScreen: {
    component: CopyTradeScreen,
    initialParams: {
      isEdit: false,
      isFormDisabled: false,
      followingType: 'AIRatingTop5',
    },
  },
  ThankyouFeedback: {
    component: ThankyouFeedback,
  },
  PriceBoardSelectorPortrait: {
    component: PriceBoardSelector,
    options: {
      presentation: 'transparentModal',
    },
    initialParams: {
      initValue: 'VN30',
      priceBoardType: 'Live board',
      subscribeKey: '',
    },
  },
  PriceBoardSelectorLandScape: {
    component: PriceBoardSelector,
    options: {
      presentation: 'transparentModal',
    },
    initialParams: {
      initValue: 'VN30',
      priceBoardType: 'Live board',
      subscribeKey: '',
    },
  },
  PriceBoardFullScreen: {
    component: PriceBoardFullScreen,
    initialParams: {
      priceBoardType: 'Live board',
      selectedList: 'VN30',
    },
  },
  IntermediateHorizontalScreen: {
    component: HorizontalScreen,
    initialParams: {
      nextScreen: 'PriceBoardFullScreen',
    },
  },
  IntermediateVerticalScreen: {
    component: VerticalScreen,
    initialParams: {
      nextScreen: 'PriceBoardFullScreen',
    },
  },
  PortfolioDerivatives: {
    component: PortfolioDerivatives,
  },
  SymbolInfoOverview: {
    component: SymbolInfoOverview,
    initialParams: {
      symbolType: 'STOCK',
    },
  },
  AIRatingFilter: {
    component: AIRatingFilter,
  },
  Top100StocksScreen: {
    component: Top100StocksScreen,
  },
  ForeignTrading: {
    component: ForeignTradingScreen,
  },
  VideosDetailScreen: {
    component: VideosDetailScreen,
  },
  PostDetailScreen: {
    component: SocialPostDetail,
  },
  SocialNewPost: {
    component: SocialNewPost,
  },
  SocialSearchHashtag: {
    component: SocialSearchHashtag,
  },
  SocialEditImageDescription: {
    component: SocialEditImageDescription,
    options: {
      presentation: 'transparentModal',
    },
  },
  MediaViewer: {
    component: MediaViewer,
    options: {
      presentation: 'transparentModal',
      cardOverlayEnabled: IS_IOS,
      cardStyleInterpolator: ({ current: { progress } }) => ({
        cardStyle: {
          opacity: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
        },
      }),
      transitionSpec: {
        open: {
          animation: 'timing',
          config: {
            delay: 0,
            duration: 0,
          },
        },
        close: {
          animation: 'timing',
          config: {
            delay: 0,
            duration: 0,
          },
        },
      },
    },
  },
  LikedScreen: {
    component: LikedScreen,
  },
};

export default StackScreenConfig;
