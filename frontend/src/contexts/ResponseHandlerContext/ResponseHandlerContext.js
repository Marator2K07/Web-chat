import { useCallback, useState } from "react"
import WebChatClient from "../../WebChatClient";

export const useCreateResponseHandlerContext = function() {    
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const resetResult = useCallback(() => {
        setResponse(null);
        setError(null);
    }, []);

    const makeGetRequest = useCallback(async (
                                       url,
                                       responseFunc = null,
                                       errorFunc = null
                                       ) => {
        await WebChatClient.get(url)
        .then(function (response) {
            setResponse(response);
            if (responseFunc) {
                responseFunc(response);
            }  
        })
        .catch(function (error) {
            setError(error);
            console.log(error);
            if (errorFunc) {
                errorFunc(error);
            }
        });
    }, []);

    const makePostRequest = useCallback(async (
                                        url,
                                        data,
                                        responseFunc = null,
                                        errorFunc = null
                                        ) => {        
        await WebChatClient.post(url, data)
        .then(function (response) {
            setResponse(response);
            if (responseFunc) {
                responseFunc(response);
            }  
        })
        .catch(function (error) {
            setError(error);
            console.log(error);
            if (errorFunc) {
                errorFunc(error);
            }
        });
    }, []);

    return { response,
             error,
             resetResult,
             makeGetRequest,
             makePostRequest };
}