import React from 'react'
import classes from './MiniMenuItem.module.css'
import WebChatClient from '../../../../WebChatClient';
import { useNavigate } from 'react-router-dom';
import { useLoadingContext } from '../../../../contexts/LoadingContext/LoadingProvider';
import { useResponseHandlerContext } from '../../../../contexts/ResponseHandlerContext/ResponseHandlerProvider';
import { cookies } from '../../../../contexts/CookieContext';

export default function MiniMenuItem({url,
                                      info,
                                      route,
                                      cleanCookie,                                   
                                      ...props}) {
    const { 
        startLoading,
        stopLoading, 
        toggleHolding
    } = useLoadingContext();
    const { 
        resetResult,
        toggleResponse,
        toggleError
    } = useResponseHandlerContext(); 
    const navigate = useNavigate();

    const handleAction = async (e) => {
        e.preventDefault();

        // подготовка
        startLoading();
        resetResult();       

        // внешний запрос и его обработка
        await WebChatClient.post(url, { refreshToken: cookies.get('refreshToken') })
        .then( async function (response) {            
            toggleResponse(response);         
            toggleHolding(false, 200);
            if (cleanCookie) {
                cookies.remove('username');
                cookies.remove('token');
                cookies.remove('refreshToken');
            }
            if (route) {
                navigate(route, { replace: true });
            }
        })
        .catch(function (error) {
            toggleError(error);
        });
        stopLoading();
    } 

    return (
        <div className={classes.MiniMenuItem} {...props}>
            <button type="button" onClick={handleAction}>
                { info }
            </button>
        </div>
    )
}
