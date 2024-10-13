import React, { useRef, useState } from 'react'
import classes from './ScrollableVertical.module.css'
import { useScrollContext } from '../../../contexts/ScrollContext/ScrollProvider';

export default function ScrollableVertical({...props}) {
    const { handleScroll } = useScrollContext();
    const thisComponent = useRef(null);
    const [dragging, setDragging] = useState(false);
    const [startY, setStartY] = useState();
    const [scrollY, setScrollY] = useState();

    return (
        <div 
            ref={thisComponent}
            className={classes.ScrollableVertical} 
            onMouseDown={(e) => {
                setDragging(true);
                setStartY(e.pageY - thisComponent.current.offsetTop);
                setScrollY(thisComponent.current.scrollTop);
                handleScroll(thisComponent);
            }}
            onMouseUp={() => {
                setDragging(false);
                handleScroll(thisComponent);
            }}
            onMouseMove={(e) => {
                if (dragging) {
                    e.preventDefault();
                    let y = e.pageY;
                    const walk = (y-startY) * 2;
                    thisComponent.current.scrollTop = scrollY - walk;
                    // управляем контекстом при драг энд ропе
                    handleScroll(thisComponent);
                }
            }}
            onWheelCapture={() => {
                // также управляем контекстом при обычной прокрутке
                handleScroll(thisComponent);
            }}
            onResize={() => {
                // еще управляем контекстом при изменении размеров компонента
                handleScroll(thisComponent);
            }}
            {...props}>
            
        </div>
    )
}
