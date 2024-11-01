import React from 'react'
import classes from './TipsBlock.module.css'
import { useTipsContext } from '../../contexts/TipsContext/TipsProvider';
import TipsCollection from '../Collection/TipsCollection/TipsCollection';

export default function TipsBlock({ ...props }) {
    const { tips, leftCoordinate, topCoordinate } = useTipsContext();

    const componentStyle = {
        left: leftCoordinate,
        top: topCoordinate
    }

    return (
        <div
            className={classes.TipsBlock}
            style={componentStyle}
            {...props}
        >
            <TipsCollection tips={tips} />
        </div>
    )
}
