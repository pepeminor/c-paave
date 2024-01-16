export const SIGNUP = 'SIGNUP';
export const SIGNUP_ENTER_NAME_SUBMIT_ACTION = 'SIGNUP_ENTER_NAME_SUBMIT_ACTION';
export const VERIFY_OTP_SIGNUP = 'VERIFY_OTP_SIGNUP';
export const VERIFY_OTP_FORGOT_PASSWORD = 'VERIFY_OTP_FORGOT_PASSWORD';
export const VERIFY_OTP_KIS_FORGOT_PASSWORD = 'VERIFY_OTP_KIS_FORGOT_PASSWORD';
export const VERIFY_OTP_KIS_RESET_FORGOT_PASSWORD = 'VERIFY_OTP_KIS_RESET_FORGOT_PASSWORD';
export const SIGNOUT = 'SIGNOUT';
export const ON_REFRESH_TOKEN_INVALID = 'ON_REFRESH_TOKEN_INVALID';
export const CURRENT_USER_INFO = 'CURRENT_USER_INFO';
export const SUGGEST_BIOMETRIC = 'SUGGEST_BIOMETRIC';

export const REGISTER_BIOMETRIC = 'REGISTER_BIOMETRIC';
export const REGISTER_BIOMETRIC_KIS = 'REGISTER_BIOMETRIC_KIS';
export const UNREGISTER_BIOMETRIC = 'UNREGISTER_BIOMETRIC';
export const QUERY_BIOMETRIC_STATUS = 'QUERY_BIOMETRIC_STATUS';
export const TEMPORARILY_DISABLED_BIOMETRIC = 'TEMPORARILY_DISABLED_BIOMETRIC';

export const UPDATE_DEBUGGING = 'debugging/UPDATE';

export const SOCKET_STATUS_CHANGE = 'socket/STATUS_CHANGE';

export const AUTHENTICATION_LOGIN = 'authentication/LOGIN';
export const AUTHENTICATION_LOGIN_SEC = 'authentication/LOGIN_SEC';
export const AUTHENTICATION_LOGIN_NON_USER = 'authentication/LOGIN_NON_USER';
export const AUTHENTICATION_AUTH_TOKEN = 'authentication/AUTH_TOKEN';
export const AUTHENTICATION_KIS_AUTH_TOKEN = 'authentication/KIS_AUTH_TOKEN';
export const AUTHENTICATION_REMOVE_TOKEN = 'authentication/REMOVE_TOKEN';
export const AUTHENTICATION_KIS_REMOVE_TOKEN = 'authentication/KIS_REMOVE_TOKEN';
export const AUTHENTICATION_REFRESH_TOKEN = 'authentication/REFRESH_TOKEN';
export const AUTHENTICATION_REGISTER_USER = 'authentication/REGISTER_USER';
export const AUTHENTICATION_REGISTER_PARAMS = 'authentication/AUTHENTICATION_REGISTER_PARAMS';
export const AUTHENTICATION_REGISTER_USER_EXIST = 'authentication/AUTHENTICATION_REGISTER_USER_EXIST';
export const AUTHENTICATION_CHECK_USER_EXIST = 'authentication/CHECK_USER_EXIST';
export const AUTHENTICATION_GET_OTP = 'authentication/GET_OTP';
export const AUTHENTICATION_GET_OTP_SUCCESS = 'authentication/GET_OTP_SUCCESS';
export const AUTHENTICATION_GET_OTP_FAIL = 'authentication/GET_OTP_FAIL';
export const AUTHENTICATION_CHECK_EXIST_GET_OTP = 'authentication/CHECK_EXIST_GET_OTP';
export const AUTHENTICATION_VERIFY_OTP = 'authentication/VERIFY_OTP';
export const AUTHENTICATION_CHANGE_PASSWORD = 'authentication/CHANGE_PASSWORD';
export const KIS_CHANGE_PIN = 'authentication/KIS_CHANGE_PIN';
export const KIS_AUTHENTICATION_CHANGE_PASSWORD = 'authentication/KIS_CHANGE_PASSWORD';
export const AUTHENTICATION_RESET_PASSWORD = 'authentication/RESET_PASSWORD';
export const AUTHENTICATION_RESET_PASSWORD_PARAMS = 'authentication/RESET_PASSWORD_PARAMS';
export const AUTHENTICATION_SET_OTP_PARAMS = 'authentication/SET_OTP_PARAMS';
export const AUTO_SIGNUP_OTP = 'AUTO_SIGNUP_OTP';
export const AUTHENTICATION_LOGIN_BY_BIOMETRIC = 'AUTHENTICATION_LOGIN_BY_BIOMETRIC';
export const LOGIN_BIOMETRIC_AFTER_TIME_OUT = 'LOGIN_BIOMETRIC_AFTER_TIME_OUT';
export const RE_LOGIN_BIOMETRIC = 'RE_LOGIN_BIOMETRIC';
export const AUTHENTICATION_RE_LOGIN_BY_BIOMETRIC = 'AUTHENTICATION_RE_LOGIN_BY_BIOMETRIC';
export const SET_PASSWORD_TYPE = 'SET_PASSWORD_TYPE';
export const LOGIN_WITH_SOCIAL_ACCOUNT = 'LOGIN_WITH_SOCIAL_ACCOUNT';

