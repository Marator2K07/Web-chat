import Cookies from 'universal-cookie';
import {
    COOKIES_REFRESH_TOKEN, 
    COOKIES_TOKEN, 
    COOKIES_USERNAME, 
    FIVE_MIN_AGE, 
    ONE_MONTH_AGE
} from '../constants';

export const cookies = new Cookies(null, { path: '/' });

export const loadLastMainBlock = function(currentPage) {
    let result = cookies.get(currentPage);
    if (result) {
        return result;
    } else return null;
}

export const setUserCookies = function(username, token, refreshToken) {
    cookies.set(COOKIES_USERNAME, username, { maxAge: ONE_MONTH_AGE });
    cookies.set(COOKIES_REFRESH_TOKEN, refreshToken, { maxAge: ONE_MONTH_AGE });
    cookies.set(COOKIES_TOKEN, token, { maxAge: FIVE_MIN_AGE });
}  

export const removeUserCookies = function() {    
    cookies.remove(COOKIES_USERNAME);
    cookies.remove(COOKIES_TOKEN);
    cookies.remove(COOKIES_REFRESH_TOKEN);
}