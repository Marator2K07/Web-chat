import React, { useRef, useState } from 'react'
import classes from './ScrollableHorizontal.module.css'

export default function ScrollableHorizontal({...props}) {
    const thisComponent = useRef(null);
    const [dragging, setDragging] = useState(false);
    const [startX, setStartX] = useState();
    const [scrollX, setScrollX] = useState();

    return (
        <div 
            ref={thisComponent}
            className={classes.ScrollableHorizontal} 
            onMouseDown={(e) => {
                setDragging(true);
                setStartX(e.pageX - thisComponent.current.offsetLeft);
                setScrollX(thisComponent.current.scrollLeft);
            }}
            onMouseUp={() => setDragging(false)}
            onMouseMove={(e) => {
                if (dragging) {
                    e.preventDefault();
                    let y = e.pageX;
                    const walk = (y-startX) * 2;
                    thisComponent.current.scrollLeft = scrollX - walk;
                }
            }}
            {...props}>
            
        </div>
    )
}
