import React, { useEffect, useState } from 'react'
import classes from './Loadable.module.css'
import { Spin } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import {
    EXTRA_SHORT_DELAY,
    LOADING_INDICATOR_COLOR,
    LOADING_INDICATOR_SIZE
} from '../../../constants';
import { useResponseHandlerContext } from '../../../contexts/ResponseHandlerContext/ResponseHandlerProvider';

export default function Loadable({isWorking,
                                  propertyName,
                                  getDataUrl,
                                  setDataFunc,
                                  ...props}) {
    const { makeGetRequest } = useResponseHandlerContext();  
    const [isReady, setReady] = useState(false);
    const [error, setError] = useState(null);
    
    const loadData = async () => {
        if (!isWorking) {
            return;
        }
        setReady(false);
        await makeGetRequest(
            getDataUrl,
            (response) => {
                setDataFunc(response.data[propertyName]);
            },
            (error) => {
                setError(error);
            }
        )
        setReady(true);
    }

    useEffect(() => {        
        setTimeout(() => {            
            loadData();            
        }, EXTRA_SHORT_DELAY);    
        // eslint-disable-next-line react-hooks/exhaustive-deps    
    }, []);

    return (
        <div className={classes.Loadable} {...props}>
            {
                !isReady &&
                <Spin
                    size='large'
                    indicator={
                        <SyncOutlined spin style={{
                            fontSize: LOADING_INDICATOR_SIZE,
                            color: LOADING_INDICATOR_COLOR
                        }} />
                    } />                
            } 
            {
                error &&
                <h4>{error.response.data.detail}</h4>
            }
        </div>
    )        
}
