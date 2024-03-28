import Cookies from 'universal-cookie';

export const cookies = new Cookies(null, { path: '/' });

export const saveLastMainBlock = function(mainBlock) {
    cookies.set('lastMainBlock', mainBlock);
} 