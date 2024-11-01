import React, { useEffect } from 'react'
import classes from './LoadingBlock.module.css'
import ResponseError from '../Response/ResponseError/ResponseError'
import OkResponse from '../Response/OkResponse/OkResponse'
import BadResponse from '../Response/BadResponse/BadResponse'
import ScrollableVertical from '../Helper/ScrollableVertical/ScrollableVertical';
import Spacer from '../Helper/Spacer/Spacer';
import { Spin } from 'antd'
import { SyncOutlined } from '@ant-design/icons'
import { useLoadingContext } from '../../contexts/LoadingContext/LoadingProvider'
import { useResponseHandlerContext } from '../../contexts/ResponseHandlerContext/ResponseHandlerProvider'
import {
    LOADING_INDICATOR_COLOR,
    LOADING_INDICATOR_SIZE,
    RESPONSE_BAD_STATUS,
    RESPONSE_GOOD_STATUS
} from '../../constants'
import { useActionControlContext } from '../../contexts/ActionControlContext/ActionControlProvider'
import AcceptActionForm from '../Form/AcceptActionForm/AcceptActionForm'

export default function LoadingBlock({ ...props }) {
    const { loading, holding, toggleHolding } = useLoadingContext();
    const { response, error } = useResponseHandlerContext();
    const { action, acceptActionForm } = useActionControlContext();

    const disablePointerEvents = {
        pointerEvents: "none"
    };
    const enablePointerEvents = {
        pointerEvents: "initial"
    };

    // управление задержкой (holding) экрана загрузки
    useEffect(() => {
        if (!loading && response && response.data) {
            toggleHolding(
                response.data.holding,
                response.data.delay
            );
        }
    }, [loading, response, toggleHolding])

    return (
        <div
            style={
                holding
                    ? enablePointerEvents
                    : disablePointerEvents
            }
            className={classes.LoadingBlock}
            {...props}
        >
            <ScrollableVertical>
                {
                    loading &&
                    <Spin
                        size='large'
                        indicator={
                            <SyncOutlined spin style={{
                                fontSize: LOADING_INDICATOR_SIZE,
                                color: LOADING_INDICATOR_COLOR
                            }} />
                        }
                    />
                }
                {
                    acceptActionForm &&
                    <AcceptActionForm handleSubmit={action} />
                }
                {
                    error &&
                    <ResponseError message={error} />
                }
                {
                    response &&
                    response.data &&
                    response.data.status === RESPONSE_GOOD_STATUS &&
                    <OkResponse message={response.data} />
                }
                {
                    response &&
                    response.data &&
                    response.data.status === RESPONSE_BAD_STATUS &&
                    <BadResponse message={response.data} />
                }
            </ScrollableVertical>
            <Spacer sizeH='5%' />
        </div>
    )
}
