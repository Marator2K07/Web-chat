import Cookies from 'universal-cookie';

export const cookies = new Cookies(null, { path: '/' });

export const loadLastMainBlock = function(currentPage) {
    let result = cookies.get(currentPage);
    if (result) {
        return result;
    } else return null;
}