export const MARKET_GET_LAST_TRADING_DATE = 'market/MARKET_GET_LAST_TRADING_DATE';
export const MARKET_GET_LAST_TRADING_DATE_SUCCESS = 'market/MARKET_GET_LAST_TRADING_DATE_SUCCESS';
export const MARKET_GET_LAST_TRADING_DATE_FAIL = 'market/MARKET_GET_LAST_TRADING_DATE_FAIL';
export const MARKET_GET_AI_RATING_IN_OUT = 'market/MARKET_GET_AI_RATING_IN_OUT';
export const MARKET_GET_AI_RATING_LIST = 'market/MARKET_GET_AI_RATING_LIST';
export const MARKET_GET_AI_RATING_SCORE = 'market/MARKET_GET_AI_RATING_SCORE';
export const MARKET_GET_AI_RATING_CHART_DATA_INDEX = 'market/MARKET_GET_AI_RATING_CHART_DATA_INDEX';
export const MARKET_GET_AI_RATING_CHART_DATA_RATING = 'market/MARKET_GET_AI_RATING_CHART_DATA_RATING';
export const MARKET_GET_AI_RATING_SCORE_SUCCESS = 'market/MARKET_GET_AI_RATING_SCORE_SUCCESS';
export const MARKET_GET_AI_RATING_SCORE_FAIL = 'market/MARKET_GET_AI_RATING_SCORE_FAIL';
export const MARKET_GET_SYMBOL_QUOTE_MINUTES = 'market/MARKET_GET_SYMBOL_QUOTE_MINUTES';
export const MARKET_GET_SYMBOL_QUOTE_MINUTES_SUCCESS = 'market/MARKET_GET_SYMBOL_QUOTE_MINUTES_SUCCESS';
export const MARKET_GET_SYMBOL_QUOTE_MINUTES_FAIL = 'market/MARKET_GET_SYMBOL_QUOTE_MINUTES_FAIL';
export const MARKET_INDEX_STOCKS_RANKING_UP_DOWN = 'market/MARKET_INDEX_STOCKS_RANKING_UP_DOWN';
export const MARKET_GET_SYMBOL_PERIOD = 'market/MARKET_GET_SYMBOL_PERIOD';
export const MARKET_GET_SYMBOL_PERIOD_MAS = 'market/GET_SYMBOL_PERIOD_MAS';
export const MARKET_FOLLOW_SYMBOL_REFRESH = 'market/MARKET_FOLLOW_REFRESH';
export const MARKET_PROHIBITED_STOCK = 'market/MARKET_PROHIBITED_STOCK';
export const TRADE_TAB_OPTION = 'market/TRADE_TAB_OPTION';
export const MARKET_SET_SELL_BUY_TYPE = 'market/MARKET_SET_SELL_BUY_TYPE';
export const MARKET_GET_STATISTIC = 'market/MARKET_GET_STATISTIC';
export const MARKET_QUERY_AVAILABLE_QUANTITY = 'market/MARKET_QUERY_AVAILABLE_QUANTITY';
export const RESET_SYMBOL_TRADE_INFO = 'market/RESET_SYMBOL_TRADE_INFO';
export const PORTFOLIO_GET_VIRTUAL_CORE_CONTEST_CURRENT_RANKING = 'PORTFOLIO_GET_VIRTUAL_CORE_CONTEST_CURRENT_RANKING';

