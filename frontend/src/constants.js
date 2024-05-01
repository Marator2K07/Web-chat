export const LOGIN_CHECK_ROUTE = "/api/login_check";
export const LOGIN_ROUTE = "/login";
export const LOGOUT_ROUTE = "/api/token/invalidate";
export const REGISTER_ROUTE = "/register";
export const USER_ACTIVATION_ROUTE = "/user_activate";

// далее используются конструкции для определения конца
// пути, где основная часть задается с помощью веб-хука useLocation  
export const UPDATE_ABOUT_USER_ROUTE_END = "/about/update";
export const GET_ABOUT_USER_ROUTE_END = "/about";

export const GET_USER_NEWS_MESSAGES_ROUTE = "/authorized_user/news/messages/get";
export const GET_MESSAGES_FOR_ROOM_ROUTE = "/message/all/get"
export const USERS_SEARCH_ROUTE = "/user/all/search";
export const GET_OTHER_USER_ROUTE  = "/user/get"
export const NEW_MESSAGE_ROUTE = "/message/new"
export const SUBSCRIBE_ROUTE = "/subscribers_list/add"
export const UNSUBSCRIBE_ROUTE = "/subscribers_list/remove"
export const NEW_ROOM_ROUTE = "/room/new"

export const BEFORE_LOGIN_PAGE_URL = "/";
export const USER_ACTIVATION_PAGE_URL = "/user_activation"
export const AFTER_LOGIN_PAGE_URL = "/authorized_user";
export const ANOTHER_USER_PAGE_URL = "/another_user";

export const EXTRA_SHORT_DELAY = 250;
export const SHORT_DELAY = 1250;
export const MEDIUM_DELAY = 2500;
export const LONG_DELAY = 3500;

export const SHORT_TIMEOUT = 350;
export const MEDIUM_TIMEOUT = 550;
export const LONG_TIMEOUT = 850;

export const FIVE_MIN_AGE = 3600;
export const ONE_MONTH_AGE = 2592000;

export const BEFORE_LOGIN_PAGE_START_INDEX = 1;
export const BEFORE_LOGIN_PAGE_BLOCKS_COUNT = 2;
export const AFTER_LOGIN_PAGE_START_INDEX = 3;
export const AFTER_LOGIN_PAGE_BLOCKS_COUNT = 4;

export const DATE_FORMAT = "YYYY-MM-DD"

export const LOGIN_FORM_NAME = "loginForm"; 
export const REGISTRATION_FORM_NAME = "registrationForm";
export const UPDATE_ABOUT_USER_FORM_NAME = "updateAboutUserForm";

export const PINK_EBONY_COLOR = "#704949";

export const LOADING_INDICATOR_SIZE = 44;
export const LOADING_INDICATOR_COLOR = "rgb(233, 185, 255)";

export const FORM_INPUT_WARNING_COLOR = "rgb(231, 189, 198)";
export const FORM_INPUT_NORMAL_COLOR = "rgb(232, 240, 254)";
export const FORM_INPUT_WARNING_MESSAGE = "Обязательное поле";
export const FORM_INPUT_MIN_TEXT_LENGTH = 5;