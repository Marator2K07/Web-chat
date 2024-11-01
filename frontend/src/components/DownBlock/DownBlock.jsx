import React, { useEffect, useState } from 'react'
import classes from './DownBlock.module.css'
import { useScrollContext } from '../../contexts/ScrollContext/ScrollProvider'

export default function DownBlock({ ...props }) {
    const { bottomEdge } = useScrollContext();
    const [boxShadowStyle, setBoxShadowStyle] = useState("none");

    const componentStyle = {
        boxShadow: boxShadowStyle
    }

    useEffect(() => {
        setBoxShadowStyle(
            bottomEdge
                ? "none"
                : "0px var(--down_block_shadow_offset) var(--down_block_shadow_size) var(--down_block_shadow_size) var(--background_main_color)"
        );
    }, [bottomEdge]);

    return (
        <div
            className={classes.DownBlock}
            style={componentStyle}
            {...props}
        >
            <div className='left'>
                <p>© 2024 Copyright: AwesomeChat.test</p>
            </div>
            <div className='right'>
                Test
            </div>
        </div>
    )
}