export const EQUITY_ORDER = 'equity/ORDER';
export const EQUITY_ORDER_SUCCESS = 'equity/ORDER_SUCCESS';
export const EQUITY_ORDER_KIS_SUCCESS = 'equity/EQUITY_ORDER_KIS_SUCCESS';
export const EQUITY_MODIFY_LO = 'equity/MODIFY_LO';
export const MODIFY_ORDERBOOK_SUCCESS_TRIGGER = 'MODIFY_ORDERBOOK_SUCCESS_TRIGGER';
export const CANCEL_ORDERBOOK_SUCCESS_TRIGGER = 'CANCEL_ORDERBOOK_SUCCESS_TRIGGER';
export const EQUITY_CANCEL_LO = 'equity/CANCEL_LO';
export const EQUITY_CANCEL_MULTI_LO = 'equity/CANCEL_MULTI_LO';
export const EQUITY_ORDER_STOP = 'equity/ORDER_STOP';
export const EQUITY_ORDER_STOP_CANCEL = 'equity/ORDER_STOP_CANCEL';
export const EQUITY_ORDER_STOP_MODIFY = 'equity/ORDER_STOP_MODIFY';
export const EQUITY_ORDER_STOP_CANCEL_MULTI = 'equity/ORDER_STOP_CANCEL_MULTI';
export const EQUITY_GET_PROFIT_LOSS = 'equity/GET_PROFIT_LOSS';
export const EQUITY_GET_ACCUMULATIVE_NAV = 'equity/GET_ACCUMULATIVE_NAV';
export const EQUITY_GET_PROFIT_LOSS_VIRTUAL = 'equity/GET_PROFIT_LOSS_VIRTUAL';
export const EQUITY_GET_REALIZED_PROFIT_LOSS = 'equity/EQUITY_GET_REALIZED_PROFIT_LOSS';
export const EQUITY_RESET_DAILY_PROFIT_LOSS = 'equity/EQUITY_RESET_DAILY_PROFIT_LOSS';
export const EQUITY_GET_NAV_CHANGE = 'equity/GET_NAV_CHANGE';
export const EQUITY_GET_CASH_BALANCE_AND_STOCK_BALANCE = 'equity/GET_CASH_BALANCE_AND_STOCK_BALANCE';
export const EQUITY_DO_FUND_TRANSFER = 'equity/DO_FUND_TRANSFER';
export const EQUITY_GET_ACCOUNT_BALANCE = 'equity/GET_ACCOUNT_BALANCE';
export const EQUITY_GET_ACTIVE_ORDER = 'equity/GET_ACTIVE_ORDER';
export const EQUITY_GET_ORDER_HISTORY = 'equity/GET_ORDER_HISTORY';
export const EQUITY_GET_ORDER_STOP_HISTORY = 'equity/GET_ORDER_STOP_HISTORY';
export const EQUITY_GET_FOLLOWING_DAILY_PROFIT_LOSS = 'equity/GET_FOLLOWING_DAILY_PROFIT_LOSS';
export const EQUITY_GET_FOLLOWING_DAILY_PROFIT_LOSS_BY_DATE = 'equity/GET_FOLLOWING_DAILY_PROFIT_LOSS_BY_DATE';
export const EQUITY_GET_FOLLOWING_DAILY_PROFIT_LOSS_KIS_BY_DATE = 'equity/GET_FOLLOWING_DAILY_PROFIT_LOSS_KIS_BY_DATE';
export const EQUITY_GET_FOLLOWING_PROFIT_LOSS = 'equity/GET_FOLLOWING_PROFIT_LOSS';
export const EQUITY_GET_MOST_BOUGHT_STOCK = 'equity/GET_MOST_BOUGHT_STOCK';
export const EQUITY_GET_MOST_SOLD_STOCK = 'equity/GET_MOST_SOLD_STOCK';
export const EQUITY_GET_EVENT_BY_STOCK = 'equity/EQUITY_GET_EVENT_BY_STOCK';
export const EQUITY_GET_LOCAL_ADVANCE_CREATION = 'equity/EQUITY_GET_LOCAL_ADVANCE_CREATION';
export const EQUITY_SUBMIT_ADVANCE_PAYMENT_CREATION = 'equity/EQUITY_SUBMIT_ADVANCE_PAYMENT_CREATION';
export const EQUITY_GET_CASH_ADVANCE_HISTORY = 'equity/EQUITY_GET_CASH_ADVANCE_HISTORY';
export const EQUITY_RESET_CASH_ADVANCE_STATE = 'equity/EQUITY_RESET_CASH_ADVANCE_STATE';
export const EQUITY_GET_ALL_RIGHT_LIST = 'equity/EQUITY_GET_ALL_RIGHT_LIST';
export const EQUITY_GET_ENTITLEMENT_HISTORY = 'equity/EQUITY_GET_ENTITLEMENT_HISTORY';
export const EQUITY_GET_ENTITLEMENT_STOCK_LIST = 'equity/EQUITY_GET_ENTITLEMENT_STOCK_LIST';
export const EQUITY_REGISTER_EXERCISE = 'equity/EQUITY_REGISTER_EXERCISE';
export const EQUITY_SET_ITEM_PURCHASE_RIGHT = 'equity/EQUITY_SET_ITEM_PURCHASE_RIGHT';
export const EQUITY_ADDITION_ISSUE_SHARE_INFO = 'equity/EQUITY_ADDITION_ISSUE_SHARE_INFO';
export const EQUITY_GET_SIGN_ORDER = 'equity/EQUITY_GET_SIGN_ORDER';
export const EQUITY_SUBMIT_SIGN_ORDER = 'equity/EQUITY_SUBMIT_SIGN_ORDER';
export const RESET_ORDER_CONFIRMATION = 'equity/RESET_ORDER_CONFIRMATION';

export const SEARCH_GET_MOST_SEARCH_STOCK = 'search/GET_MOST_SEARCH_STOCK';
export const SEARCH_PUT_UPDATE_HISTORY = 'search/PUT_UPDATE_HISTORY';
export const SEARCH_PUT_INCREASE = 'search/PUT_INCREASE';
export const SEARCH_PUT_INCREASE_KIS = 'search/PUT_INCREASE_KIS';
export const SEARCH_GET_USER_INFO = 'search/SEARCH_GET_USER_INFO';
export const SEARCH_GET_RECENT_VIEWED = 'search/GET_RECENT_VIEWED';
export const SEARCH_PUT_DELETE_HISTORY = 'search/PUT_DELETE_HISTORY';
export const SEARCH_GET_USER_SUB_ACCOUNT = 'search/SEARCH_GET_USER_SUB_ACCOUNT';

