import Cookies from 'universal-cookie';

export const cookies = new Cookies(null, { path: '/' });

export const loadLastMainBlock = function(currentPage) {
    let result = cookies.get(currentPage);
    if (result) {
        return result;
    } else return null;
}

export const removeUserCookies = function() {    
    cookies.remove('username');
    cookies.remove('token');
    cookies.remove('refreshToken');
}