import React from 'react'
import classes from './TipsBlock.module.css'
import Scrollable from '../Helper/Scrollable/Scrollable'

export default function TipsBlock({...props}) {
    return (
        <div className={classes.TipsBlock} {...props}>
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