export const ORDER_QUERY_EQUITY_BUYABLE_INFO = 'ORDER_QUERY_EQUITY_BUYABLE_INFO';
export const ORDER_QUERY_EQUITY_BUYABLE_INFO_SUCCESS = 'ORDER_QUERY_EQUITY_BUYABLE_INFO_SUCCESS';
export const ORDER_QUERY_EQUITY_BUYABLE_INFO_FAIL = 'ORDER_QUERY_EQUITY_BUYABLE_INFO_FAIL';
export const ORDER_QUERY_EQUITY_SELLABLE_INFO = 'ORDER_QUERY_EQUITY_SELLABLE_INFO';
export const ORDER_QUERY_EQUITY_SELLABLE_INFO_SUCCESS = 'ORDER_QUERY_EQUITY_SELLABLE_INFO_SUCCESS';
export const ORDER_QUERY_EQUITY_SELLABLE_INFO_FAIL = 'ORDER_QUERY_EQUITY_SELLABLE_INFO_FAIL';
export const ORDER_QUERY_EQUITY_BUYABLE_INFO_ORDER_BOOK = 'ORDER_QUERY_EQUITY_BUYABLE_INFO_ORDER_BOOK';
export const ORDER_QUERY_EQUITY_SELLABLE_INFO_ORDER_BOOK = 'ORDER_QUERY_EQUITY_SELLABLE_INFO_ORDER_BOOK';

export const NEWS_INIT = 'news/NEWS_INIT';

export const USER_UPDATE_FULLNAME = 'user/UPDATE_FULLNAME';
export const USER_UPDATE_USERNAME = 'user/USER_UPDATE_USERNAME';
export const USER_UPDATE_EMAIL = 'user/USER_UPDATE_EMAIL';
export const USER_ACCOUNT_INFO = 'user/ACCOUNT_INFO';
export const USER_KIS_ACCOUNT_INFO = 'user/KIS_ACCOUNT_INFO';
export const USER_ACCOUNT_BIO = 'user/ACCOUNT_BIO';
export const CHECK_EMAIL_EXIST = 'user/CHECK_EMAIL_EXIST';
export const CHECK_USERNAME_EXIST = 'user/CHECK_USERNAME_EXIST';

export const SET_KEYBOARD_HEIGHT = 'SET_KEYBOARD_HEIGHT';
export const SET_SAFE_SCREEN_HEIGHT = 'SET_SAFE_SCREEN_HEIGHT';
export const KIS_SESSION_TIMEOUT = 'KIS_SESSION_TIMEOUT';
export const UPDATE_PAAVE_ONLY_USERS = 'UPDATE_PAAVE_ONLY_USERS';
export const TRIGGER_FILL_PRICE = 'TRIGGER_FILL_PRICE';

export const ORDERBOOK_CANCEL_MODE = 'ORDERBOOK_CANCEL_MODE';
export const ORDERBOOK_SET_SYMBOL = 'ORDERBOOK_SET_SYMBOL';
export const ORDERBOOK_SCREEN_OPTION = 'ORDERBOOK_SCREEN_OPTION';
export const ORDERBOOK_UPDATE_ACTIVE_FILTER = 'orderbook/UPDATE_ACTIVE_FILTER';
export const ORDERBOOK_UPDATE_HISTORY_FILTER = 'orderbook/UPDATE_HISTORY_FILTER';
export const ORDERBOOK_UPDATE_COND_ORDER_FILTER = 'orderbook/UPDATE_COND_ORDER_FILTER';
export const ORDERBOOK_RESET_FILTER = 'orderbook/RESET_FILTER';
export const ORDERBOOK_RESET_ORDERBOOK = 'orderbook/RESET_ORDERBOOK';
export const ORDERBOOK_RESET_SELECTED_CANCEL_LIST = 'orderbook/RESET_SELECTED_CANCEL_LIST';
export const SUBSCRIBE_ORDER_MATCH = 'SUBSCRIBE_ORDER_MATCH';
export const UNSUBSCRIBE_ORDER_MATCH = 'UNSUBSCRIBE_ORDER_MATCH';

export const NOTIFICATION_GET_ACCOUNT_NOTIFICATION = 'notification/GET_ACCOUNT_NOTIFICATION';
export const NOTIFICATION_PUT_MARK_AS_READ = 'notification/PUT_MARK_AS_READ';
export const NOTIFICATION_PUT_MARK_AS_READ_LOCAL = 'notification/PUT_MARK_AS_READ_LOCAL';
export const NOTIFICATION_PUT_DELETE = 'notification/PUT_DELETE';
export const NOTIFICATION_GET_NUMBER_OF_UNREAD = 'notification/GET_NUMBER_OF_UNREAD';
export const SEND_NOTIFICATION_PREFERENCE = 'notification/SEND_NOTIFICATION_PREFERENCE';

export const LEADER_BOARD_GET_INVESTING = 'leaderBoard/GET_INVESTING';
export const LEADER_BOARD_GET_INVESTING_LOADMORE = 'leaderBoard/GET_INVESTING_LOADMORE';
export const LEADER_BOARD_GET_INVESTING_USER_RANKING = 'leaderBoard/GET_INVESTING_USER_RANKING';
export const LEADER_BOARD_ADD_AVATAR = 'leaderBoard/ADD_AVATAR';
export const LEADER_BOARD_CONTEST_MODAL = 'leaderBoard/CONTEST_MODAL';
export const LEADER_BOARD_GO_TO_USER_WALL = 'leaderBoard/GO_TO_USER_WALL';
export const LEADER_BOARD_JOIN_NOW = 'leaderBoard/JOIN_NOW';
export const LEADER_BOARD_GET_ACCOUNT_CONTEST_REGISTERED = 'LEADER_BOARD_GET_ACCOUNT_CONTEST_REGISTERED';
export const LEADER_BOARD_ACCOUNT_SELECTOR = 'LEADER_BOARD_ACCOUNT_SELECTOR';
export const OPEN_KYC_KIS_MODAL = 'OPEN_KYC_KIS_MODAL';
export const CLOSE_KYC_KIS_MODAL = 'CLOSE_KYC_KIS_MODAL';
export const RESTART_SUB_DISABLE_MODAL = 'RESTART_SUB_DISABLE_MODAL';

