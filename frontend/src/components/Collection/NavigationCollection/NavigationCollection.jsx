import React from 'react'
import classes from './NavigationCollection.module.css'
import { motion } from "framer-motion";
import { SHORT_DELAY  } from '../../../constants';
import { useNavigationContext } from '../../../contexts/NavigationContext/NavigationProvider';
import NavigationItem from './NavigationItem/NavigationItem';
import ScrollableHorizontal from '../../Helper/ScrollableHorizontal/ScrollableHorizontal';
import { useScrollContext } from '../../../contexts/ScrollContext/ScrollProvider';

export default function NavigationCollection({currentIndex,
                                              startIndex,
                                              endIndex,
                                              ...props}) {
    const { navigationBlocks } = useNavigationContext();
    const { topEdge } = useScrollContext();
    const animationStates = {
        visible: index => ({
            opacity: 1,
            transition: {
                delay: index * SHORT_DELAY/100,
            },
        }),
        hidden: {opacity: 0}
    }

    const disablePointerEvents = {
        pointerEvents: "none"
    };    
    const enablePointerEvents = {
        pointerEvents: "initial"
    };

    const addStyle = {
        boxShadow: topEdge ? "none"
            : "0px var(--navigation_shadow_offset) var(--navigation_shadow_size) var(--navigation_shadow_size) var(--background_main_color)"
    }

    return (
        <div className={classes.NavigationCollection}
            style={addStyle} 
            {...props}>
            <ScrollableHorizontal>
                {Object.keys(navigationBlocks)
                    .slice(startIndex, endIndex)
                    .map((key, index) => (
                        <motion.div
                            custom={{ currentIndex, index }}
                            variants={animationStates}
                            style={currentIndex !== index ? enablePointerEvents
                                                          : disablePointerEvents}
                            animate={currentIndex === index ? "hidden"
                                                            : "visible"}>
                            <NavigationItem block={navigationBlocks[key]} />
                        </motion.div>
                    ))}
            </ScrollableHorizontal>
        </div>
    )
}
