import React, { useState } from 'react'
import classes from './Loadable.module.css'
import { Spin } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import { LOADING_INDICATOR_COLOR, LOADING_INDICATOR_SIZE } from '../../../constants';

export default function Loadable({...props}) {
    const [isReady, setReady] = useState(false);
    const [error, setError] = useState(null);
    
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
                <h4>error.response.data.detail</h4>
            }
        </div>
    )        
}