export const PROFILE_GET_TRADING_HISTORY = 'profile/GET_TRADING_HISTORY';

export const RANK_GET_INDEX_RANK = 'rank/GET_INDEX_RANK';

export const DISCOVER_ENTER_SCREEN = 'DISCOVER_ENTER_SCREEN';
export const DISCOVER_CLEAN_WATCHLIST = 'DISCOVER_CLEAN_WATCHLIST';
export const DISCOVER_WATCHLIST_ENTER_SCREEN = 'DISCOVER_WATCHLIST_ENTER_SCREEN';
export const DISCOVER_WATCHLIST_LOAD_MORE_SYMBOL_ACTION = 'DISCOVER_WATCHLIST_LOAD_MORE_SYMBOL_ACTION';
export const DISCOVER_SET_NAVIGATE_ITEM = 'DISCOVER_SET_NAVIGATE_ITEM';
export const DISCOVER_WATCHLIST_SET_DEFAULT = 'DISCOVER_WATCHLIST_SET_DEFAULT';

export const STOCKSECTOR_GET_COMPANY_OVERVIEW = 'STOCKSECTOR_GET_COMPANY_OVERVIEW';

export const FINANCE_GET_FINANCIAL_RATIO = 'finance/FINANCE_GET_FINANCIAL_RATIO';
export const FINANCE_ENTER_SCREEN = 'finance/FINANCE_ENTER_SCREEN';
export const OVERVIEW_LEAVE_SCREEN = 'overview/OVERVIEW_LEAVE_SCREEN';
export const OVERVIEW_ENTER_SCREEN = 'overview/OVERVIEW_ENTER_SCREEN';
export const OVERVIEW_FOREIGN_TRADE = 'overview/OVERVIEW_FOREIGN_TRADE';
export const FINANCE_GET_FINANCIAL_STATEMENT = 'finance/FINANCE_GET_FINANCIAL_TATEMENT';

export const INDEX_INFO_ENTER_SCREEN = 'INDEX_INFO_ENTER_SCREEN';
export const INDEX_INFO_LEAVE_SCREEN = 'INDEX_INFO_LEAVE_SCREEN';
export const INDEX_INFO_CHANGE_COMPOSITION_DATA = 'INDEX_INFO_CHANGE_COMPOSITION_DATA';
export const INDEX_INFO_CLEAN_SCREEN_DATA = 'INDEX_INFO_CLEAN_SCREEN_DATA';
export const INDEX_INFO_REDUCER_UPDATE = 'INDEX_INFO_REDUCER_UPDATE';
export const INDEX_INFO_QUERY_RANK_AND_SUBSCRIBE = 'INDEX_INFO_QUERY_RANK_AND_SUBSCRIBE';

export const ASSET_INFO_ENTER_SCREEN = 'ASSET_INFO_ENTER_SCREEN';

export const STOCK_INFO_ENTER_SCREEN = 'STOCK_INFO_ENTER_SCREEN';
export const STOCK_INFO_LEAVE_SCREEN = 'STOCK_INFO_LEAVE_SCREEN';

export const PORTFOLIO_ENTER_SCREEN = 'PORTFOLIO_ENTER_SCREEN';

export const PORTFOLIO_REDUCER_UPDATE = 'PORTFOLIO_REDUCER_UPDATE';
export const PORTFOLIO_CLEAN_SCREEN_DATA = 'PORTFOLIO_CLEAN_SCREEN_DATA';

export const PORTFOLIO_INVESTMENT_REFRESH_SCREEN = 'PORTFOLIO_INVESTMENT_REFRESH_SCREEN';
export const KIS_PORTFOLIO_DERIVATIVES_TABLE = 'KIS_PORTFOLIO_DERIVATIVES_TABLE';
export const KIS_PORTFOLIO_DERIVATIVES_TABLE_FAILED = 'KIS_PORTFOLIO_DERIVATIVES_TABLE_FAILED';
export const KIS_PORTFOLIO_DERIVATIVES_TABLE_SUCCESS = 'KIS_PORTFOLIO_DERIVATIVES_TABLE_SUCCESS';
export const PORTFOLIO_INVESTMENT_FOCUS_SCREEN = 'PORTFOLIO_INVESTMENT_FOCUS_SCREEN';
export const PORTFOLIO_DERIVATIVE_CASH_BALANCE = 'PORTFOLIO_DERIVATIVE_CASH_BALANCE';
export const PORTFOLIO_DERIVATIVE = 'PORTFOLIO_DERIVATIVE';

export const NOTICE_SHOW = 'NOTICE_SHOW';
export const NOTICE_HIDE = 'NOTICE_HIDE';

