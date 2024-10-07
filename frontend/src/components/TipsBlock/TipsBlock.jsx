import React from 'react'
import classes from './TipsBlock.module.css'
import Scrollable from '../Helper/Scrollable/Scrollable'
import { useTipsContext } from '../../contexts/TipsContext/TipsProvider';

export default function TipsBlock({...props}) {
    const { leftCoordinate, topCoordinate } = useTipsContext();

    const componentStyle = {
        left: leftCoordinate,
        top: topCoordinate
    }

    return (
        <div className={classes.TipsBlock}
            style={componentStyle} 
            {...props}>
            <Scrollable>
                <h3>Tips</h3>
                <h3>Tips</h3>
                <h3>Tips</h3>
                <h3>Tips</h3>
                <h3>Tips</h3>
                <h3>Tips</h3>
            </Scrollable>
        </div>
    )
}
