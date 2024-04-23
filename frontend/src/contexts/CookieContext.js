import Cookies from 'universal-cookie';
import { FIVE_MIN_AGE, ONE_MONTH_AGE } from '../constants';

export const cookies = new Cookies(null, { path: '/' });

export const loadLastMainBlock = function(currentPage) {
    let result = cookies.get(currentPage);
    if (result) {
        return result;
    } else return null;
}

export const setUserCookies = function(username, token, refreshToken) {
    cookies.set('username', username, { maxAge: ONE_MONTH_AGE });
    cookies.set('refreshToken', refreshToken, { maxAge: ONE_MONTH_AGE });
    cookies.set('token', token, { maxAge: FIVE_MIN_AGE });
}  

export const removeUserCookies = function() {    
    cookies.remove('username');
    cookies.remove('token');
    cookies.remove('refreshToken');
}