export const KIS_CLOSE_MODAL_OTP = 'KIS_CLOSE_MODAL_OTP';
export const KIS_OPEN_MODAL_OTP = 'KIS_OPEN_MODAL_OTP';

export const QUERY_MAX_BUY_SELL = 'QUERY_MAX_BUY_SELL';
export const QUERY_DERIVATIVES_PURCHASING_POWER = 'QUERY_DERIVATIVES_PURCHASING_POWER';
export const OPEN_EXECUTE_MODAL = 'OPEN_EXECUTE_MODAL';
export const CLOSE_EXECUTE_MODAL = 'CLOSE_EXECUTE_MODAL';

export const ADD_SYMBOL_ENTER_SCREEN = 'ADD_SYMBOL_ENTER_SCREEN';
export const ADD_SYMBOL_LEAVE_SCREEN = 'ADD_SYMBOL_LEAVE_SCREEN';

export const LOGIN_BIOMETRIC = 'LOGIN_BIOMETRIC';
export const LOGIN_REAL_ACCOUNT = 'LOGIN_REAL_ACCOUNT';
export const KIS_VERIFY_AND_SAVE_OTP = 'KIS_VERIFY_AND_SAVE_OTP';
export const GET_ALL_PARTNER = 'GET_ALL_PARTNER';
export const LINK_ACCOUNT_KIS_INIT = 'LINK_ACCOUNT_KIS_INIT';
export const LINK_ACCOUNTS = 'LINK_ACCOUNTS';
export const GET_LINKED_ACCOUNTS = 'GET_LINKED_ACCOUNTS';
export const LINK_ACCOUNTS_LOGIN = 'LINK_ACCOUNTS_LOGIN';
export const GENERATE_NEW_KIS_CARD = 'GENERATE_NEW_KIS_CARD';

export const KIS_GET_STOCK_INFO = 'KIS_GET_STOCK_INFO';
export const KIS_GET_ASSET_INFO_FROM_PORTFOLIO = 'KIS_GET_ASSET_INFO_FROM_PORTFOLIO';

export const KIS_GET_PROFIT_LOSS = 'KIS_GET_PROFIT_LOSS';
export const REAL_TRADING_POST_EQT_ORDER = 'REAL_TRADING_POST_EQT_ORDER';
export const REAL_TRADING_POST_EQT_ORDER_ODD_LOT = 'REAL_TRADING_POST_EQT_ORDER_ODD_LOT';
export const REAL_TRADING_POST_EQT_ORDER_ODD_LOT_MODAL = 'REAL_TRADING_POST_EQT_ORDER_ODD_LOT_MODAL';
export const REAL_TRADING_POST_EQT_ORDER_LO_STATUS = 'REAL_TRADING_POST_EQT_ORDER_LO_STATUS';
export const REAL_TRADING_POST_EQT_ORDER_ODD_LOT_STATUS = 'REAL_TRADING_POST_EQT_ORDER_ODD_LOT_STATUS';
export const REAL_TRADING_POST_DER_ORDER = 'REAL_TRADING_POST_DER_ORDER';

export const SERVICE_GET_EQUITY_ENQUIRY_HISTORY_ORDER = 'SERVICE_GET_EQUITY_ENQUIRY_HISTORY_ORDER';
export const SERVICE_GET_EQUITY_ENQUIRY_HISTORY_ORDER_RESET = 'SERVICE_GET_EQUITY_ENQUIRY_HISTORY_ORDER_RESET';
export const SERVICE_GET_EQUITY_ENQUIRY_ORDER = 'SERVICE_GET_EQUITY_ENQUIRY_ORDER';
export const SERVICE_GET_EQUITY_ENQUIRY_ORDER_RESET = 'SERVICE_GET_EQUITY_ENQUIRY_ORDER_RESET';
export const SERVICE_GET_EQUITY_STOCK_INFO = 'SERVICE_GET_EQUITY_STOCK_INFO';
export const SERVICE_GET_EQUITY_ASSET_INFO = 'SERVICE_GET_EQUITY_ASSET_INFO';
export const SERVICE_GET_EQUITY_GEN_BUY_ALL = 'SERVICE_GET_EQUITY_GEN_BUY_ALL';
export const SERVICE_PUT_EQUITY_MODIFY_ORDER = 'SERVICE_PUT_EQUITY_MODIFY_ORDER';
export const SERVICE_PUT_EQUITY_CANCEL_ORDER = 'SERVICE_PUT_EQUITY_CANCEL_ORDER';
export const SERVICE_GET_EQUITY_ENQUIRY_PORTFOLIO = 'SERVICE_GET_EQUITY_ENQUIRY_PORTFOLIO';
export const SERVICE_GET_DER_ENQUIRY_ORDER = 'SERVICE_GET_DER_ENQUIRY_ORDER';
export const SERVICE_GET_EQUITY_STOCK_INFO_ORDER_BOOK = 'SERVICE_GET_EQUITY_STOCK_INFO_ORDER_BOOK';
export const SERVICE_GET_EQUITY_ASSET_INFO_ORDER_BOOK = 'SERVICE_GET_EQUITY_ASSET_INFO_ORDER_BOOK';
export const SERVICE_GET_EQUITY_GEN_BUY_ALL_ORDER_BOOK = 'SERVICE_GET_EQUITY_GEN_BUY_ALL_ORDER_BOOK';
export const SERVICE_GET_DER_ENQUIRY_HISTORY_ORDER = 'SERVICE_GET_DER_ENQUIRY_HISTORY_ORDER';
export const SERVICE_PUT_DER_MODIFY_ORDER = 'SERVICE_PUT_DER_MODIFY_ORDER';
export const SERVICE_PUT_DER_CANCEL_ORDER = 'SERVICE_PUT_DER_CANCEL_ORDER';
export const SERVICE_GET_DER_MAX_LONG_SHORT_ENQUIRY = 'SERVICE_GET_DER_MAX_LONG_SHORT_ENQUIRY';
export const QUERRY_ASSET_INFO_DER_DATA = 'QUERRY_ASSET_INFO_DER_DATA';

export const SERVICE_GET_DER_ENQUIRY_CLIENT_STOCK_STATEMENT = 'SERVICE_GET_DER_ENQUIRY_CLIENT_STOCK_STATEMENT';

export const KIS_REMOVE_FAVORITE_SYMBOLS = 'KIS_REMOVE_FAVORITE_SYMBOLS';

export const SHOW_MODAL_DISCONNECT_NETWORK = 'SHOW_MODAL_DISCONNECT_NETWORK';

export const OPEN_DUMMY_MODAL = 'OPEN_DUMMY_MODAL';
export const CLOSE_DUMMY_MODAL = 'CLOSE_DUMMY_MODAL';

export const OPEN_MODAL_UPDATE_APP = 'OPEN_MODAL_UPDATE_APP';
export const CLOSE_MODAL_UPDATE_APP = 'CLOSE_MODAL_UPDATE_APP';

export const DISPLAY_MODAL_OTP_PORTFOLIO = 'DISPLAY_MODAL_OTP_PORTFOLIO';
export const HIDE_MODAL_OTP_PORTFOLIO = 'HIDE_MODAL_OTP_PORTFOLIO';

export const NOTIFY_KIS_MOBILE_OTP = 'NOTIFY_KIS_MOBILE_OTP';

// bank transfer
export const BANK_TRANSFER_SUB_ACCOUNT_RETRIEVE = 'BANK_TRANSFER_SUB_ACCOUNT_RETRIEVE';
export const BANK_TRANSFER_QUERY_GEN_FUND_TRANSFER = 'BANK_TRANSFER_QUERY_GEN_FUND_TRANSFER';
export const BANK_TRANSFER_QUERY_BANK_INFO = 'BANK_TRANSFER_QUERY_BANK_INFO';
export const BANK_TRANSFER_DO_FUND_TRANSFER = 'BANK_TRANSFER_DO_FUND_TRANSFER';
export const BANK_TRANSFER_CHECK_TRADE_DATE = 'BANK_TRANSFER_CHECK_TRADE_DATE';
export const BANK_TRANSFER_QUERY_CASH_TRANSACTION_HISTORY = 'BANK_TRANSFER_QUERY_CASH_TRANSACTION_HISTORY';
export const BANK_TRANSFER_POST_CASH_TRANSFER = 'BANK_TRANSFER_POST_CASH_TRANSFER';
export const BANK_TRANSFER_QUERY_CLIENT_CASH_BALANCE_SHORTVER = 'BANK_TRANSFER_QUERY_CLIENT_CASH_BALANCE_SHORTVER';
export const BANK_TRANSFER_QUERY_CASH_DW_ENQUIRY = 'BANK_TRANSFER_QUERY_CASH_DW_ENQUIRY';
export const BANK_TRANSFER_POST_CP_CASH_DW = 'BANK_TRANSFER_POST_CP_CASH_DW';
export const BANK_TRANSFER_POST_CASH_DW = 'BANK_TRANSFER_POST_CASH_DW';
export const BANK_TRANSFER_QUERY_BANK_INFO_DER = 'BANK_TRANSFER_QUERY_BANK_INFO_DER';
export const BANK_TRANSFER_QUERY_CP_CASH_DW_ENQUIRY = 'BANK_TRANSFER_QUERY_CP_CASH_DW_ENQUIRY';

// cash statement
export const CASH_STATEMENT_DER_QUERY_DATA = 'CASH_STATEMENT_DER_QUERY_DATA';
export const CASH_STATEMENT_EQT_QUERY_DATA = 'CASH_STATEMENT_EQT_QUERY_DATA';

// stock transfer
export const STOCK_TRANSFER_LIST_INSTRUMENT_PORTFOLIO = 'STOCK_TRANSFER_LIST_INSTRUMENT_PORTFOLIO';
export const STOCK_TRANSFER_DO_TRANSFER_STOCK = 'STOCK_TRANSFER_DO_TRANSFER_STOCK';
export const STOCK_TRANSFER_HISTORY_TRANSFER = 'STOCK_TRANSFER_HISTORY_TRANSFER';
export const STOCK_TRANSFER_CHECK_TRANSFER_TIME = 'STOCK_TRANSFER_CHECK_TRANSFER_TIME';

export const OTP_ERROR_VALUE = 'OTP_ERROR_VALUE';

// usersSetting flow
export const USERS_SETTING = 'USERS_SETTING';
export const CURRENT_USERS_SETTING = 'CURRENT_USERS_SETTING';
export const UPDATE_CURRENT_USERS_SETTING = 'UPDATE_CURRENT_USERS_SETTING';

// DiscoverWatchList flow
export const DISCOVER_WATCHLIST_SYMBOLS_LATEST_VISIBLE_LIST = 'DISCOVER_WATCHLIST_SYMBOLS_LATEST_VISIBLE_LIST';

// Non Login
export const NON_LOGIN_MODAL = 'NON_LOGIN_MODAL';
export const NON_LOGIN_RECENT_VIEWED = 'NON_LOGIN_RECENT_VIEWED';
export const NON_LOGIN_WATCH_LIST = 'NON_LOGIN_WATCH_LIST';
export const NON_LOGIN_WATCH_LIST_ADD_SYMBOL = 'NON_LOGIN_WATCH_LIST_ADD_SYMBOL';
export const NON_LOGIN_WATCH_LIST_REMOVE_SYMBOL = 'NON_LOGIN_WATCH_LIST_REMOVE_SYMBOL';

// Leaderboard
// 1890 - contest
export const LEADER_BOARD_ON_ENTER_SCREEN = 'LEADER_BOARD_ON_ENTER_SCREEN';
export const LEADER_BOARD_OPEN_JOIN_NOW_MODAL = 'LEADER_BOARD_OPEN_JOIN_NOW_MODAL';
export const LEADER_BOARD_CLOSE_JOIN_NOW_MODAL = 'LEADER_BOARD_CLOSE_JOIN_NOW_MODAL';
export const REAL_LEADER_BOARD_OPEN_JOIN_NOW_MODAL = 'REAL_LEADER_BOARD_OPEN_JOIN_NOW_MODAL';
export const REAL_LEADER_BOARD_CLOSE_JOIN_NOW_MODAL = 'REAL_LEADER_BOARD_CLOSE_JOIN_NOW_MODAL';
export const LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST = 'LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST';
export const LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_RANKING = 'LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_RANKING';
export const LEADER_BOARD_GET_CURRENT_INVESTING_INFO = 'LEADER_BOARD_GET_CURRENT_INVESTING_INFO';
export const LEADER_BOARD_OPEN_QUESTION_CONTEST_MODAL = 'LEADER_BOARD_OPEN_QUESTION_CONTEST_MODAL';
export const LEADER_BOARD_CLOSE_QUESTION_CONTEST_MODAL = 'LEADER_BOARD_CLOSE_QUESTION_CONTEST_MODAL';
export const LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_LISTED = 'LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_LISTED';
export const CURRENT_USERS_INFO_SUB_ACCOUNT = 'CURRENT_USERS_INFO_SUB_ACCOUNT';
export const LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_CURRENT_RANKING =
  'LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_CURRENT_RANKING';
export const LEADER_BOARD_SETTING = 'LEADER_BOARD_SETTING';
export const CHANGE_LEADER_BOARD_SETTING = 'CHANGE_LEADER_BOARD_SETTING';

// S3 Resource
export const GET_HOLIDAY_LIST = 'GET_HOLIDAY_LIST';
export const GET_CONTEST_LIST = 'GET_CONTEST_LIST';
export const GET_KIS_INFO_MODAL = 'GET_KIS_INFO_MODAL';
export const GET_BANNER_LIST = 'GET_BANNER_LIST';
export const GET_CURRENT_TIME = 'GET_CURRENT_TIME';
export const GET_BOT_DATA = 'GET_BOT_DATA';
export const GET_AUTO_TRADE_AGREEMENT = 'GET_AUTO_TRADE_AGREEMENT';
export const GET_AUTO_TRADE_POPUP = 'GET_AUTO_TRADE_POPUP';
export const FEATURE_CONFIGURATION = 'FEATURE_CONFIGURATION';

// Stock Info Overview
export const STOCK_INFO_OVERVIEW_REDUCER_UPDATE = 'STOCK_INFO_OVERVIEW_REDUCER_UPDATE';
export const STOCK_INFO_OVERVIEW_CLEAN_SCREEN_DATA = 'STOCK_INFO_OVERVIEW_CLEAN_SCREEN_DATA';
export const STOCK_INFO_OVERVIEW_CHANGE_SYMBOl_DATA = 'STOCK_INFO_OVERVIEW_CHANGE_SYMBOl_DATA';

// Button move screen
export const BUTTON_MOVE_SCREEN_START = 'BUTTON_MOVE_SCREEN_START';
export const BUTTON_MOVE_SCREEN_MOVE = 'BUTTON_MOVE_SCREEN_MOVE';
export const BUTTON_MOVE_SCREEN_END = 'BUTTON_MOVE_SCREEN_END';
export const BUTTON_MOVE_SCREEN_RESET = 'BUTTON_MOVE_SCREEN_RESET';
export const OPEN_BUTTON_MOVE_SCREEN = 'OPEN_BUTTON_MOVE_SCREEN';
export const CLOSE_BUTTON_MOVE_SCREEN = 'CLOSE_BUTTON_MOVE_SCREEN';

export const CANCEL_ALL_EFFECTS = 'CANCEL_ALL_EFFECTS';

export const ONESIGNAL_RESEND_TAGS = 'ONESIGNAL_RESEND_TAGS';
